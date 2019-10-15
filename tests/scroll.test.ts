import { turbolinksScrollSetup, turbolinksScrollSetTop, turbolinksPersistScrollForNextVisit } from "../src/scroll"

test('calls methods without error', function() {
  turbolinksScrollSetup(document)
  turbolinksPersistScrollForNextVisit()
  turbolinksScrollSetTop()
})