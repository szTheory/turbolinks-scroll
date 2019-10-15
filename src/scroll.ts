import delegate = require("delegate")

// Based on code from "How To: Turbolinks 5 Scroll Position Persistence" by Sedad Kosovac
// ref: https://medium.com/@kosovacsedad/how-to-turbolinks-5-scroll-position-persistence-6e4435a60b2e
class TurbolinksScroller {
  DEFAULT_SCROLL_POSITION = null
  DEFAULT_PERSIST_SCROLL_FOR_NEXT_VISIT = false

  // mark the next turbolinks visit to persist scroll
  persistScrollForNextVisit = this.DEFAULT_PERSIST_SCROLL_FOR_NEXT_VISIT

  // top scroll position
  scrollPosition: number | null = this.DEFAULT_SCROLL_POSITION

  // DOM Document
  document: Document

  constructor(document : Document) {
    // store the document
    this.document = document
    this._setup()
  }

  setScrollPosition() {
    // get the "scrolling element" which is a reference
    // usually to the document body
    if (this.persistScrollForNextVisit && this.document.scrollingElement && this.document.scrollingElement.scrollTop !== null) {

      // store the current scroll top position
      this.scrollPosition = this.document.scrollingElement.scrollTop
    } else {
      throw "Tried to set scroll position for turbolinks-scroll but document.scrollingElement.scrollTop was not set"
    }
  }

  // scroll to the stored top position if one is saved
  scrollToStoredPosition() {
    if (this.scrollPosition && this.document.scrollingElement) {

      // scroll page to the stored position
      this.document.scrollingElement.scrollTo(0, this.scrollPosition)
    } else {
      throw "Tried scroll to stored position for turbolinks-scroll but document.scrollingElement was not set"
    }

    this._resetPersistence()
  }
  
  // default to scroll disabled
  _resetPersistence() {
    // reset the stored scroll position
    this.persistScrollForNextVisit = this.DEFAULT_PERSIST_SCROLL_FOR_NEXT_VISIT

    // reset the persistence flag
    this.scrollPosition = this.DEFAULT_SCROLL_POSITION
  }

  // private setup method
  _setup() {
    const scroller = this
    delegate("[data-turbolinks-scroll]", "click", "submit", function (event: Event) {
      // mark the next turbolinks visit to persist scroll
      scroller.persistScrollForNextVisit = true
    }, false);

    document.addEventListener("turbolinks:before-render", () => {
      // scroll to the top if persistence enabled
      if (this.persistScrollForNextVisit) {
        scroller.setScrollPosition()
      }
    })

    document.addEventListener("turbolinks:load", () => {
      scroller.scrollToStoredPosition()
    })
  }
}

let turbolinksScroller: TurbolinksScroller

export function turbolinksScrollSetup(document: Document) {
  turbolinksScroller = new TurbolinksScroller(document)
}

export function turbolinksPersistScrollForNextVisit() {
  if (turbolinksScroller) {
    turbolinksScroller.persistScrollForNextVisit = true
  } else {
    throw "Tried to set top for turbolinks-scroller but it was not setup"
  }
}

export function turbolinksScrollsetScrollPosition() {
  if (turbolinksScroller) {
    turbolinksScroller.setScrollPosition()
  } else {
    throw "Tried to set top for turbolinks-scroller but it was not setup"
  }
}
