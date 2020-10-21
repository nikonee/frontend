type MyPartial<T> = {
  [K in keyof T]?: T[K]
}

type DeepPartial<T> = {
  [K in keyof T]: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

type MyRequired<T> = {
  [K in keyof T]-?: T[K]
}

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

type DeepMutable<T> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K]
}

type DeepImmutable<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepImmutable<T[K]> : T[K]
}

type MyExclude<T, U> = T extends U ? never : T

type MyExtract<T, U> = T extends U ? T : never

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type PickByValueType<T, V> = Pick<T, { [K in keyof T]: T[K] extends V ? K : never }[keyof T]>

type OmitByValueType<T, V> = Pick<T, { [K in keyof T]: T[K] extends V ? never : K }[keyof T]>

type MyRecord<K extends keyof any, T> = {
  [P in K]: T
}

type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

type MyPromiseType<T extends Promise<any>> = T extends Promise<infer R> ? R : never

type MyInstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any

type FunctionParamType<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never

type ConstructorParamType<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never

type Nullish = null | undefined
type NoNullable<T> = T extends null ? never : T
type NoUndefined<T> = T extends undefined ? never : T

type RequiredKeys<T> = {
  [K in keyof T]: {} extends Pick<T, K> ? never : K
}[keyof T]

type OptionalKeys<T> = {
  [K in keyof T]: {} extends Pick<T, K> ? K : never
}[keyof T]

type FuntionTypeKeys<T extends object> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

type Equal<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B

type MutableKeys<T extends object> = {
  [K in keyof T]-?: Equal<{ [P in K]: T[P] }, { -readonly [P in K]: T[P] }, K, never>
}[keyof T]

type ImmutableKeys<T extends object> = {
  [K in keyof T]-?: Equal<{ [P in K]: T[P] }, { -readonly [P in K]: T[P] }, never, K>
}[keyof T]

type Primitive = string | number | bigint | boolean | symbol | null | undefined
const isPrimitive = (val: unknown): val is Primitive => {
  if (val === null || val === undefined) {
    return true
  }
  const primitiveTypes = ['string', 'number', 'bigint', 'boolean', 'symbol']
  return primitiveTypes.indexOf(typeof val) !== -1
}
