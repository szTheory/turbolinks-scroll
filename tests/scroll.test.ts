import { turbolinksScrollSetup, turbolinksPersistScrollForNextVisit, turbolinksScrollsetScrollPosition } from "../src/scroll"

test('calls methods without error', function() {
  turbolinksScrollSetup(document)
  turbolinksPersistScrollForNextVisit()
  turbolinksScrollsetScrollPosition()
})