# @valkyriestudios/validator

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CodeCov](https://codecov.io/gh/ValkyrieStudios/validator/branch/main/graph/badge.svg)](https://codecov.io/gh/ValkyrieStudios/validator)
[![CI](https://github.com/ValkyrieStudios/validator/actions/workflows/ci.yml/badge.svg)](https://github.com/ValkyrieStudios/validator/actions/workflows/ci.yml)
[![CodeQL](https://github.com/ValkyrieStudios/validator/actions/workflows/github-code-scanning/codeql/badge.svg?branch=main)](https://github.com/ValkyrieStudios/validator/actions/workflows/github-code-scanning/codeql)
[![npm](https://img.shields.io/npm/v/@valkyriestudios/validator.svg)](https://www.npmjs.com/package/@valkyriestudios/validator)
[![npm](https://img.shields.io/npm/dm/@valkyriestudios/validator.svg)](https://www.npmjs.com/package/@valkyriestudios/validator)

An extensible blazing-fast javascript validator

## Installation
`npm install --save @valkyriestudios/validator`

## Example usage
```typescript
import Validator from '@valkyriestudios/validator';

const v = Validator.create({
    first_name: 'string|min:2',
    last_name: 'string|min:2',
    email: '?email',
    age: '?integer|between:0,150',
    old_password: '!equal_to:<password>',
    password: 'string|min:8',
    confirmation: 'equal_to:<password>',
});
v.check({first_name: 'Peter'})) // false
v.check({
    first_name: 'Peter',
    last_name: 'Vermeulen',
    old_password: 'myoldpass',
    password: 'mySecr3tPass',
    confirmation: 'mySecr3tPass',
}); // true
```

## @check: Simple/Speedy validity checks
In case you don't need an evaluation object and are simply interested in whether or not something is valid you can also choose to work with the faster `check` method available on any validator instance. This method is faster than standard validation through `validate` due to not needing to build up a full resultset and immediately returning the moment it spots something invalid.

```typescript
const v = Validator.create({name: 'string_ne|min:2', age: 'integer|between:1,150'});

v.check({name: 'Peter', age: '250'}); // false
v.check({name: 'Peter', age: 20}); // true
```

**Important**: The check function **also acts as a type guard for the checked data**.
```typescript
const myValidator = Validator.create({
    first_name: 'string_ne',
    last_name: 'string_ne',
    email: '?email',
});

function (raw:unknown) {
    if (!myValidator.check(raw)) return false;

    /**
     * At this point raw will be typed as
     * {
     *  first_name: string;
     *  last_name: string;
     *  email: Email | undefined;
     * }
     */
}
```

## @checkForm: FormData validity check and conversion to object
Let's say you're working on backend validation and you're receiving FormData instances with Files and other raw data ... we all know that validating those can get quite complex, and then there's the conversion as well to more easily work with it server-side.

**checkForm** is a utility allowing you to check if a FormData instance is valid AND automatically convert it to an object if it is

Take Note:
- The checkForm function will **convert and return a typed Object** if valid.
- checkForm is perfect for usage inside of middleware on backend endpoints

```typescript
/* Example using a Typed Validator */
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

... // result is typed as User and will be {name: "Peter", age: 34}
```

type check/guard also applies when working with an automatically inferred validator
```typescript
const v = Validator.create({
    name: 'string_ne|min:2',
    age: 'integer|between:1,150',
});

const form = new FormData();
form.append('name', 'Peter');
form.append('age', '34');
const result = v.checkForm(form);
if (!result) return;

... // result is typed as {name: string; age: number} and will be {name: "Peter", age: 34}
```

## @validate: Running validations and checking evaluations
After a validator instance is created, you can run it as many times as you want to validate a data object passed to it. The resultset of this is called an `evaluation` and is returned when calling the `validate` function.

```typescript
const myvalidator = Validator.create({name: 'string_ne|min:2', age: 'integer|between:1,150'});

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
const v = Validator.create({
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
### Q: I want to get the type of a validator to use in my code
There is a **schema** getter on any Validator instance which returns the raw schema passed to the Validator. By design this getter's **return type** is set to the inferred schema of the Validator. As such doing `type myType = typeof myValidator.schema` will work a treat. For example:
```typescript
const v = Validator.create({first_name: 'string_ne', email: '?email'});
type vType = typeof v.schema; // {first_name:string; email: Email | undefined}
```

### Q: I want to do full evaluations with validate while also being able to make use of automatic typing
Validate by design does not act as a typeguard, to still be able to infer types you will need to manually cast them. There are multiple ways to do this, below is one native example:
```typescript
const v = Validator.create({first_name: 'string_ne', email: '?email'});
type vType = typeof v.schema;

function process (raw:unknown) {
    const evaluation = v.validate(raw);
    if (!evaluation.is_valid) {
        ... // do something with the evaluation as its not valid
    } {
        const data = raw as vType;
        ... // do something with the data which is not typed as {first_name:string; email: Email | undefined}
    }
}
```

## To Type or Not to type, that IS the question
If you've read the examples carefully you might have spotted that there's **two ways** to construct a Validator, by directly instantiating one `new Validator`, or creating one through `Validator.create`. There's a good reason for this.

Taking a trip down memory lane **prior to the 10.x release** the following was the only way you could get type-safety/type-guards on Validator:
```typescript
import Validator from '@valkyriestudios/validator';

type User {
    first_name: string;
    last_name: string;
    email: string;
}

const vUser = new Validator<User>({
    first_name: 'string_ne|min:2',
    last_name: 'string_ne|min:2',
    email: 'email',
});

function process (raw: unknown) {
    if (!vUser.check(raw)) return;
    ... // raw is typed as User
}
```

Since 10.x this example can now **also** be written as:
```typescript
import Validator from '@valkyriestudios/validator';

const vUser = Validator.create({
    first_name: 'string_ne|min:2',
    last_name: 'string_ne|min:2',
    email: 'email',
});

function process (raw: unknown) {
    if (!vUser.check(raw)) return;
    ... // raw is typed as {first_name:string; last_name:string; email: Email}
}
```

Both are still supported, as such the question is **"Which one is better?"**. Here's the same example with the addition of type extraction:
```typescript
import Validator from '@valkyriestudios/validator';

const vUser = Validator.create({
    first_name: 'string_ne|min:2',
    last_name: 'string_ne|min:2',
    email: 'email',
});

type User = typeof vUser.schema;  // Take note of the typing, this type can now be user in other downstream functions

function process (raw: unknown) {
    if (!vUser.check(raw)) return;
    subProcess(raw);
}

function subProcess (raw:User) { // We are sure here of the schema/type
    ... // do something
}
```

Now let's flip this around ... and imagine that **we don't define our types ourselves**, but they come from somewhere else such as a database schema or module.
```typescript
import Validator from '@valkyriestudios/validator';
import {type User} from './db/types';

const vUser = new Validator<User>({
    first_name: 'string_ne|min:2',
    last_name: 'string_ne|min:2',
    // Typescript will complain here as we are missing our User's email field!
});

const vUserDetails = new Validator<Omit<User, 'email'>>({
    first_name: 'string_ne|min:2',
    last_name: 'string_ne|min:2',
    // Typescript will NOT complain here
});

type vUserDetails = typeof vUserDetails.schema;
```

As such 'to type' or 'not to type' truly depends on your usecase. Here's a set of golden rules:
- If you have **fixed/prebuilt types** that you want to write validators for make use of `new Validator<...>({...})` as it gives you type safety **on the schema**
- If you **DO NOT** have fixed/prebuilt types use `Validator.create(...)` and the schema will be automatically inferred and check/checkForm will be type-guarded.
- If you want to **extract the type** for a validator make use of `typeof myValidator.schema`.

## Multi-Schema validation
Sometimes an object can have one of several shapes, all of which are valid shapes, to accomodate for this you can pass multiple schemas to `Validator.create` as an array of schemas. In the **How does this work** section of the documentation you will read about OR-groups, in essence this array of schemas acts as an 'OR-group' on the root level of the Validator.

For example let's say you're building an endpoint which handles incoming messages, you have several possible types of messages and wish to validate ahead of time that your payload is a valid shape.

You could do something like this (which is a perfectly valid approach):
```typescript
const vSent = Validator.create({type: 'literal:sent', message: 'string_ne', target: ['email', 'phone']});
const vReceived = Validator.create({type: 'literal:received', message: 'string_ne', from: ['email', 'phone']});

function someFunction (data:Record<string, unknown>) {
    if (vSent.check(data)) {
        return onVSent(data);
    } else if (vReceived.check(data)) {
        return onVReceived(data);
    }
};
```

Going one step further, you could also create an or-based validator from the two validators:
```typescript
import {vSent, onSent} from './onSentHandler';
import {vReceived, onReceived} from './onReceivedHandler';

const v = Validator.create([vSent, vReceived]);

function someFunction (data:Record<string, unknown>) {
    if (!v.check(data)) return false;

    switch (data.type) {
        case 'sent': onSent(data); break;
        case 'received': onReceived(data); break;
        case 'bla' /* Typescript will complain here as there's no bla in the union */
    }
};
```

Or you could just define it all internally:
```typescript
import {onSent} from './onSentHandler';
import {onReceived} from './onReceivedHandler';

const v = Validator.create([
    {type: 'literal:sent', message: 'string_ne', target: ['email', 'phone']},
    {type: 'literal:received', message: 'string_ne', from: ['email', 'phone']},
]);

function someFunction (data:Record<string, unknown>) {
    if (!v.check(data)) return false;

    switch (data.type) {
        case 'sent': onSent(data); break;
        case 'received': onReceived(data); break;
        case 'bla' /* Typescript will complain here as there's no bla in the union */
    }
};
```

As per usual there's multiple roads to validation. It very much depends on your preferences but here's some tips:
- Endpoints like in the example are prevalent in many systems, to make them scalable you will want to modularize, the benefit of being able to create a union of two or more Validators is that you can keep the logic for a particular 'type' internal while outsourcing the validation. You have the best of both worlds as you can still infer the type from the original validator.
- Try to have one property on which you can 'discriminate' against, in many systems this is a 'type' or 'action' value. The `literal` rule is your best friend here.
- If you want to **extract the type** for a union validator you can still do this of course, make use of `typeof myValidator.schema`.

## How does this work?
### Instantiating a new validator
A validator instance is reusable across multiple validation runs, it's instantiated with a set of rules that it needs to validate later down the
line. These rules can go from single dimensional kv objects to multi-dimensional kv objects.

You can create very small validators `... = Validator.create({email: 'email'});` to very complex validators using a simple
readable syntax.

```typescript
Validator.create({
    address: {
        street: 'string|alpha_num_spaces',
        nr: 'integer',
        zip: 'integer|between:1000,9999',
    },
    contact: {
        email: ['email', 'false'],
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
const v = Validator.create({a: 'equal_to:<b>'});

v.check({a: 'hello', b: 'world'}); // false
v.check({a: 'foo', b: 'foo'}); // true
```

Example of a parameterized greater_than rule:
```typescript
const v = Validator.create({a: 'greater_than:<b>'});

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
const v = Validator.create({gender: '?string|in:<genders>'});

v.check({genders: ['m', 'f', 'o']}); // true
v.check({gender: 'X', genders: ['m', 'f', 'o']}); // false
```

### Opposite rules
In some cases you want to validate the exact opposite of a rule, for example if you want to validate that something is not in a set, not equal to something, not of a certain type, not ... (you catch my drift). To allow for this we've added the `!` flag.

To make use of the `!` flag, place it at the very start of any condition (including your own conditions that are defined through extension).

Examples of opposite validations:

```typescript
const v = Validator.create({
    password: 'string|min:8',
    password_old: 'string|min:8|!equal_to:<password>',
});

v.check({password: 'mysecretpass', password_old: 'mysecretpass'}); // false
v.check({password: 'mysecretpass', password_old: 'myoldpass'}); // true
```

### Array/KV-Map validation
Often, we have to deal with things such as validation of sets of data, good examples might be filters where you can have multi-selection. To tackle the concept of array or KV-map validation you can treat any rule as an iterable rule by prefixing `[]` in front of it.

For example the rule: `integer|greater_than:0` will validate that the provided value is an integer greater than 0, but if we expect an array of integers that need to be greater than 0 we can use the following: `[]integer|greater_than:0`.

```typescript
const v = Validator.create({
    ids: '[]integer|greater_than:0',
});

v.check({ids: 5}); // false
v.check({ids: [5]}); // true
```

###### KV-Map (`{}`)
In case you need to validate a KV-Map where each value needs to be valid according to the same rule swap out the `[]` prefix for `{}`.

```typescript
const v = Validator.create({users: '{min:1}user'});

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
const CustomValidator = Validator.extend({
    is_fruit: ['apple', 'orange', 'pear']m
});

const validator = CustomValidator.create({fruits: `[unique|min:1|max:4]is_fruit`});
validator.check({fruits: ['apple', 'orange']}); // true
validator.check({fruits: ['apple', 'apple', 'orange']}); // false (not unique)
validator.check({fruits: []}); // false (min: 1)
validator.check({fruits: ['apple', 'dog', 'orange']}); // false (is_fruit)
validator.check({fruits: ['apple', 'dog', 'orange', 'pear', 'pear']}); // false (is_fruit and over max)
```

### OR Groups
Every now and then we want to validate whether or not something is either A or B, for example whether or not a value is an email or its false. To tackle this notion of something being valid in multiple ways you can employ an or group, for example to validate whether or not something is either an email or false we can do the following:
```typescript
const v = Validator.create({a: ['email', 'false']});
v.check({a: false}); // true
v.check({a: 'contact@valkyriestudios.be'}); // true
v.check({}); // false
v.check({a: 'foobar'}); // false
v.check({a: true}); // false
```

OR groups can be combined with the `?` sometimes flag as well like `['?', 'email', 'false']` which would have the following behavior:
```typescript
const v = Validator.create({a: ['?', 'email', 'false']});
v.check({a: false}); // true
v.check({a: 'contact@valkyriestudios.be'}); // true
v.check({}); // true
v.check({a: 'foobar'}); // false
v.check({a: true}); // false
```

Can also be combined with other operators to form more complex rules such as:
```typescript
const v = Validator.create({
    a: ['?', 'integer|between:1,150|!between:50,100', 'integer|between:-1,-150'],
});
v.check({a: 0}); // false
v.check({a: 20}); // true
v.check({}); // true
v.check({a: -20}); // true
v.check({a: 65}); // false
```

And array combinators:
```typescript
const v = Validator.create({a: ['email', '[unique|min:1]email']);
v.check({a: 'contact@valkyriestudios.be'}); // true
v.check({a: ['contact@valkyriestudios.be', 'peter@valkyriestudios.be'}); // true
v.check({a: ['contact@valkyriestudios.be', 'contact@valkyriestudios.be']}); // false
```

And even schemas:
```typescript
const v = Validator.create({
    user: ['?', {
        details: ['?', {
            security: ['?', {types: '?[unique|min:1|max:10]in:<securityTypes>'}],
        }],
    }],
});
v.check({user: {details: {}}}); // true
v.check({user: "Hello"}); // false
v.check({
    user: {
        details: {
            security: {
                types: [],
            },
        },
    },
    securityTypes: ['credentials', 'otp', 'sso'],
}); // false
v.check({
    user: {
        details: {
            security: {
                types: ['sso', 'credentials'],
            },
        },
    },
    securityTypes: ['credentials', 'otp', 'sso'],
}); // true
```

## Want to use the validation rules directly without a validator?
If you see the need to directly use the validation rule functions without a validator instance, or want to check internal state you can use the `Validator.rules` static.

```typescript
Validator.rules.phone('+32 487 61 59 82'); // true
Validator.rules.email('contact@valkyriestudios.be'); // true
```

## Extension
Validator offers a unified, powerful extension API that makes it easy to expand the built-in validation rules while keeping type inference sharp and reliable. You can extend Validator using a simple key/value mapping that supports custom functions, regular expressions, enum arrays, and even nested schema objects.

The extend method **returns an adjusted Validator class** so that new instances built on top of your extensions are fully type-aware.

When working with extend you will pass a **kv-map** where the keys define the name of the rule and the value what you want the rule to do. These values can come in one of 4 shapes:
- **Custom function**: A function that implements your custom validation logic.
- **Regular Expression**: A RegExp to test against string values.
- **Enum array**: An array of strings or numbers representing a fixed set of acceptable values.
- **Schema object**: A nested schema that validates an object according to its own set of rules.

Without much ado here's a good example:
```
const CustomValidator = Validator.extend({
  // Custom rule as a function:
  multipleOf2: val => Number.isFinite(val) && val % 2 === 0,
  
  // Regex rule:
  contains_hello: /((h|H)ello|(o|O)la)/,
  
  // Enum-like rule:
  is_fruit: ['apple', 'pear', 'orange'],
  
  // Schema extension:
  user: {
    first_name: 'string_ne|min:3',
    last_name: 'string_ne|min:3',
    phone: '?phone',
  },
});
```

These extensions **support the exact same behaviors** as the standard built-in rules, such as:
- being accessible as standalone functions
```typescript
CustomValidator.rules.user({first_name: 'Peter'}); // false
```
- ability to work with operands
```typescript
CustomValidator.create({a: '!multipleOf2'}).check({a: 1}); // true
```
- ability to type guard
```typescript
const v = CustomValidator.create({
    fruit: 'is_fruit',
    users: '[]user',
    type: 'string_ne',
});

type vType = typeof v.schema;
/* The above will result in: the following type: {
    fruit: "apple" | "pear" | "banana" | "kiwi" | "orange" | "grape";
    users: {
        first_name: string;
        last_name: string;
        phone: Phone | undefined;
    }[];
    bla: string;
}*/
```

**Quicktip**: Given that Validator is a global singleton it is beneficial to centralize schema extension, as you only need to register them once.

## Available rules
The following list shows you all the default rules that are provided by this library, feel free to write your own or open a PR to extend on this set!

| Rule     | Description               |
|:---------|:--------------------------|
| `alpha_num_spaces` | Validate a string to only contain alphabetical, numerical and space characters |
| `alpha_num_spaces_multiline` | Ditto alpha_num_spaces but with the addition of allowing linebreak and carriage returns |
| `array` | Validate that a provided value is an array |
| `array_ne` | Same behavior as `array`, with the additional check that empty arrays will not be seen as valid |
| `base64` | Validate that a provided value is a valid base64 encoded string |
| `between` | Validate that a provided value is between two numbers, if passed a string or array this will validate on length, if passed a Blob or File this will validate on their size |
| `between_inc` | Validate that a provided value is between or equal to two numbers, if passed a string or array this will validate on length, if passed a Blob or File this will validate on their size |
| `blob` | Validate that a provided value is an instance of Blob |
| `boolean` | Validate that a provided value is a boolean |
| `color_hex` | Validate that a provided value is a hex color (with the # included) |
| `continent` | Validate that a provided value is a continent code |
| `country` | Validate that a provided value is an alpha-2 code according to ISO 3166-1 |
| `country_alpha3` | Validate that a provided value is an alpha-3 code according to ISO 3166-1 |
| `cron` | Validate that a provided value is a valid cron schedule |
| `date` | Validate that a provided value is a date object |
| `date_day` | Validate that a provided value is a valid date string in format of 'YYYY-MM-DD' |
| `date_iso` | Validate that a provided value is a valid ISO formatted date string in format of 'YYYY-MM-DDTHH:mm:ss.SSSZ' or 'YYYY-MM-DDTHH:mm:ssZ' |
| `date_string` | Validate that a provided value is a valid date string |
| `ean` | Validates European Article Numbers (EANs), supporting both 8-character (EAN-8) and 13-character (EAN-13) formats |
| `ean_8` | Validates European Article Number (EANs) 8-character format |
| `ean_13` | Validates European Article Number (EANs) 13-character format |
| `email` | Validate that a provided value is an email, take note: this only structurally tests if an email is good, it doesn't test whether an email actually exists |
| `eq` | Alias of equal_to |
| `equal_to` | Validate that a provided value is equal to another value, this can be used on primitives (string, number, boolean) but also on non-primitives (objects, arrays, dates). Equality checks for non-primitives are done through FNV1A hashing |
| `false` | Validate that a provided value is strictly equal to false |
| `file` | Validate that a provided value is an instance of File |
| `formdata` | Validate that a provided value is an instance of FormData |
| `function` | Validate that a provided value is a Function |
| `async_function` | Validate that a provided value is an async function |
| `geo_latitude` | Validate that a provided value is a valid latitude value |
| `geo_longitude` | Validate that a provided value is a valid longitude value |
| `greater_than` | Validate that a provided value is greater than a provided number, if passed a string or array this will validate on length, if passed a Blob or File this will validate on their size |
| `greater_than_or_equal` | Validate that a provided value is greater than or equal than a provided number, if passed a string or array this will validate on length, if passed a Blob or File this will validate on their size |
| `gt` | Alias of greater_than |
| `gte` | Alias of greater_than_or_equal |
| `guid` | Validate that a provided value is a valid guid according to rfc 4122 |
| `in` | Validate that a provided value is in a set of values, this requires parameterization (see above) |
| `integer` | Validate that a provided value is an integer, this will see NaN as invalid |
| `isbn` | Validates International Standard Book Numbers (ISBNs), supporting both ISBN-10 and ISBN-13 formats |
| `isbn_10` | Validates International Standard Book Number (ISBNs) 10-character format |
| `isbn_13` | Validates International Standard Book Number (ISBNs) 13-character format |
| `less_than` | Validate that a provided value is less than a provided number, if passed a string or array this will validate on length, if passed a Blob or File this will validate on their size |
| `less_than_or_equal` | Validate that a provided value is less than or equal to a provided number, if passed a string or array this will validate on length, if passed a Blob or File this will validate on their size |
| `literal` | Validate that a provided value is equal to a literal value. This rule is special in that type inferrence treats the param as literal, eg: `literal:sent` the type for this rule in the schema will be `sent` |
| `lt` | Alias of less_than |
| `lte` | Alias of less_than_or_equal |
| `max` | Alias of less_than_or_equal |
| `min` | Alias of greater_than_or_equal |
| `null` | Validate that a provided value is null |
| `number` | Validate that a provided value is a number, this will see NaN as invalid |
| `object` | Validate that a provided value is an object, arrays will not be seen as objects by this rule |
| `object_ne` | Same behavior as `object`, with the additional check that empty objects will not be seen as valid |
| `phone` | Validate that a string is a valid phone number (will match phone numbers entered with delimiters such as spaces, dots, brackets, etc, and supports international phone numbers), take note: this does not check whether or not the phone number is in use, merely that a valid format is provided |
| `size` | Validate that a provided value has a specific size, this only applies to strings and arrays and checks on length |
| `string` | Validate that a provided value is a string |
| `string_ne` | Same behavior as `string`, with the additional check that empty strings (after trimming) will not be seen as valid |
| `ssn` | Validates U.S. Social Security Numbers (SSN), ensuring the format XXX-XX-XXXX where each "X" is a digit |
| `sys_ipv4` | Validate that a provided value is a valid IPv4 address |
| `sys_ipv6` | Validate that a provided value is a valid IPv6 address |
| `sys_ipv4_or_v6` | Validate that a provided value is either a valid IPv4 or a valid IPv6 address |
| `sys_mac` | Validate that a provided value is a valid MAC address |
| `sys_port` | Validate that a provided value is a valid port number (between 1 and 65535) |
| `time_zone` | Validate that a provided value is a time_zone string |
| `true` | Validate that a provided value is strictly equal to true |
| `url` | Validate that a provided value is a url, this allows for query string values as well |
| `url_noquery` | Validate that a provided value is a url without any query string values |
| `url_img` | Validate that a provided value is a url linking to an image file (eg: https://mywebsite.com/123.jpg) |
| `url_vid` | Validate that a provided value is a url linking to a video file (eg: https://mywebsite.com/123.mp4) |
| `url_aud` | Validate that a provided value is a url linking to an audio file (eg: https://mywebsite.com/123.mp3) |
| `url_med` | Validate that a provided value is a url linking to an audio/image or video file (eg: https://mywebsite.com/123.mp3) |
| `ulid` | Validates ULIDs (Universally Unique Lexicographically Sortable Identifiers), ensuring a 26-character uppercase alphanumeric format |
| `uuid` | Validates general UUIDs, supporting versions 1 through 5 |
| `uuid_v1` | Validate that a provided value is a valid v1 UUID |
| `uuid_v2` | Validate that a provided value is a valid v2 UUID |
| `uuid_v3` | Validate that a provided value is a valid v3 UUID |
| `uuid_V4` | Validate that a provided value is a valid v4 UUID |
| `uuid_v5` | Validate that a provided value is a valid v5 UUID |

## Contributors
- [Peter Vermeulen](https://www.linkedin.com/in/petervermeulen1/)
- [SpekkoRice](https://github.com/SpekkoRice)

