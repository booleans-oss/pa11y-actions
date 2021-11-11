import {getInput, setFailed} from '@actions/core'
import {getExecOutput} from '@actions/exec'

import pa11y from 'pa11y'

async function run(): Promise<string | void> {
  const startScript = getInput('start')
  try {
    // eslint-disable-next-line no-console
    console.log('before pm2')
    await getExecOutput(`pm2 start npm --name 'pa11y' -- run ${startScript}`)
    // eslint-disable-next-line no-console
    console.log('after pm2')
    const results = await pa11y('http://localhost:3000', {
      chromeLaunchConfig: {
        executablePath: '/opt/hostedtoolcache/chromium/latest/x64/chrome',
        ignoreHTTPSErrors: false
      }
    })
    // eslint-disable-next-line no-console
    console.log(results)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.log(e)
    return setFailed(e.message)
  }
}

run()
