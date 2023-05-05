## **About**
**A simple library that generates bot bases for Discord.**

---

## **Installation**

```sh-session
npm i djs-template-gen
```

---

## **Example Usage**

---

## **Slash example**

```js
const { TemplateGenerator, BaseTypes } = require('djs-template-gen');

const generator = new TemplateGenerator();
generator.createBase({
  type: BaseTypes.Slash,
  templateName: 'my-template'
});
```

---

## **Prefix example**

```js
const { TemplateGenerator, BaseTypes } = require('djs-template-gen');

const generator = new TemplateGenerator();
generator.createBase({
  type: BaseTypes.Prefix,
  templateName: 'Nice lib'
});
```

---

## **Useful Links**

- [GitHub](https://github.com/Gandalf51/djs-template-gen)
- [npm](https://www.npmjs.com/package/djs-template-gen)