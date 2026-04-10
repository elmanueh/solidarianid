export interface SubscriptionHandlers<TData> {
  onData: (data: TData) => void;
  onError?: (error: unknown) => void;
  onComplete?: () => void;
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error';
};
