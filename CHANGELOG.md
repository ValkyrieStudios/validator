# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic
Versioning](https://semver.org/spec/v2.0.0.html).

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
