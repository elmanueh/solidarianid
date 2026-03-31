---
name: solidarian-testing-skill
description: "Use when: writing or improving unit tests with Jest in SolidarianID; creating test cases for services/controllers/use-cases; applying Given/When/Then naming; separating test source from production code; enforcing expected-vs-actual assertions; using proper Jest assertions; testing single scenarios; mocking external dependencies (DB, HTTP, Kafka, JWT); reducing regressions before refactors in TypeScript/NestJS."
---

# SolidarianID Testing Skill (Jest)

## Purpose

Use this skill to create and improve **unit tests with Jest** using a practical workflow that increases confidence, catches regressions early, and keeps code modular and maintainable.

This skill applies to the SolidarianID stack (TypeScript + NestJS), aligned with repository guidelines:

- Unit tests with Jest.
- Behavior-first tests (inputs/outputs), not internals.
- Strong typing, avoiding `any` when possible.
- Security-aware and edge-case-aware assertions.

## When To Use

- Add tests for a new service, use case, helper, guard, or controller logic.
- Refactor existing code and need fast safety checks.
- Reproduce and lock a bug before implementing the fix.
- Improve weak coverage in critical modules.
- Validate error handling and boundary cases.

## Core Principles

1. Test behavior, not implementation details.
2. Keep tests small: one expectation theme per test.
3. Use descriptive names in `given/when/then` style.
4. Mock external dependencies (network, DB, queues, filesystem, time).
5. Include happy path + edge cases + failure modes.
6. Treat tests as living documentation for the domain.
7. Keep expected values independent from production logic.

## Test Source Organization

Keep test code separate from production code so it is developed and maintained independently, and never leaked into runtime artifacts.

Recommended structure for this repository:

- Unit tests in dedicated test paths (`test/`, module-level `__tests__/`) or `*.spec.ts` files excluded from production builds.
- Integration/E2E in dedicated folders already present (for example `test/integration`, `test/e2e`).
- Ensure build/deploy pipelines do not package test-only files.

Note: In Java ecosystems (Maven/Gradle), this separation is analogous to `src/main` and `src/test`.

## Test Case Naming Convention

Test names must describe both action and expected result at a glance.

Prefer a `given_when_then` style:

- `given_usuario_existente_when_busca_por_id_then_devuelve_perfil`
- `given_id_invalido_when_busca_por_id_then_lanza_not_found`

Inside each test, keep explicit blocks:

- **Given**: setup, fixtures, mocks, inputs.
- **When**: action under test.
- **Then**: assertions for expected output/effects.

This structure makes failures faster to diagnose and keeps tests as executable documentation.

## Expected Vs Actual

Every test must compare expected and actual outcomes with clear assertions.

Guidelines:

- Use variable names like `expectedX` and `actualX` when useful.
- Prefer hard-coded expected values for deterministic checks.
- Do not compute expected values using the same production algorithm under test.
- Avoid reproducing production logic in the test only to make the assertion pass.

Example:

```ts
const expectedArea = 78.53981633974483;
const actualArea = calculator.calculateArea(5);

expect(actualArea).toBe(expectedArea);
```

## Appropriate Assertions

Choose the assertion that best expresses intent:

- Equality/value: `toBe`, `toEqual`, `toStrictEqual`
- Inequality: `not.toBe`, `not.toEqual`
- Nullability/definition: `toBeNull`, `toBeDefined`, `toBeUndefined`
- Boolean checks: `toBeTruthy`, `toBeFalsy`
- Exceptions/rejections: `toThrow`, `rejects.toThrow`
- Calls/interactions: `toHaveBeenCalled`, `toHaveBeenCalledWith`, `toHaveBeenCalledTimes`

Avoid generic assertions when a more specific matcher exists.

## Specific Unit Tests

Write one unit test per specific scenario.

Do:

- One behavioral intention per `it`.
- Separate happy path, edge, and failure into distinct tests.

Avoid:

- Multiple unrelated assertions in one large test.
- Mixed scenarios that hide the real failing condition.

This improves debuggability and long-term maintainability.

## Test Production Scenarios

Design tests that mirror realistic production conditions:

- Valid and invalid IDs.
- Empty collections and optional fields.
- Permission and role constraints.
- Dependency failures/timeouts.
- Data shape inconsistencies from external services.

Production-like scenarios increase confidence and reduce runtime surprises.

## Mock External Services

