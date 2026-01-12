export class EventTracker {
  private readonly resolvers: Map<string, () => void> = new Map();
  private readonly processed: Set<string> = new Set();

  markProcessed(eventKey: string): void {
    this.processed.add(eventKey);
    const resolver = this.resolvers.get(eventKey);
    if (resolver) {
      resolver();
      this.resolvers.delete(eventKey);
    }
  }

  async waitFor(eventKey: string, timeoutMs: number = 10000): Promise<void> {
    if (this.processed.has(eventKey)) {
      return;
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.resolvers.delete(eventKey);
        reject(new Error(`Timeout waiting for event: ${eventKey}`));
      }, timeoutMs);

      this.resolvers.set(eventKey, () => {
        clearTimeout(timeout);
        resolve();
      });
    });
  }

  clear(): void {
    this.resolvers.clear();
    this.processed.clear();
  }
}
