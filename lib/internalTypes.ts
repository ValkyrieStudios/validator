/* eslint-disable @typescript-eslint/no-empty-object-type */
/**
 * MARK: Data
 */

/* Raw data type for input checking */
export type DataVal         = string | number | boolean | Date | symbol | null | unknown | DataObject | DataVal[]; /* eslint-disable-line */
export type DataObject      = {[key:string]: DataVal};
export type GenericObject   = {[key:string]:any};

/* Typed Validator */
export type TV<T> = {
    [K in keyof T]: T[K] extends Array<any>
        ? string
        : T[K] extends Record<string, any>
            ? TV<T[K]>|string
            : string;
};

/* Validation rule input data types */
export type RulesRawVal     = string | string[] | RulesRaw; /* eslint-disable-line */
export type RulesRaw        = {[key:string]: RulesRawVal};
export type RuleFn          = (...args:any[]) => boolean;
export type RuleExtension   = RuleFn | RegExp | (string|number)[] | TV<GenericObject>;

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
type RuleMap<Rules extends Record<string, any>> = {
    [K in keyof Rules]: ExtractGuard<Rules[K]>
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
type InferRuleTypeFromStore<S extends string, Rules extends Record<string, any> = {}> =
  S extends `?${infer Rest}`
    ? (Rest extends '' ? undefined : InferRuleTypeFromStore<RemoveNegation<Rest>, Rules> | undefined)
    : ExtractRuleName<RemoveNegation<S>> extends keyof RuleMap<Rules>
      ? RuleMap<Rules>[ExtractRuleName<RemoveNegation<S>>]
      : unknown;

/**
 * Recursively infer the type for a schema.
 * - If the schema value is a string, we use InferRuleTypeFromStore.
 * - If it’s an array (conditional group), we take the union of the inferences.
 * - If it’s an object, we recursively map its keys.
 */
export type InferredSchema<S, Rules extends Record<string, any> = {}> =
  S extends string
    ? S extends `[${infer Inner}]${infer Rest}` /* eslint-disable-line @typescript-eslint/no-unused-vars */
      ? InferredSchema<Rest, Rules>[] /* eg: [unique|min:1]string_ne -> string[] */
      : S extends `{${infer Inner}}${infer Rest}` /* eslint-disable-line @typescript-eslint/no-unused-vars */
        ? {[key: string]: InferredSchema<Rest, Rules>}  /* eg: {unique}string_ne -> {[key:string]:string} */
        : InferRuleTypeFromStore<S, Rules>
    : S extends Array<infer U>
      ? InferredSchema<U, Rules>
      : S extends object
        ? { [K in keyof S]: InferredSchema<S[K], Rules> }
        : unknown;

export type MappedExtensions<Ext extends Record<string, RuleExtension>, Rules extends Record<string, any> = {}> = {
    [K in keyof Ext]: Ext[K] extends RegExp
        /* RegEx rule extension */
        ? (val: unknown, ...args: any[]) => val is string
        /* Enum rule extension */
        : Ext[K] extends (infer U)[]
            ? (val: unknown, ...args: any[]) => val is U
            /* Function extension */
            : Ext[K] extends (...args: any[]) => any
                ? Ext[K]
                : Ext[K] extends Record<string, any>
                    ? (val: unknown, ...args: any[]) => val is DeepMutable<InferredSchema<Ext[K], Rules>>
                    : unknown
};

export type MergeExtensions<
    E1 extends Record<string, unknown>,
    E2 extends Record<string, unknown>
> = Omit<E1, keyof E2> & E2;

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
