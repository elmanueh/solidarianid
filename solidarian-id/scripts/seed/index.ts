import { faker } from '@faker-js/faker';
import {
  fetchCauses,
  fetchCommunities,
  loginAdmin,
  processRequests,
  seedActionRequests,
  seedCauseFollowers,
  seedCauseRequests,
  seedCommunityMembers,
  seedCommunityRequests,
  seedUsers,
} from './api-client';
import { FAKER_SEED, KAFKA_PROPAGATION_DELAY_MS } from './config';
import type { CreatedCause, SeedStats } from './types';
import { delay, validateEnvironment } from './utils';

/**
 * Main Seed Script
 * Orchestrates the seeding process following a clean, sequential flow
 * Following Clean Architecture: this is the application layer orchestrating use cases
 */

// Disable TLS certificate validation for development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function main(): Promise<void> {
  console.log('🌱 SolidarianID Development Seed Script');
  console.log('========================================');
  console.log(`   Faker seed: ${FAKER_SEED} (deterministic)`);
  console.log(`   Timestamp: ${new Date().toISOString()}`);
  console.log(`   Target: ~300 users, ~50 community requests, ~200 cause requests, ~500 action requests`);
  console.log(`   Approval rates: 60% approved, 30% rejected, 10% pending`);

  // 1. Validate environment (fail if production)
  validateEnvironment();

  // 2. Initialize faker with deterministic seed
  faker.seed(FAKER_SEED);
  console.log('✅ Faker initialized with deterministic seed');

  const stats: SeedStats = {
    users: 0,
    communityRequests: 0,
    causeRequests: 0,
    actionRequests: 0,
    totalRequests: 0,
    approvedCommunities: 0,
    rejectedCommunities: 0,
    pendingCommunities: 0,
    approvedCauses: 0,
    rejectedCauses: 0,
    pendingCauses: 0,
    approvedActions: 0,
    rejectedActions: 0,
    pendingActions: 0,
  };

  // 3. Login to admin
  console.log('\n🔐 Logging into admin panel...');
  const adminToken = await loginAdmin();
  if (adminToken) {
    console.log('✅ Admin logged in successfully');
  } else {
    console.error('❌ Failed to login as admin. Continuing without approval/rejection...');
  }

  // 4. Seed users and capture IDs
  const createdUsers = await seedUsers();
  const userIds = createdUsers.map(u => u.id);
  stats.users = userIds.length;

  if (userIds.length === 0) {
    console.error('\n❌ No users were created. Cannot continue.');
    process.exit(1);
  }

  // =========================================================================
  // COMMUNITY REQUESTS FLOW
  // =========================================================================

  // 5. Seed community requests and capture IDs + creators
  const communityResult = await seedCommunityRequests(userIds);
  const communityRequestIds = communityResult.requestIds;
  stats.communityRequests = communityRequestIds.length;

  // Wait for Kafka events to propagate requests to admin
  console.log('\n⏳ Waiting for community requests to propagate to admin...');
  await delay(KAFKA_PROPAGATION_DELAY_MS);

  // 6. Process community requests randomly (approve/reject/leave pending)
  if (adminToken && communityRequestIds.length > 0) {
    const communityResults = await processRequests(adminToken, communityRequestIds, 'community');
    stats.approvedCommunities = communityResults.approved;
    stats.rejectedCommunities = communityResults.rejected;
    stats.pendingCommunities = communityResults.pending;

    // Wait for Kafka events to propagate and communities to be created
    console.log('\n⏳ Waiting for approved communities to be created...');
    await delay(KAFKA_PROPAGATION_DELAY_MS);
  }

  // 7. Fetch created communities
  const communities = await fetchCommunities();
  let causes: CreatedCause[] = [];
  console.log(`\n📋 Found ${communities.length} existing communities`);

  if (communities.length === 0) {
    console.log('⚠️ No communities available. Skipping cause and action requests.');
  } else {
    // =======================================================================
    // CAUSE REQUESTS FLOW
    // =======================================================================

    // 8. Seed cause requests - only community creators (via community.creatorId) can make these
    const causeResult = await seedCauseRequests(communities);
    const causeRequestIds = causeResult.requestIds;
    stats.causeRequests = causeRequestIds.length;

    // Wait for Kafka events to propagate requests to admin
    console.log('\n⏳ Waiting for cause requests to propagate to admin...');
    await delay(KAFKA_PROPAGATION_DELAY_MS);

    // 9. Process cause requests randomly (approve/reject/leave pending)
    if (adminToken && causeRequestIds.length > 0) {
      const causeResults = await processRequests(adminToken, causeRequestIds, 'cause');
      stats.approvedCauses = causeResults.approved;
      stats.rejectedCauses = causeResults.rejected;
      stats.pendingCauses = causeResults.pending;

      // Wait for Kafka events to propagate and causes to be created
      console.log('\n⏳ Waiting for approved causes to be created...');
      await delay(KAFKA_PROPAGATION_DELAY_MS);
    }

    // 10. Fetch created causes
    causes = await fetchCauses();
    console.log(`\n📋 Found ${causes.length} existing causes`);

    if (causes.length === 0) {
      console.log('⚠️ No causes available. Skipping action requests.');
    } else {
      // =====================================================================
      // ACTION REQUESTS FLOW
      // =====================================================================

      // 11. Seed action requests - use the creator of each cause's community
      const actionRequestIds = await seedActionRequests(communities, causes);
      stats.actionRequests = actionRequestIds.length;

      // Wait for Kafka events to propagate requests to admin
      console.log('\n⏳ Waiting for action requests to propagate to admin...');
      await delay(KAFKA_PROPAGATION_DELAY_MS);

      // 12. Process action requests randomly (approve/reject/leave pending)
      if (adminToken && actionRequestIds.length > 0) {
        const actionResults = await processRequests(adminToken, actionRequestIds, 'action');
        stats.approvedActions = actionResults.approved;
        stats.rejectedActions = actionResults.rejected;
        stats.pendingActions = actionResults.pending;
      }
    }
  }

  stats.totalRequests = stats.communityRequests + stats.causeRequests + stats.actionRequests;

  // ==========================================================================
  // ADD USERS TO COMMUNITIES
  // ==========================================================================
  console.log('\n⏳ Waiting before assigning community members...');
  await delay(KAFKA_PROPAGATION_DELAY_MS);

  // 13. Add users to communities (variability: some communities many members, others few)
  const communityMembers = await seedCommunityMembers(createdUsers, communities);

  console.log('\n⏳ Waiting before assigning cause followers...');
  await delay(KAFKA_PROPAGATION_DELAY_MS);

  // 14. Add users to causes, restricted to communities where they are already members
  await seedCauseFollowers(causes, communities, communityMembers);

  // 15. Final Summary
  printSummary(stats, !!adminToken);
}

