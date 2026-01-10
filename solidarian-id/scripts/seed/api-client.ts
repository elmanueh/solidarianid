/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { faker } from '@faker-js/faker';
import {
  ACTION_REQUESTS_MAX,
  ACTION_REQUESTS_MIN,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_SERVICE_URL,
  APPROVAL_THRESHOLD,
  CAUSE_REQUESTS_MAX,
  CAUSE_REQUESTS_MIN,
  COMMUNITIES_SERVICE_URL,
  COMMUNITY_REQUESTS_MAX,
  COMMUNITY_REQUESTS_MIN,
  DELAY_BETWEEN_REQUESTS_MS,
  DELAY_FOR_USER_BATCH_MS,
  REJECTION_THRESHOLD,
  USER_BATCH_SIZE,
  USERS_MAX,
  USERS_MIN,
  USERS_SERVICE_URL,
} from './config';
import {
  generateActionRequestDto,
  generateCauseRequestDto,
  generateCommunityRequestDto,
  generateUserDto,
} from './data-generators';
import type {
  ActionRequestDto,
  CauseRequestDto,
  CommunityRequestDto,
  CreatedCause,
  CreatedCommunity,
  CreatedUser,
  ProcessingResults,
  RegisterUserDto,
} from './types';
import { delay, randomBetween } from './utils';

/**
 * API Client Layer
 * Handles all HTTP communication with services
 * Following Hexagonal Architecture, this is an adapter for external APIs
 */

// =============================================================================
// User API Functions
// =============================================================================

/**
 * Creates a user via the users service API
 * Returns the user ID from the Location header or response body
 */
async function createUser(userDto: RegisterUserDto): Promise<string | null> {
  try {
    const response = await fetch(`${USERS_SERVICE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDto),
    });

    if (!response.ok) {
      if (response.status === 409) {
        // Conflict - user already exists, skip silently
        return null;
      }
      const errorText = await response.text();
      console.error(`  ⚠️ Failed to create user ${userDto.username}: ${response.status} - ${errorText.slice(0, 200)}`);
      return null;
    }

    // Try to get ID from Location header first
    const location = response.headers.get('Location');
    if (location) {
      const id = location.split('/').pop();
      if (id) {
        console.log(`  ✅ User ${userDto.username} created with ID: ${id}`);
        return id;
      }
    }

    // If no Location header, try to parse the response body
    try {
      const responseData = await response.json();
      if (responseData?.id) {
        console.log(`  ✅ User ${userDto.username} created with ID from body: ${responseData.id}`);
        return responseData.id;
      }
      console.error(`  ⚠️ User ${userDto.username} created but no ID in response body:`, responseData);
    } catch {
      console.error(`  ⚠️ User ${userDto.username} created but cannot parse response body`);
    }

    console.error(`  ⚠️ User created but no ID found in response for ${userDto.username}`);
    return null;
  } catch (error) {
    console.error(`  ❌ Error creating user ${userDto.username}:`, (error as Error).message);
    return null;
  }
}

/**
 * Seeds users via the users service API
 */
export async function seedUsers(): Promise<CreatedUser[]> {
  const usersCount = randomBetween(USERS_MIN, USERS_MAX);

  console.log('\n👥 Creating users...');
  console.log(`   Target: ${usersCount} users (random between ${USERS_MIN}-${USERS_MAX})`);
  console.log(`   Service URL: ${USERS_SERVICE_URL}`);

  const createdUsers: CreatedUser[] = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < usersCount; i++) {
    const userDto = generateUserDto(i);
    const userId = await createUser(userDto);

    if (userId) {
      createdUsers.push({ id: userId, username: userDto.username });
      successCount++;
    } else {
      failCount++;
    }

    // Progress logging every 50 users
    if ((i + 1) % 50 === 0) {
      console.log(`   Progress: ${i + 1}/${usersCount} users processed (${successCount} created)`);
    }

    // Small delay to avoid overwhelming the API
    if ((i + 1) % USER_BATCH_SIZE === 0) {
      await delay(DELAY_FOR_USER_BATCH_MS);
    }
  }

  console.log(`\n   ✅ Users created: ${successCount}`);
  if (failCount > 0) {
    console.log(`   ⚠️ Users skipped/failed: ${failCount}`);
  }

  return createdUsers;
}

// =============================================================================
// Community API Functions
// =============================================================================

/**
 * Creates a community request via the communities service API
 */
async function createCommunityRequest(requestDto: CommunityRequestDto): Promise<string | null> {
  try {
    const response = await fetch(`${COMMUNITIES_SERVICE_URL}/community-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestDto),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`  ⚠️ Community request failed: ${response.status}`);
      console.error(`  📝 Error:`, errorText);
      return null;
    }

    const location = response.headers.get('Location');
    console.log(`  ✅ Community request created, Location: ${location}`);
    return location ? location.split('/').pop() || null : null;
  } catch (error) {
    console.error(`  ❌ Error creating community request:`, (error as Error).message);
    return null;
  }
}

