# coding-challenge-frontend

The `AutoComplete` component relies on a property called `name`. This property is used alongside the store to:

- fetch filtered data via 2 getters: `cityFilter` and `bookFilter`
- get the selected result with either the `city` or `book` getter
- perform mutations using `selectItem`

For flexible rending of the result list, the following slot is used:

```
<slot name="item" v-bind:item="item" />
```

**Local state**

The component has some local state that does not belong in the store:

```
data() {
    return {
        value: "",
        isOpen: false,
        results: [],
        activeIndex: 0,
    };
}
```

### Run unit tests

```
yarn test
```

### Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

Uploade the contents of the generated `dist` folder to your server or CDN.

### Lints and fixes files

```
yarn lint
```
