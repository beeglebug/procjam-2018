const removeLeadingWhitespace = string => string.replace(/^\s+/, '')

const isWhitespace = str => str.trim().length === 0

export default function (input = '') {
  const tokens = tokenize(input)
  return parse(tokens)
}

function tokenize (input) {

  const trimmed = removeLeadingWhitespace(input)

  const tokens = trimmed.split('\n')
    .filter(token => {
      if (isWhitespace(token)) return false
      return (token.trim().startsWith('//') === false)
    })

  const firstLine = tokens[0]

  if (firstLine && !firstLine.trim().startsWith('==')) {
    tokens.unshift('== default')
  }

  return tokens
}

function parse (tokens) {
  let _last //eslint-ignore-line no-unused-vars
  return tokens.map(token => {

    if (token.startsWith('==')) {
      return _last = parseSection(token)
    }

    if (token.startsWith('*')) {
      return _last = parseOption(token)
    }

    return _last = parseText(token)
  })
}

export const SECTION = 'SECTION'
export const TEXT = 'TEXT'
export const OPTION = 'OPTION'

const parseSection = token => {
  const id = token.replace(/={2,}/g, '').trim()
  return instruction(SECTION, { id })
}

const parseText = token => {
  const text = token.trim()
  return instruction(TEXT, { text })
}

const parseOption = token => {
  const text = token.replace(/^\*\s+/, '')
  return instruction(OPTION, { text })
}

export const instruction = (type, attributes) => ({ type, ...attributes })
