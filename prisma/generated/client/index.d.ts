
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model AnswerEvaluation
 * 
 */
export type AnswerEvaluation = $Result.DefaultSelection<Prisma.$AnswerEvaluationPayload>
/**
 * Model Interview
 * 
 */
export type Interview = $Result.DefaultSelection<Prisma.$InterviewPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.answerEvaluation`: Exposes CRUD operations for the **AnswerEvaluation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnswerEvaluations
    * const answerEvaluations = await prisma.answerEvaluation.findMany()
    * ```
    */
  get answerEvaluation(): Prisma.AnswerEvaluationDelegate<ExtArgs>;

  /**
   * `prisma.interview`: Exposes CRUD operations for the **Interview** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Interviews
    * const interviews = await prisma.interview.findMany()
    * ```
    */
  get interview(): Prisma.InterviewDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    AnswerEvaluation: 'AnswerEvaluation',
    Interview: 'Interview'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "answerEvaluation" | "interview"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      AnswerEvaluation: {
        payload: Prisma.$AnswerEvaluationPayload<ExtArgs>
        fields: Prisma.AnswerEvaluationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnswerEvaluationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerEvaluationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnswerEvaluationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerEvaluationPayload>
          }
          findFirst: {
            args: Prisma.AnswerEvaluationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerEvaluationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnswerEvaluationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerEvaluationPayload>
          }
          findMany: {
            args: Prisma.AnswerEvaluationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerEvaluationPayload>[]
          }
          create: {
            args: Prisma.AnswerEvaluationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerEvaluationPayload>
          }
          createMany: {
            args: Prisma.AnswerEvaluationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnswerEvaluationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerEvaluationPayload>[]
          }
          delete: {
            args: Prisma.AnswerEvaluationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerEvaluationPayload>
          }
          update: {
            args: Prisma.AnswerEvaluationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerEvaluationPayload>
          }
          deleteMany: {
            args: Prisma.AnswerEvaluationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnswerEvaluationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AnswerEvaluationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerEvaluationPayload>
          }
          aggregate: {
            args: Prisma.AnswerEvaluationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnswerEvaluation>
          }
          groupBy: {
            args: Prisma.AnswerEvaluationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnswerEvaluationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnswerEvaluationCountArgs<ExtArgs>
            result: $Utils.Optional<AnswerEvaluationCountAggregateOutputType> | number
          }
        }
      }
      Interview: {
        payload: Prisma.$InterviewPayload<ExtArgs>
        fields: Prisma.InterviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InterviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InterviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload>
          }
          findFirst: {
            args: Prisma.InterviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InterviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload>
          }
          findMany: {
            args: Prisma.InterviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload>[]
          }
          create: {
            args: Prisma.InterviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload>
          }
          createMany: {
            args: Prisma.InterviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InterviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload>[]
          }
          delete: {
            args: Prisma.InterviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload>
          }
          update: {
            args: Prisma.InterviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload>
          }
          deleteMany: {
            args: Prisma.InterviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InterviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InterviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterviewPayload>
          }
          aggregate: {
            args: Prisma.InterviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInterview>
          }
          groupBy: {
            args: Prisma.InterviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<InterviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.InterviewCountArgs<ExtArgs>
            result: $Utils.Optional<InterviewCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    interviews: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interviews?: boolean | UserCountOutputTypeCountInterviewsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInterviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewWhereInput
  }


  /**
   * Count Type InterviewCountOutputType
   */

  export type InterviewCountOutputType = {
    answerEvaluations: number
  }

  export type InterviewCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answerEvaluations?: boolean | InterviewCountOutputTypeCountAnswerEvaluationsArgs
  }

  // Custom InputTypes
  /**
   * InterviewCountOutputType without action
   */
  export type InterviewCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterviewCountOutputType
     */
    select?: InterviewCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InterviewCountOutputType without action
   */
  export type InterviewCountOutputTypeCountAnswerEvaluationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnswerEvaluationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    jobRole: string | null
    experienceLevel: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    jobRole: string | null
    experienceLevel: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    name: number
    jobRole: number
    experienceLevel: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    jobRole?: true
    experienceLevel?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    jobRole?: true
    experienceLevel?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    jobRole?: true
    experienceLevel?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    name: string
    jobRole: string | null
    experienceLevel: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    jobRole?: boolean
    experienceLevel?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    interviews?: boolean | User$interviewsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    jobRole?: boolean
    experienceLevel?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    jobRole?: boolean
    experienceLevel?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interviews?: boolean | User$interviewsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      interviews: Prisma.$InterviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      name: string
      jobRole: string | null
      experienceLevel: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    interviews<T extends User$interviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$interviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly jobRole: FieldRef<"User", 'String'>
    readonly experienceLevel: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.interviews
   */
  export type User$interviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    where?: InterviewWhereInput
    orderBy?: InterviewOrderByWithRelationInput | InterviewOrderByWithRelationInput[]
    cursor?: InterviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InterviewScalarFieldEnum | InterviewScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model AnswerEvaluation
   */

  export type AggregateAnswerEvaluation = {
    _count: AnswerEvaluationCountAggregateOutputType | null
    _avg: AnswerEvaluationAvgAggregateOutputType | null
    _sum: AnswerEvaluationSumAggregateOutputType | null
    _min: AnswerEvaluationMinAggregateOutputType | null
    _max: AnswerEvaluationMaxAggregateOutputType | null
  }

  export type AnswerEvaluationAvgAggregateOutputType = {
    clarityScore: number | null
    depthScore: number | null
    relevanceScore: number | null
  }

  export type AnswerEvaluationSumAggregateOutputType = {
    clarityScore: number | null
    depthScore: number | null
    relevanceScore: number | null
  }

  export type AnswerEvaluationMinAggregateOutputType = {
    id: string | null
    interviewId: string | null
    questionText: string | null
    answerText: string | null
    evaluation: string | null
    clarityScore: number | null
    depthScore: number | null
    relevanceScore: number | null
    reasoning: string | null
    topicDiscussed: string | null
    createdAt: Date | null
  }

  export type AnswerEvaluationMaxAggregateOutputType = {
    id: string | null
    interviewId: string | null
    questionText: string | null
    answerText: string | null
    evaluation: string | null
    clarityScore: number | null
    depthScore: number | null
    relevanceScore: number | null
    reasoning: string | null
    topicDiscussed: string | null
    createdAt: Date | null
  }

  export type AnswerEvaluationCountAggregateOutputType = {
    id: number
    interviewId: number
    questionText: number
    answerText: number
    evaluation: number
    clarityScore: number
    depthScore: number
    relevanceScore: number
    reasoning: number
    topicDiscussed: number
    createdAt: number
    _all: number
  }


  export type AnswerEvaluationAvgAggregateInputType = {
    clarityScore?: true
    depthScore?: true
    relevanceScore?: true
  }

  export type AnswerEvaluationSumAggregateInputType = {
    clarityScore?: true
    depthScore?: true
    relevanceScore?: true
  }

  export type AnswerEvaluationMinAggregateInputType = {
    id?: true
    interviewId?: true
    questionText?: true
    answerText?: true
    evaluation?: true
    clarityScore?: true
    depthScore?: true
    relevanceScore?: true
    reasoning?: true
    topicDiscussed?: true
    createdAt?: true
  }

  export type AnswerEvaluationMaxAggregateInputType = {
    id?: true
    interviewId?: true
    questionText?: true
    answerText?: true
    evaluation?: true
    clarityScore?: true
    depthScore?: true
    relevanceScore?: true
    reasoning?: true
    topicDiscussed?: true
    createdAt?: true
  }

  export type AnswerEvaluationCountAggregateInputType = {
    id?: true
    interviewId?: true
    questionText?: true
    answerText?: true
    evaluation?: true
    clarityScore?: true
    depthScore?: true
    relevanceScore?: true
    reasoning?: true
    topicDiscussed?: true
    createdAt?: true
    _all?: true
  }

  export type AnswerEvaluationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnswerEvaluation to aggregate.
     */
    where?: AnswerEvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnswerEvaluations to fetch.
     */
    orderBy?: AnswerEvaluationOrderByWithRelationInput | AnswerEvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnswerEvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnswerEvaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnswerEvaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnswerEvaluations
    **/
    _count?: true | AnswerEvaluationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnswerEvaluationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnswerEvaluationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnswerEvaluationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnswerEvaluationMaxAggregateInputType
  }

  export type GetAnswerEvaluationAggregateType<T extends AnswerEvaluationAggregateArgs> = {
        [P in keyof T & keyof AggregateAnswerEvaluation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnswerEvaluation[P]>
      : GetScalarType<T[P], AggregateAnswerEvaluation[P]>
  }




  export type AnswerEvaluationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnswerEvaluationWhereInput
    orderBy?: AnswerEvaluationOrderByWithAggregationInput | AnswerEvaluationOrderByWithAggregationInput[]
    by: AnswerEvaluationScalarFieldEnum[] | AnswerEvaluationScalarFieldEnum
    having?: AnswerEvaluationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnswerEvaluationCountAggregateInputType | true
    _avg?: AnswerEvaluationAvgAggregateInputType
    _sum?: AnswerEvaluationSumAggregateInputType
    _min?: AnswerEvaluationMinAggregateInputType
    _max?: AnswerEvaluationMaxAggregateInputType
  }

  export type AnswerEvaluationGroupByOutputType = {
    id: string
    interviewId: string
    questionText: string
    answerText: string
    evaluation: string
    clarityScore: number
    depthScore: number
    relevanceScore: number
    reasoning: string
    topicDiscussed: string
    createdAt: Date
    _count: AnswerEvaluationCountAggregateOutputType | null
    _avg: AnswerEvaluationAvgAggregateOutputType | null
    _sum: AnswerEvaluationSumAggregateOutputType | null
    _min: AnswerEvaluationMinAggregateOutputType | null
    _max: AnswerEvaluationMaxAggregateOutputType | null
  }

  type GetAnswerEvaluationGroupByPayload<T extends AnswerEvaluationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnswerEvaluationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnswerEvaluationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnswerEvaluationGroupByOutputType[P]>
            : GetScalarType<T[P], AnswerEvaluationGroupByOutputType[P]>
        }
      >
    >


  export type AnswerEvaluationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    interviewId?: boolean
    questionText?: boolean
    answerText?: boolean
    evaluation?: boolean
    clarityScore?: boolean
    depthScore?: boolean
    relevanceScore?: boolean
    reasoning?: boolean
    topicDiscussed?: boolean
    createdAt?: boolean
    interview?: boolean | InterviewDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["answerEvaluation"]>

  export type AnswerEvaluationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    interviewId?: boolean
    questionText?: boolean
    answerText?: boolean
    evaluation?: boolean
    clarityScore?: boolean
    depthScore?: boolean
    relevanceScore?: boolean
    reasoning?: boolean
    topicDiscussed?: boolean
    createdAt?: boolean
    interview?: boolean | InterviewDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["answerEvaluation"]>

  export type AnswerEvaluationSelectScalar = {
    id?: boolean
    interviewId?: boolean
    questionText?: boolean
    answerText?: boolean
    evaluation?: boolean
    clarityScore?: boolean
    depthScore?: boolean
    relevanceScore?: boolean
    reasoning?: boolean
    topicDiscussed?: boolean
    createdAt?: boolean
  }

  export type AnswerEvaluationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interview?: boolean | InterviewDefaultArgs<ExtArgs>
  }
  export type AnswerEvaluationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interview?: boolean | InterviewDefaultArgs<ExtArgs>
  }

  export type $AnswerEvaluationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnswerEvaluation"
    objects: {
      interview: Prisma.$InterviewPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      interviewId: string
      questionText: string
      answerText: string
      evaluation: string
      clarityScore: number
      depthScore: number
      relevanceScore: number
      reasoning: string
      topicDiscussed: string
      createdAt: Date
    }, ExtArgs["result"]["answerEvaluation"]>
    composites: {}
  }

  type AnswerEvaluationGetPayload<S extends boolean | null | undefined | AnswerEvaluationDefaultArgs> = $Result.GetResult<Prisma.$AnswerEvaluationPayload, S>

  type AnswerEvaluationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AnswerEvaluationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AnswerEvaluationCountAggregateInputType | true
    }

  export interface AnswerEvaluationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnswerEvaluation'], meta: { name: 'AnswerEvaluation' } }
    /**
     * Find zero or one AnswerEvaluation that matches the filter.
     * @param {AnswerEvaluationFindUniqueArgs} args - Arguments to find a AnswerEvaluation
     * @example
     * // Get one AnswerEvaluation
     * const answerEvaluation = await prisma.answerEvaluation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnswerEvaluationFindUniqueArgs>(args: SelectSubset<T, AnswerEvaluationFindUniqueArgs<ExtArgs>>): Prisma__AnswerEvaluationClient<$Result.GetResult<Prisma.$AnswerEvaluationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AnswerEvaluation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AnswerEvaluationFindUniqueOrThrowArgs} args - Arguments to find a AnswerEvaluation
     * @example
     * // Get one AnswerEvaluation
     * const answerEvaluation = await prisma.answerEvaluation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnswerEvaluationFindUniqueOrThrowArgs>(args: SelectSubset<T, AnswerEvaluationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnswerEvaluationClient<$Result.GetResult<Prisma.$AnswerEvaluationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AnswerEvaluation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerEvaluationFindFirstArgs} args - Arguments to find a AnswerEvaluation
     * @example
     * // Get one AnswerEvaluation
     * const answerEvaluation = await prisma.answerEvaluation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnswerEvaluationFindFirstArgs>(args?: SelectSubset<T, AnswerEvaluationFindFirstArgs<ExtArgs>>): Prisma__AnswerEvaluationClient<$Result.GetResult<Prisma.$AnswerEvaluationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AnswerEvaluation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerEvaluationFindFirstOrThrowArgs} args - Arguments to find a AnswerEvaluation
     * @example
     * // Get one AnswerEvaluation
     * const answerEvaluation = await prisma.answerEvaluation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnswerEvaluationFindFirstOrThrowArgs>(args?: SelectSubset<T, AnswerEvaluationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnswerEvaluationClient<$Result.GetResult<Prisma.$AnswerEvaluationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AnswerEvaluations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerEvaluationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnswerEvaluations
     * const answerEvaluations = await prisma.answerEvaluation.findMany()
     * 
     * // Get first 10 AnswerEvaluations
     * const answerEvaluations = await prisma.answerEvaluation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const answerEvaluationWithIdOnly = await prisma.answerEvaluation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnswerEvaluationFindManyArgs>(args?: SelectSubset<T, AnswerEvaluationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerEvaluationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AnswerEvaluation.
     * @param {AnswerEvaluationCreateArgs} args - Arguments to create a AnswerEvaluation.
     * @example
     * // Create one AnswerEvaluation
     * const AnswerEvaluation = await prisma.answerEvaluation.create({
     *   data: {
     *     // ... data to create a AnswerEvaluation
     *   }
     * })
     * 
     */
    create<T extends AnswerEvaluationCreateArgs>(args: SelectSubset<T, AnswerEvaluationCreateArgs<ExtArgs>>): Prisma__AnswerEvaluationClient<$Result.GetResult<Prisma.$AnswerEvaluationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AnswerEvaluations.
     * @param {AnswerEvaluationCreateManyArgs} args - Arguments to create many AnswerEvaluations.
     * @example
     * // Create many AnswerEvaluations
     * const answerEvaluation = await prisma.answerEvaluation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnswerEvaluationCreateManyArgs>(args?: SelectSubset<T, AnswerEvaluationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnswerEvaluations and returns the data saved in the database.
     * @param {AnswerEvaluationCreateManyAndReturnArgs} args - Arguments to create many AnswerEvaluations.
     * @example
     * // Create many AnswerEvaluations
     * const answerEvaluation = await prisma.answerEvaluation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnswerEvaluations and only return the `id`
     * const answerEvaluationWithIdOnly = await prisma.answerEvaluation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnswerEvaluationCreateManyAndReturnArgs>(args?: SelectSubset<T, AnswerEvaluationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerEvaluationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AnswerEvaluation.
     * @param {AnswerEvaluationDeleteArgs} args - Arguments to delete one AnswerEvaluation.
     * @example
     * // Delete one AnswerEvaluation
     * const AnswerEvaluation = await prisma.answerEvaluation.delete({
     *   where: {
     *     // ... filter to delete one AnswerEvaluation
     *   }
     * })
     * 
     */
    delete<T extends AnswerEvaluationDeleteArgs>(args: SelectSubset<T, AnswerEvaluationDeleteArgs<ExtArgs>>): Prisma__AnswerEvaluationClient<$Result.GetResult<Prisma.$AnswerEvaluationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AnswerEvaluation.
     * @param {AnswerEvaluationUpdateArgs} args - Arguments to update one AnswerEvaluation.
     * @example
     * // Update one AnswerEvaluation
     * const answerEvaluation = await prisma.answerEvaluation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnswerEvaluationUpdateArgs>(args: SelectSubset<T, AnswerEvaluationUpdateArgs<ExtArgs>>): Prisma__AnswerEvaluationClient<$Result.GetResult<Prisma.$AnswerEvaluationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AnswerEvaluations.
     * @param {AnswerEvaluationDeleteManyArgs} args - Arguments to filter AnswerEvaluations to delete.
     * @example
     * // Delete a few AnswerEvaluations
     * const { count } = await prisma.answerEvaluation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnswerEvaluationDeleteManyArgs>(args?: SelectSubset<T, AnswerEvaluationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnswerEvaluations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerEvaluationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnswerEvaluations
     * const answerEvaluation = await prisma.answerEvaluation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnswerEvaluationUpdateManyArgs>(args: SelectSubset<T, AnswerEvaluationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AnswerEvaluation.
     * @param {AnswerEvaluationUpsertArgs} args - Arguments to update or create a AnswerEvaluation.
     * @example
     * // Update or create a AnswerEvaluation
     * const answerEvaluation = await prisma.answerEvaluation.upsert({
     *   create: {
     *     // ... data to create a AnswerEvaluation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnswerEvaluation we want to update
     *   }
     * })
     */
    upsert<T extends AnswerEvaluationUpsertArgs>(args: SelectSubset<T, AnswerEvaluationUpsertArgs<ExtArgs>>): Prisma__AnswerEvaluationClient<$Result.GetResult<Prisma.$AnswerEvaluationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AnswerEvaluations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerEvaluationCountArgs} args - Arguments to filter AnswerEvaluations to count.
     * @example
     * // Count the number of AnswerEvaluations
     * const count = await prisma.answerEvaluation.count({
     *   where: {
     *     // ... the filter for the AnswerEvaluations we want to count
     *   }
     * })
    **/
    count<T extends AnswerEvaluationCountArgs>(
      args?: Subset<T, AnswerEvaluationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnswerEvaluationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnswerEvaluation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerEvaluationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnswerEvaluationAggregateArgs>(args: Subset<T, AnswerEvaluationAggregateArgs>): Prisma.PrismaPromise<GetAnswerEvaluationAggregateType<T>>

    /**
     * Group by AnswerEvaluation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerEvaluationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnswerEvaluationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnswerEvaluationGroupByArgs['orderBy'] }
        : { orderBy?: AnswerEvaluationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnswerEvaluationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnswerEvaluationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnswerEvaluation model
   */
  readonly fields: AnswerEvaluationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnswerEvaluation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnswerEvaluationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    interview<T extends InterviewDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InterviewDefaultArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AnswerEvaluation model
   */ 
  interface AnswerEvaluationFieldRefs {
    readonly id: FieldRef<"AnswerEvaluation", 'String'>
    readonly interviewId: FieldRef<"AnswerEvaluation", 'String'>
    readonly questionText: FieldRef<"AnswerEvaluation", 'String'>
    readonly answerText: FieldRef<"AnswerEvaluation", 'String'>
    readonly evaluation: FieldRef<"AnswerEvaluation", 'String'>
    readonly clarityScore: FieldRef<"AnswerEvaluation", 'Int'>
    readonly depthScore: FieldRef<"AnswerEvaluation", 'Int'>
    readonly relevanceScore: FieldRef<"AnswerEvaluation", 'Int'>
    readonly reasoning: FieldRef<"AnswerEvaluation", 'String'>
    readonly topicDiscussed: FieldRef<"AnswerEvaluation", 'String'>
    readonly createdAt: FieldRef<"AnswerEvaluation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnswerEvaluation findUnique
   */
  export type AnswerEvaluationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerEvaluation
     */
    select?: AnswerEvaluationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which AnswerEvaluation to fetch.
     */
    where: AnswerEvaluationWhereUniqueInput
  }

  /**
   * AnswerEvaluation findUniqueOrThrow
   */
  export type AnswerEvaluationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerEvaluation
     */
    select?: AnswerEvaluationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which AnswerEvaluation to fetch.
     */
    where: AnswerEvaluationWhereUniqueInput
  }

  /**
   * AnswerEvaluation findFirst
   */
  export type AnswerEvaluationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerEvaluation
     */
    select?: AnswerEvaluationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which AnswerEvaluation to fetch.
     */
    where?: AnswerEvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnswerEvaluations to fetch.
     */
    orderBy?: AnswerEvaluationOrderByWithRelationInput | AnswerEvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnswerEvaluations.
     */
    cursor?: AnswerEvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnswerEvaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnswerEvaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnswerEvaluations.
     */
    distinct?: AnswerEvaluationScalarFieldEnum | AnswerEvaluationScalarFieldEnum[]
  }

  /**
   * AnswerEvaluation findFirstOrThrow
   */
  export type AnswerEvaluationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerEvaluation
     */
    select?: AnswerEvaluationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which AnswerEvaluation to fetch.
     */
    where?: AnswerEvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnswerEvaluations to fetch.
     */
    orderBy?: AnswerEvaluationOrderByWithRelationInput | AnswerEvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnswerEvaluations.
     */
    cursor?: AnswerEvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnswerEvaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnswerEvaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnswerEvaluations.
     */
    distinct?: AnswerEvaluationScalarFieldEnum | AnswerEvaluationScalarFieldEnum[]
  }

  /**
   * AnswerEvaluation findMany
   */
  export type AnswerEvaluationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerEvaluation
     */
    select?: AnswerEvaluationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerEvaluationInclude<ExtArgs> | null
    /**
     * Filter, which AnswerEvaluations to fetch.
     */
    where?: AnswerEvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnswerEvaluations to fetch.
     */
    orderBy?: AnswerEvaluationOrderByWithRelationInput | AnswerEvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnswerEvaluations.
     */
    cursor?: AnswerEvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnswerEvaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnswerEvaluations.
     */
    skip?: number
    distinct?: AnswerEvaluationScalarFieldEnum | AnswerEvaluationScalarFieldEnum[]
  }

  /**
   * AnswerEvaluation create
   */
  export type AnswerEvaluationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerEvaluation
     */
    select?: AnswerEvaluationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerEvaluationInclude<ExtArgs> | null
    /**
     * The data needed to create a AnswerEvaluation.
     */
    data: XOR<AnswerEvaluationCreateInput, AnswerEvaluationUncheckedCreateInput>
  }

  /**
   * AnswerEvaluation createMany
   */
  export type AnswerEvaluationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnswerEvaluations.
     */
    data: AnswerEvaluationCreateManyInput | AnswerEvaluationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnswerEvaluation createManyAndReturn
   */
  export type AnswerEvaluationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerEvaluation
     */
    select?: AnswerEvaluationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AnswerEvaluations.
     */
    data: AnswerEvaluationCreateManyInput | AnswerEvaluationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerEvaluationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnswerEvaluation update
   */
  export type AnswerEvaluationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerEvaluation
     */
    select?: AnswerEvaluationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerEvaluationInclude<ExtArgs> | null
    /**
     * The data needed to update a AnswerEvaluation.
     */
    data: XOR<AnswerEvaluationUpdateInput, AnswerEvaluationUncheckedUpdateInput>
    /**
     * Choose, which AnswerEvaluation to update.
     */
    where: AnswerEvaluationWhereUniqueInput
  }

  /**
   * AnswerEvaluation updateMany
   */
  export type AnswerEvaluationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnswerEvaluations.
     */
    data: XOR<AnswerEvaluationUpdateManyMutationInput, AnswerEvaluationUncheckedUpdateManyInput>
    /**
     * Filter which AnswerEvaluations to update
     */
    where?: AnswerEvaluationWhereInput
  }

  /**
   * AnswerEvaluation upsert
   */
  export type AnswerEvaluationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerEvaluation
     */
    select?: AnswerEvaluationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerEvaluationInclude<ExtArgs> | null
    /**
     * The filter to search for the AnswerEvaluation to update in case it exists.
     */
    where: AnswerEvaluationWhereUniqueInput
    /**
     * In case the AnswerEvaluation found by the `where` argument doesn't exist, create a new AnswerEvaluation with this data.
     */
    create: XOR<AnswerEvaluationCreateInput, AnswerEvaluationUncheckedCreateInput>
    /**
     * In case the AnswerEvaluation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnswerEvaluationUpdateInput, AnswerEvaluationUncheckedUpdateInput>
  }

  /**
   * AnswerEvaluation delete
   */
  export type AnswerEvaluationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerEvaluation
     */
    select?: AnswerEvaluationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerEvaluationInclude<ExtArgs> | null
    /**
     * Filter which AnswerEvaluation to delete.
     */
    where: AnswerEvaluationWhereUniqueInput
  }

  /**
   * AnswerEvaluation deleteMany
   */
  export type AnswerEvaluationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnswerEvaluations to delete
     */
    where?: AnswerEvaluationWhereInput
  }

  /**
   * AnswerEvaluation without action
   */
  export type AnswerEvaluationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerEvaluation
     */
    select?: AnswerEvaluationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerEvaluationInclude<ExtArgs> | null
  }


  /**
   * Model Interview
   */

  export type AggregateInterview = {
    _count: InterviewCountAggregateOutputType | null
    _avg: InterviewAvgAggregateOutputType | null
    _sum: InterviewSumAggregateOutputType | null
    _min: InterviewMinAggregateOutputType | null
    _max: InterviewMaxAggregateOutputType | null
  }

  export type InterviewAvgAggregateOutputType = {
    difficulty: number | null
    consecutiveWeakCount: number | null
  }

  export type InterviewSumAggregateOutputType = {
    difficulty: number | null
    consecutiveWeakCount: number | null
  }

  export type InterviewMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    status: string | null
    difficulty: number | null
    consecutiveWeakCount: number | null
    startedAt: Date | null
    endedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    lastActivityAt: Date | null
  }

  export type InterviewMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    status: string | null
    difficulty: number | null
    consecutiveWeakCount: number | null
    startedAt: Date | null
    endedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    lastActivityAt: Date | null
  }

  export type InterviewCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    status: number
    transcript: number
    feedback: number
    topicsCovered: number
    difficulty: number
    consecutiveWeakCount: number
    startedAt: number
    endedAt: number
    createdAt: number
    updatedAt: number
    lastActivityAt: number
    _all: number
  }


  export type InterviewAvgAggregateInputType = {
    difficulty?: true
    consecutiveWeakCount?: true
  }

  export type InterviewSumAggregateInputType = {
    difficulty?: true
    consecutiveWeakCount?: true
  }

  export type InterviewMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    status?: true
    difficulty?: true
    consecutiveWeakCount?: true
    startedAt?: true
    endedAt?: true
    createdAt?: true
    updatedAt?: true
    lastActivityAt?: true
  }

  export type InterviewMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    status?: true
    difficulty?: true
    consecutiveWeakCount?: true
    startedAt?: true
    endedAt?: true
    createdAt?: true
    updatedAt?: true
    lastActivityAt?: true
  }

  export type InterviewCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    status?: true
    transcript?: true
    feedback?: true
    topicsCovered?: true
    difficulty?: true
    consecutiveWeakCount?: true
    startedAt?: true
    endedAt?: true
    createdAt?: true
    updatedAt?: true
    lastActivityAt?: true
    _all?: true
  }

  export type InterviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Interview to aggregate.
     */
    where?: InterviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Interviews to fetch.
     */
    orderBy?: InterviewOrderByWithRelationInput | InterviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InterviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Interviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Interviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Interviews
    **/
    _count?: true | InterviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InterviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InterviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InterviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InterviewMaxAggregateInputType
  }

  export type GetInterviewAggregateType<T extends InterviewAggregateArgs> = {
        [P in keyof T & keyof AggregateInterview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInterview[P]>
      : GetScalarType<T[P], AggregateInterview[P]>
  }




  export type InterviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterviewWhereInput
    orderBy?: InterviewOrderByWithAggregationInput | InterviewOrderByWithAggregationInput[]
    by: InterviewScalarFieldEnum[] | InterviewScalarFieldEnum
    having?: InterviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InterviewCountAggregateInputType | true
    _avg?: InterviewAvgAggregateInputType
    _sum?: InterviewSumAggregateInputType
    _min?: InterviewMinAggregateInputType
    _max?: InterviewMaxAggregateInputType
  }

  export type InterviewGroupByOutputType = {
    id: string
    userId: string
    type: string
    status: string
    transcript: JsonValue | null
    feedback: JsonValue | null
    topicsCovered: JsonValue | null
    difficulty: number
    consecutiveWeakCount: number
    startedAt: Date
    endedAt: Date | null
    createdAt: Date
    updatedAt: Date
    lastActivityAt: Date
    _count: InterviewCountAggregateOutputType | null
    _avg: InterviewAvgAggregateOutputType | null
    _sum: InterviewSumAggregateOutputType | null
    _min: InterviewMinAggregateOutputType | null
    _max: InterviewMaxAggregateOutputType | null
  }

  type GetInterviewGroupByPayload<T extends InterviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InterviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InterviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InterviewGroupByOutputType[P]>
            : GetScalarType<T[P], InterviewGroupByOutputType[P]>
        }
      >
    >


  export type InterviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    status?: boolean
    transcript?: boolean
    feedback?: boolean
    topicsCovered?: boolean
    difficulty?: boolean
    consecutiveWeakCount?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastActivityAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    answerEvaluations?: boolean | Interview$answerEvaluationsArgs<ExtArgs>
    _count?: boolean | InterviewCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interview"]>

  export type InterviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    status?: boolean
    transcript?: boolean
    feedback?: boolean
    topicsCovered?: boolean
    difficulty?: boolean
    consecutiveWeakCount?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastActivityAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interview"]>

  export type InterviewSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    status?: boolean
    transcript?: boolean
    feedback?: boolean
    topicsCovered?: boolean
    difficulty?: boolean
    consecutiveWeakCount?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastActivityAt?: boolean
  }

  export type InterviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    answerEvaluations?: boolean | Interview$answerEvaluationsArgs<ExtArgs>
    _count?: boolean | InterviewCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InterviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $InterviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Interview"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      answerEvaluations: Prisma.$AnswerEvaluationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      status: string
      transcript: Prisma.JsonValue | null
      feedback: Prisma.JsonValue | null
      topicsCovered: Prisma.JsonValue | null
      difficulty: number
      consecutiveWeakCount: number
      startedAt: Date
      endedAt: Date | null
      createdAt: Date
      updatedAt: Date
      lastActivityAt: Date
    }, ExtArgs["result"]["interview"]>
    composites: {}
  }

  type InterviewGetPayload<S extends boolean | null | undefined | InterviewDefaultArgs> = $Result.GetResult<Prisma.$InterviewPayload, S>

  type InterviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InterviewFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InterviewCountAggregateInputType | true
    }

  export interface InterviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Interview'], meta: { name: 'Interview' } }
    /**
     * Find zero or one Interview that matches the filter.
     * @param {InterviewFindUniqueArgs} args - Arguments to find a Interview
     * @example
     * // Get one Interview
     * const interview = await prisma.interview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InterviewFindUniqueArgs>(args: SelectSubset<T, InterviewFindUniqueArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Interview that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InterviewFindUniqueOrThrowArgs} args - Arguments to find a Interview
     * @example
     * // Get one Interview
     * const interview = await prisma.interview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InterviewFindUniqueOrThrowArgs>(args: SelectSubset<T, InterviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Interview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewFindFirstArgs} args - Arguments to find a Interview
     * @example
     * // Get one Interview
     * const interview = await prisma.interview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InterviewFindFirstArgs>(args?: SelectSubset<T, InterviewFindFirstArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Interview that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewFindFirstOrThrowArgs} args - Arguments to find a Interview
     * @example
     * // Get one Interview
     * const interview = await prisma.interview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InterviewFindFirstOrThrowArgs>(args?: SelectSubset<T, InterviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Interviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Interviews
     * const interviews = await prisma.interview.findMany()
     * 
     * // Get first 10 Interviews
     * const interviews = await prisma.interview.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const interviewWithIdOnly = await prisma.interview.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InterviewFindManyArgs>(args?: SelectSubset<T, InterviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Interview.
     * @param {InterviewCreateArgs} args - Arguments to create a Interview.
     * @example
     * // Create one Interview
     * const Interview = await prisma.interview.create({
     *   data: {
     *     // ... data to create a Interview
     *   }
     * })
     * 
     */
    create<T extends InterviewCreateArgs>(args: SelectSubset<T, InterviewCreateArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Interviews.
     * @param {InterviewCreateManyArgs} args - Arguments to create many Interviews.
     * @example
     * // Create many Interviews
     * const interview = await prisma.interview.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InterviewCreateManyArgs>(args?: SelectSubset<T, InterviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Interviews and returns the data saved in the database.
     * @param {InterviewCreateManyAndReturnArgs} args - Arguments to create many Interviews.
     * @example
     * // Create many Interviews
     * const interview = await prisma.interview.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Interviews and only return the `id`
     * const interviewWithIdOnly = await prisma.interview.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InterviewCreateManyAndReturnArgs>(args?: SelectSubset<T, InterviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Interview.
     * @param {InterviewDeleteArgs} args - Arguments to delete one Interview.
     * @example
     * // Delete one Interview
     * const Interview = await prisma.interview.delete({
     *   where: {
     *     // ... filter to delete one Interview
     *   }
     * })
     * 
     */
    delete<T extends InterviewDeleteArgs>(args: SelectSubset<T, InterviewDeleteArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Interview.
     * @param {InterviewUpdateArgs} args - Arguments to update one Interview.
     * @example
     * // Update one Interview
     * const interview = await prisma.interview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InterviewUpdateArgs>(args: SelectSubset<T, InterviewUpdateArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Interviews.
     * @param {InterviewDeleteManyArgs} args - Arguments to filter Interviews to delete.
     * @example
     * // Delete a few Interviews
     * const { count } = await prisma.interview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InterviewDeleteManyArgs>(args?: SelectSubset<T, InterviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Interviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Interviews
     * const interview = await prisma.interview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InterviewUpdateManyArgs>(args: SelectSubset<T, InterviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Interview.
     * @param {InterviewUpsertArgs} args - Arguments to update or create a Interview.
     * @example
     * // Update or create a Interview
     * const interview = await prisma.interview.upsert({
     *   create: {
     *     // ... data to create a Interview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Interview we want to update
     *   }
     * })
     */
    upsert<T extends InterviewUpsertArgs>(args: SelectSubset<T, InterviewUpsertArgs<ExtArgs>>): Prisma__InterviewClient<$Result.GetResult<Prisma.$InterviewPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Interviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewCountArgs} args - Arguments to filter Interviews to count.
     * @example
     * // Count the number of Interviews
     * const count = await prisma.interview.count({
     *   where: {
     *     // ... the filter for the Interviews we want to count
     *   }
     * })
    **/
    count<T extends InterviewCountArgs>(
      args?: Subset<T, InterviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InterviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Interview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InterviewAggregateArgs>(args: Subset<T, InterviewAggregateArgs>): Prisma.PrismaPromise<GetInterviewAggregateType<T>>

    /**
     * Group by Interview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InterviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InterviewGroupByArgs['orderBy'] }
        : { orderBy?: InterviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InterviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInterviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Interview model
   */
  readonly fields: InterviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Interview.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InterviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    answerEvaluations<T extends Interview$answerEvaluationsArgs<ExtArgs> = {}>(args?: Subset<T, Interview$answerEvaluationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerEvaluationPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Interview model
   */ 
  interface InterviewFieldRefs {
    readonly id: FieldRef<"Interview", 'String'>
    readonly userId: FieldRef<"Interview", 'String'>
    readonly type: FieldRef<"Interview", 'String'>
    readonly status: FieldRef<"Interview", 'String'>
    readonly transcript: FieldRef<"Interview", 'Json'>
    readonly feedback: FieldRef<"Interview", 'Json'>
    readonly topicsCovered: FieldRef<"Interview", 'Json'>
    readonly difficulty: FieldRef<"Interview", 'Int'>
    readonly consecutiveWeakCount: FieldRef<"Interview", 'Int'>
    readonly startedAt: FieldRef<"Interview", 'DateTime'>
    readonly endedAt: FieldRef<"Interview", 'DateTime'>
    readonly createdAt: FieldRef<"Interview", 'DateTime'>
    readonly updatedAt: FieldRef<"Interview", 'DateTime'>
    readonly lastActivityAt: FieldRef<"Interview", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Interview findUnique
   */
  export type InterviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * Filter, which Interview to fetch.
     */
    where: InterviewWhereUniqueInput
  }

  /**
   * Interview findUniqueOrThrow
   */
  export type InterviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * Filter, which Interview to fetch.
     */
    where: InterviewWhereUniqueInput
  }

  /**
   * Interview findFirst
   */
  export type InterviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * Filter, which Interview to fetch.
     */
    where?: InterviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Interviews to fetch.
     */
    orderBy?: InterviewOrderByWithRelationInput | InterviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Interviews.
     */
    cursor?: InterviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Interviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Interviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Interviews.
     */
    distinct?: InterviewScalarFieldEnum | InterviewScalarFieldEnum[]
  }

  /**
   * Interview findFirstOrThrow
   */
  export type InterviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * Filter, which Interview to fetch.
     */
    where?: InterviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Interviews to fetch.
     */
    orderBy?: InterviewOrderByWithRelationInput | InterviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Interviews.
     */
    cursor?: InterviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Interviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Interviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Interviews.
     */
    distinct?: InterviewScalarFieldEnum | InterviewScalarFieldEnum[]
  }

  /**
   * Interview findMany
   */
  export type InterviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * Filter, which Interviews to fetch.
     */
    where?: InterviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Interviews to fetch.
     */
    orderBy?: InterviewOrderByWithRelationInput | InterviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Interviews.
     */
    cursor?: InterviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Interviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Interviews.
     */
    skip?: number
    distinct?: InterviewScalarFieldEnum | InterviewScalarFieldEnum[]
  }

  /**
   * Interview create
   */
  export type InterviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Interview.
     */
    data: XOR<InterviewCreateInput, InterviewUncheckedCreateInput>
  }

  /**
   * Interview createMany
   */
  export type InterviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Interviews.
     */
    data: InterviewCreateManyInput | InterviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Interview createManyAndReturn
   */
  export type InterviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Interviews.
     */
    data: InterviewCreateManyInput | InterviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Interview update
   */
  export type InterviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Interview.
     */
    data: XOR<InterviewUpdateInput, InterviewUncheckedUpdateInput>
    /**
     * Choose, which Interview to update.
     */
    where: InterviewWhereUniqueInput
  }

  /**
   * Interview updateMany
   */
  export type InterviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Interviews.
     */
    data: XOR<InterviewUpdateManyMutationInput, InterviewUncheckedUpdateManyInput>
    /**
     * Filter which Interviews to update
     */
    where?: InterviewWhereInput
  }

  /**
   * Interview upsert
   */
  export type InterviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Interview to update in case it exists.
     */
    where: InterviewWhereUniqueInput
    /**
     * In case the Interview found by the `where` argument doesn't exist, create a new Interview with this data.
     */
    create: XOR<InterviewCreateInput, InterviewUncheckedCreateInput>
    /**
     * In case the Interview was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InterviewUpdateInput, InterviewUncheckedUpdateInput>
  }

  /**
   * Interview delete
   */
  export type InterviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
    /**
     * Filter which Interview to delete.
     */
    where: InterviewWhereUniqueInput
  }

  /**
   * Interview deleteMany
   */
  export type InterviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Interviews to delete
     */
    where?: InterviewWhereInput
  }

  /**
   * Interview.answerEvaluations
   */
  export type Interview$answerEvaluationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerEvaluation
     */
    select?: AnswerEvaluationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerEvaluationInclude<ExtArgs> | null
    where?: AnswerEvaluationWhereInput
    orderBy?: AnswerEvaluationOrderByWithRelationInput | AnswerEvaluationOrderByWithRelationInput[]
    cursor?: AnswerEvaluationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnswerEvaluationScalarFieldEnum | AnswerEvaluationScalarFieldEnum[]
  }

  /**
   * Interview without action
   */
  export type InterviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interview
     */
    select?: InterviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterviewInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    name: 'name',
    jobRole: 'jobRole',
    experienceLevel: 'experienceLevel',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AnswerEvaluationScalarFieldEnum: {
    id: 'id',
    interviewId: 'interviewId',
    questionText: 'questionText',
    answerText: 'answerText',
    evaluation: 'evaluation',
    clarityScore: 'clarityScore',
    depthScore: 'depthScore',
    relevanceScore: 'relevanceScore',
    reasoning: 'reasoning',
    topicDiscussed: 'topicDiscussed',
    createdAt: 'createdAt'
  };

  export type AnswerEvaluationScalarFieldEnum = (typeof AnswerEvaluationScalarFieldEnum)[keyof typeof AnswerEvaluationScalarFieldEnum]


  export const InterviewScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    status: 'status',
    transcript: 'transcript',
    feedback: 'feedback',
    topicsCovered: 'topicsCovered',
    difficulty: 'difficulty',
    consecutiveWeakCount: 'consecutiveWeakCount',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastActivityAt: 'lastActivityAt'
  };

  export type InterviewScalarFieldEnum = (typeof InterviewScalarFieldEnum)[keyof typeof InterviewScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    jobRole?: StringNullableFilter<"User"> | string | null
    experienceLevel?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    interviews?: InterviewListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    jobRole?: SortOrderInput | SortOrder
    experienceLevel?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    interviews?: InterviewOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    jobRole?: StringNullableFilter<"User"> | string | null
    experienceLevel?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    interviews?: InterviewListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    jobRole?: SortOrderInput | SortOrder
    experienceLevel?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    jobRole?: StringNullableWithAggregatesFilter<"User"> | string | null
    experienceLevel?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AnswerEvaluationWhereInput = {
    AND?: AnswerEvaluationWhereInput | AnswerEvaluationWhereInput[]
    OR?: AnswerEvaluationWhereInput[]
    NOT?: AnswerEvaluationWhereInput | AnswerEvaluationWhereInput[]
    id?: StringFilter<"AnswerEvaluation"> | string
    interviewId?: StringFilter<"AnswerEvaluation"> | string
    questionText?: StringFilter<"AnswerEvaluation"> | string
    answerText?: StringFilter<"AnswerEvaluation"> | string
    evaluation?: StringFilter<"AnswerEvaluation"> | string
    clarityScore?: IntFilter<"AnswerEvaluation"> | number
    depthScore?: IntFilter<"AnswerEvaluation"> | number
    relevanceScore?: IntFilter<"AnswerEvaluation"> | number
    reasoning?: StringFilter<"AnswerEvaluation"> | string
    topicDiscussed?: StringFilter<"AnswerEvaluation"> | string
    createdAt?: DateTimeFilter<"AnswerEvaluation"> | Date | string
    interview?: XOR<InterviewRelationFilter, InterviewWhereInput>
  }

  export type AnswerEvaluationOrderByWithRelationInput = {
    id?: SortOrder
    interviewId?: SortOrder
    questionText?: SortOrder
    answerText?: SortOrder
    evaluation?: SortOrder
    clarityScore?: SortOrder
    depthScore?: SortOrder
    relevanceScore?: SortOrder
    reasoning?: SortOrder
    topicDiscussed?: SortOrder
    createdAt?: SortOrder
    interview?: InterviewOrderByWithRelationInput
  }

  export type AnswerEvaluationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnswerEvaluationWhereInput | AnswerEvaluationWhereInput[]
    OR?: AnswerEvaluationWhereInput[]
    NOT?: AnswerEvaluationWhereInput | AnswerEvaluationWhereInput[]
    interviewId?: StringFilter<"AnswerEvaluation"> | string
    questionText?: StringFilter<"AnswerEvaluation"> | string
    answerText?: StringFilter<"AnswerEvaluation"> | string
    evaluation?: StringFilter<"AnswerEvaluation"> | string
    clarityScore?: IntFilter<"AnswerEvaluation"> | number
    depthScore?: IntFilter<"AnswerEvaluation"> | number
    relevanceScore?: IntFilter<"AnswerEvaluation"> | number
    reasoning?: StringFilter<"AnswerEvaluation"> | string
    topicDiscussed?: StringFilter<"AnswerEvaluation"> | string
    createdAt?: DateTimeFilter<"AnswerEvaluation"> | Date | string
    interview?: XOR<InterviewRelationFilter, InterviewWhereInput>
  }, "id">

  export type AnswerEvaluationOrderByWithAggregationInput = {
    id?: SortOrder
    interviewId?: SortOrder
    questionText?: SortOrder
    answerText?: SortOrder
    evaluation?: SortOrder
    clarityScore?: SortOrder
    depthScore?: SortOrder
    relevanceScore?: SortOrder
    reasoning?: SortOrder
    topicDiscussed?: SortOrder
    createdAt?: SortOrder
    _count?: AnswerEvaluationCountOrderByAggregateInput
    _avg?: AnswerEvaluationAvgOrderByAggregateInput
    _max?: AnswerEvaluationMaxOrderByAggregateInput
    _min?: AnswerEvaluationMinOrderByAggregateInput
    _sum?: AnswerEvaluationSumOrderByAggregateInput
  }

  export type AnswerEvaluationScalarWhereWithAggregatesInput = {
    AND?: AnswerEvaluationScalarWhereWithAggregatesInput | AnswerEvaluationScalarWhereWithAggregatesInput[]
    OR?: AnswerEvaluationScalarWhereWithAggregatesInput[]
    NOT?: AnswerEvaluationScalarWhereWithAggregatesInput | AnswerEvaluationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnswerEvaluation"> | string
    interviewId?: StringWithAggregatesFilter<"AnswerEvaluation"> | string
    questionText?: StringWithAggregatesFilter<"AnswerEvaluation"> | string
    answerText?: StringWithAggregatesFilter<"AnswerEvaluation"> | string
    evaluation?: StringWithAggregatesFilter<"AnswerEvaluation"> | string
    clarityScore?: IntWithAggregatesFilter<"AnswerEvaluation"> | number
    depthScore?: IntWithAggregatesFilter<"AnswerEvaluation"> | number
    relevanceScore?: IntWithAggregatesFilter<"AnswerEvaluation"> | number
    reasoning?: StringWithAggregatesFilter<"AnswerEvaluation"> | string
    topicDiscussed?: StringWithAggregatesFilter<"AnswerEvaluation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AnswerEvaluation"> | Date | string
  }

  export type InterviewWhereInput = {
    AND?: InterviewWhereInput | InterviewWhereInput[]
    OR?: InterviewWhereInput[]
    NOT?: InterviewWhereInput | InterviewWhereInput[]
    id?: StringFilter<"Interview"> | string
    userId?: StringFilter<"Interview"> | string
    type?: StringFilter<"Interview"> | string
    status?: StringFilter<"Interview"> | string
    transcript?: JsonNullableFilter<"Interview">
    feedback?: JsonNullableFilter<"Interview">
    topicsCovered?: JsonNullableFilter<"Interview">
    difficulty?: IntFilter<"Interview"> | number
    consecutiveWeakCount?: IntFilter<"Interview"> | number
    startedAt?: DateTimeFilter<"Interview"> | Date | string
    endedAt?: DateTimeNullableFilter<"Interview"> | Date | string | null
    createdAt?: DateTimeFilter<"Interview"> | Date | string
    updatedAt?: DateTimeFilter<"Interview"> | Date | string
    lastActivityAt?: DateTimeFilter<"Interview"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    answerEvaluations?: AnswerEvaluationListRelationFilter
  }

  export type InterviewOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    transcript?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    topicsCovered?: SortOrderInput | SortOrder
    difficulty?: SortOrder
    consecutiveWeakCount?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastActivityAt?: SortOrder
    user?: UserOrderByWithRelationInput
    answerEvaluations?: AnswerEvaluationOrderByRelationAggregateInput
  }

  export type InterviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InterviewWhereInput | InterviewWhereInput[]
    OR?: InterviewWhereInput[]
    NOT?: InterviewWhereInput | InterviewWhereInput[]
    userId?: StringFilter<"Interview"> | string
    type?: StringFilter<"Interview"> | string
    status?: StringFilter<"Interview"> | string
    transcript?: JsonNullableFilter<"Interview">
    feedback?: JsonNullableFilter<"Interview">
    topicsCovered?: JsonNullableFilter<"Interview">
    difficulty?: IntFilter<"Interview"> | number
    consecutiveWeakCount?: IntFilter<"Interview"> | number
    startedAt?: DateTimeFilter<"Interview"> | Date | string
    endedAt?: DateTimeNullableFilter<"Interview"> | Date | string | null
    createdAt?: DateTimeFilter<"Interview"> | Date | string
    updatedAt?: DateTimeFilter<"Interview"> | Date | string
    lastActivityAt?: DateTimeFilter<"Interview"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    answerEvaluations?: AnswerEvaluationListRelationFilter
  }, "id">

  export type InterviewOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    transcript?: SortOrderInput | SortOrder
    feedback?: SortOrderInput | SortOrder
    topicsCovered?: SortOrderInput | SortOrder
    difficulty?: SortOrder
    consecutiveWeakCount?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastActivityAt?: SortOrder
    _count?: InterviewCountOrderByAggregateInput
    _avg?: InterviewAvgOrderByAggregateInput
    _max?: InterviewMaxOrderByAggregateInput
    _min?: InterviewMinOrderByAggregateInput
    _sum?: InterviewSumOrderByAggregateInput
  }

  export type InterviewScalarWhereWithAggregatesInput = {
    AND?: InterviewScalarWhereWithAggregatesInput | InterviewScalarWhereWithAggregatesInput[]
    OR?: InterviewScalarWhereWithAggregatesInput[]
    NOT?: InterviewScalarWhereWithAggregatesInput | InterviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Interview"> | string
    userId?: StringWithAggregatesFilter<"Interview"> | string
    type?: StringWithAggregatesFilter<"Interview"> | string
    status?: StringWithAggregatesFilter<"Interview"> | string
    transcript?: JsonNullableWithAggregatesFilter<"Interview">
    feedback?: JsonNullableWithAggregatesFilter<"Interview">
    topicsCovered?: JsonNullableWithAggregatesFilter<"Interview">
    difficulty?: IntWithAggregatesFilter<"Interview"> | number
    consecutiveWeakCount?: IntWithAggregatesFilter<"Interview"> | number
    startedAt?: DateTimeWithAggregatesFilter<"Interview"> | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter<"Interview"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Interview"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Interview"> | Date | string
    lastActivityAt?: DateTimeWithAggregatesFilter<"Interview"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    jobRole?: string | null
    experienceLevel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    interviews?: InterviewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    jobRole?: string | null
    experienceLevel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    interviews?: InterviewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jobRole?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interviews?: InterviewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jobRole?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interviews?: InterviewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    jobRole?: string | null
    experienceLevel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jobRole?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jobRole?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnswerEvaluationCreateInput = {
    id?: string
    questionText: string
    answerText: string
    evaluation: string
    clarityScore: number
    depthScore: number
    relevanceScore: number
    reasoning: string
    topicDiscussed: string
    createdAt?: Date | string
    interview: InterviewCreateNestedOneWithoutAnswerEvaluationsInput
  }

  export type AnswerEvaluationUncheckedCreateInput = {
    id?: string
    interviewId: string
    questionText: string
    answerText: string
    evaluation: string
    clarityScore: number
    depthScore: number
    relevanceScore: number
    reasoning: string
    topicDiscussed: string
    createdAt?: Date | string
  }

  export type AnswerEvaluationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    answerText?: StringFieldUpdateOperationsInput | string
    evaluation?: StringFieldUpdateOperationsInput | string
    clarityScore?: IntFieldUpdateOperationsInput | number
    depthScore?: IntFieldUpdateOperationsInput | number
    relevanceScore?: IntFieldUpdateOperationsInput | number
    reasoning?: StringFieldUpdateOperationsInput | string
    topicDiscussed?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interview?: InterviewUpdateOneRequiredWithoutAnswerEvaluationsNestedInput
  }

  export type AnswerEvaluationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    interviewId?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    answerText?: StringFieldUpdateOperationsInput | string
    evaluation?: StringFieldUpdateOperationsInput | string
    clarityScore?: IntFieldUpdateOperationsInput | number
    depthScore?: IntFieldUpdateOperationsInput | number
    relevanceScore?: IntFieldUpdateOperationsInput | number
    reasoning?: StringFieldUpdateOperationsInput | string
    topicDiscussed?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnswerEvaluationCreateManyInput = {
    id?: string
    interviewId: string
    questionText: string
    answerText: string
    evaluation: string
    clarityScore: number
    depthScore: number
    relevanceScore: number
    reasoning: string
    topicDiscussed: string
    createdAt?: Date | string
  }

  export type AnswerEvaluationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    answerText?: StringFieldUpdateOperationsInput | string
    evaluation?: StringFieldUpdateOperationsInput | string
    clarityScore?: IntFieldUpdateOperationsInput | number
    depthScore?: IntFieldUpdateOperationsInput | number
    relevanceScore?: IntFieldUpdateOperationsInput | number
    reasoning?: StringFieldUpdateOperationsInput | string
    topicDiscussed?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnswerEvaluationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    interviewId?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    answerText?: StringFieldUpdateOperationsInput | string
    evaluation?: StringFieldUpdateOperationsInput | string
    clarityScore?: IntFieldUpdateOperationsInput | number
    depthScore?: IntFieldUpdateOperationsInput | number
    relevanceScore?: IntFieldUpdateOperationsInput | number
    reasoning?: StringFieldUpdateOperationsInput | string
    topicDiscussed?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewCreateInput = {
    id?: string
    type: string
    status: string
    transcript?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    topicsCovered?: NullableJsonNullValueInput | InputJsonValue
    difficulty?: number
    consecutiveWeakCount?: number
    startedAt?: Date | string
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActivityAt?: Date | string
    user: UserCreateNestedOneWithoutInterviewsInput
    answerEvaluations?: AnswerEvaluationCreateNestedManyWithoutInterviewInput
  }

  export type InterviewUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    status: string
    transcript?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    topicsCovered?: NullableJsonNullValueInput | InputJsonValue
    difficulty?: number
    consecutiveWeakCount?: number
    startedAt?: Date | string
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActivityAt?: Date | string
    answerEvaluations?: AnswerEvaluationUncheckedCreateNestedManyWithoutInterviewInput
  }

  export type InterviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transcript?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    topicsCovered?: NullableJsonNullValueInput | InputJsonValue
    difficulty?: IntFieldUpdateOperationsInput | number
    consecutiveWeakCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInterviewsNestedInput
    answerEvaluations?: AnswerEvaluationUpdateManyWithoutInterviewNestedInput
  }

  export type InterviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transcript?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    topicsCovered?: NullableJsonNullValueInput | InputJsonValue
    difficulty?: IntFieldUpdateOperationsInput | number
    consecutiveWeakCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answerEvaluations?: AnswerEvaluationUncheckedUpdateManyWithoutInterviewNestedInput
  }

  export type InterviewCreateManyInput = {
    id?: string
    userId: string
    type: string
    status: string
    transcript?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    topicsCovered?: NullableJsonNullValueInput | InputJsonValue
    difficulty?: number
    consecutiveWeakCount?: number
    startedAt?: Date | string
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActivityAt?: Date | string
  }

  export type InterviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transcript?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    topicsCovered?: NullableJsonNullValueInput | InputJsonValue
    difficulty?: IntFieldUpdateOperationsInput | number
    consecutiveWeakCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InterviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transcript?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    topicsCovered?: NullableJsonNullValueInput | InputJsonValue
    difficulty?: IntFieldUpdateOperationsInput | number
    consecutiveWeakCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type InterviewListRelationFilter = {
    every?: InterviewWhereInput
    some?: InterviewWhereInput
    none?: InterviewWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type InterviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    jobRole?: SortOrder
    experienceLevel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    jobRole?: SortOrder
    experienceLevel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    jobRole?: SortOrder
    experienceLevel?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type InterviewRelationFilter = {
    is?: InterviewWhereInput
    isNot?: InterviewWhereInput
  }

  export type AnswerEvaluationCountOrderByAggregateInput = {
    id?: SortOrder
    interviewId?: SortOrder
    questionText?: SortOrder
    answerText?: SortOrder
    evaluation?: SortOrder
    clarityScore?: SortOrder
    depthScore?: SortOrder
    relevanceScore?: SortOrder
    reasoning?: SortOrder
    topicDiscussed?: SortOrder
    createdAt?: SortOrder
  }

  export type AnswerEvaluationAvgOrderByAggregateInput = {
    clarityScore?: SortOrder
    depthScore?: SortOrder
    relevanceScore?: SortOrder
  }

  export type AnswerEvaluationMaxOrderByAggregateInput = {
    id?: SortOrder
    interviewId?: SortOrder
    questionText?: SortOrder
    answerText?: SortOrder
    evaluation?: SortOrder
    clarityScore?: SortOrder
    depthScore?: SortOrder
    relevanceScore?: SortOrder
    reasoning?: SortOrder
    topicDiscussed?: SortOrder
    createdAt?: SortOrder
  }

  export type AnswerEvaluationMinOrderByAggregateInput = {
    id?: SortOrder
    interviewId?: SortOrder
    questionText?: SortOrder
    answerText?: SortOrder
    evaluation?: SortOrder
    clarityScore?: SortOrder
    depthScore?: SortOrder
    relevanceScore?: SortOrder
    reasoning?: SortOrder
    topicDiscussed?: SortOrder
    createdAt?: SortOrder
  }

  export type AnswerEvaluationSumOrderByAggregateInput = {
    clarityScore?: SortOrder
    depthScore?: SortOrder
    relevanceScore?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AnswerEvaluationListRelationFilter = {
    every?: AnswerEvaluationWhereInput
    some?: AnswerEvaluationWhereInput
    none?: AnswerEvaluationWhereInput
  }

  export type AnswerEvaluationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InterviewCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    transcript?: SortOrder
    feedback?: SortOrder
    topicsCovered?: SortOrder
    difficulty?: SortOrder
    consecutiveWeakCount?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastActivityAt?: SortOrder
  }

  export type InterviewAvgOrderByAggregateInput = {
    difficulty?: SortOrder
    consecutiveWeakCount?: SortOrder
  }

  export type InterviewMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    difficulty?: SortOrder
    consecutiveWeakCount?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastActivityAt?: SortOrder
  }

  export type InterviewMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    difficulty?: SortOrder
    consecutiveWeakCount?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastActivityAt?: SortOrder
  }

  export type InterviewSumOrderByAggregateInput = {
    difficulty?: SortOrder
    consecutiveWeakCount?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type InterviewCreateNestedManyWithoutUserInput = {
    create?: XOR<InterviewCreateWithoutUserInput, InterviewUncheckedCreateWithoutUserInput> | InterviewCreateWithoutUserInput[] | InterviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewCreateOrConnectWithoutUserInput | InterviewCreateOrConnectWithoutUserInput[]
    createMany?: InterviewCreateManyUserInputEnvelope
    connect?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
  }

  export type InterviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<InterviewCreateWithoutUserInput, InterviewUncheckedCreateWithoutUserInput> | InterviewCreateWithoutUserInput[] | InterviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewCreateOrConnectWithoutUserInput | InterviewCreateOrConnectWithoutUserInput[]
    createMany?: InterviewCreateManyUserInputEnvelope
    connect?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type InterviewUpdateManyWithoutUserNestedInput = {
    create?: XOR<InterviewCreateWithoutUserInput, InterviewUncheckedCreateWithoutUserInput> | InterviewCreateWithoutUserInput[] | InterviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewCreateOrConnectWithoutUserInput | InterviewCreateOrConnectWithoutUserInput[]
    upsert?: InterviewUpsertWithWhereUniqueWithoutUserInput | InterviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InterviewCreateManyUserInputEnvelope
    set?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
    disconnect?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
    delete?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
    connect?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
    update?: InterviewUpdateWithWhereUniqueWithoutUserInput | InterviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InterviewUpdateManyWithWhereWithoutUserInput | InterviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InterviewScalarWhereInput | InterviewScalarWhereInput[]
  }

  export type InterviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<InterviewCreateWithoutUserInput, InterviewUncheckedCreateWithoutUserInput> | InterviewCreateWithoutUserInput[] | InterviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InterviewCreateOrConnectWithoutUserInput | InterviewCreateOrConnectWithoutUserInput[]
    upsert?: InterviewUpsertWithWhereUniqueWithoutUserInput | InterviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InterviewCreateManyUserInputEnvelope
    set?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
    disconnect?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
    delete?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
    connect?: InterviewWhereUniqueInput | InterviewWhereUniqueInput[]
    update?: InterviewUpdateWithWhereUniqueWithoutUserInput | InterviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InterviewUpdateManyWithWhereWithoutUserInput | InterviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InterviewScalarWhereInput | InterviewScalarWhereInput[]
  }

  export type InterviewCreateNestedOneWithoutAnswerEvaluationsInput = {
    create?: XOR<InterviewCreateWithoutAnswerEvaluationsInput, InterviewUncheckedCreateWithoutAnswerEvaluationsInput>
    connectOrCreate?: InterviewCreateOrConnectWithoutAnswerEvaluationsInput
    connect?: InterviewWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type InterviewUpdateOneRequiredWithoutAnswerEvaluationsNestedInput = {
    create?: XOR<InterviewCreateWithoutAnswerEvaluationsInput, InterviewUncheckedCreateWithoutAnswerEvaluationsInput>
    connectOrCreate?: InterviewCreateOrConnectWithoutAnswerEvaluationsInput
    upsert?: InterviewUpsertWithoutAnswerEvaluationsInput
    connect?: InterviewWhereUniqueInput
    update?: XOR<XOR<InterviewUpdateToOneWithWhereWithoutAnswerEvaluationsInput, InterviewUpdateWithoutAnswerEvaluationsInput>, InterviewUncheckedUpdateWithoutAnswerEvaluationsInput>
  }

  export type UserCreateNestedOneWithoutInterviewsInput = {
    create?: XOR<UserCreateWithoutInterviewsInput, UserUncheckedCreateWithoutInterviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInterviewsInput
    connect?: UserWhereUniqueInput
  }

  export type AnswerEvaluationCreateNestedManyWithoutInterviewInput = {
    create?: XOR<AnswerEvaluationCreateWithoutInterviewInput, AnswerEvaluationUncheckedCreateWithoutInterviewInput> | AnswerEvaluationCreateWithoutInterviewInput[] | AnswerEvaluationUncheckedCreateWithoutInterviewInput[]
    connectOrCreate?: AnswerEvaluationCreateOrConnectWithoutInterviewInput | AnswerEvaluationCreateOrConnectWithoutInterviewInput[]
    createMany?: AnswerEvaluationCreateManyInterviewInputEnvelope
    connect?: AnswerEvaluationWhereUniqueInput | AnswerEvaluationWhereUniqueInput[]
  }

  export type AnswerEvaluationUncheckedCreateNestedManyWithoutInterviewInput = {
    create?: XOR<AnswerEvaluationCreateWithoutInterviewInput, AnswerEvaluationUncheckedCreateWithoutInterviewInput> | AnswerEvaluationCreateWithoutInterviewInput[] | AnswerEvaluationUncheckedCreateWithoutInterviewInput[]
    connectOrCreate?: AnswerEvaluationCreateOrConnectWithoutInterviewInput | AnswerEvaluationCreateOrConnectWithoutInterviewInput[]
    createMany?: AnswerEvaluationCreateManyInterviewInputEnvelope
    connect?: AnswerEvaluationWhereUniqueInput | AnswerEvaluationWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutInterviewsNestedInput = {
    create?: XOR<UserCreateWithoutInterviewsInput, UserUncheckedCreateWithoutInterviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInterviewsInput
    upsert?: UserUpsertWithoutInterviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInterviewsInput, UserUpdateWithoutInterviewsInput>, UserUncheckedUpdateWithoutInterviewsInput>
  }

  export type AnswerEvaluationUpdateManyWithoutInterviewNestedInput = {
    create?: XOR<AnswerEvaluationCreateWithoutInterviewInput, AnswerEvaluationUncheckedCreateWithoutInterviewInput> | AnswerEvaluationCreateWithoutInterviewInput[] | AnswerEvaluationUncheckedCreateWithoutInterviewInput[]
    connectOrCreate?: AnswerEvaluationCreateOrConnectWithoutInterviewInput | AnswerEvaluationCreateOrConnectWithoutInterviewInput[]
    upsert?: AnswerEvaluationUpsertWithWhereUniqueWithoutInterviewInput | AnswerEvaluationUpsertWithWhereUniqueWithoutInterviewInput[]
    createMany?: AnswerEvaluationCreateManyInterviewInputEnvelope
    set?: AnswerEvaluationWhereUniqueInput | AnswerEvaluationWhereUniqueInput[]
    disconnect?: AnswerEvaluationWhereUniqueInput | AnswerEvaluationWhereUniqueInput[]
    delete?: AnswerEvaluationWhereUniqueInput | AnswerEvaluationWhereUniqueInput[]
    connect?: AnswerEvaluationWhereUniqueInput | AnswerEvaluationWhereUniqueInput[]
    update?: AnswerEvaluationUpdateWithWhereUniqueWithoutInterviewInput | AnswerEvaluationUpdateWithWhereUniqueWithoutInterviewInput[]
    updateMany?: AnswerEvaluationUpdateManyWithWhereWithoutInterviewInput | AnswerEvaluationUpdateManyWithWhereWithoutInterviewInput[]
    deleteMany?: AnswerEvaluationScalarWhereInput | AnswerEvaluationScalarWhereInput[]
  }

  export type AnswerEvaluationUncheckedUpdateManyWithoutInterviewNestedInput = {
    create?: XOR<AnswerEvaluationCreateWithoutInterviewInput, AnswerEvaluationUncheckedCreateWithoutInterviewInput> | AnswerEvaluationCreateWithoutInterviewInput[] | AnswerEvaluationUncheckedCreateWithoutInterviewInput[]
    connectOrCreate?: AnswerEvaluationCreateOrConnectWithoutInterviewInput | AnswerEvaluationCreateOrConnectWithoutInterviewInput[]
    upsert?: AnswerEvaluationUpsertWithWhereUniqueWithoutInterviewInput | AnswerEvaluationUpsertWithWhereUniqueWithoutInterviewInput[]
    createMany?: AnswerEvaluationCreateManyInterviewInputEnvelope
    set?: AnswerEvaluationWhereUniqueInput | AnswerEvaluationWhereUniqueInput[]
    disconnect?: AnswerEvaluationWhereUniqueInput | AnswerEvaluationWhereUniqueInput[]
    delete?: AnswerEvaluationWhereUniqueInput | AnswerEvaluationWhereUniqueInput[]
    connect?: AnswerEvaluationWhereUniqueInput | AnswerEvaluationWhereUniqueInput[]
    update?: AnswerEvaluationUpdateWithWhereUniqueWithoutInterviewInput | AnswerEvaluationUpdateWithWhereUniqueWithoutInterviewInput[]
    updateMany?: AnswerEvaluationUpdateManyWithWhereWithoutInterviewInput | AnswerEvaluationUpdateManyWithWhereWithoutInterviewInput[]
    deleteMany?: AnswerEvaluationScalarWhereInput | AnswerEvaluationScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type InterviewCreateWithoutUserInput = {
    id?: string
    type: string
    status: string
    transcript?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    topicsCovered?: NullableJsonNullValueInput | InputJsonValue
    difficulty?: number
    consecutiveWeakCount?: number
    startedAt?: Date | string
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActivityAt?: Date | string
    answerEvaluations?: AnswerEvaluationCreateNestedManyWithoutInterviewInput
  }

  export type InterviewUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    status: string
    transcript?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    topicsCovered?: NullableJsonNullValueInput | InputJsonValue
    difficulty?: number
    consecutiveWeakCount?: number
    startedAt?: Date | string
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActivityAt?: Date | string
    answerEvaluations?: AnswerEvaluationUncheckedCreateNestedManyWithoutInterviewInput
  }

  export type InterviewCreateOrConnectWithoutUserInput = {
    where: InterviewWhereUniqueInput
    create: XOR<InterviewCreateWithoutUserInput, InterviewUncheckedCreateWithoutUserInput>
  }

  export type InterviewCreateManyUserInputEnvelope = {
    data: InterviewCreateManyUserInput | InterviewCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type InterviewUpsertWithWhereUniqueWithoutUserInput = {
    where: InterviewWhereUniqueInput
    update: XOR<InterviewUpdateWithoutUserInput, InterviewUncheckedUpdateWithoutUserInput>
    create: XOR<InterviewCreateWithoutUserInput, InterviewUncheckedCreateWithoutUserInput>
  }

  export type InterviewUpdateWithWhereUniqueWithoutUserInput = {
    where: InterviewWhereUniqueInput
    data: XOR<InterviewUpdateWithoutUserInput, InterviewUncheckedUpdateWithoutUserInput>
  }

  export type InterviewUpdateManyWithWhereWithoutUserInput = {
    where: InterviewScalarWhereInput
    data: XOR<InterviewUpdateManyMutationInput, InterviewUncheckedUpdateManyWithoutUserInput>
  }

  export type InterviewScalarWhereInput = {
    AND?: InterviewScalarWhereInput | InterviewScalarWhereInput[]
    OR?: InterviewScalarWhereInput[]
    NOT?: InterviewScalarWhereInput | InterviewScalarWhereInput[]
    id?: StringFilter<"Interview"> | string
    userId?: StringFilter<"Interview"> | string
    type?: StringFilter<"Interview"> | string
    status?: StringFilter<"Interview"> | string
    transcript?: JsonNullableFilter<"Interview">
    feedback?: JsonNullableFilter<"Interview">
    topicsCovered?: JsonNullableFilter<"Interview">
    difficulty?: IntFilter<"Interview"> | number
    consecutiveWeakCount?: IntFilter<"Interview"> | number
    startedAt?: DateTimeFilter<"Interview"> | Date | string
    endedAt?: DateTimeNullableFilter<"Interview"> | Date | string | null
    createdAt?: DateTimeFilter<"Interview"> | Date | string
    updatedAt?: DateTimeFilter<"Interview"> | Date | string
    lastActivityAt?: DateTimeFilter<"Interview"> | Date | string
  }

  export type InterviewCreateWithoutAnswerEvaluationsInput = {
    id?: string
    type: string
    status: string
    transcript?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    topicsCovered?: NullableJsonNullValueInput | InputJsonValue
    difficulty?: number
    consecutiveWeakCount?: number
    startedAt?: Date | string
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActivityAt?: Date | string
    user: UserCreateNestedOneWithoutInterviewsInput
  }

  export type InterviewUncheckedCreateWithoutAnswerEvaluationsInput = {
    id?: string
    userId: string
    type: string
    status: string
    transcript?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    topicsCovered?: NullableJsonNullValueInput | InputJsonValue
    difficulty?: number
    consecutiveWeakCount?: number
    startedAt?: Date | string
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActivityAt?: Date | string
  }

  export type InterviewCreateOrConnectWithoutAnswerEvaluationsInput = {
    where: InterviewWhereUniqueInput
    create: XOR<InterviewCreateWithoutAnswerEvaluationsInput, InterviewUncheckedCreateWithoutAnswerEvaluationsInput>
  }

  export type InterviewUpsertWithoutAnswerEvaluationsInput = {
    update: XOR<InterviewUpdateWithoutAnswerEvaluationsInput, InterviewUncheckedUpdateWithoutAnswerEvaluationsInput>
    create: XOR<InterviewCreateWithoutAnswerEvaluationsInput, InterviewUncheckedCreateWithoutAnswerEvaluationsInput>
    where?: InterviewWhereInput
  }

  export type InterviewUpdateToOneWithWhereWithoutAnswerEvaluationsInput = {
    where?: InterviewWhereInput
    data: XOR<InterviewUpdateWithoutAnswerEvaluationsInput, InterviewUncheckedUpdateWithoutAnswerEvaluationsInput>
  }

  export type InterviewUpdateWithoutAnswerEvaluationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transcript?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    topicsCovered?: NullableJsonNullValueInput | InputJsonValue
    difficulty?: IntFieldUpdateOperationsInput | number
    consecutiveWeakCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInterviewsNestedInput
  }

  export type InterviewUncheckedUpdateWithoutAnswerEvaluationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transcript?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    topicsCovered?: NullableJsonNullValueInput | InputJsonValue
    difficulty?: IntFieldUpdateOperationsInput | number
    consecutiveWeakCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutInterviewsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    jobRole?: string | null
    experienceLevel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutInterviewsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    jobRole?: string | null
    experienceLevel?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutInterviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInterviewsInput, UserUncheckedCreateWithoutInterviewsInput>
  }

  export type AnswerEvaluationCreateWithoutInterviewInput = {
    id?: string
    questionText: string
    answerText: string
    evaluation: string
    clarityScore: number
    depthScore: number
    relevanceScore: number
    reasoning: string
    topicDiscussed: string
    createdAt?: Date | string
  }

  export type AnswerEvaluationUncheckedCreateWithoutInterviewInput = {
    id?: string
    questionText: string
    answerText: string
    evaluation: string
    clarityScore: number
    depthScore: number
    relevanceScore: number
    reasoning: string
    topicDiscussed: string
    createdAt?: Date | string
  }

  export type AnswerEvaluationCreateOrConnectWithoutInterviewInput = {
    where: AnswerEvaluationWhereUniqueInput
    create: XOR<AnswerEvaluationCreateWithoutInterviewInput, AnswerEvaluationUncheckedCreateWithoutInterviewInput>
  }

  export type AnswerEvaluationCreateManyInterviewInputEnvelope = {
    data: AnswerEvaluationCreateManyInterviewInput | AnswerEvaluationCreateManyInterviewInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutInterviewsInput = {
    update: XOR<UserUpdateWithoutInterviewsInput, UserUncheckedUpdateWithoutInterviewsInput>
    create: XOR<UserCreateWithoutInterviewsInput, UserUncheckedCreateWithoutInterviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInterviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInterviewsInput, UserUncheckedUpdateWithoutInterviewsInput>
  }

  export type UserUpdateWithoutInterviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jobRole?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutInterviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jobRole?: NullableStringFieldUpdateOperationsInput | string | null
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnswerEvaluationUpsertWithWhereUniqueWithoutInterviewInput = {
    where: AnswerEvaluationWhereUniqueInput
    update: XOR<AnswerEvaluationUpdateWithoutInterviewInput, AnswerEvaluationUncheckedUpdateWithoutInterviewInput>
    create: XOR<AnswerEvaluationCreateWithoutInterviewInput, AnswerEvaluationUncheckedCreateWithoutInterviewInput>
  }

  export type AnswerEvaluationUpdateWithWhereUniqueWithoutInterviewInput = {
    where: AnswerEvaluationWhereUniqueInput
    data: XOR<AnswerEvaluationUpdateWithoutInterviewInput, AnswerEvaluationUncheckedUpdateWithoutInterviewInput>
  }

  export type AnswerEvaluationUpdateManyWithWhereWithoutInterviewInput = {
    where: AnswerEvaluationScalarWhereInput
    data: XOR<AnswerEvaluationUpdateManyMutationInput, AnswerEvaluationUncheckedUpdateManyWithoutInterviewInput>
  }

  export type AnswerEvaluationScalarWhereInput = {
    AND?: AnswerEvaluationScalarWhereInput | AnswerEvaluationScalarWhereInput[]
    OR?: AnswerEvaluationScalarWhereInput[]
    NOT?: AnswerEvaluationScalarWhereInput | AnswerEvaluationScalarWhereInput[]
    id?: StringFilter<"AnswerEvaluation"> | string
    interviewId?: StringFilter<"AnswerEvaluation"> | string
    questionText?: StringFilter<"AnswerEvaluation"> | string
    answerText?: StringFilter<"AnswerEvaluation"> | string
    evaluation?: StringFilter<"AnswerEvaluation"> | string
    clarityScore?: IntFilter<"AnswerEvaluation"> | number
    depthScore?: IntFilter<"AnswerEvaluation"> | number
    relevanceScore?: IntFilter<"AnswerEvaluation"> | number
    reasoning?: StringFilter<"AnswerEvaluation"> | string
    topicDiscussed?: StringFilter<"AnswerEvaluation"> | string
    createdAt?: DateTimeFilter<"AnswerEvaluation"> | Date | string
  }

  export type InterviewCreateManyUserInput = {
    id?: string
    type: string
    status: string
    transcript?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    topicsCovered?: NullableJsonNullValueInput | InputJsonValue
    difficulty?: number
    consecutiveWeakCount?: number
    startedAt?: Date | string
    endedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActivityAt?: Date | string
  }

  export type InterviewUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transcript?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    topicsCovered?: NullableJsonNullValueInput | InputJsonValue
    difficulty?: IntFieldUpdateOperationsInput | number
    consecutiveWeakCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answerEvaluations?: AnswerEvaluationUpdateManyWithoutInterviewNestedInput
  }

  export type InterviewUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transcript?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    topicsCovered?: NullableJsonNullValueInput | InputJsonValue
    difficulty?: IntFieldUpdateOperationsInput | number
    consecutiveWeakCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answerEvaluations?: AnswerEvaluationUncheckedUpdateManyWithoutInterviewNestedInput
  }

  export type InterviewUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transcript?: NullableJsonNullValueInput | InputJsonValue
    feedback?: NullableJsonNullValueInput | InputJsonValue
    topicsCovered?: NullableJsonNullValueInput | InputJsonValue
    difficulty?: IntFieldUpdateOperationsInput | number
    consecutiveWeakCount?: IntFieldUpdateOperationsInput | number
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnswerEvaluationCreateManyInterviewInput = {
    id?: string
    questionText: string
    answerText: string
    evaluation: string
    clarityScore: number
    depthScore: number
    relevanceScore: number
    reasoning: string
    topicDiscussed: string
    createdAt?: Date | string
  }

  export type AnswerEvaluationUpdateWithoutInterviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    answerText?: StringFieldUpdateOperationsInput | string
    evaluation?: StringFieldUpdateOperationsInput | string
    clarityScore?: IntFieldUpdateOperationsInput | number
    depthScore?: IntFieldUpdateOperationsInput | number
    relevanceScore?: IntFieldUpdateOperationsInput | number
    reasoning?: StringFieldUpdateOperationsInput | string
    topicDiscussed?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnswerEvaluationUncheckedUpdateWithoutInterviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    answerText?: StringFieldUpdateOperationsInput | string
    evaluation?: StringFieldUpdateOperationsInput | string
    clarityScore?: IntFieldUpdateOperationsInput | number
    depthScore?: IntFieldUpdateOperationsInput | number
    relevanceScore?: IntFieldUpdateOperationsInput | number
    reasoning?: StringFieldUpdateOperationsInput | string
    topicDiscussed?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnswerEvaluationUncheckedUpdateManyWithoutInterviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionText?: StringFieldUpdateOperationsInput | string
    answerText?: StringFieldUpdateOperationsInput | string
    evaluation?: StringFieldUpdateOperationsInput | string
    clarityScore?: IntFieldUpdateOperationsInput | number
    depthScore?: IntFieldUpdateOperationsInput | number
    relevanceScore?: IntFieldUpdateOperationsInput | number
    reasoning?: StringFieldUpdateOperationsInput | string
    topicDiscussed?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InterviewCountOutputTypeDefaultArgs instead
     */
    export type InterviewCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InterviewCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AnswerEvaluationDefaultArgs instead
     */
    export type AnswerEvaluationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AnswerEvaluationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InterviewDefaultArgs instead
     */
    export type InterviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InterviewDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}