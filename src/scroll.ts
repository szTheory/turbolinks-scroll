import delegate = require("delegate")

// Based on code from "How To: Turbolinks 5 Scroll Position Persistence" by Sedad Kosovac
// ref: https://medium.com/@kosovacsedad/how-to-turbolinks-5-scroll-position-persistence-6e4435a60b2e
class TurbolinksScroller {
  // top scroll position
  scrollPosition : number | null

  // mark the next turbolinks visit to persist scroll
  persistScrollForNextVisit : boolean

  // DOM Document
  document: Document

  constructor(document : Document) {
    // store the document
    this.document = document

    // default scroll disabled
    this.persistScrollForNextVisit = false
    this.scrollPosition = null

    // setup
    this._setup()
  }

  setTop() {
    // get the "scrolling element" which is a reference
    // usually to the document body
    if (this.document.scrollingElement && this.document.scrollingElement.scrollTop !== null) {

      // store the current scroll top position
      this.scrollPosition = this.document.scrollingElement.scrollTop
    } else {
      throw "Tried to set top for turbolinks-scroll but document.scrollingElement.scrollTop was not set"
    }
  }

  // scroll to the stored top position if one is saved
  scrollToTop() {
    if (this.scrollPosition && this.document.scrollingElement && this.document.scrollingElement.scrollTop !== null) {

      // scroll page to the stored position
      this.document.scrollingElement.scrollTo(0, this.scrollPosition)
    }

    // reset the stored scroll position
    this.scrollPosition = null

    // reset the persistence flag
    this.persistScrollForNextVisit = false
  }

  // private setup method
  _setup() {
    const scroller = this
    delegate("[data-turbolinks-scroll]", "click", "submit", function (event: Event) {
      // mark the next turbolinks visit to persist scroll
      scroller.persistScrollForNextVisit = true
    }, false);

    document.addEventListener("turbolinks:before-visit", () => {
      // scroll to the top if persistence enabled
      if (this.persistScrollForNextVisit) {
        scroller.setTop()
      }
    })

    document.addEventListener("turbolinks:load", () => {
      scroller.scrollToTop()
    })
  }
}

let turbolinksScroller: TurbolinksScroller

export function turbolinksScrollSetup(document: Document) {
  turbolinksScroller = new TurbolinksScroller(document)
}

export function turbolinksScrollSetTop() {
  if (turbolinksScroller) {
    turbolinksScroller.setTop()
  } else {
    throw "Tried to set top for turbolinks-scroller but it was not setup"
  }
}
