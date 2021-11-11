import {getInput, setFailed} from '@actions/core'
import chalk from 'chalk'
import {getExecOutput} from '@actions/exec'
import pa11y from 'pa11y'
import {wait} from './wait'

async function run(): Promise<void | Error> {
  const startScript = getInput('start')
  try {
    await getExecOutput(`pm2 start npm --name 'pa11y' -- run ${startScript}`)
    await wait(10000)
    const results = await pa11y('http://localhost:3000', {
      chromeLaunchConfig: {
        executablePath: '/opt/hostedtoolcache/chromium/latest/x64/chrome',
        ignoreHTTPSErrors: false
      }
    })
    if (results.issues.length) {
      return setFailed(linearizeErrors(results.issues))
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.log(e)
    return setFailed(e.message)
  }
}

run()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function linearizeErrors(errors: any[]): string {
  return errors
    .map(
      error =>
        `${chalk.red('• Error:')} ${error.message}\n   ├── ${chalk.grey(
          error.code
        )}\n   ├── ${chalk.grey(error.selector)}\n   └── ${chalk.grey(
          error.context
        )}`
    )
    .join('\n \n ')
}
