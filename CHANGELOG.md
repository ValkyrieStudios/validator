# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic
Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- **feat**: `null` as a rule to validate that a value is null, take note this can be used in tandem with conditional groups, for example:
```typescript
const v = new Validator({a: '(string_ne)(null)'});
v.check({a: null}); /* true */
v.check({a: false}); /* false */
v.check({a: "Hello world"}); /* true */
```
- **deps**: typescript-eslint (dev dep)

### Improved
- **feat**: `less_than` and `lt` now support Blob and File to verify their size is below a certain number of bytes
- **feat**: `less_than_or_equal` and `lte` now support Blob and File to verify their size is below or equal to a certain number of bytes
- **feat**: `greater_than` and `lt` now support Blob and File to verify their size is above a certain number of bytes
- **feat**: `greater_than_or_equal` and `lte` now support Blob and File to verify their size is above or equal to a certain number of bytes
- **deps**: Upgrade @valkyriestudios/utils to 12.24.0
- **deps**: Upgrade eslint to 9.11.1
- **deps**: Upgrade nyc to 17.1.0
- **deps**: Upgrade typescript to 5.6.2
- **deps**: Upgrade @types/node to 20.16.10

### Removed
- **deps**: @typescript-eslint/eslint-plugin
- **deps**: @typescript-eslint/parser

## [9.24.0] - 2024-09-07
### Added
- **feat**: Validator@checkForm - Instance function which checks if a FormData instance is valid and returns it as an object if it is. Perfect for middleware situations in backend endpoints
```typescript
type User = {
    age: number;
    name: string;
};
const v = new Validator<User>({
    name: 'string_ne|min:2',
    age: 'integer|between:1,150',
});

const form = new FormData();
form.append('name', 'Peter');
form.append('age', '34');
const result = v.checkForm(form);
if (!result) return;

... // result is typed as User here and will be {name: "Peter", age: 34}
```
- **feat**: Validator@check now supports FormData validation
```typescript
const v = new Validator({
    name: 'string_ne|min:2',
    age: 'integer|between:1,150',
});

const form = new FormData();
form.append('name', 'Peter');
v.check(form); // false

form.append('age', '40');
v.check(form); // true
```
- **feat**: Validator@validate now supports FormData validation
```typescript
const v = new Validator({
    name: 'string_ne|min:2',
    age: 'integer|between:1,150',
});

const form = new FormData();
form.append('name', 'Peter');
console.log(v.validate(form).is_valid); // false

form.append('age', '40');
console.log(v.validate(form).is_valid); // true
```

### Improved
- **deps**: Upgrade @valkyriestudios/utils to 12.22.0
- **deps**: Upgrade @types/node to 20.16.5

## [9.23.0] - 2024-08-18
### Added
- **feat**: Rule 'date_iso' - Validates that a provided value is a date string in the iso format of `YYYY-MM-DDTHH:mm:ss.SSSZ`
- **feat**: Rule 'date_day' - Validates that a provided value is a date string in the format of `YYYY-MM-DD`

### Improved
- **perf**: ~2-5% improvement in `url_med` validation thanks to precompiled regexes
- **perf**: ~2-5% improvement in `url_vid` validation thanks to precompiled regexes
- **perf**: ~2-5% improvement in `url_aud` validation thanks to precompiled regexes
- **perf**: ~2-5% improvement in `url_img` validation thanks to precompiled regexes
- **perf**: ~2-5% improvement in `sys_ipv4_or_v6` validation thanks to removal of redundant typeof check and simplification of ops
- **perf**: ~5% improvement in `lt`, `less_than`, `lte`, `less_than_or_equal`, `gt`, `greater_than`, `gte`, `greater_than_or_equal`,  `between`, `between_inc` when using numerical checks thanks to removal of typeof check and simplification of operations
- **sys**: Automated test runs are now run against node 18.x, 20.x and 22.x instead of only 20.x
- **deps**: Upgrade @valkyriestudios/utils to 12.20.0
- **deps**: Upgrade @types/node to 20.16.0

## [9.22.0] - 2024-08-10
### Improved
- **deps**: Upgrade @valkyriestudios/utils to 12.19.0

## [9.21.0] - 2024-08-05
### Improved
- **deps**: Upgrade @valkyriestudios/utils to 12.18.0
- **deps**: Upgrade @types/node to 20.14.14
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.18.0
- **deps**: Upgrade @typescript-eslint/parser to 7.18.0
- **deps**: Upgrade esbuild-register to 3.6.0
- **deps**: Upgrade typescript to 5.5.4

## [9.20.0] - 2024-07-21
### Improved
- **deps**: Upgrade @valkyriestudios/utils to 12.17.1

## [9.19.0] - 2024-07-21
### Improved
- **deps**: Upgrade @valkyriestudios/utils to 12.17.0
- **deps**: Upgrade @types/node to 20.14.11
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.16.1
- **deps**: Upgrade @typescript-eslint/parser to 7.16.1

## [9.18.0] - 2024-07-16
### Improved
- **deps**: Upgrade @valkyriestudios/utils to 12.14.0

## [9.17.0] - 2024-07-15
### Improved
- **deps**: Upgrade @valkyriestudios/utils to 12.13.0

## [9.16.0] - 2024-07-07
### Improved
- **deps**: Upgrade @valkyriestudios/utils to 12.12.0
- **deps**: Upgrade @types/node to 20.14.10

