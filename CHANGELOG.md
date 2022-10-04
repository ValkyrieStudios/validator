# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic
Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Improved
- Dep: Upgrade @babel/core to 7.19.3
- Dep: Upgrade @babel/preset-env to 7.19.3
- Dep: Upgrade eslint to 8.24.0

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
