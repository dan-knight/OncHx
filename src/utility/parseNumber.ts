export function strictlyParseInt(x: string | undefined, name?: string): number {
  try {
    if (x !== undefined) {
      return parseInt(x);
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error(`Invalid ${name ?? 'value'}`);
  }
}

export function safelyParseInt(x: string | undefined) {
  try {
    return parseInt(x ?? '');
  } catch (error) {
    return undefined;
  };
}