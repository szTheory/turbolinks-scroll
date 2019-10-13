import { turbolinksScrollSetup, turbolinksScrollSetTop } from "../src/scroll"

test('calls methods without error', function() {
  turbolinksScrollSetup(document)
  turbolinksScrollSetTop()
})