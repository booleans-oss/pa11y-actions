import axios from 'axios'
import {setFailed} from '@actions/core'

export default async function sendWebhook(
  url: string,
  payload: string
): Promise<void> {
  try {
    await axios.post(url, {content: payload})
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    setFailed(error.response ? error.response.data : error.message)
  }
}