/**
 * Seeds community requests via the communities service API
 */
export async function seedCommunityRequests(userIds: string[]): Promise<string[]> {
  if (userIds.length === 0) {
    console.error('\n❌ No users available to create community requests!');
    return [];
  }

  const requestsCount = randomBetween(COMMUNITY_REQUESTS_MIN, COMMUNITY_REQUESTS_MAX);

  console.log('\n🏘️ Creating community requests...');
  console.log(
    `   Target: ${requestsCount} community requests (random between ${COMMUNITY_REQUESTS_MIN}-${COMMUNITY_REQUESTS_MAX})`,
  );
  console.log(`   Service URL: ${COMMUNITIES_SERVICE_URL}`);

  const createdIds: string[] = [];
  let successCount = 0;

  for (let i = 0; i < requestsCount; i++) {
    const userId = faker.helpers.arrayElement(userIds);
    const requestDto = generateCommunityRequestDto(userId);
    const requestId = await createCommunityRequest(requestDto);

    if (requestId) {
      createdIds.push(requestId);
      successCount++;
    }

    if ((i + 1) % 5 === 0) {
      console.log(`   Progress: ${i + 1}/${requestsCount} community requests (${successCount} created)`);
    }

    await delay(DELAY_BETWEEN_REQUESTS_MS);
  }

  console.log(`   ✅ Community requests created: ${successCount}`);
  return createdIds;
}

/**
 * Fetches existing communities from the service
 */
export async function fetchCommunities(): Promise<CreatedCommunity[]> {
  try {
    const response = await fetch(`${COMMUNITIES_SERVICE_URL}/communities`);
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// =============================================================================
// Cause API Functions
// =============================================================================

/**
 * Creates a cause request via the communities service API
 */
async function createCauseRequest(requestDto: CauseRequestDto): Promise<string | null> {
  try {
    const response = await fetch(`${COMMUNITIES_SERVICE_URL}/cause-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestDto),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`  ⚠️ Cause request failed: ${response.status} - ${errorText.slice(0, 100)}`);
      return null;
    }

    const location = response.headers.get('Location');
    return location ? location.split('/').pop() || null : null;
  } catch (error) {
    console.error(`  ❌ Error creating cause request:`, (error as Error).message);
    return null;
  }
}

/**
 * Seeds cause requests via the communities service API
 */
export async function seedCauseRequests(userIds: string[]): Promise<string[]> {
  if (userIds.length === 0) {
    console.error('\n❌ No users available to create cause requests!');
    return [];
  }

  // Fetch existing communities to link causes
  const communities = await fetchCommunities();
  if (communities.length === 0) {
    console.log('\n⚠️ No communities found, skipping standalone cause requests');
    return [];
  }

  const requestsCount = randomBetween(CAUSE_REQUESTS_MIN, CAUSE_REQUESTS_MAX);

  console.log('\n🎯 Creating cause requests...');
  console.log(
    `   Target: ${requestsCount} cause requests (random between ${CAUSE_REQUESTS_MIN}-${CAUSE_REQUESTS_MAX})`,
  );
  console.log(`   Available communities: ${communities.length}`);

  const createdIds: string[] = [];
  let successCount = 0;

  for (let i = 0; i < requestsCount; i++) {
    const userId = faker.helpers.arrayElement(userIds);
    const community = faker.helpers.arrayElement(communities);
    const requestDto = generateCauseRequestDto(userId, community.id);
    const requestId = await createCauseRequest(requestDto);

    if (requestId) {
      createdIds.push(requestId);
      successCount++;
    }

    if ((i + 1) % 5 === 0) {
      console.log(`   Progress: ${i + 1}/${requestsCount} cause requests (${successCount} created)`);
    }

    await delay(DELAY_BETWEEN_REQUESTS_MS);
  }

  console.log(`   ✅ Cause requests created: ${successCount}`);
  return createdIds;
}

/**
 * Fetches existing causes from the service
 */
export async function fetchCauses(): Promise<CreatedCause[]> {
  try {
    const response = await fetch(`${COMMUNITIES_SERVICE_URL}/causes`);
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// =============================================================================
// Action API Functions
// =============================================================================

/**
 * Creates an action request via the communities service API
 */
async function createActionRequest(requestDto: ActionRequestDto): Promise<string | null> {
  try {
    const response = await fetch(`${COMMUNITIES_SERVICE_URL}/action-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestDto),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`  ⚠️ Action request failed: ${response.status} - ${errorText.slice(0, 100)}`);
      return null;
    }

    const location = response.headers.get('Location');
    return location ? location.split('/').pop() || null : null;
  } catch (error) {
    console.error(`  ❌ Error creating action request:`, (error as Error).message);
    return null;
  }
}

