import {getInput, setFailed} from '@actions/core'
import {command} from 'execa'

async function run(): Promise<string | void> {
  const startScript = getInput('start')
  try {
    const {stdout} = await command(`npm run ${startScript}`)
    // eslint-disable-next-line no-console
    console.log(stdout)

    return stdout
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return setFailed(e.message)
  }
}

run()