## [9.15.0] - 2024-07-04
### Improved
- **perf**: ~5-10% performance improvement for coldstart validate/check validators
- **perf**: ~5% performance improvement on validate with existing validator instances
- **deps**: Upgrade @valkyriestudios/utils to 12.11.0
- **deps**: Upgrade @types/node to 20.14.9
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.15.0
- **deps**: Upgrade @typescript-eslint/parser to 7.15.0
- **deps**: Upgrade nyc to 17.0.0
- **deps**: Upgrade typescript to 5.5.3

## [9.14.0] - 2024-06-02
### Improved
- **deps**: Upgrade @valkyriestudios/utils to 12.10.0

## [9.13.0] - 2024-06-01
### Added
- **feat**: `url_vid` rule as a way to validate whether or not a value is a valid video url
- **feat**: `url_aud` rule as a way to validate whether or not a value is a valid audio url
- **feat**: `url_med` rule as a way to validate whether or not a value is either a valid video/image/audio url
- **dx**: functions/vContinent now exports a Continent type
- **dx**: functions/vCountry now exports a CountryAlpha2 type
- **dx**: functions/vCountryAlpha3 now exports a CountryAlpha3 type
- **dx**: functions/vTimeZone now exports a TimeZone type

### Improved
- **dx**: functions/vContinent now has a more refined typeguard working with a union type
- **dx**: functions/vCountry now has a more refined typeguard working with a union type
- **dx**: functions/vCountryAlpha3 now has a more refined typeguard working with a union type
- **dx**: functions/vTimeZone now has a more refined typeguard working with a union type
- **dx**: Validator.rules.integer now has a typeguard behind it
- **dx**: Validator.rules.number now has a typeguard behind it
- **deps**: Upgrade @types/node to 20.13.0
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.11.0
- **deps**: Upgrade @typescript-eslint/parser to 7.11.0

## [9.12.0] - 2024-05-27
### Improved
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.10.0
- **deps**: Upgrade @typescript-eslint/parser to 7.10.0
- **deps**: Upgrade @valkyriestudios/utils to 12.9.0

## [9.11.0] - 2024-05-18
### Added
- **feat**: `base64` rule as a way to validate whether or not a value is a valid base64 encoded string

### Improved
- **perf**: ~6-8% performance improvement in phone validation rule thanks to reduction in unnecessary internal operations
- **deps**: Upgrade @types/node to 20.12.2
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.9.0
- **deps**: Upgrade @typescript-eslint/parser to 7.9.0
- **deps**: Upgrade @valkyriestudios/utils to 12.8.0

## [9.10.0] - 2024-05-02
### Improved
- **dx**: functions/vAlphaNumSpaces now acts as a typeguard
- **dx**: functions/vAlphaNumSpacesMultiline now acts as a typeguard
- **dx**: functions/vColorHex now acts as a typeguard
- **dx**: functions/vContinent now acts as a typeguard
- **dx**: functions/vCountry now acts as a typeguard
- **dx**: functions/vCountryAlpha3 now acts as a typeguard
- **dx**: functions/vDateString now acts as a typeguard
- **dx**: functions/vEmail now acts as a typeguard
- **dx**: functions/vFalse now acts as a typeguard
- **dx**: functions/vGeoLatitude now acts as a typeguard
- **dx**: functions/vGeoLongitude now acts as a typeguard
- **dx**: functions/vGuid now acts as a typeguard
- **dx**: functions/vPhone now acts as a typeguard
- **dx**: functions/vSysIPv4 now acts as a typeguard
- **dx**: functions/vSysIPv4_or_v6 now acts as a typeguard
- **dx**: functions/vSysIPv6 now acts as a typeguard
- **dx**: functions/vSysMac now acts as a typeguard
- **dx**: functions/vSysPort now acts as a typeguard
- **dx**: functions/vTimeZone now acts as a typeguard
- **dx**: functions/vTrue now acts as a typeguard
- **dx**: functions/vUrl now acts as a typeguard
- **dx**: functions/vUrlImage now acts as a typeguard
- **dx**: functions/vUrlNoQuery now acts as a typeguard

## [9.9.0] - 2024-05-01
### Improved
- **perf**: minor ~3% improvement in validator construction
- **perf**: minor ~3% improvement in coldstart validation
- **perf**: minor ~3% improvement in coldstart checks
- **perf**: minor ~5% improvement in non-coldstart validation
- **perf**: minor ~5% improvement in non-coldstart checks
- **deps**: Upgrade @valkyriestudios/utils to 12.7.0

## [9.8.1] - 2024-04-30
### Fixed
- **deps**: Upgrade @valkyriestudios/utils to 12.6.1

## [9.8.0] - 2024-04-30
### Improved
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.8.0
- **deps**: Upgrade @typescript-eslint/parser to 7.8.0
- **deps**: Upgrade @valkyriestudios/utils to 12.6.0

## [9.7.0] - 2024-04-26
### Added
- **feat**: `formdata` rule as a way to validate whether or not a value is an instance of FormData

### Improved
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.7.1
- **deps**: Upgrade @typescript-eslint/parser to 7.7.1
- **deps**: Upgrade @valkyriestudios/utils to 12.5.0
- **deps**: Upgrade @valkyriestudios/data-countries to 0.3.0
- **deps**: Upgrade @valkyriestudios/data-continents to 0.3.0
- **deps**: Upgrade @valkyriestudios/data-timezones to 0.6.0

## [9.6.0] - 2024-04-18
### Improved
- sys: Validator is now exported as a named export to allow for working with non-modularized setups, for example:
```typescript
/* Only available way previously */
import Validator from '@valkyriestudios/validator'

/* Now also possible */
import {Validator} from '@valkyriestudios/validator';
```
- **deps**: Upgrade @valkyriestudios/utils to 12.4.0

