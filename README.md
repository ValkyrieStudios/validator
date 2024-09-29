# @valkyriestudios/validator

[![CodeCov](https://codecov.io/gh/ValkyrieStudios/validator/branch/main/graph/badge.svg)](https://codecov.io/gh/ValkyrieStudios/validator)
[![Test](https://github.com/ValkyrieStudios/validator/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/ValkyrieStudios/validator/actions/workflows/test.yml)
[![Lint](https://github.com/ValkyrieStudios/validator/actions/workflows/lint.yml/badge.svg?branch=main)](https://github.com/ValkyrieStudios/validator/actions/workflows/lint.yml)
[![CodeQL](https://github.com/ValkyrieStudios/validator/actions/workflows/github-code-scanning/codeql/badge.svg?branch=main)](https://github.com/ValkyrieStudios/validator/actions/workflows/github-code-scanning/codeql)
[![npm](https://img.shields.io/npm/v/@valkyriestudios/validator.svg)](https://www.npmjs.com/package/@valkyriestudios/validator)
[![npm](https://img.shields.io/npm/dm/@valkyriestudios/validator.svg)](https://www.npmjs.com/package/@valkyriestudios/validator)

An extensible blazing-fast javascript validator

## Installation
`npm install --save @valkyriestudios/validator`

## Example usage
```typescript
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

## Example Typescript usage while ensuring validator is fully validating type
When using Validator within typescript and you want to ensure a validator is fully validating the props of a specific type or interface you can pass
the type as a generic when constructing a validator instance.

Example:
```typescript
import Validator from '@valkyriestudios/validator';

type User {
    first_name: string;
    last_name: string;
    email: string;
}

/* Good */
const vUser = new Validator<User>({
    first_name: 'string_ne|min:2',
    last_name: 'string_ne|min:2',
    email: 'email',
});

/* Intellisense will complain because last_name and email rules are missing */
const vUser = new Validator<User>({
    first_name: 'string_ne|min:2',
});
```

### Validator.check and type guards
When working with a typed validator such as in the example above, using **Validator.check** will also give the added bonus of acting as a type guard for the passed object.

Example:
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

## @validate: Running validations and checking evaluations
After a validator instance is created, you can run it as many times as you want to validate a data object passed to it. The resultset of this is called an `evaluation` and is returned when calling the `validate` function.

```typescript
const myvalidator = new Validator({name: 'string_ne|min:2', age: 'integer|between:1,150'});

const evaluation = myvalidator.validate({name: 'Peter', age: '250'});
// evaluation: {
//    is_valid: false,
//    count: 1,
//    errors: {
//        age: [
//            {msg: 'integer', params: []},
//            {msg: 'between', params: ['1','150']}
//        ],
//    },
// }

// Also supports forms
const form = new FormData();
form.append('name', 'Peter');
console.log(v.validate(form).is_valid); // false

form.append('age', '40');
console.log(v.validate(form).is_valid); // true
```

The evaluation object consists of two keys that can be used to determine the result of the validation:

- **is_valid**
A boolean value that tells you whether or not the validation succeeded (true) or not (false)

- **count**
An integer value defining how many fields were invalid

- **errors**
An object containing the errors per validated key, each key that had errors will be represented here with an array of the rules that weren't met for the provided value.

Below is an example of such behavior for a more complex validator:
```typescript
const v = new Validator({
    first_name: 'string_ne|min:2',
    last_name: 'string_ne|min:2',
    address: {
        street: 'string|alpha_num_spaces',
        nr: 'integer',
        zip: 'integer|between:1000,9999',
    },
    contact: {
        email: 'email',
        phone: '?phone',
        website: '?url',
    },
});

v.validate({
    first_name: 'Peter',
    address: {street: 'Amazing Rd'},
    contact: {website: 'www.valkyriestudios.be'},
});
// evaluation: {
//    is_valid: false,
//    count: 4,
//    errors: {
//        'last_name': [
//            {msg: 'string_ne', params: []},
//            {msg: 'min', params: ['2']}
//        ],
//        'street.zip': [
//            {msg: 'integer', params: []},
//        ],
//        'street.zip': [
//            {msg: 'integer', params: []},
//            {msg: 'between', params: ['1000','9999']}
//        ],
//        'contact.email': [
//            {msg: 'email', params: []}
//        ]
//    },
// }
```

## @check: Simple/Speedy validity checks
In case you don't need an evaluation object and are simply interested in whether or not something is valid you can also choose to work with the faster `check` method available on any validator instance. This method is faster than standard validation through `validate` due to not needing to build up a full resultset and immediately returning the moment it spots something invalid.

Take Note: When using typescript and working with a typed validator, (eg: `new Validator<User>({...})`) the check function also acts as a type guard for the checked data.

```typescript
const v = new Validator({name: 'string_ne|min:2', age: 'integer|between:1,150'});

v.check({name: 'Peter', age: '250'}); // false
v.check({name: 'Peter', age: 20}); // true

// Also supports forms
const form = new FormData();
form.append('name', 'Peter');
v.check(form); // false

form.append('age', '40');
v.check(form); // true
```

## @checkForm: FormData validity check and conversion to object
Let's say you're working on backend validation and you're receiving FormData instances with Files and other raw data ... we all know that validating those can get quite complex, and then there's the conversion as well to more easily work with it server-side.

**checkForm** is a utility allowing you to check if a FormData instance is valid AND automatically convert it to an object if it is

Take Note:
- When using typescript and working with a typed validator, (eg: `new Validator<User>({...})`) the checkForm function will return an Object of type User if valid.
- checkForm is perfect for usage inside of middleware on backend endpoints

```typescript
type User = {
    age: number;
    name: string;
};
const v = new Validator<User>({name: 'string_ne|min:2', age: 'integer|between:1,150'});

const form = new FormData();
form.append('name', 'Peter');
form.append('age', '34');
const result = v.checkForm(form);
if (!result) return;

... // result is typed as User here and will be {name: "Peter", age: 34}
```

## How does this work?
### Instantiating a new validator
A validator instance is reusable across multiple validation runs, it's instantiated with a set of rules that it needs to validate later down the
line. These rules can go from single dimensional kv objects to multi-dimensional kv objects.

You can create very small validators `... = new Validator({email: 'email'});` to very complex validators using a simple
readable syntax.

```typescript
new Validator({
    address: {
        street: 'string|alpha_num_spaces',
        nr: 'integer',
        zip: 'integer|between:1000,9999',
    },
    contact: {
        email: '(email)(false)',
    },
    filters: {
        ids: '?[unique]integer|greater_than:0',
        types: '[unique|max:5]is_type',
    },
});
```

### Anatomy of a validation descriptor
Validation of a value can be a simple one-off thing, or it can be a set of rules that the value needs to go through, as such a validation
descriptor can contain multiple rules.

The syntax for this is best shown with a good example `integer|between:1000,9999|!equal_to:5`.

##### Rule delimiter: `|`
The `|` symbol is a delimiter to show where a rule ends and another rule starts. eg: `integer|min:10` will evaluate the integer rule and the minimum rule with param 10

##### Parameter start: `:`
Certain rules allow for parameters to be passed, the `:` symbol marks where the rule name ends and the parameter (or list of parameters start). For example in `equal_to:5` the name of the rule being evaluated is `equal_to` and the parameter that will be passed to it is: `5`.

##### Parameter delimiter: `,`
In case a rule allows for more than one parameter to be passed we can identify each distinct parameter value by separating them with the `,` symbol. For example in the rule `between:1000,999` the list of parameters passed for evaluation to the `between` rule is `[1000, 9999]`.

##### Opposite validation: `!`
The `!` symbol marks a rule as the opposite of what we're validation for, meaning that we should revert the validation, another example is `!equal_to:foo`, which means accept anything that is **not equal to** foo. This can be used with any rule (including custom ones) as well as parameterized rules. For example: `!equal_to:<otherfield>` would mean only validate as true if the value being passed is not equal to the value of the otherfield prop in our data object.

### Linking to other parameters inside of the data object
Validation sometimes requires context, this context is usually linked to other variables in the data object that is being validated. Think of a
password confirmation that needs to be matched, or a string that needs to be in a provided string of arrays. For this we've added the ability to
parameterize your ruleset.

Parameterization happens through the following syntax `<myparam>` where myparam is the key of the value it needs to link to in the data object.

Example of a parameterized equal to rule:

```typescript
const v = new Validator({a: 'equal_to:<b>'});

v.check({a: 'hello', b: 'world'}); // false
v.check({a: 'foo', b: 'foo'}); // true
```

Example of a parameterized greater_than rule:
```typescript
const v = new Validator({a: 'greater_than:<b>'});

v.check({a: 50, b: 40}); // true
v.check({a: 10, b: 20}); // false
```

Take note: Custom rules (see below) do not need any special definition for this to work.

### Optional rules
In some cases you only want to validate a specific key if it is passed, if not you don't want to run the validations. To allow for this we've added
the `?` flag.

To make use of the `?` flag, place it at the very start of the defined rule.

Example of an optional rule:
```typescript
const v = new Validator({gender: '?string|in:<genders>'});

v.check({genders: ['m', 'f', 'o']}); // true
v.check({gender: 'X', genders: ['m', 'f', 'o']}); // false
```

### Opposite rules
In some cases you want to validate the exact opposite of a rule, for example if you want to validate that something is not in a set, not equal to something, not of a certain type, not ... (you catch my drift). To allow for this we've added the `!` flag.

To make use of the `!` flag, place it at the very start of any condition (including your own conditions that are defined through extension).

Examples of opposite validations:

```typescript
const v = new Validator({
    password: 'string|min:8',
    password_old: 'string|min:8|!equal_to:<password>',
});

v.check({password: 'mysecretpass', password_old: 'mysecretpass'}); // false
v.check({password: 'mysecretpass', password_old: 'myoldpass'}); // true
```

### Array or KV-Map validation
Often, we have to deal with things such as validation of sets of data, good examples might be filters where you can have multi-selection. To tackle the concept of array or KV-map validation you can treat any rule as an iterable rule by prefixing `[]` in front of it.

For example the rule: `integer|greater_than:0` will validate that the provided value is an integer greater than 0, but if we expect an array of integers that need to be greater than 0 we can use the following: `[]integer|greater_than:0`.

```typescript
const v = new Validator({
    ids: '[]integer|greater_than:0',
});

v.check({ids: 5}); // false
v.check({ids: [5]}); // true
```

###### KV-Map (`{}`)
In case you need to validate a KV-Map where each value needs to be valid according to the same rule swap out the `[]` prefix for `{}`.

```typescript
Validator.extendSchema('user', {first_name: 'string_ne|min:2'});

const v = new Validator({users: '{min:1}user'});

v.check({users: {}}); // false
v.check({users: {
    peter: {first_name: 'Peter'},
}}); // true
v.check({users: {
    peter: {first_name: 'Peter'},
    jake: {first_name: null}
}}); // false
```

###### Options
We understand that array or KV-map validation requires just a tad more control, as such you can pass the following options to the iterable in the rule.

| Key | Meaning | Example |
|-----|---------|---------|
| unique | Validate that the passed array or kv-map is unique | \[unique\]integer\|greater_than\:0 |
| max:val | Validate that the passed array or kv-map can at max contain X elements | \[max\:5\]integer\|greater\_than\:0 |
| min:val | Validate that the passed array or kv-map needs to contain at least X elements | \[min\:5\]integer\|greater\_than\:0 |

These options can be combined as well. For example the following rule will ensure that only a unique array with minimum 1 and maximum 4 elements can be passed, and that each element passes a custom rule (see extending) called is\_fruit:

```typescript
Validator.extend('is_fruit', val => ['apple', 'orange', 'pear'].indexOf(val) >= 0);

const validator = new Validator({fruits: `[unique|min:1|max:4]is_fruit`});
validator.check({fruits: ['apple', 'orange']}); // true
validator.check({fruits: ['apple', 'apple', 'orange']}); // false (not unique)
validator.check({fruits: []}); // false (min: 1)
validator.check({fruits: ['apple', 'dog', 'orange']}); // false (is_fruit)
validator.check({fruits: ['apple', 'dog', 'orange', 'pear', 'pear']}); // false (is_fruit and over max)
```

### OR Groups
Every now and then we want to validate whether or not something is either A or B, for example whether or not a value is an email or its false. To tackle this notion of something being valid in multiple ways you can employ an or group, for example to validate whether or not something is either an email or false we can do the following:
```typescript
const v = new Validator({a: '(email)(false)'});
v.check({a: false}); // true
v.check({a: 'contact@valkyriestudios.be'}); // true
v.check({}); // false
v.check({a: 'foobar'}); // false
v.check({a: true}); // false
```

OR groups can be combined with the `?` sometimes flag as well like `?(email)(false)` which would have the following behavior:
```typescript
const v = new Validator({a: '(email)(false)'});
v.check({a: false}); // true
v.check({a: 'contact@valkyriestudios.be'}); // true
v.check({}); // true
v.check({a: 'foobar'}); // false
v.check({a: true}); // false
```

And can also be combined with other operators to form more complex rules such as:
```typescript
const v = new Validator({a: '?(integer|between:1,150|!between:50,100)(integer|between:-1,-150)'});
v.check({a: 0}); // false
v.check({a: 20}); // true
v.check({}); // true
v.check({a: -20}); // true
v.check({a: 65}); // false
```

And even with array combinators:
```typescript
const v = new Validator({a: '(email)([unique|min:1]email)');
v.check({a: 'contact@valkyriestudios.be'}); // true
v.check({a: ['contact@valkyriestudios.be', 'peter@valkyriestudios.be'}); // true
v.check({a: ['contact@valkyriestudios.be', 'contact@valkyriestudios.be']}); // false
```

**Take note:** When using the `.validate` method the evaluation result for a descriptor working with OR groups will be multi-dimensional like this:
```typescript
const v = new Validator({
    contact: {
        email: '(email)(false)',
        address: '?string_ne',
    },
});
const evaluation = v.validate({contact: {address: 'bla'}});
//  {
//      is_valid: false,
//      count: 1,
//      errors: {
//          'contact.email': [
//              [
//                  {msg: 'email', params: []}
//              ], [
//                  {msg: 'false', params: []}
//              ]
//          ]
//      }
//  }
```

## Customization
The below section describes 4 different ways to extend the base set of rules that already exist within the validator. It needs to be mentioned that
**the validator's rules are centrally stored, meaning that these extensions only need to be run once and don't necessarily need to be run in the same
file :)**

### Extending the validator with custom rules
A validator library can/should only provide the default rules that would cover 90% of the validation use cases, however some validations are custom
to your specific case, as such you can add your own custom rules through the `extend` static function on the Validator class.

Adding a rule to the Validator is global and shared among all other validator instances, so it's advised to do this at boot.

Example of a rule that will validate whether a string is a user role:

```typescript
Validator.extend('user_role', val =>  ['admin', 'user', 'guest'].includes(val));

(new Validator({a: 'user_role'})).check({a: 'owner'}); // false
(new Validator({a: 'user_role'})).check({a: 'admin'}); // true
```

Example of a rule that will validate whether an integer is the double of a provided parameter

```typescript
Validator.extend('is_double', (val, param) => val === (param * 2));

const v = new Validator({a: 'is_double:<b>'});

v.check({a: 6, b: 4}); // false
v.check({a: 8, b: 4}); // true
```

### Multiple rules at once?
If you see the need to add a group of custom rules, this can also be done through `Validator.extendMulti`:

```typescript
Validator.extendMulti({
    ...
    is_fruit: val => ['apple', 'pear', 'orange'].indexOf(val) >= 0,
    is_animal: val => ['dog', 'cat', 'horse'].indexOf(val) >= 0,
    is_pet: val => ['dog', 'cat'].indexOf(val) >= 0,
    ...
});
```

### Extending the validator with schemas
Most applications are structured around a series of models, for example a User, Location, Company model. In most real-world scenarios these models will need to be validated the same wherever they're being used. To make this validation easier we've introduced a method to allow extending the validator with a rule that validates an object according to a series of rules.

For example a user model that can contain a first_name, last_name, email, phone and time zone could be registered as follows:

```typescript
Validator.extendSchema('user', {
    first_name: 'string_ne|min:3',
    last_name: 'string_ne|min:3',
    email: 'email',
    phone: 'phone',
    zone: 'time_zone',
});

const v = new Validator({a: 'user'});
v.check({a: {
    first_name: 'Peter',
    last_name: 'Vermeulen',
    email: 'contact@valkyriestudios.be',
}}); // false
v.check({a: {
    first_name: 'Peter',
    last_name: 'Vermeulen',
    email: 'contact@valkyriestudios.be',
    phone: '(555) 123 4567',
    zone: 'America/New_York',
}}); // true
```

As with all other ways of extending the Validator these defined rules can also be called directly:

```typescript
Validator.rules.user({first_name: 'Peter'}); // false
```

**Quicktip**: When using typescript you can also ensure that your Validator schema extensions stay aligned with your defined types and interfaces. In the following example intellisense will complain about the address schema not being aligned with the address type.

```typescript
import Validator from '@valkyriestudios/validator';

type User = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

type Address = {
    street: string;
    city: string;
    zip: string;
    number: string;
}

Validator.extendSchema<User>('user', {
    first_name: 'string_ne|min:3',
    last_name: 'string_ne|min:3',
    email: 'email',
    phone: 'phone',
});

Validator.extendSchema<Address>('address', {
    street: 'string_ne|min:2',
    city: 'string_ne|min:2',
    number: 'string_ne|min:2',
    //  Typescript will complain about 'zip' not being part of this
});
```

**Quicktip**: Given that Validator is a global singleton it is beneficial to centralize schema extension, as you only need to register them once.

### Extending the validator with enumerations
In most real-world scenarios we often need to validate whether or not a provided value is in a fixed set. The above extendMulti example is one way of doing so but in many use cases those predefined sets come from somewhere else. To make it easier to define/use them you can make use of the static `Validator.extendEnum` method.

This method expects a kv-map where the `key` is the name we want to validate with and the `value` is an array of strings/numbers that is our set. An example of this behavior can be found below (using the example from extendMulti):

```typescript
Validator.extendEnum({
    is_fruit    : ['apple', 'pear', 'orange'],
    is_animal   : ['dog', 'cat', 'horse'],
    is_pet      : ['dog', 'cat'],
});
```

Of course the below would also work in case the sets are coming from somewhere else:
```typescript
import FRUITS from '...'; // Eg: FRUITS {APPLE: 'apple', PEAR: 'pear', ORANGE: 'orange'}
import ANIMALS from '...'; // Eg: ANIMALS {DOG: 'dog', CAT: 'cat', HORSE: 'horse'}
import PETS from '..'; // Eg: PETS {DOG: 'dog', CAT: 'cat'}

Validator.extendEnum({
    is_fruit    : Object.values(FRUITS),
    is_animal   : Object.values(ANIMALS),
    is_pet      : Object.values(PETS),
});
```

**Take Note:** In most real-world use cases enumerations don't tend to change at runtime, in case this does happen you can always re-run the enum extension, for example:
```javascript
Validator.extendEnum({FRUITS: ['apple', 'pear']});
const v = new Validator({val: 'FRUITS'});

v.check('banana'); // false

Validator.extendEnum({FRUITS: ['apple', 'pear', 'banana']});

v.check('banana'); // true
```

### Extending the validator with regex(es)
Every now and them we need to validate whether or not a provided value is valid according to a certain pattern, more often than not we employ a regex to do so. To make it easier to define/use them you can make use of the static `Validator.extendRegex` method.

This method expects a kv-map where the `key` is the name we want to validate with and the `value` is a regex (either created through `/.../` syntax or `new RegExp(...);`. For example let's say we wanted to adjust our fruist/animal validation from above and turn it into a regex to also validate on whether or not they match the capitalized version of them. We could do so as follows:
```typescript
Validator.extendRegex({
    is_fruit    : /^((a|A)pple|(p|P)ear|(o|O)range)$/g,
    is_animal   : /^((d|D)og|(c|C)at|(h|H)orse)$/g,
    is_pet      : /^((d|D)og|(c|C)at)$/g,
});
```

**Take Note:** In most real-world use cases regexes don't tend to change at runtime, however in case this does happen you can always re-run the regex extension, for example:
```typescript
Validator.extendRegex({FRUITS: /^(apple|pear)$/g});

const v = new Validator({val: 'FRUITS'});
v.check('banana'); // false

Validator.extendRegex({FRUITS: /^(apple|pear|banana)$/g});
v.check('banana'); // true
```

**Cautionary Note:** Regex can be incredibly powerful as long as you know how to wield it, it can however also lead to inperformance if not written correctly. If you want to learn more about Regex performance feel free to peruse this article regarding what is colloquially known as **[Evil RegEx](https://medium.com/@nitinpatel_20236/what-are-evil-regexes-7b21058c747e)**.

## Want to use the validation rules directly without a validator?
If you see the need to directly use the validation rule functions without a validator instance, or want to check internal state you can use the `Validator.rules` static.

```typescript
Validator.rules.phone('+32 487 61 59 82'); // true
Validator.rules.email('contact@valkyriestudios.be'); // true
```

This also goes for **enumeration** and **regex** rules:

```typescript
Validator.extendEnum({NAMES: ['Peter', 'John']});
Validator.extendRegex({fruits: /^(appl(e|3)|pear)$/g});
Validator.rules.NAMES('Peter'); // true
Validator.rules.NAMES('Jack'); // false
Validator.rules.fruits('apple'); // true
Validator.rules.fruits('appl2'); // false
Validator.rules.fruits('appl3'); // true
```

## Available rules
The following list shows you all the default rules that are provided by this library, feel free to write your own or open a PR to extend on this set!

| Rule     | Description               |
|:---------|:--------------------------|
| alpha_num_spaces | Validate a string to only contain alphabetical, numerical and space characters |
| alpha_num_spaces_multiline | Ditto alpha_num_spaces but with the addition of allowing linebreak and carriage returns |
| array | Validate that a provided value is an array |
| array_ne | Same behavior as `array`, with the additional check that empty arrays will not be seen as valid |
| base64 | Validate that a provided value is a valid base64 encoded string |
| between | Validate that a provided value is between two numbers, if passed a string or array this will validate on length |
| between_inc | Validate that a provided value is between or equal to two numbers, if passed a string or array this will validate on length |
| boolean | Validate that a provided value is a boolean |
| color_hex | Validate that a provided value is a hex color (with the # included) |
| continent | Validate that a provided value is a continent code |
| country | Validate that a provided value is an alpha-2 code according to ISO 3166-1 |
| country_alpha3 | Validate that a provided value is an alpha-3 code according to ISO 3166-1 |
| date | Validate that a provided value is a date object |
| date_day | Validate that a provided value is a valid date string in format of 'YYYY-MM-DD' |
| date_iso | Validate that a provided value is a valid ISO formatted date string in format of 'YYYY-MM-DDTHH:mm:ss.SSSZ' |
| date_string | Validate that a provided value is a valid date string |
| email | Validate that a provided value is an email, take note: this only structurally tests if an email is good, it doesn't test whether an email actually exists |
| eq | Alias of equal_to |
| equal_to | Validate that a provided value is equal to another value, this can be used on primitives (string, number, boolean) but also on non-primitives (objects, arrays, dates). Equality checks for non-primitives are done through FNV1A hashing |
| false | Validate that a provided value is strictly equal to false |
| formdata | Validate that a provided value is an instance of formdata |
| function | Validate that a provided value is a Function |
| async_function | Validate that a provided value is an async function |
| geo_latitude | Validate that a provided value is a valid latitude value |
| geo_longitude | Validate that a provided value is a valid longitude value |
| greater_than | Validate that a provided value is greater than a provided number, if passed a string or array this will validate on length |
| greater_than_or_equal | Validate that a provided value is greater than or equal than a provided number, if passed a string or array this will validate on length |
| gt | Alias of greater_than |
| gte | Alias of greater_than_or_equal |
| guid | Validate that a provided value is a valid guid according to rfc 4122 |
| in | Validate that a provided value is in a set of values, this requires parameterization (see above) |
| integer | Validate that a provided value is an integer, this will see NaN as invalid |
| less_than | Validate that a provided value is less than a provided number, if passed a string or array this will validate on length |
| less_than_or_equal | Validate that a provided value is less than or equal to a provided number, if passed a string or array this will validate on length |
| lt | Alias of less_than |
| lte | Alias of less_than_or_equal |
| max | Alias of less_than_or_equal |
| min | Alias of greater_than_or_equal |
| null | Validate that a provided value is null |
| number | Validate that a provided value is a number, this will see NaN as invalid |
| object | Validate that a provided value is an object, arrays will not be seen as objects by this rule |
| object_ne | Same behavior as `object`, with the additional check that empty objects will not be seen as valid |
| phone | Validate that a string is a valid phone number (will match phone numbers entered with delimiters such as spaces, dots, brackets, etc, and supports international phone numbers), take note: this does not check whether or not the phone number is in use, merely that a valid format is provided |
| required | Validate that a provided value is not empty, arrays will be seen as valid if at least 1 element is present, strings will be seen as valid if when trimmed the length is bigger than 0, null and undefined will not be valid and a NaN will also be rejected |
| size | Validate that a provided value has a specific size, this only applies to strings and arrays and checks on length |
| string | Validate that a provided value is a string |
| string_ne | Same behavior as `string`, with the additional check that empty strings (after trimming) will not be seen as valid |
| sys_ipv4 | Validate that a provided value is a valid IPv4 address |
| sys_ipv6 | Validate that a provided value is a valid IPv6 address |
| sys_ipv4_or_v6 | Validate that a provided value is either a valid IPv4 or a valid IPv6 address |
| sys_mac | Validate that a provided value is a valid MAC address |
| sys_port | Validate that a provided value is a valid port number (between 1 and 65535) |
| time_zone | Validate that a provided value is a time_zone string |
| true | Validate that a provided value is strictly equal to true |
| url | Validate that a provided value is a url, this allows for query string values as well |
| url_noquery | Validate that a provided value is a url without any query string values |
| url_img | Validate that a provided value is a url linking to an image file (eg: https://mywebsite.com/123.jpg) |
| url_vid | Validate that a provided value is a url linking to a video file (eg: https://mywebsite.com/123.mp4) |
| url_aud | Validate that a provided value is a url linking to an audio file (eg: https://mywebsite.com/123.mp3) |
| url_med | Validate that a provided value is a url linking to an audio/image or video file (eg: https://mywebsite.com/123.mp3) |

## Contributors
- [Peter Vermeulen](https://www.linkedin.com/in/petervermeulen1/)
- [SpekkoRice](https://github.com/SpekkoRice)

