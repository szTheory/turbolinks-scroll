const jsdom = require("jsdom")
const { JSDOM } = jsdom
const dom = new JSDOM()
global.document = dom.window.document
global.document.scrollingElement = document.documentElement
global.document.scrollingElement.scrollTop = 0
global.window = dom.window
