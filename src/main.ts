import {context} from '@actions/github'
import {getInput} from '@actions/core'
import send from './send'

async function run(): Promise<void> {
  const webhookURL = getInput('webhookURL')
  // eslint-disable-next-line no-console
  console.log(webhookURL)
  await send(webhookURL, context.payload.commits[0].message)
}

run()
