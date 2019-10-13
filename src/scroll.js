import delegate from 'delegate'

// Based on code from "How To: Turbolinks 5 Scroll Position Persistence" by Sedad Kosovac
// ref: https://medium.com/@kosovacsedad/how-to-turbolinks-5-scroll-position-persistence-6e4435a60b2e
class TurbolinksScroller {
  constructor(document) {
    this.top = null
    this.document = document

    this._setup()
  }

  setTop() {
    this.top = this.document.scrollingElement.scrollTop
  }

  scrollToTop() {
    if (this.top) {
      this.document.scrollingElement.scrollTo(0, this.top)
    }
    this.top = null
  }

  _setup() {
    delegate("[data-turbolinks-scroll]", "click", "submit", function (e) {
      this.setTop()
    }, false);

    document.addEventListener("turbolinks:load", () => {
      this.scrollToTop()
    })
  }
}

let turbolinksScroller

function turbolinksScrollSetup(document) {
  turbolinksScroller = new TurbolinksScroller(document)
}

function turbolinksScrollSetTop() {
  if (turbolinksScroller) {
    turbolinksScroller.setTop()
  } else {
    throw "Tried to set top for turbolinks-scroller but it was not setup"
  }
}

module.exports = { turbolinksScrollSetup, turbolinksScrollSetTop }