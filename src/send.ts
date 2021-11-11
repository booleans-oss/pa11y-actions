import {WebhookPayload} from '@actions/github/lib/interfaces'
import axios from 'axios'
import fetchEmbed from './fetch-embed'
import {setFailed} from '@actions/core'

export default async function sendWebhook(
  url: string,
  payload: WebhookPayload
): Promise<void> {
  try {
    // eslint-disable-next-line no-console
    console.log(payload, fetchEmbed(payload))
    await axios.post(url, {embeds: [fetchEmbed(payload)]})
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    setFailed(error.response ? error.response.data : error.message)
  }
}