## [9.5.0] - 2024-04-16
### Improved
- **dx**: Improve on typed validator construction by allowing both a string or object to be used, eg:
```typescript
type Contact = {
    email: string;
    phone: string;
}

type User = {
    first_name: string;
    last_name: string;
    contact: Contact;
    tags: string[];
}

Validator.extendSchema<Contact>('contact', {email: 'email', phone: 'phone'});

/* This is valid */
const v = new Validator<User>({
    first_name: 'string_ne|min:3',
    last_name: 'string_ne|min:3',
    contact: 'contact',
    tags: '[unique|min:1]string_ne',
});

/* This is also valid */
const v = new Validator<User>({
    first_name: 'string_ne|min:3',
    last_name: 'string_ne|min:3',
    contact: {
        email: 'email',
        phone: 'phone',
    },
    tags: '[unique|min:1]string_ne',
});

/* This is not valid */
const v = new Validator<User>({
    first_name: 'string_ne|min:3',
    last_name: 'string_ne|min:3',
    contact: {
        email: 'email',
    },
    tags: '[unique|min:1]string_ne',
});
```

## [9.4.0] - 2024-04-16
### Improved
- **dx**: It is now possible to pass multi-dimensional types as part of Validator construction for type checks/guards. eg:
```typescript
type User = {
    first_name: string;
    last_name: string;
    contact: {
        email: string;
        phone: string;
    };
    tags: string[];
};

const v = new Validator<User>({
    first_name: 'string_ne|min:3',
    last_name: 'string_ne|min:3',
    contact: {
        email: 'email', /* Typescript will complain because the phone prop is missing here */
    },
    tags: '[unique|min:1]string_ne',
});
```
- **perf**: Improved Validator construction time by ~7-10%
- **perf**: Improved Coldstart Validator checks/validation by ~7-10%
- **perf**: Improved Existing Validator checks/validation by ~2-5%
- **deps**: Upgrade @types/node to 20.12.7
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.7.0
- **deps**: Upgrade @typescript-eslint/parser to 7.7.0
- **deps**: Upgrade typescript to 5.4.5

## [9.3.0] - 2024-04-09
### Improved
- **perf**: Improved Validator.validate performance by ~25-50% for validators with up to and including 3 levels of depth
- **perf**: Improved Validator.check performance by ~25-50% for validators with up to and including 3 levels of depth by

## [9.2.0] - 2024-04-09
### Improved
- **deps**: Upgrade @valkyriestudios/utils to 12.3.0

## [9.1.0] - 2024-04-09
### Improved
- **dx**: Validator.extendSchema now also allows working with a generic to register schemas, example:
```typescript
type User = {
    uid: string;
    fname: string;
};

/* linting will complain because the schema is missing the uid prop of user */
Validator.extendSchema<User>('user', {
    uid: 'string_ne|min:3',
});
```

## [9.0.0] - 2024-04-09
### Added
- **dx**: Validator.check now applies a type guard when working with a typed validator. Below is an example
```typescript
type User = {
    uid:string;
    fname:string;
};

const v = new Validator<User>({uid: 'guid', fname: 'string_ne|min:1|max:128'});

/* At this point 'a' is still seen as 'any' by typescript */
const a = JSON.parse('{"uid":"80efa943-f88d-40a9-8378-39ed62287d05", "fname": "Peter"}');
if (!v.check(a)) return;

/* At this point 'a' is seen as an instance of User thanks to the type guard on check */
a.uid;
```

### Improved
- **perf**: Minor performance improvement in enum behavior due to not needing internal type checks (native Set enforces strict typing)
- **deps**: Upgrade @types/node to 20.12.6
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.6.0
- **deps**: Upgrade @typescript-eslint/parser to 7.6.0
- **deps**: Upgrade @valkyriestudios/utils to 12.2.0

### Breaking
- **feat**: Instantiating a validator while wrapping with TV<...> will no longer work as the need for the TV<...> wrap is now gone. Instead the type can simply be passed directly. below is an example of old vs new. This change goes hand in hand with the new type-guard addition for Validator.check (see added)
```typescript
type User = {fname: string; lname: string};

/* OLD */
const v = new Validator<TV<User>>({fname: 'string_ne|min:1|max:128', lname: 'string_ne|min:1|max:128'});

/* NEW */
const v = new Validator<User>({fname: 'string_ne|min:1|max:128', lname: 'string_ne|min:1|max:128'});
```

### Removed
- **feat**: TV type export as no longer required (see **breaking** and **added**)

