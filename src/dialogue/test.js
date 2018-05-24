import parseDialogue from './parseDialogue'

const text = `
== section1
This is a choice
* Option 1
  -> section2
* Option 2
  -> section3
 
== section2
This is information

== section3
This is an effect
// this is a comment
@give thing
`


const parsed = parseDialogue(text)

console.log(parsed)
