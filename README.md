# package-bump

> Effortlessly bump your npm package version from the command line. Ideal for pre-commit hooks, CI/CD, or any automated workflow.

## Why?

Manually updating your `package.json` version is easy to forget and error-prone. `package-bump` automates this step, so your version is always up to date.

## Usage

### Quickest: npx (no install needed)

```sh
npx package-bump [patch|minor|major] [--stage]
```

- Defaults to `patch` if no argument is given.
- Add `--stage` to automatically re-stage `package.json` after bumping (useful in pre-commit/pre-push hooks).

### Local install

```sh
npm install --save-dev package-bump
```

Add to your npm scripts:

```json
{
  "scripts": {
    "bump": "package-bump minor --stage"
  }
}
```

### Global install

```sh
npm install -g package-bump
package-bump patch --stage
```

### Pre-commit hook example (with [husky](https://github.com/typicode/husky))

```sh
npx husky add .husky/pre-commit "npx package-bump patch --stage"
```

## CLI

```
Usage: package-bump [patch|minor|major] [--stage]
  patch   Increment patch version (default)
  minor   Increment minor version
  major   Increment major version
  --stage   Re-stage package.json after bumping (for git hooks)
```

## License

MIT
