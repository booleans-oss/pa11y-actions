import {getInput, setFailed} from '@actions/core'
import {exec} from 'child_process'

async function run(): Promise<void> {
  const startScript = getInput('start')
  exec(`pm2 start npm --name 'pa11y' -- run ${startScript}`, err => {
    if (err) return setFailed(err.message)
    // eslint-disable-next-line no-console
    console.log('duh')
  })
}

run()
