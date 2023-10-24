# Contributing to React Photo Album

First off, thank you for your interest in React Photo Album! All contributions
of all sizes are always welcome here. Here are a few guidelines that will help
you along the way.

## Code of Conduct

React Photo Album has adopted the
[Contributor Covenant](https://www.contributor-covenant.org/) as its Code of
Conduct, and we expect project participants to adhere to it. Please read
[the full text](/CODE_OF_CONDUCT.md) so that you can understand what actions
will and will not be tolerated.

## Submitting an Issue

Before committing your time to coding a new feature or fixing a bug, make sure
to open a feature request or a bug report in the project's
[Issues](https://github.com/igordanchenko/react-photo-album/issues) section to
ensure that your pull request will be accepted once it is done.

## Sending a Pull Request

1. Fork the repository.

2. Clone the fork to your local machine and add upstream remote:

```shell
git clone https://github.com/<your username>/react-photo-album.git
cd react-photo-album
git remote add upstream https://github.com/igordanchenko/react-photo-album.git
```

3. Synchronize your local `main` branch with the upstream:

```shell
git checkout main
git pull upstream main
```

4. Install the dependencies with `npm`:

```shell
npm install
```

5. Create a new head branch:

```shell
git checkout -b feat/my-new-feature
```

6. Start the dev server:

```shell
npm run dev
```

7. Make changes, run tests:

```shell
npm run test
```

8. Commit and push to your fork (make sure your commit message conforms to the
   [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)):

```shell
git commit -m "feat: awesome new feature"
git push -u origin HEAD
```

9. Go to [the repository](https://github.com/igordanchenko/react-photo-album)
   and create a Pull Request.

## Testing Changes in a Local Project

As an alternative to running the local dev server, you can link-install the
library into your local project.

1. Start the build script:

```shell
npm run start
```

2. Link-install your locally built `react-photo-album` into your local project:

```shell
# specify relative or absolute path to react-photo-album directory
RPA_HOME=../react-photo-album
npm link $RPA_HOME $RPA_HOME/node_modules/react $RPA_HOME/node_modules/react-dom
rm -rf node_modules/.cache
```

3. Make changes, run tests:

```shell
npm run test
```

4. Cleanup global link:

```shell
# execute from your local project directory
npm install
rm -rf node_modules/.cache
npm rm -g react-photo-album react react-dom
```

## License

By contributing your code to the
[react-photo-album](https://github.com/igordanchenko/react-photo-album) GitHub
repository, you agree to license your contribution under the
[MIT license](/LICENSE).
