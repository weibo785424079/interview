type Partial2<T> = {
  [P in keyof T]?: T[P];
};

/**
 * Make all properties in T required
 */
type Required2<T> = {
  [P in keyof T]-?: T[P];
};
/**
 * Make all properties in T readonly
 */
type Readonly2<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick2<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
 * Construct a type with a set of properties K of type T
 */
type Record2<K extends keyof any, T> = {
  [P in K]: T;
};

/**
 * Exclude from T those types that are assignable to U
 */
type Exclude2<T, U> = T extends U ? never : T;

/**
 * Extract from T those types that are assignable to U
 */
type Extract2<T, U> = T extends U ? T : never;

/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit2<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/**
 * Exclude null and undefined from T
 */
type NonNullable2<T> = T & {};

/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters2<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