/**
 * Prints the final statistics summary
 */
function printSummary(stats: SeedStats, hasAdminToken: boolean): void {
  console.log('\n========================================');
  console.log('🎉 Seed completed!');
  console.log('========================================');
  console.log(`   👥 Users created: ${stats.users}`);
  console.log(`\n   📨 Requests Created:`);
  console.log(`   🏘️  Community requests: ${stats.communityRequests}`);
  console.log(`   🎯  Cause requests: ${stats.causeRequests}`);
  console.log(`   ⚡  Action requests: ${stats.actionRequests}`);
  console.log(`   📊  Total requests: ${stats.totalRequests}`);

  if (hasAdminToken) {
    console.log(`\n   📝 Community Requests Processed:`);
    console.log(`   ✅  Approved: ${stats.approvedCommunities}`);
    console.log(`   ❌  Rejected: ${stats.rejectedCommunities}`);
    console.log(`   ⏳  Pending: ${stats.pendingCommunities}`);

    console.log(`\n   📝 Cause Requests Processed:`);
    console.log(`   ✅  Approved: ${stats.approvedCauses}`);
    console.log(`   ❌  Rejected: ${stats.rejectedCauses}`);
    console.log(`   ⏳  Pending: ${stats.pendingCauses}`);

    console.log(`\n   📝 Action Requests Processed:`);
    console.log(`   ✅  Approved: ${stats.approvedActions}`);
    console.log(`   ❌  Rejected: ${stats.rejectedActions}`);
    console.log(`   ⏳  Pending: ${stats.pendingActions}`);
  }

  console.log('========================================\n');
}

// Execute the script
main().catch(error => {
  console.error('❌ Seed script failed:', error);
  process.exit(1);
});