/**
 * Seeds action requests via the communities service API
 */
export async function seedActionRequests(userIds: string[]): Promise<string[]> {
  if (userIds.length === 0) {
    console.error('\n❌ No users available to create action requests!');
    return [];
  }

  // Fetch existing causes to link actions
  const causes = await fetchCauses();
  if (causes.length === 0) {
    console.log('\n⚠️ No causes found, skipping action requests');
    return [];
  }

  const requestsCount = randomBetween(ACTION_REQUESTS_MIN, ACTION_REQUESTS_MAX);

  console.log('\n⚡ Creating action requests...');
  console.log(
    `   Target: ${requestsCount} action requests (random between ${ACTION_REQUESTS_MIN}-${ACTION_REQUESTS_MAX})`,
  );
  console.log(`   Available causes: ${causes.length}`);

  const createdIds: string[] = [];
  let successCount = 0;

  for (let i = 0; i < requestsCount; i++) {
    const userId = faker.helpers.arrayElement(userIds);
    const cause = faker.helpers.arrayElement(causes);
    const requestDto = generateActionRequestDto(userId, cause.id);
    const requestId = await createActionRequest(requestDto);

    if (requestId) {
      createdIds.push(requestId);
      successCount++;
    }

    if ((i + 1) % 5 === 0) {
      console.log(`   Progress: ${i + 1}/${requestsCount} action requests (${successCount} created)`);
    }

    await delay(DELAY_BETWEEN_REQUESTS_MS);
  }

  console.log(`   ✅ Action requests created: ${successCount}`);
  return createdIds;
}

// =============================================================================
// Admin API Functions
// =============================================================================

/**
 * Logs in to the admin panel and returns the session cookies
 */
export async function loginAdmin(): Promise<string | null> {
  try {
    console.log(`  🔗 Admin URL: ${ADMIN_SERVICE_URL}/api/auth/login`);
    console.log(`  👤 Email: ${ADMIN_EMAIL}`);

    const response = await fetch(`${ADMIN_SERVICE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`  ⚠️ Admin login failed: ${response.status}`);
      console.error(`  📝 Full error:`, errorText);
      return null;
    }

    // Extract cookies from Set-Cookie headers
    const setCookieHeaders = response.headers.getSetCookie();
    if (!setCookieHeaders || setCookieHeaders.length === 0) {
      console.error(`  ⚠️ No cookies received from login`);
      return null;
    }

    // Join all cookies into a single Cookie header value
    const cookies = setCookieHeaders
      .map(cookie => cookie.split(';')[0]) // Take only the key=value part
      .join('; ');

    console.log(`  ✅ Cookies received successfully`);
    return cookies;
  } catch (error) {
    console.error(`  ❌ Exception during admin login:`, error);
    console.error(`  ❌ Error message:`, (error as Error).message);
    return null;
  }
}

/**
 * Updates the status of a request (approve or reject)
 */
async function updateRequestStatus(
  cookies: string,
  requestId: string,
  status: 'approved' | 'rejected',
  reason?: string,
): Promise<boolean> {
  try {
    const response = await fetch(`${ADMIN_SERVICE_URL}/requests/${requestId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies,
      },
      body: JSON.stringify({
        status: status,
        reason: reason || (status === 'rejected' ? 'Rejected by seed script' : undefined),
      }),
    });

    return response.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * Processes requests randomly (approve, reject, or leave pending)
 */
export async function processRequests(
  cookies: string,
  requestIds: string[],
  requestType: string,
): Promise<ProcessingResults> {
  console.log(`\n🔍 Processing ${requestIds.length} ${requestType} requests...`);

  if (requestIds.length === 0) {
    return { approved: 0, rejected: 0, pending: 0 };
  }

  let approved = 0;
  let rejected = 0;
  let pending = 0;

  // Randomly process each request
  for (const requestId of requestIds) {
    const random = faker.number.float();

    if (random < APPROVAL_THRESHOLD) {
      // Approve
      const success = await updateRequestStatus(cookies, requestId, 'approved');
      if (success) {
        approved++;
        console.log(`   ✅ Approved request: ${requestId}`);
      }
    } else if (random < REJECTION_THRESHOLD) {
      // Reject
      const success = await updateRequestStatus(cookies, requestId, 'rejected');
      if (success) {
        rejected++;
        console.log(`   ❌ Rejected request: ${requestId}`);
      }
    } else {
      // Leave pending
      pending++;
      console.log(`   ⏳ Left pending request: ${requestId}`);
    }

    await delay(DELAY_BETWEEN_REQUESTS_MS);
  }

  console.log(`   ✅ Approved: ${approved}, ❌ Rejected: ${rejected}, ⏳ Pending: ${pending}`);
  return { approved, rejected, pending };
}
