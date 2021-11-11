import {getInput, setFailed} from '@actions/core'
import {exec} from 'child_process'

async function run(): Promise<void> {
  const startScript = getInput('start')
  exec(`npm run ${startScript}`, err => {
    if (err) setFailed(err.message)
    // eslint-disable-next-line no-console
    console.log('ready')
  })
}

run()
