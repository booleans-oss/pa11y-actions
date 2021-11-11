import core from '@actions/core'
import github from '@actions/github'
import send from './send'

async function run(): Promise<void> {
  const webhookURL = core.getInput('webhookURL')
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  await send(webhookURL, payload)
}

run()
