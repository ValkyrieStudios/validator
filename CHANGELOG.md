# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic
Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
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
- Rule: vEmail ~5% performance improvement on valid email checks thanks to regex capture group improvements 
- Rule: vEmail now allows up to 6 characters in TLD (adding support for eg: .coffee as a domain) (@SpekkoRice)
- Rule: vTimeZone 7217% performance improvement due to ditching usage of Intl spec for verifying whether or not a zone exists in favor of embedded timezone/alias names (still being verified through tests with @valkyriestudios/data-timezones)

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
