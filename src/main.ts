/* eslint-disable @typescript-eslint/no-explicit-any */
import * as tc from '@actions/tool-cache'
import {getInput, group, info, setFailed} from '@actions/core'
import chalk from 'chalk'
import {exec} from '@actions/exec'
import pa11y from 'pa11y'
import {wait} from './wait'

async function run(): Promise<void | Error> {
  const root = tc.find('chromium', 'latest')
  if (!root)
    return setFailed(
      'You must have Chromium installed. Please use "setup-chrome" Github Action.'
    )
  const startScript = getInput('start')
  const port = getInput('port')
  try {
    await group('📦 Installing dependencies ...', async () => {
      await exec('npm install')
      await exec('npm i -g pm2')
      await exec(`pm2 start npm --name 'pa11y' -- run ${startScript}`)
      return
    })
    await wait(3000)
    const results = await pa11y(`http://localhost:${port}`, {
      chromeLaunchConfig: {
        executablePath: '/opt/hostedtoolcache/chromium/latest/x64/chrome',
        ignoreHTTPSErrors: false
      }
    })
    if (results.issues.length) {
      info(linearizeErrors(results.issues))
      return setFailed(`ERRORS ! There are ${results.issues.length} errors!`)
    }
  } catch (e: any) {
    return setFailed(e.message)
  }
}

run()

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
