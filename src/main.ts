import {context} from '@actions/github'
import {getInput} from '@actions/core'
import send from './send'

async function run(): Promise<void> {
  const webhookURL = getInput('webhookURL')
  await send(webhookURL, context.payload)
}

run()
