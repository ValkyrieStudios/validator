# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic
Versioning](https://semver.org/spec/v2.0.0.html).

## [7.3.0] - 2024-02-13
### Added
- feat typings: Added TV type export

## [7.2.0] - 2024-02-13
### Added
- feat: Rule: function - Will check whether or not something is a function

## [7.1.0] - 2024-02-13
### Improved
- dx-typings: Validator@check Now makes use of a generic for its input
- dx-typings: Validator@validate Now makes use of a generic for its input
- Dev Dep: Upgrade @typescript-eslint/eslint-plugin to 7.0.1
- Dev Dep: Upgrade @typescript-eslint/parser to 7.0.1

## [7.0.0] - 2024-02-10
### Added
- Migrate to Typescript and as such comes with declarations 🚀
- .nycrc
- Dev Dep: @types/node@20.11.6
- Dev Dep: @typescript-eslint/eslint-plugin@6.21.0
- Dev Dep: @typescript-eslint/parser@6.21.0
- Dev Dep: esbuild-register@3.5.0
- Dev Dep: nyc@15.1.0
- Dev Dep: typescript@5.3.3

### Improved
- Dep: Upgrade @valkyriestudios/utils to 11.3.0
- Minor performance improvements across the board, for more details check the difference between v7 and v6 in the test/benchmarks folder

### Removed
- .babelrc
- .c8rc.json
- Dev Dep: @babel/cli
- Dev Dep: @babel/core
- Dev Dep: @babel/eslint-parser
- Dev Dep: @babel/plugin-syntax-import-assertions
- Dev Dep: @babel/preset-env
- Dev Dep: @babel/register
- Dev Dep: babel-plugin-transform-minify-booleans
- Dev Dep: babel-plugin-transform-remove-console
- Dev Dep: c8 (in favor of nyc)

## [6.0.0] - 2023-12-14
### Added
- feat: Rule: false - Will check whether or not something is strictly false
- feat: Rule: true - Will check whether or not something is strictly true
- feat: Validator@extendRegex: This new method allows registering one or more regexes as validation rules, as with all validator extensions the name of the regex (key in the object) can be used as part of a validation rule or called directly through Validator.rules.
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
- feat: Added support for conditional or-grouping in check and validate, allowing multiple rule groups to be used for a single field. When using the new or-groups a field will be valid if at least one of the groups is valid. For example:
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
- Validator@extend: Will now throw if a rule name contains anything but alphanumeric, dashes or underscore characters
- Validator@extendMulti: Will now throw if a rule name contains anything but alphanumeric, dashes or underscore characters
- Validator@extendEnum: Will now throw if a rule name contains anything but alphanumeric, dashes or underscore characters
- Dep: Upgrade @valkyriestudios/utils to 10.0.0
- Dev Dep: Upgrade @babel/core to 7.23.6
- Dev Dep: Upgrade @babel/preset-env to 7.23.6

## [5.0.0] - 2023-12-10
### Added
- feat: Validator @extendEnum: This new method allows registering one or more enumerations as validation rules, as with all validator extensions the name of the enum can then be used as part of a validation rule or called directly through Validator.rules. Take note: currently only arrays of primitive strings/numbers are allowed. For example:
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
- feat: Validator Instance @check: This new method only returns whether or not a data object is valid against the validator and as such is magnitudes faster at spotting invalidity than the @validate function, it is also faster at spotting validity due to less internal overhead, for example:
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
- feat: Validator Instance @validate: Will now also contain a 'count' value containing the count of invalid fields

### Improved
- doc: Add CodeQL badge to readme
- misc: Add .c8rc.json and CHANGELOG.md to npmignore
- perf: Creation of Validator instances is now between 1.2 to 1.8 times faster
- perf: Cold validation (creating a validator and running .validate at same time) is now between 2 to 3 times faster
- perf: Warm validation (pre-existing validator and running .validate repeatedly) is now roughly 4 to 5 times faster
- perf: Check validation is at minimum the same speed, but can (depending on the validator) be magnitudes faster both in cold and warm validation
- perf: vIn validation is now ~7% faster than in v 4.1
- feat: rule vEmail: Now allows up to 63 octets in tld to allow for for example .coffee, .alfaromeo, etc (RFC 1034)
- feat: Validator Instance@validate: will now return a fixed `'NO_DATA'` as errors instead of an empty object when calling without data. For example:
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
- Dev Dep: Upgrade @valkyriestudios/data-timezones to 0.5.0
- Rule 'url': Improved performance of validity checks for valid urls by ~2.5x
- Rule 'url': Improved performance of validity checks for invalid urls by ~87x
- Rule 'url': Now adheres to RFC 2396 in that double slashes are valid and urls ending in a dot are considered valid
- Rule 'url_noquery': Improved performance of validity checks for valid urls by ~2.5x
- Rule 'url_noquery': Improved performance of validity checks for invalid urls by ~87x
- Rule 'url_noquery': Now adheres to RFC 2396 in that double slashes are valid and trailing dots in tlds are considered valid
- Minor performance improvement of ~.02x in creation and coldstart validation due to split limiting on iterable rule checks

### Fixed
- Fixed possible redos issue in regex behavior during main validator construction and parameterization (found by CodeQL)
- Fixed overly permissive regex range during main validator construction and parameterization (found by CodeQL)
- Fixed possible redos issue in regex behavior during url rule validation (found by CodeQL)
- Fixed possible redos issue in regex behavior during url_noquery rule validation (found by CodeQL)

## [4.0.0] - 2023-12-07
### Added
- Dev Dep: c8@8.0.1
- Dev Dep: @babel/eslint-parser (used for assert type during import in test files)
- Dev Dep: @babel/plugin-syntax-import-assertions (used for assert type during import in test files)
- Dev Dep: @valkyriestudios/data-countries
- Dev Dep: @valkyriestudios/data-continents
- Dev Dep: @valkyriestudios/data-timezones
- Rule 'in': Now supports passing a comma-delimited string of string values (eg: `in:jpeg,jpg,png`) on top of the previous parameter support

### Improved
- Dep: Upgrade @valkyriestudios/utils to 9.0.0
- Dep Dep: Upgrade @babel/cli to 7.23.4
- Dev Dep: Upgrade @babel/core to 7.23.5
- Dev Dep: Upgrade @babel/preset-env to 7.23.5 
- Dev Dep: Upgrade eslint to 8.55.0
- Switch from using chai/mocha to node native test runner
- Switch internals to .mjs format
- Reduce total bundle size when importing all of validator by not importing full country/continent data packs from @valkyriestudios/utils (still verifying correctness against the packs through tests)
- Published package will now also include original mjs src files which can be imported through @valkyriestudios/validator/src/\*
- Performance boost across the board thanks to @valkyriestudios/utils:8.x
- Performance boost across the board due to swapping out internal behaviors supporting pre-2016 browsers for more widely supported primordials (eg Number.isFinite/Number.isInteger/Array.isArray)
- Rule: vPhone ~.05x performance improvement on valid phone checks thanks to regex capture group improvements as well as swapping out of startsWith/endsWith vs charAt for single char checks
- Rule: vEmail ~.1x performance improvement on valid email checks thanks to regex capture group improvements as well as swapping substring checks for charAt for single char checks
- Rule: vEmail now allows up to 6 characters in TLD (adding support for eg: .coffee as a domain) (@SpekkoRice)
- Rule: vTimeZone 72x performance improvement due to ditching usage of Intl spec for verifying whether or not a zone exists in favor of embedded timezone/alias names (still being verified through tests with @valkyriestudios/data-timezones)

### Breaking
- Rule 'url': Will no longer see a string that is a url after trimming as valid
- Rule 'url_noquery': Will no longer see a string that is a url after trimming as valid
- Validator@extendMulti: Will now throw instead of silently do nothing when passed anything but an object
- Any string-based rules no longer support incoming values created via `new String(...)`
- Any number-based rules no longer support incoming values created via `new Number(...)`
- Any boolean-based rules no longer support incoming values created via `new Boolean(...)`

### Fixed
- Rule: vEmail edge-case redos issue in regex behavior (found by CodeQL)

### Removed
- Dev Dep: chai (in favor of native node test runner)
- Dev Dep: chai-as-promised (in favor of native node test runner)
- Dev Dep: eslint-plugin-mocha (in favor of native node test runner)
- Dev Dep: mocha
- Dev Dep: nyc
- Dev Dep: babel-plugin-check-es2015-constants (as not needed)
- Dev Dep: babel-plugin-transform-member-expression-literals (as not needed)
- Dev Dep: babel-plugin-transform-property-literals (as not needed)

## [3.11.0] - 2023-10-22
### Improved
- Dep: Upgrade @valkyriestudios/utils to 7.5.0
- Dep: Upgrade @babel/cli to 7.23.0
- Dep: Upgrade @babel/core to 7.23.2
- Dep: Upgrade @babel/preset-env to 7.23.2
- Dep: Upgrade @babel/register to 7.22.15
- Dep: Upgrade chai to 4.3.10
- Dep: Upgrade eslint to 8.52.0
- Dep: Upgrade eslint-plugin-mocha to 10.2.0

## [3.10.0] - 2023-06-25
### Added
- Validation Rule: continent
- Validation Rule: country
- Validation Rule: country_alpha3

### Improved
- Dep: Upgrade @valkyriestudios/utils to 7.3.0

## [3.9.0] - 2023-06-24
### Added
- Dep: eslint-plugin-mocha
- Move .eslintrc.json into src
- Add .eslintrc.json for test
- Add lint_tests script
- Validation Rule: time_zone

### Improved
- Dep: Upgrade eslint to 8.43.0

### Removed
- Dep: chai-spies as no longer in use

## [3.8.0] - 2023-06-14
### Improved
- Dep: Upgrade @valkyriestudios/utils to 7.2.0
- Dep: Upgrade @babel/cli to 7.22.5
- Dep: Upgrade @babel/core to 7.22.5
- Dep: Upgrade @babel/preset-env to 7.22.5
- Dep: Upgrade @babel/register to 7.22.5
- Dep: Upgrade eslint to 8.42.0

### Fixed
- vEmail: Fixed an issue where ampersand characters in the username part of an email where seen as invalid (eg: 'me&you@mydomain.com')

## [3.7.0] - 2023-05-07
### Added
- Dep: @babel/cli
- Dep: babel-plugin-check-es2015-constants
- Dep: babel-plugin-transform-member-expression-literals
- Dep: babel-plugin-transform-minify-booleans
- Dep: babel-plugin-transform-property-literals
- Dep: babel-plugin-transform-remove-console
- .babelrc
- Switch to using babel-cli for transpiling build

### Improved
- Dep: Upgrade @valkyriestudios/utils to 7.0.0
- Dep: Upgrade @babel/core to 7.21.8
- Dep: Upgrade eslint to 8.40.0

### Removed
- Dep: gulp
- Dep: gulp-babel
- gulpfile

## [3.6.0] - 2023-04-29
### Improved
- Dep: Upgrade @valkyriestudios/utils to 6.2.0
- Dep: Upgrade @babel/core to 7.21.5
- Dep: Upgrade @babel/preset-env to 7.21.5 

## [3.5.0] - 2023-04-23
### Improved
- Dep: Upgrade @valkyriestudios/utils to 6.1.0
- Dep: Upgrade eslint to 8.39.0
- Minor performance improvement due to internal direct-link rather than wrap link to utils lib functions
- Reduce eventual bundle size for package

## [3.4.1] - 2023-04-05
### Fixed
- vEmail: Fix issue where emails ending in dash for the local part of the email are treated as invalid

## [3.4.0] - 2023-04-01
### Improved
- Dep: Upgrade @valkyriestudios/utils to 5.3.1
- Dep: Upgrade @babel/core to 7.21.4
- Dep: Upgrade @babel/preset-env to 7.21.4
- Dep: Upgrade @babel/register to 7.21.0
- Dep: Upgrade eslint to 8.37.0

## [3.3.0] - 2023-01-22
### Added
- Validator@rules: A static getter on the main Validator class that returns an object containing the configured ruleset (immutable and dereferenced)
- rule: between_inc
- rule: date_string
- rule: geo_latitude
- rule: geo_longitude
- rule: guid
- rule: phone
- rule: sys_mac
- rule: sys_ipv4
- rule: sys_ipv6
- rule: sys_ipv4_or_v6
- rule: gt (alias of 'greater_than' rule)
- rule: gte (alias of 'greater_than_or_equal' rule)
- rule: lt (alias of 'less_than' rule)
- rule: lte (alias of 'less_than_or_equal' rule)
- rule: eq (alias of 'equal_to' rule)

### Improved
- Dep: Upgrade @babel/core to 7.20.12
- Dep: Upgrade eslint to 8.32.0
- Dep: Upgrade mocha to 10.2.0

## [3.2.0] - 2022-11-20
### Improved
- Dep: Upgrade @valkyriestudios/utils to 5.3.0
- Dep: Upgrade @babel/core to 7.20.2
- Dep: Upgrade @babel/preset-env to 7.20.2
- Dep: Upgrade chai to 4.3.7
- Dep: Upgrade eslint to 8.28.0
- Dep: Upgrade mocha to 10.1.0

### Fixed
- Fixed an issue where url validation was not properly applying checks on query strings when slashes for tld did not exist

## [3.1.0] - 2022-10-10
### Added
- Readd required rule as might otherwise break some setups
- Readd base index

## [3.0.0] - 2022-10-09
### Added
- Validator@extendMulti: Extend the validator by passing an object, each key should have a function as its value
- Validator Not Flag (!): allow reverse validating, eg: !equal_to:foo would validate false if value is passed as foo. Can be applied on all rules (including custom ones) 
- Validator Iterable Flag: Allow validating an array of values against a set of rules, eg: {a: '[]integer|between:5,10'} would validate 'a' as an array of integers between 5 and 10. (also works with parameterization, custom rules and new not flag).

### Improved
- Dep: Upgrade @valkyriestudios/utils to 5.2.0
- Dep: Upgrade @babel/core to 7.19.3
- Dep: Upgrade @babel/preset-env to 7.19.3
- Dep: Upgrade eslint to 8.24.0
- Validator@extend: Will now throw if the name passed is not a string and the value passed is not a function
- Validator@validate: Will now throw a proper error if a rule does not exist, instead of throwing a non-descriptive error

### Removed
- Rule: 'required'

## [2.3.0] - 2022-08-21
### Added
- Feat: new rule - string_ne
- Feat: new rule - array_ne
- Feat: new rule - object_ne
- Dep: @babel/register@7.18.9
- Dep: chai@4.3.6
- Dep: chai-as-promised@7.1.1
- Dep: chai-spies@1.0.0
- Dep: eslint@8.22.0
- Dep: mocha@10.0.0
- Dep: nyc@15.1.0
- .babelrc
- .nycrc
- .eslintrc.json

### Improved
- Dep: Upgrade @babel/core to 7.18.10
- Dep: Upgrade @babel/preset-env to 7.18.10
- Dep: Upgrade @valkyriestudios/utils to 5.1.0

### Removed
- Dep: istanbul-instrumenter-loader@3.0.1
- Dep: jasmine-core@3.6.0
- Dep: karma@4.4.1
- Dep: karma-chrome-launcher@3.0.0
- Dep: karma-coverage@2.0.2
- Dep: karma-jasmine@2.0.1
- Dep: karma-spec-reporter@0.0.32
- Dep: karma-webpack@4.0.2
- Dep: puppeteer@1.10.0
- Dep: webpack@4.43.0

## [2.2.0] - 2021-01-06
### Added
- rule: color_hex
- rule: url
- rule: url_noquery

### Improved
- Allow extend to override rules
- Improve on code coverage

## [2.1.0] - 2020-11-01
### Improved
- Dep: Upgrade @valkyriestudios/utils to 4.0.0

## [2.0.2] - 2020-07-13
### Fixed
- Upgrade dependencies, fix vulnerabilities, npm audit

## [2.0.1] - 2020-07-13
### Fixed
- Issue with email validation where 4 and 5 char domain suffixes are seen as invalid