## [8.3.0] - 2024-04-05
### Improved
- **perf**: Improved performance of rule parsing/validator construction by ~5% thanks to precompiled regexes and favoring test over match
- **perf**: rule - alpha_num_spaces: Improved performance by ~5-10% due to optimizing regex usage
- **perf**: rule - alpha_num_spaces_multiline: Improved performance by ~5-10% due to optimizing regex usage
- **perf**: rule - color_hex: Improved performance by ~5-25% due to optimizing regex usage
- **perf**: rule - country: Minor ~5% performance improvement due to dropping unnecessary type check
- **perf**: rule - country_alpha3: Minor ~5% performance improvement due to dropping unnecessary type check
- **perf**: rule - continent: Minor ~5% performance improvement due to dropping unnecessary type check
- **perf**: rule - time_zone: Minor ~5% performance improvement due to dropping unnecessary type check
- **perf**: rule - email: ~50% performance improvement due to optimizing regex usage
- **perf**: rule - guid: Improved performance by ~5-10% due to optimizing regex usage
- **perf**: rule - phone: Improved performance by ~5-10% due to optimizing regex usage and reducing operations
- **perf**: rule - sys_ipv4: Improved performance by ~2% due to optimizing regex usage
- **perf**: rule - sys_ipv6: Improved performance by ~2% due to optimizing regex usage
- **perf**: rule - sys_ipv4_or_v6: Improved performance by ~2% due to optimizing regex usage
- **perf**: rule - sys_mac: Improved performance by ~10% due to optimizing regex usage
- **perf**: rule - url: Improved performance by ~5-10% due to optimizing regex usage
- **perf**: rule - url_img: Improved performance by ~5-10% due to optimizing regex usage
- **perf**: rule - url_noquery: Improved performance by ~5-10% due to optimizing regex usage
- **deps**: Upgrade @valkyriestudios/utils to 12.1.0
- **deps**: Upgrade @types/node to 10.12.4
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.5.0
- **deps**: Upgrade @typescript-eslint/parser to 7.5.0
- **deps**: Upgrade typescript to 5.4.4

## [8.2.0] - 2024-03-21
### Improved
- **perf**: Improved performance of Validator construction by ~5-10%
- **perf**: Improved performance of Validator coldstart validation by ~5-40% (depending on the size of ruleset)
- **perf**: Improved performance of Validator coldstart checks by ~5-40% (depending on the size of ruleset)
- **perf**: Improved performance of Existing Validator checks by ~5-7% (depending on the size of ruleset)
- **perf**: Improved performance of direct-access enum rules (Validator.rules.*) by ~15-20%
- **perf**: Known degradation of ~10% for coldstart validation of Validators with grouped rules eg: '(string_ne)(false)'
- **deps**: Upgrade @types/node to 20.11.30
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.3.1
- **deps**: Upgrade @typescript-eslint/parser to 7.3.1
- **deps**: Upgrade typescript to 5.4.3

## [8.1.1] - 2024-03-09
### Fixed
- **groups**: Fixed an issue where using a rule with a dash or underscore in combination with conditional OR groups (eg: (string_ne|min:1)(false)) would not be correctly validated due to a regex mismatch when parsing

## [8.1.0] - 2024-03-08
### Added
- **iterable**: Ability to validate a kv-map object's values using iterable configuration `{}`. Same options apply as for array iterables (unique, min, max)

## [8.0.0] - 2024-03-07
### Added
- **Validator@extendSchema**: Register a rule object as a rule on its own and use it within other Validators

### Improved
- **deps**: Upgrade @valkyriestudios/utils to 12.0.0
- **deps**: Upgrade @types/node to 20.11.25
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.1.1
- **deps**: Upgrade @typescript-eslint/parser to 7.1.1
- **deps**: Upgrade typescript to 5.4.2

## [7.10.0] - 2024-02-27
### Improved
- **Validator@validate**: Now has a typed return result
- **deps**: Upgrade @valkyriestudios/utils to 11.7.0
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.1.0
- **deps**: Upgrade @typescript-eslint/parser to 7.1.0
- **deps**: Upgrade eslint to 8.57.0

## [7.9.0] - 2024-02-23
### Improved
- **Validator@check**: Slight performance improvement when doing array validation by implementing alternative early escape mechanic using parent loop breaker
- **deps**: Upgrade @valkyriestudios/utils to 11.6.0

## [7.8.0] - 2024-02-22
### Improved
- **sys**: Swap out map for set usage where possible to reduce memory footprint
- **sys**: Add missing optional idx key to evaluation error struct (this is used when validating arrays)
- **deps**: Upgrade @valkyriestudios/utils to 11.5.0
- **deps**: Upgrade @types/node to 20.11.20

## [7.7.0] - 2024-02-20
### Added
- **feat**: typings: Added RulesRaw type export
- **feat**: typings: Added GenericObject type export

### Improved
- **deps**: Upgrade @types/node to 20.11.19
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.0.2
- **deps**: Upgrade @typescript-eslint/parser to 7.0.2

