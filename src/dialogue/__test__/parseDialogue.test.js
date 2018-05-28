/* eslint-env jest */
import parseDialogue, { instruction, SECTION, TEXT } from '../parseDialogue'

describe('parseDialogue', () => {

  it('handles empty strings', () => {
    const input = ''
    const output = parseDialogue(input)
    expect(output).toEqual([])
  })

  it('ignores leading whitespace', () => {
    const input = `
    
    == foo
    bar
    `
    const output = parseDialogue(input)
    expect(output[0]).toEqual(instruction(SECTION, { id: 'foo' }))
  })

  it('ignores empty lines', () => {
    const input = `
    == foo
    
    bar
    `
    const output = parseDialogue(input)
    expect(output[1]).toEqual(instruction(TEXT, { text: 'bar' }))
  })

  it('inserts missing section', () => {
    const input = 'bar'
    const output = parseDialogue(input)
    expect(output[0]).toEqual(instruction(SECTION, { id: 'default' }))
  })

  it('sections start with 2 equals', () => {
    const input = `== foo`
    const output = parseDialogue(input)
    expect(output[0]).toEqual(instruction(SECTION, { id: 'foo' }))
  })

  it('sections must start with at least 2 equals', () => {
    const input = `= foo`
    const output = parseDialogue(input)
    expect(output[1]).toEqual(instruction(TEXT, { text: '= foo' }))
  })

  it('sections can start with more than 2 equals', () => {
    const input = `==== foo`
    const output = parseDialogue(input)
    expect(output[0]).toEqual(instruction(SECTION, { id: 'foo' }))
  })

  it('ignores comments', () => {
    const input = `
    // comment
    == foo
    // comment again
    text
    `
    const output = parseDialogue(input)
    expect(output).toHaveLength(2)
  })

})
