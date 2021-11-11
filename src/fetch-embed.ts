import {PayloadRepository} from '@actions/github/lib/interfaces'
import {beautifyCommits} from './beautify-commit'

interface Author {
  icon_url: string
  url: string
  name: string
}
interface Footer {
  name: string
  icon_url: string
  url: string
}
interface Field {
  name: string
  value: string
}
export interface CustomEmbed {
  url: string
  color?: string
  title?: string
  author?: Author
  description?: string
  timestamp?: Date
  footer?: Footer
  fields?: Field[]
}

export default function fetchEmbed(payload: PayloadRepository): CustomEmbed {
  // eslint-disable-next-line no-console
  console.log(payload)
  let messageEmbed
  if (payload.commits.length === 0) {
    messageEmbed = {
      color: '7289d7',
      author: {
        name: payload.sender.login,
        icon_url: payload.sender.avatar_url,
        url: payload.sender.html_url
      },
      title: `[${payload.repository.name}/${
        (payload.ref as string).split('/')[2]
      }] ${payload.created ? 'New branch created' : 'Branch deleted'} : ${
        (payload.ref as string).split('/')[2]
      }`,
      url: payload.repository.html_url
    }
  } else {
    messageEmbed = {
      color: '7289d7',
      author: {
        name: payload.sender.login,
        icon_url: payload.sender.avatar_url,
        url: payload.sender.html_url
      },
      title: `[${payload.repository.name}/${
        (payload.ref as string).split('/')[2]
      }] ${payload.commits.length} new commit${
        payload.commits.length > 1 ? 's' : ''
      }`,
      url: `${payload.repository.html_url}/commits/${payload.after}`,
      description: beautifyCommits(payload)
    }
  }

  return messageEmbed
}
