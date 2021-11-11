import axios from 'axios'

export default async function sendWebhook(
  url: string,
  payload: string
): Promise<void> {
  // eslint-disable-next-line no-console
  console.log(payload)
  await axios.post(url, {content: payload})
}