Unit tests must isolate business logic from external systems.

Mock examples in this project context:

- Repositories (TypeORM/Mongoose adapters).
- HTTP clients.
- Kafka/event publishers.
- Auth/JWT providers.
- Time and randomness.

Use Jest tools (`jest.fn`, `jest.spyOn`, module mocks) and verify interaction contracts where needed.

## Avoid Test Code Redundancy

Create reusable helpers for repeated setup:

- Fixture builders/factories for entities and DTOs.
- Mock factories for repositories/services.
- Shared setup functions for Given blocks.

Goal: less duplication, clearer tests, easier future updates.

## Workflow

1. **Identify the unit boundary**
   - Focus on one function/class method in isolation.
   - Define dependencies that must be mocked.

2. **Map scenarios before coding**
   - Happy path.
   - Domain edge cases (empty values, invalid IDs, limits).
   - Technical failures (exceptions, unavailable dependencies, invalid responses).

3. **Write or improve tests first**
   - Create clear `describe` blocks per unit.
   - Add explicit test names that describe outcome.

4. **Mock dependencies intentionally**
   - Use `jest.fn()`, `jest.spyOn()`, and module mocks.
   - Avoid real HTTP/DB/Kafka calls in unit tests.

5. **Run tests and coverage**
   - Execute targeted tests first.
   - Use coverage to detect blind spots, not as a vanity metric.

6. **Refine for readability**
   - Extract setup builders/factories when repetition appears.
   - Keep Arrange/Act/Assert structure visible.
   - Keep Given/When/Then intent obvious.

## Test Naming Pattern

Prefer names like:

- `deberia devolver causa cuando el id existe`
- `deberia lanzar NotFoundException cuando no existe la causa`
- `deberia rechazar registro cuando el email es invalido`

Or with `given_when_then`:

- `given_email_invalido_when_registra_usuario_then_rechaza_solicitud`
- `given_causa_no_encontrada_when_consulta_por_id_then_lanza_not_found`

## Practical Jest Patterns (TypeScript)

```ts
describe("FetchUserUseCase", () => {
  it("deberia devolver usuario cuando el repositorio responde", async () => {
    const repo = { findById: jest.fn().mockResolvedValue({ id: "u1" }) };
    const useCase = new FetchUserUseCase(repo as UserRepositoryPort);

    const result = await useCase.execute("u1");

    expect(result).toEqual({ id: "u1" });
    expect(repo.findById).toHaveBeenCalledWith("u1");
  });

  it("deberia lanzar error cuando el repositorio falla", async () => {
    const repo = {
      findById: jest.fn().mockRejectedValue(new Error("db down")),
    };
    const useCase = new FetchUserUseCase(repo as UserRepositoryPort);

    await expect(useCase.execute("u1")).rejects.toThrow("db down");
  });
});
```

## SolidarianID-Specific Checklist

- Validate domain rules (causes linked to SDGs, required fields, role constraints).
- Assert proper exceptions/messages for invalid input and unauthorized access.
- Verify DTO validation-sensitive behaviors where relevant.
- Prefer deterministic tests (control dates, random IDs, environment values).
- Keep NestJS testing module minimal for unit tests; reserve heavier bootstrapping for integration.

## Commands

From project root or service folder, use available scripts in `package.json`:

```bash
npm test
npm test -- --watch
npm test -- --coverage
```

If using a monorepo target strategy, prefer focused execution for speed (single app/lib/spec file).

## Definition Of Done

- Tests cover expected behavior and critical edge cases.
- No real external side effects.
- Test names are explicit and readable.
- Names and blocks follow Given/When/Then where possible.
- Expected and actual are asserted without duplicating production logic.
- Coverage improves in touched areas.
- Tests pass consistently on repeated runs.

## Anti-Patterns To Avoid

- Testing private/internal implementation details.
- Massive tests with many unrelated assertions.
- Flaky tests dependent on network/time/global state.
- Over-mocking that hides real behavior contracts.
- Chasing 100% coverage without meaningful assertions.
- Big tests mixing multiple scenarios.
- Re-implementing production calculations in test assertions.

## Expected Output Style When This Skill Is Invoked

When asked to test a module, respond with:

1. Short scenario map (happy path, edge, failure).
2. Concrete Jest test code in TypeScript.
3. Mocking strategy explanation (what and why).
4. Command to run only relevant tests.
5. Optional next-step improvements (coverage, refactor safety).