## [7.6.0] - 2024-02-15
### Improved
- **dx**: Validator.rules getter is now correctly flagged as returning a Readonly RuleDictionary
- **perf**: Making use of Validator.rules.* will now be magnitudes (15-20x) faster as it no longer constructs a frozen rule store on every call to it (see difference for rules/* between v7_4_0 benchmark and v7_6_0 benchmark)

## [7.5.0] - 2024-02-15
### Added
- **feat**: Rule: async_function - Will check whether or not something is an async function

### Improved
- **deps**: Upgrade @valkyriestudios/utils to 11.4.0
- **deps**: Upgrade @types/node to 20.11.18

## [7.4.0] - 2024-02-14
### Added
- **feat**: Rule: sys_port - Will check whether or not something is a valid port according to the tcp range

## [7.3.0] - 2024-02-13
### Added
- **feat**: typings: Added TV type export

## [7.2.0] - 2024-02-13
### Added
- **feat**: Rule: function - Will check whether or not something is a function

## [7.1.0] - 2024-02-13
### Improved
- **dx**: Validator@check Now makes use of a generic for its input
- **dx**: Validator@validate Now makes use of a generic for its input
- **deps**: Upgrade @typescript-eslint/eslint-plugin to 7.0.1
- **deps**: Upgrade @typescript-eslint/parser to 7.0.1

## [7.0.0] - 2024-02-10
### Added
- Migrate to Typescript and as such comes with declarations 🚀
- .nycrc
- **deps**: @types/node@20.11.6
- **deps**: @typescript-eslint/eslint-plugin@6.21.0
- **deps**: @typescript-eslint/parser@6.21.0
- **deps**: esbuild-register@3.5.0
- **deps**: nyc@15.1.0
- **deps**: typescript@5.3.3

### Improved
- **perf**: Minor performance improvements across the board, for more details check the difference between v7 and v6 in the test/benchmarks folder
- **deps**: Upgrade @valkyriestudios/utils to 11.3.0

### Removed
- .babelrc
- .c8rc.json
- **deps**: @babel/cli
- **deps**: @babel/core
- **deps**: @babel/eslint-parser
- **deps**: @babel/plugin-syntax-import-assertions
- **deps**: @babel/preset-env
- **deps**: @babel/register
- **deps**: babel-plugin-transform-minify-booleans
- **deps**: babel-plugin-transform-remove-console
- **deps**: c8 (in favor of nyc)

## [6.0.0] - 2023-12-14
### Added
- **feat**: Rule: false - Will check whether or not something is strictly false
- **feat**: Rule: true - Will check whether or not something is strictly true
- **feat**: Validator@extendRegex: This new method allows registering one or more regexes as validation rules, as with all validator extensions the name of the regex (key in the object) can be used as part of a validation rule or called directly through Validator.rules.
```
Validator.extendRegex({contains_hello: /((h|H)ello|(o|O)la)/});
new Validator({a: 'contains_hello'}).check({a: 'Hello there'})); // true
new Validator({a: 'contains_hello'}).check({a: 'hello there'})); // true
new Validator({a: 'contains_hello'}).check({a: 'ola amigos'})); // true
new Validator({a: 'contains_hello'}).check({a: 'Ola amigos'})); // true

new Validator({a: '!contains_hello'}).check({a: 'Hello there'}); // false
new Validator({a: '!contains_hello'}).check({a: 'hello there'}); // false
new Validator({a: '!contains_hello'}).check({a: 'ola amigos'}); // false
new Validator({a: '!contains_hello'}).check({a: 'Ola amigos'}); // false
```
- **feat**: Added support for conditional or-grouping in check and validate, allowing multiple rule groups to be used for a single field. When using the new or-groups a field will be valid if at least one of the groups is valid. For example:
```
new Validator({a: '(integer|between:1,150)(false)'}).check({a: false}); // true
new Validator({a: '(integer|between:1,150)(false)'}).check({a: true}); // false
new Validator({a: '(integer|between:1,150)(false)'}).check({a: -150}); // false
new Validator({a: '(integer|between:1,150)(false)'}).check({a: 50}); // true

new Validator({a: '?(integer|between:1,150)(integer|between:-1,150)'}).check({a: 50}); // true
new Validator({a: '?(integer|between:1,150)(integer|between:-1,150)'}).check({a: -50}); // true
new Validator({a: '?(integer|between:1,150)(integer|between:-1,150)'}).check({a: 0}); // false
new Validator({a: '?(integer|between:1,150)(integer|between:-1,150)'}).check({}); // true
```

### Improved
- **Validator@extend**: Will now throw if a rule name contains anything but alphanumeric, dashes or underscore characters
- **Validator@extendMulti**: Will now throw if a rule name contains anything but alphanumeric, dashes or underscore characters
- **Validator@extendEnum**: Will now throw if a rule name contains anything but alphanumeric, dashes or underscore characters
- **deps**: Upgrade @valkyriestudios/utils to 10.0.0
- **deps**: Upgrade @babel/core to 7.23.6
- **deps**: Upgrade @babel/preset-env to 7.23.6

## [5.0.0] - 2023-12-10
### Added
- **feat**: Validator @extendEnum: This new method allows registering one or more enumerations as validation rules, as with all validator extensions the name of the enum can then be used as part of a validation rule or called directly through Validator.rules. Take note: currently only arrays of primitive strings/numbers are allowed. For example:
```
Validator.extendEnum({
    FRUITS: ['apple', 'pear', 'banana'],
    ANIMALS: ['dog', 'cat', 'parrot'],
    AGE_13_18: [13, 14, 15, 16, 17, 18],
    AGE_19_25: [19, 20, 21, 22, 23, 24, 25],
});

new Validator({age: 'AGE_13_18'}).check({age: 15}); // true
new Validator({age: '!AGE_13_18'}).check({age: 19}); // true

Validator.rules.AGE_13_18(15); // true
```
- **feat**: Validator Instance @check: This new method only returns whether or not a data object is valid against the validator and as such is magnitudes faster at spotting invalidity than the @validate function, it is also faster at spotting validity due to less internal overhead, for example:
```
const v = new Validator({
    first_name  : 'string_ne|min:3',
    last_name   : 'string_ne|min:3',
});

//  v5: using the faster @check
const is_valid = v.check({first_name: 'Peter'});

//  Pre v5: using the slower @validate (of course this is still possible in v5)
const is_valid = v.validate({first_name: 'Peter'}).is_valid;
```
- **feat**: Validator Instance @validate: Will now also contain a 'count' value containing the count of invalid fields

### Improved
- **doc**: Add CodeQL badge to readme
- **misc**: Add .c8rc.json and CHANGELOG.md to npmignore
- **perf**: Creation of Validator instances is now between 1.2 to 1.8 times faster
- **perf**: Cold validation (creating a validator and running .validate at same time) is now between 2 to 3 times faster
- **perf**: Warm validation (pre-existing validator and running .validate repeatedly) is now roughly 4 to 5 times faster
- **perf**: Check validation is at minimum the same speed, but can (depending on the validator) be magnitudes faster both in cold and warm validation
- **perf**: vIn validation is now ~7% faster than in v 4.1
- **feat**: rule vEmail: Now allows up to 63 octets in tld to allow for for example .coffee, .alfaromeo, etc (RFC 1034)
- **feat**: Validator Instance@validate: will now return a fixed `'NO_DATA'` as errors instead of an empty object when calling without data. For example:
```
const v = new Validator({
    first_name  : 'string_ne|min:3',
    last_name   : 'string_ne|min:3',
});

//  v5
v.validate('bla'); // expected output: {is_valid: false, count: 2, errors: 'NO_DATA'}

//  v4
v.validate('bla'); // expected output: {is_valid: false, errors: {}}
```

### Breaking
- Removed internal storage of past results of a validator inside of the instance as in most real-world use cases this is either not used or not wanted. This reduces memory usage as well as allows for further performance boosts (see improved section)
- Validator Instance@validate: Error message for multi-Dimensional validators (validators working with deeply nested object) will no longer come back in their deeply nested form but as a single-dimensional object, this makes it easier to understand and process externally
```
new Validator({
    address: {
        street: 'string|alpha_num_spaces',
        nr: 'integer',
        zip: 'integer|between:1000,9999',
    },
    contact: {
        email: 'string|email',
    },
}).validate({
    address: {
        street: 'First avenue',
        nr: 23,
        zip: false,
    },
    contact: {
        email: 'bla',
    },
});

// pre v5 output
{
    is_valid: false,
    errors: {
        address: {
            street: [],
            nr: [],
            zip: [
                {msg: 'integer', params: []},
                {msg: 'between', params: ['1000', '9999']}
            ]
        },
        contact: {
            email: [
                {msg: 'email', params: []}
            ]
        }
    }
}

// v5 output
{
    is_valid: false,
    count: 2,
    errors: {
        'address.zip': [
            {msg: 'integer', params: []},
            {msg: 'between', params: ['1000', '9999']}
        ],
        'contact.email': [
            {msg: 'email', params: []}
        ],
    }
}
```
- Validator Instance@validate: Evaluation error objects will no longer contain a key for every single field but will only contain a key for fields that were invalid, this allows for easier processing, for example:
```
new Validator({
    first_name: 'string_ne|min:2',
    last_name: 'string_ne|min:2',
    phone: '?phone',
    email: 'email',
}).validate({first_name: 'Peter', last_name: 'Vermeulen'});

// pre v5 output
{
    is_valid: false,
    errors: {
        first_name: [],
        last_name: [],
        phone: [],
        email: [{msg: 'email', params: []}]
    }
}

// v5 output
{
    is_valid: false,
    count: 1,
    errors: {
        email: [{msg: 'email', params: []}]
    }
}
```
- Validator Instance@validate: If a field is invalid because of it not existing a `{msg: 'not_found'}` will now be used instead of the list of all rule types, for example:
```
new Validator({myfield: 'string_ne|min:20'}).validate({myotherfield: 'hello'});

// pre v5 output
{
    is_valid: false,
    errors: {
        myfield: [
            {msg: 'string_ne', params: []},
            {msg: 'min', params: [20]}
        ]
    }
}

// v5 output
{
    is_valid: false,
    count: 1,
    errors: {
        myfield: [{msg: 'not_found'}]
    }
}
```

### Removed
- Validator Instance@errors getter (see breaking section for reasons why)
- Validator Instance@is_valid getter (see breaking section for reasons why)

## [4.1.0] - 2023-12-08
### Added
- Rule 'url_img' to validate if a url is an image url, checks against the following formats: `jpg, jpeg, jpe, jif, jfif, jfi, png, ico, cur, tiff, tif, gif, webp, bmp, dib, svg, svgz, heif, heifs, heic, heics, avci, avcs, avif, hif`

### Improved
- **deps**: Upgrade @valkyriestudios/data-timezones to 0.5.0
- **Rule 'url'**: Improved performance of validity checks for valid urls by ~2.5x
- **Rule 'url'**: Improved performance of validity checks for invalid urls by ~87x
- **Rule 'url'**: Now adheres to RFC 2396 in that double slashes are valid and urls ending in a dot are considered valid
- **Rule 'url_noquery'**: Improved performance of validity checks for valid urls by ~2.5x
- **Rule 'url_noquery'**: Improved performance of validity checks for invalid urls by ~87x
- **Rule 'url_noquery'**: Now adheres to RFC 2396 in that double slashes are valid and trailing dots in tlds are considered valid
- **perf**: Minor performance improvement of ~.02x in creation and coldstart validation due to split limiting on iterable rule checks

### Fixed
- Fixed possible redos issue in regex behavior during main validator construction and parameterization (found by CodeQL)
- Fixed overly permissive regex range during main validator construction and parameterization (found by CodeQL)
- Fixed possible redos issue in regex behavior during url rule validation (found by CodeQL)
- Fixed possible redos issue in regex behavior during url_noquery rule validation (found by CodeQL)

## [4.0.0] - 2023-12-07
### Added
- **deps**: c8@8.0.1
- **deps**: @babel/eslint-parser (used for assert type during import in test files)
- **deps**: @babel/plugin-syntax-import-assertions (used for assert type during import in test files)
- **deps**: @valkyriestudios/data-countries
- **deps**: @valkyriestudios/data-continents
- **deps**: @valkyriestudios/data-timezones
- **Rule 'in'**: Now supports passing a comma-delimited string of string values (eg: `in:jpeg,jpg,png`) on top of the previous parameter support

### Improved
- **deps**: Upgrade @valkyriestudios/utils to 9.0.0
- **deps**: Upgrade @babel/cli to 7.23.4
- **deps**: Upgrade @babel/core to 7.23.5
- **deps**: Upgrade @babel/preset-env to 7.23.5
- **deps**: Upgrade eslint to 8.55.0
- **misc**: Switch from using chai/mocha to node native test runner
- **misc**: Switch internals to .mjs format
- **misc**: Reduce total bundle size when importing all of validator by not importing full country/continent data packs from @valkyriestudios/utils (still verifying correctness against the packs through tests)
- **misc**: Published package will now also include original mjs src files which can be imported through @valkyriestudios/validator/src/\*
- **perf**: Performance boost across the board thanks to @valkyriestudios/utils:8.x
- **perf**: Performance boost across the board due to swapping out internal behaviors supporting pre-2016 browsers for more widely supported primordials (eg Number.isFinite/Number.isInteger/Array.isArray)
- **Rule**: vPhone ~.05x performance improvement on valid phone checks thanks to regex capture group improvements as well as swapping out of startsWith/endsWith vs charAt for single char checks
- **Rule**: vEmail ~.1x performance improvement on valid email checks thanks to regex capture group improvements as well as swapping substring checks for charAt for single char checks
- **Rule**: vEmail now allows up to 6 characters in TLD (adding support for eg: .coffee as a domain) (@SpekkoRice)
- **Rule**: vTimeZone 72x performance improvement due to ditching usage of Intl spec for verifying whether or not a zone exists in favor of embedded timezone/alias names (still being verified through tests with @valkyriestudios/data-timezones)

### Breaking
- **Rule 'url'**: Will no longer see a string that is a url after trimming as valid
- **Rule 'url_noquery'**: Will no longer see a string that is a url after trimming as valid
- **Validator@extendMulti**: Will now throw instead of silently do nothing when passed anything but an object
- Any string-based rules no longer support incoming values created via `new String(...)`
- Any number-based rules no longer support incoming values created via `new Number(...)`
- Any boolean-based rules no longer support incoming values created via `new Boolean(...)`

### Fixed
- **Rule**: vEmail edge-case redos issue in regex behavior (found by CodeQL)

### Removed
- **deps**: chai (in favor of native node test runner)
- **deps**: chai-as-promised (in favor of native node test runner)
- **deps**: eslint-plugin-mocha (in favor of native node test runner)
- **deps**: mocha
- **deps**: nyc
- **deps**: babel-plugin-check-es2015-constants (as not needed)
- **deps**: babel-plugin-transform-member-expression-literals (as not needed)
- **deps**: babel-plugin-transform-property-literals (as not needed)

## [3.11.0] - 2023-10-22
### Improved
- **deps**: Upgrade @valkyriestudios/utils to 7.5.0
- **deps**: Upgrade @babel/cli to 7.23.0
- **deps**: Upgrade @babel/core to 7.23.2
- **deps**: Upgrade @babel/preset-env to 7.23.2
- **deps**: Upgrade @babel/register to 7.22.15
- **deps**: Upgrade chai to 4.3.10
- **deps**: Upgrade eslint to 8.52.0
- **deps**: Upgrade eslint-plugin-mocha to 10.2.0

## [3.10.0] - 2023-06-25
### Added
- **Validation Rule**: continent
- **Validation Rule**: country
- **Validation Rule**: country_alpha3

### Improved
- **deps**: Upgrade @valkyriestudios/utils to 7.3.0

## [3.9.0] - 2023-06-24
### Added
- **deps**: eslint-plugin-mocha
- **misc**: Move .eslintrc.json into src
- **misc**: Add .eslintrc.json for test
- **misc**: Add lint_tests script
- **Validation Rule**: time_zone

### Improved
- **deps**: Upgrade eslint to 8.43.0

### Removed
- **deps**: chai-spies as no longer in use

## [3.8.0] - 2023-06-14
### Improved
- **deps**: Upgrade @valkyriestudios/utils to 7.2.0
- **deps**: Upgrade @babel/cli to 7.22.5
- **deps**: Upgrade @babel/core to 7.22.5
- **deps**: Upgrade @babel/preset-env to 7.22.5
- **deps**: Upgrade @babel/register to 7.22.5
- **deps**: Upgrade eslint to 8.42.0

### Fixed
- vEmail: Fixed an issue where ampersand characters in the username part of an email where seen as invalid (eg: 'me&you@mydomain.com')

## [3.7.0] - 2023-05-07
### Added
- **deps**: @babel/cli
- **deps**: babel-plugin-check-es2015-constants
- **deps**: babel-plugin-transform-member-expression-literals
- **deps**: babel-plugin-transform-minify-booleans
- **deps**: babel-plugin-transform-property-literals
- **deps**: babel-plugin-transform-remove-console
- **misc**: .babelrc
- **misc**: Switch to using babel-cli for transpiling build

### Improved
- **deps**: Upgrade @valkyriestudios/utils to 7.0.0
- **deps**: Upgrade @babel/core to 7.21.8
- **deps**: Upgrade eslint to 8.40.0

### Removed
- **deps**: gulp
- **deps**: gulp-babel
- **misc**: gulpfile

## [3.6.0] - 2023-04-29
### Improved
- **deps**: Upgrade @valkyriestudios/utils to 6.2.0
- **deps**: Upgrade @babel/core to 7.21.5
- **deps**: Upgrade @babel/preset-env to 7.21.5

## [3.5.0] - 2023-04-23
### Improved
- **deps**: Upgrade @valkyriestudios/utils to 6.1.0
- **deps**: Upgrade eslint to 8.39.0
- **perf**: Minor performance improvement due to internal direct-link rather than wrap link to utils lib functions
- **misc**: Reduce eventual bundle size for package

## [3.4.1] - 2023-04-05
### Fixed
- **vEmail**: Fix issue where emails ending in dash for the local part of the email are treated as invalid

## [3.4.0] - 2023-04-01
### Improved
- **deps**: Upgrade @valkyriestudios/utils to 5.3.1
- **deps**: Upgrade @babel/core to 7.21.4
- **deps**: Upgrade @babel/preset-env to 7.21.4
- **deps**: Upgrade @babel/register to 7.21.0
- **deps**: Upgrade eslint to 8.37.0

## [3.3.0] - 2023-01-22
### Added
- **Validator@rules**: A static getter on the main Validator class that returns an object containing the configured ruleset (immutable and dereferenced)
- **rule**: between_inc
- **rule**: date_string
- **rule**: geo_latitude
- **rule**: geo_longitude
- **rule**: guid
- **rule**: phone
- **rule**: sys_mac
- **rule**: sys_ipv4
- **rule**: sys_ipv6
- **rule**: sys_ipv4_or_v6
- **rule**: gt (alias of 'greater_than' rule)
- **rule**: gte (alias of 'greater_than_or_equal' rule)
- **rule**: lt (alias of 'less_than' rule)
- **rule**: lte (alias of 'less_than_or_equal' rule)
- **rule**: eq (alias of 'equal_to' rule)

### Improved
- **deps**: Upgrade @babel/core to 7.20.12
- **deps**: Upgrade eslint to 8.32.0
- **deps**: Upgrade mocha to 10.2.0

## [3.2.0] - 2022-11-20
### Improved
- **deps**: Upgrade @valkyriestudios/utils to 5.3.0
- **deps**: Upgrade @babel/core to 7.20.2
- **deps**: Upgrade @babel/preset-env to 7.20.2
- **deps**: Upgrade chai to 4.3.7
- **deps**: Upgrade eslint to 8.28.0
- **deps**: Upgrade mocha to 10.1.0

### Fixed
- Fixed an issue where url validation was not properly applying checks on query strings when slashes for tld did not exist

## [3.1.0] - 2022-10-10
### Added
- Readd required rule as might otherwise break some setups
- Readd base index

## [3.0.0] - 2022-10-09
### Added
- **Validator@extendMulti**: Extend the validator by passing an object, each key should have a function as its value
- **Validator Not Flag (!)**: allow reverse validating, eg: !equal_to:foo would validate false if value is passed as foo. Can be applied on all rules (including custom ones)
- **Validator Iterable Flag**: Allow validating an array of values against a set of rules, eg: {a: '[]integer|between:5,10'} would validate 'a' as an array of integers between 5 and 10. (also works with parameterization, custom rules and new not flag).

### Improved
- **deps**: Upgrade @valkyriestudios/utils to 5.2.0
- **deps**: Upgrade @babel/core to 7.19.3
- **deps**: Upgrade @babel/preset-env to 7.19.3
- **deps**: Upgrade eslint to 8.24.0
- **Validator@extend**: Will now throw if the name passed is not a string and the value passed is not a function
- **Validator@validate**: Will now throw a proper error if a rule does not exist, instead of throwing a non-descriptive error

### Removed
- Rule: 'required'

## [2.3.0] - 2022-08-21
### Added
- **Feat**: new rule - string_ne
- **Feat**: new rule - array_ne
- **Feat**: new rule - object_ne
- **deps**: @babel/register@7.18.9
- **deps**: chai@4.3.6
- **deps**: chai-as-promised@7.1.1
- **deps**: chai-spies@1.0.0
- **deps**: eslint@8.22.0
- **deps**: mocha@10.0.0
- **deps**: nyc@15.1.0
- **misc**: .babelrc
- **misc**: .nycrc
- **misc**: .eslintrc.json

### Improved
- **deps**: Upgrade @babel/core to 7.18.10
- **deps**: Upgrade @babel/preset-env to 7.18.10
- **deps**: Upgrade @valkyriestudios/utils to 5.1.0

### Removed
- **deps**: istanbul-instrumenter-loader@3.0.1
- **deps**: jasmine-core@3.6.0
- **deps**: karma@4.4.1
- **deps**: karma-chrome-launcher@3.0.0
- **deps**: karma-coverage@2.0.2
- **deps**: karma-jasmine@2.0.1
- **deps**: karma-spec-reporter@0.0.32
- **deps**: karma-webpack@4.0.2
- **deps**: puppeteer@1.10.0
- **deps**: webpack@4.43.0

## [2.2.0] - 2021-01-06
### Added
- **rule**: color_hex
- **rule**: url
- **rule**: url_noquery

### Improved
- **feat**: Allow extend to override rules
- **misc**: Improve on code coverage

## [2.1.0] - 2020-11-01
### Improved
- **deps**: Upgrade @valkyriestudios/utils to 4.0.0

## [2.0.2] - 2020-07-13
### Fixed
- **misc**: Upgrade dependencies, fix vulnerabilities, npm audit

## [2.0.1] - 2020-07-13
### Fixed
- Issue with email validation where 4 and 5 char domain suffixes are seen as invalid
