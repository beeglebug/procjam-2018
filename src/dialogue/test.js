import parseDialogue from './parseDialogue'

const text = `
== section1
This is a choice
* Option 1
  // comment
  -> section2
* Option 2 -> section3
// does nothing
* Option 3
 
== section2
This is information

== section3
This is a function
{give(thing)}
`

const parsed = parseDialogue(text)
