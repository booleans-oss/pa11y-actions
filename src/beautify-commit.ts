import {PayloadRepository} from '@actions/github/lib/interfaces'

export function beautifyCommits(payload: PayloadRepository): string {
  const commits = payload.commits
  const orderedCommits = []
  commits.length = commits.length > 10 ? 10 : commits.length
  for (const commit of commits) {
    const [id, message, author] = LinearizeCommit(
      `${commit.id.slice(0, 7)}|${commit.message}|-|${commit.author.name}`
    )
    orderedCommits.push(
      `[\`\`${id}\`\`](${payload.repository.html_url}/commits/${commit.id}) ${message}- ${author}`
    )
  }
  return orderedCommits.join('\n')
}

function LinearizeCommit(sentence: string): string[] {
  // eslint-disable-next-line prefer-const
  let [id, message, separator, auteur] = sentence.split('|')
  if (id.length + message.length + separator.length + auteur.length > 73) {
    do {
      message = message.split('').slice(0, -1).join('')
    } while (id.length + message.length + separator.length + auteur.length > 70)
    message = `${message}... `
  }
  return [id, message, auteur]
}
