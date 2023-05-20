# Addnew

`addnew` is a command-line utility designed to simplify the creation of new components in your feature-sliced architecture.

This tool supports the generation of various component types such as pages, widgets, features, entities, and shared. It also takes care of correctly updating paths in your `tsconfig.json` file.

## Installation

You don't need to install `@jilio/addnew`, it can be run using `npx`.

However, for easier access, you can add it to the scripts section of your `package.json`:

```json
"scripts": {
  "addnew": "npx @jilio/addnew"
}
```

## Usage

To create a new component, use the following syntax:

```bash
npx @jilio/addnew <component_type> <component_name>
```

`<component_type>` should be one of the following:

- page
- widget
- feature
- entity
- shared

`<component_name>` is the name of your new component.

For example, to create a new feature named ThemeToggle, you would run:

```bash
npx @jilio/addnew feature ThemeToggle
```

or

```bash
yarn addnew feature themeToggle
```

This will create a new directory in your `src/4_features` directory named ThemeToggle, with a React component file (ThemeToggle.tsx) and an index.ts file.

### Note

For `shared` type, it just creates a single `.ts` file instead of a full component structure. For example:

```bash
npx @jilio/addnew shared router
```

This will create a new router.ts file in your `src/6_shared` directory.

## License

MIT
