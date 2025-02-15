/**
 * MARK: Data
 */

/* Raw data type for input checking */
export type DataVal         = string | number | boolean | Date | symbol | null | unknown | DataObject | DataVal[]; /* eslint-disable-line */
export type DataObject      = {[key:string]: DataVal};
export type GenericObject   = {[key:string]:any};

/* Validation rule input data types */
export type RulesRawVal     = string | string[] | RulesRaw; /* eslint-disable-line */
export type RulesRaw        = {[key:string]: RulesRawVal};

/* Recursively remove the readonly modifier from all properties */
export type DeepMutable<T> =
  T extends string ? T :
  T extends number ? T :
  T extends boolean ? T :
  T extends bigint ? T :
  T extends symbol ? T :
  T extends null ? T :
  T extends undefined ? T :
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  T extends Function ? T :
  T extends object ? { -readonly [K in keyof T]: DeepMutable<T[K]> } :
  T;

/**
 * MARK: Inferrence
 */

/* Helper type that extracts a type predicate’s target type */
type ExtractGuard<T> =
  T extends (val: unknown, ...args: any[]) => val is infer R ? R : never;

/* Builds mapping from rules in dictionary */
type RuleMap<V extends {rules: Record<string, any>}> = {
    [K in keyof V['rules']]: ExtractGuard<V['rules'][K]>
};

/* Extracts rule name from a string (eg: "string|min:2", extract "string") */
type ExtractRuleName<S extends string> =
  S extends `${infer Word}|${infer _}` ? Word : /* eslint-disable-line @typescript-eslint/no-unused-vars */
  S extends `${infer Word}:${infer _}` ? Word : /* eslint-disable-line @typescript-eslint/no-unused-vars */
  S;

/* Removes leading "!" from string */
type RemoveNegation<S extends string> = S extends `!${infer Rest}` ? Rest : S;

/**
 * Given a rule string S, infer its type using the default rule type mapping.
 * If the rule begins with a "?" then we union with undefined.
 */
type InferRuleTypeFromStore<S extends string, V extends {rules: Record<string, any>}> =
  S extends `?${infer Rest}`
    ? (Rest extends '' ? undefined : InferRuleTypeFromStore<RemoveNegation<Rest>, V> | undefined)
    : ExtractRuleName<RemoveNegation<S>> extends keyof RuleMap<V>
      ? RuleMap<V>[ExtractRuleName<RemoveNegation<S>>]
      : unknown;

/**
 * Recursively infer the type for a schema.
 * - If the schema value is a string, we use InferRuleTypeFromStore.
 * - If it’s an array (conditional group), we take the union of the inferences.
 * - If it’s an object, we recursively map its keys.
 */
export type InferredSchema<S, V extends {rules: Record<string, any>} = {rules: object}> =
  S extends string ? InferRuleTypeFromStore<S, V> :
  S extends Array<infer U> ? InferredSchema<U, V> :
  S extends object ? { [K in keyof S]: InferredSchema<S[K], V> } : unknown;

/**
 * MARK: Validation
 */

export type ValidationError = {
    idx?:number;
    msg:string;
    params:DataVal[];
}

export type ValidationIterable = {
    unique: boolean;
    max: number;
    min: number;
    handler: (v:unknown) => null | {len:number; values: unknown[]};
}

export type ValidationRules = {
    iterable:ValidationIterable|false;
    list:  {
        /* Type of the rule */
        type:string;
        params:[unknown,boolean][];
        params_length:number;
        not:boolean;
        /* The message to use when validating */
        msg:string;
    }[];
    list_length:number;
}

export type ValidationGroup = {
    key:string;
    sometimes:boolean;
    rules:ValidationRules[];
}

export type ValidationResult = {
    /**
     * Whether or not the validation was valid
     */
    is_valid:boolean;
    /**
     * Integer value defining how many fields were invalid in the provided data object
     */
    count:number;
    /**
     * Errors object which will be filled with the errors of the validation result if there are any.
     *
     * Take note: 'NO_DATA' is set when no data was passed to the validator.
     *
     * Example: {b: [{msg: 'number', params: []}]}
     */
    errors: 'NO_DATA' | {[key:string]:ValidationError[]};
}
