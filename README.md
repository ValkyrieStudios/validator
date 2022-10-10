# @valkyriestudios/validator

[![codecov](https://codecov.io/gh/ValkyrieStudios/utils/branch/master/graph/badge.svg)](https://codecov.io/gh/ValkyrieStudios/validator)
[![npm](https://img.shields.io/npm/v/@valkyriestudios/validator.svg)](https://www.npmjs.com/package/@valkyriestudios/validator)
[![npm](https://img.shields.io/npm/dm/@valkyriestudios/validator.svg)](https://www.npmjs.com/package/@valkyriestudios/validator)

An extensible javascript validator

`npm install @valkyriestudios/validator`

## Example usage

```js
import Validator from '@valkyriestudios/validator';

const v = new Validator({
    first_name: 'string|min:2',
    last_name: 'string|min:2',
    old_password: '!equal_to:<password>',
    password: 'string|min:8',
    confirmation: 'equal_to:<password>',
    gender: '?in:<meta.genders>',
    age: '?integer|between:0,150',
});

const evaluation = v.validate({
    first_name: 'Peter',
    last_name: 'Vermeulen',
    old_password: 'myoldpass',
    password: 'mySecr3tPass',
    confirmation: 'mySecr3tPass',
    gender: 'm',
    meta: {
        genders: ['m','f','o']
    };
});

console.log(evaluation.is_valid); // true
```

## How does this work?

### Instantiating a new validator
A validator instance is reusable across multiple validation runs, it's instantiated with a set of rules that it needs to validate later down the
line. These rules can go from single dimensional kv objects to multi-dimensional kv objects.

You can create very small validators `... = new Validator({email: 'string|email'});` to very complex validators using a simple
readable syntax.

```js
new Validator({
    address: {
        street: 'string|alpha_num_spaces',
        nr: 'integer',
        zip: 'integer|between:1000,9999',
    },
    contact: {
        email: 'string|email',
    },
    filters: {
        ids: '[unique]integer|greater_than:0',
        types: '[unique|max:5]is_type',
    },
});
```

### Anatomy of a validation descriptor
Validation of a value can be a simple one-off thing, or it can be a set of rules that the value needs to go through, as such a validation
descriptor can contain multiple rules.

The syntax for this is best shown with a good example `integer|between:1000,9999|!equal_to:5`.

- **| Rule delimiter**
The `|` symbol is a delimiter to show where a new rule starts

- **: Parameter start**
The `:` symbol marks where the rule name ends and the parameter list for the rule starts

- **, Parameter delimiter**
The `,` symbol marks where a new parameter starts

- **! Opposite validation**
The `!` symbol marks a rule as the opposite, meaning that we should revert the validation, another example is `!equal_to:foo`, which means accept anything that is not foo. This can be used with any rule (including custom ones) as well as parameterized rules.

As such the example rule here validates on 3 things, the `integer` rule and `between` rule, where the between rule has 2 parameters
(1000, 9999) as well as that any value can not be equal to 5.

### Running validations and checking evaluations
After a validator instance is created, you can run it as many times as you want to validate a data object passed to it. The resultset of this is called an `evaluation` and is returned when calling the `validate` function.

```js
const evaluation = myvalidator.validate({name: 'Peter', age: '250'});
```

The evaluation object consists of two keys that can be used to determine the result of the validation:

- **is_valid**
A boolean value that tells you whether or not the validation succeeded (true) or not (false)

- **errors**
An object containing the errors per validated key, each key in the ruleset will be represented here, if a key was correctly validated it will be an
empty array, otherwise it will be an array containing the specific rules that didn't match.

example of an evaluation object:

```js
{
    is_valid: false,
    errors: {
        name: [],
        age: [
            {msg: 'integer', params: []},
            {msg: 'between', params: ['1','150']}
        ],
    },
}
```

### Revisiting evaluations
The validator instance will remember and internally store the last evaluation, you can always link back to it through the `is_valid` property and
the `errors` property on the validator instance.

### Linking to other parameters inside of the data object
Validation sometimes requires context, this context is usually linked to other variables in the data object that is being validated. Think of a
password confirmation that needs to be matched, or a string that needs to be in a provided string of arrays. For this we've added the ability to
parameterize your ruleset.

Parameterization happens through the following syntax `<myparam>` where myparam is the key of the value it needs to link to in the data object.

Example of a parameterized equal to rule:

```js
const v = new Validator({a: 'equal_to:<b>'});

v.validate({a: 'hello', b: 'world'}); // is_valid = false
v.validate({a: 'foo', b: 'foo'}); // is_valid = true
```

Example of a parameterized greater_than rule:
```js
const v = new Validator({a: 'greater_than:<b>'});

v.validate({a: 50, b: 40}); // is_valid = true
v.validate({a: 10, b: 20}); // is_valid = false
```

Take note: Custom rules (see below) do not need any special definition for this to work.

### Optional rules
In some cases you only want to validate a specific key if it is passed, if not you don't want to run the validations. To allow for this we've added
the `?` flag.

To make use of the `?` flag, place it at the very start of the defined rule.

Example of an optional rule:
```js
const v = new Validator({gender: '?string|in:<genders>'});

v.validate({genders: ['m', 'f', 'o']}); // is_valid = true
v.validate({gender: 'X', genders: ['m', 'f', 'o']}); // is_valid = false
```

### Opposite rules
In some cases you want to validate the exact opposite of a rule, for example if you want to validate that something is not in a set, not equal to something, not of a certain type, not ... (you catch my drift). To allow for this we've added the `!` flag.

To make use of the `!` flag, place it at the very start of any condition (including your own conditions that are defined through extension).

Examples of opposite validations:

```js
const v = new Validator({
    password: 'string|min:8',
    password_old: 'string|min:8|!equal_to:<password>',
});

v.validate({password: 'mysecretpass', password_old: 'mysecretpass'}); // is_valid = false
v.validate({password: 'mysecretpass', password_old: 'myoldpass'}); // is_valid = true
```

### Array validation
Often, we have to deal with things such as validation of sets of data, good examples might be filters where you can have multi-selection. To tackle the concept of array validation you can treat any rule as an iterable rule by prefixing `[]` in front of it.

For example the rule: `integer|greater_than:0` will validate that the provided value is an integer greater than 0, but if we expect an array of integers that need to be greater than 0 we can use the following: `[]integer|greater_than:0`.

```js
const v = new Validator({
    ids: '[]integer|greater_than:0',
});

v.validate({ids: 5}); // is_valid: false
v.validate({ids: [5]}); // is_valid: true
```

##### Options
We understand that array validation requires just a tad more control, as such you can pass the following options to the array iterable in the rule.

| Key | Meaning | Example |
|-----|---------|---------|
| unique | Validate that the passed array is unique | \[unique\]integer\|greater_than\:0 |
| max:val | Validate that they passed array can at max contain X elements | \[max\:5\]integer\|greater\_than\:0 |
| min:val | Validate that they passed array needs to contain at least X elements | \[min\:5\]integer\|greater\_than\:0 |

These options can be combined as well. For example the following rule will ensure that only a unique array with minimum 1 and maximum 4 elements can be passed, and that each element passes a custom rule (see extending) called is\_fruit:

```js
Validator.extend('is_fruit', val => ['apple', 'orange', 'pear'].indexOf(val) >= 0);

const validator = new Validator({
    fruits: `[unique|min:1|max:4]is_fruit`.
});

validator.validate({fruits: ['apple', 'orange']}); // is_valid: true
validator.validate({fruits: ['apple', 'apple', 'orange']}); // is_valid: false (not unique)
validator.validate({fruits: []}); // is_valid: false (min: 1)
validator.validate({fruits: ['apple', 'dog', 'orange']}); // is_valid: false (is_fruit)
validator.validate({fruits: ['apple', 'dog', 'orange', 'pear', 'pear']}); // is_valid: false (is_fruit and over max)
```

### Extending the validator with custom rules
A validator library can/should only provide the default rules that would cover 90% of the validation use cases, however some validations are custom
to your specific case, as such you can add your own custom rules through the `extend` static function on the Validator class.

Adding a rule to the Validator is global and shared among all other validator instances, so it's advised to do this at boot.

Example of a rule that will validate whether a string is a user role:

```js
Validator.extend('user_role', function (val) {
    return ['admin', 'user', 'guest'].includes(val);
});

example usage
(new Validator({a: 'user_role'})).validate({a: 'owner'}); // is_valid = false
(new Validator({a: 'user_role'})).validate({a: 'admin'}); // is_valid = true
```

Example of a rule that will validate whether an integer is the double of a provided parameter

```js
Validator.extend('is_double', function (val, param) {
    return val === (param * 2);
});

example usage
const v = new Validator({a: 'is_double:<meta.b>'});

v.validate({a: 6, meta: {b: 4}}); // is_valid = false
v.validate({a: 8, meta: {b: 4}}); // is_valid = true
```

##### Multiple rules at once?
If you see the need to add a group of custom rules, this can also be done through `Validator.extendMulti`:

```js
Validator.extendMulti({
    ...
    is_fruit: val => ['apple', 'pear', 'orange'].indexOf(val) >= 0,
    is_animal: val => ['dog', 'cat', 'horse'].indexOf(val) >= 0,
    is_pet: val => ['dog', 'cat'].indexOf(val) >= 0,
    ...
});
```

## Available rules
The following list shows you all the default rules that are provided by this library, feel free to write your own or open a PR to extend on this set!

| Rule     | Description               |
|:---------|:--------------------------|
| alpha_num_spaces | Validate a string to only contain alphabetical, numerical and space characters |
| alpha_num_spaces_multiline | Ditto alpha_num_spaces but with the addition of allowing linebreak and carriage returns |
| array | Validate that a provided value is an array |
| array_ne | Same behavior as `array`, with the additional check that empty arrays will not be seen as valid |
| between | Validate that a provided value is between two numbers, if passed a string or array this will validate on length |
| boolean | Validate that a provided value is a boolean |
| color_hex | Validate that a provided value is a hex color (with the # included) |
| date | Validate that a provided value is a date object |
| email | Validate that a provided value is an email, take note: this only structurally tests if an email is good, it doesn't test whether an email actually exists |
| equal_to | Validate that a provided value is equal to another value, this can be used on primitives (string, number, boolean) but also on non-primitives (objects, arrays, dates). Equality checks for non-primitives are done through FNV1A hashing |
| greater_than | Validate that a provided value is greater than a provided number, if passed a string or array this will validate on length |
| greater_than_or_equal | Validate that a provided value is greater than or equal than a provided number, if passed a string or array this will validate on length |
| in | Validate that a provided value is in a set of values, this requires parameterization (see above) |
| integer | Validate that a provided value is an integer, this will see NaN as invalid |
| less_than | Validate that a provided value is less than a provided number, if passed a string or array this will validate on length |
| less_than_or_equal | Validate that a provided value is less than or equal to a provided number, if passed a string or array this will validate on length |
| max | Alias of less_than_or_equal |
| min | Alias of greater_than_or_equal |
| number | Validate that a provided value is a number, this will see NaN as invalid |
| object | Validate that a provided value is an object, arrays will not be seen as objects by this rule |
| object_ne | Same behavior as `object`, with the additional check that empty objects will not be seen as valid |
| size | Validate that a provided value has a specific size, this only applies to strings and arrays and checks on length |
| string | Validate that a provided value is a string |
| string_ne | Same behavior as `string`, with the additional check that empty strings (after trimming) will not be seen as valid |
| url | Validate that a provided value is a url, this allows for query string values as well |
| url_noquery | Validate that a provided value is a url without any query string values |

## Contributors
- Peter Vermeulen : [Valkyrie Studios](www.valkyriestudios.be)
