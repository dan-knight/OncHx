export type Constructor = new (...args: any[]) => {};

export type GenericConstructor<T extends {}> = new (...args: any[]) => T;