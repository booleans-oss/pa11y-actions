# pa11y-actions
<p align="left">
  <a href="https://github.com/Hesedi3l/pa11y-actions/actions?query=workflow%3Abuild-test"><img alt="build-test status" src="https://github.com/Hesedi3l/pa11y-actions/workflows/build-test/badge.svg"></a> 
<a href="https://github.com/Hesedi3l/pa11y-actions/actions?query=workflow%3Apayy1-test"><img alt="pa11y status" src="https://github.com/Hesedi3l/pa11y-actions/workflows/payy1-test/badge.svg"></a> 
</p>

# Usage

See [action.yml](action.yml)

**Basic:**
```yaml
steps:
- uses: actions/checkout@v1
- uses: browser-actions/setup-chrome@latest
- uses: Hesedi3l/pa11y-actions@v1
  with:
    start: start
    port: '3000'
```

**browser-actions/setup-chrome@latest** is needed for this action to work. Make sure you put the chrome Github Action before pa11y-actions.

Both `port` and `start` inputs are optional. If not supplied, the port would be set as **'3000'** and the running script would be set as **'start'**.

The action will firstly installed your project dependencies. The web application will, then, be started with the script provided ``npm run start`` by default. Then, pa11y will analyse the resultant web app running on the port set ( by default: ``3000``). If results, the workflow will fail and print the results. If no result, the worklow passes.

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

# Contributions

Contributions are welcome!

## Code of Conduct

:wave: Be nice.  See [our code of conduct](CONDUCT)
