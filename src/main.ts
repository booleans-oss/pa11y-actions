import {context} from '@actions/github'
import {getInput} from '@actions/core'
import send from './send'

async function run(): Promise<void> {
  const webhookURL = getInput('webhookURL')
  const payload = JSON.stringify(context.payload, undefined, 2)
  await send(webhookURL, payload)
}

run()
