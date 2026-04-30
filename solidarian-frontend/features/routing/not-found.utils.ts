import { isEntityNotFoundGraphQLError } from '@/features/graphql/graphql-error.utils';
import { notFound } from 'next/navigation';

type MaybePromise<T> = T | Promise<T>;

export async function resolveOrNotFound<T>(
  resolver: () => MaybePromise<T | null | undefined>
): Promise<NonNullable<T>> {
  try {
    const result = await resolver();

    if (result == null) notFound();

    return result;
  } catch (error) {
    if (isEntityNotFoundGraphQLError(error)) notFound();
    throw error;
  }
}
