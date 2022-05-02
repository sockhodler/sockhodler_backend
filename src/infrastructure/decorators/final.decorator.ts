// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function final<T extends { new (...args: any[]): object }>(
  target: T,
): T {
  return class Final extends target {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      if (new.target !== Final) {
        throw new Error(`Cannot extend a final class "${target.name}"`);
      }
      super(...args);
    }
  };
}
