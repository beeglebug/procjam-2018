
const removeLeadingWhitespace = string => string.replace(/^\s+/,'')
const removeTrailingWhitespace = string => string.replace(/\s+$/,'')

const isNotWhitespace = str => str.trim().length > 0

export default function (input = '') {
  const tokens = tokenize(input)
  return parse(tokens)
}

function tokenize (input) {

  const trimmed = removeLeadingWhitespace(input)

  const tokens = trimmed.split('\n').filter(isNotWhitespace)

  const firstLine = tokens[0]

  if (firstLine && !firstLine.startsWith('==')) {
    tokens.unshift('== default')
  }

  return tokens
}

function parse (tokens) {
  let _last
  return tokens.map(token => {

    if (token.startsWith('==')) {
      return _last = parseSection(token)
    }



    return _last = parseString(token)
  })
}

export const SECTION = 'SECTION'
export const STRING = 'STRING'

const parseSection = token => {
  const id = token.replace(/={2,}/g, '').trim()
  return instruction(SECTION, { id })
}

const parseString = token => {
  const value = token.trim()
  return instruction(STRING, { value })
}

export const instruction = (type, attributes) => ({ type, ...attributes })
