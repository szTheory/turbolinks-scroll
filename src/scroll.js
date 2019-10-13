import delegate from 'delegate'

console.log("----1")

class TurbolinksScroller {
  constructor(document) {
    this.top = null
    this.document = document

    this._setup()
  }

  setTop() {
    console.log("setTop()")
    this.top = this.document.scrollingElement.scrollTop
    console.log(".... this.top: " + this.top)
  }

  scrollToTop() {
    console.log("scrollToTop()")
    console.log(".... this.top: " + this.top)
    if (this.top) {
      console.log("scrollToTop().... this.top was "+this.top)
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

export function turbolinksScrollSetup(document) {
  turbolinksScroller = new TurbolinksScroller(document)
}

export function turbolinksScrollSetTop() {
  if (turbolinksScroller) {
    turbolinksScroller.setTop()
  } else {
    throw "turbolinks-scroller was not setup"
  }
}