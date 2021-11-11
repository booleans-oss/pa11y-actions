/* eslint-disable no-console */
import {context} from '@actions/github'
import {getInput} from '@actions/core'
import send from './send'

async function run(): Promise<void> {
  console.log(getInput)
  console.log(context.payload)
  const webhookURL = getInput('webhookURL')
  const payload = JSON.stringify(context.payload, undefined, 2)
  await send(webhookURL, payload)
}

run()
