"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delegate = require("delegate");
// Based on code from "How To: Turbolinks 5 Scroll Position Persistence" by Sedad Kosovac
// ref: https://medium.com/@kosovacsedad/how-to-turbolinks-5-scroll-position-persistence-6e4435a60b2e
class TurbolinksScroller {
    constructor(document) {
        this.DEFAULT_SCROLL_POSITION = null;
        this.DEFAULT_PERSIST_SCROLL_FOR_NEXT_VISIT = false;
        // mark the next turbolinks visit to persist scroll
        this.persistScrollForNextVisit = this.DEFAULT_PERSIST_SCROLL_FOR_NEXT_VISIT;
        // top scroll position
        this.scrollPosition = this.DEFAULT_SCROLL_POSITION;
        // store the document
        this.document = document;
        this._setup();
    }
    setScrollPosition() {
        // get the "scrolling element" which is a reference
        // usually to the document body
        if (this.persistScrollForNextVisit && this.document.scrollingElement && this.document.scrollingElement.scrollTop !== null) {
            // store the current scroll top position
            this.scrollPosition = this.document.scrollingElement.scrollTop;
        }
    }
    // scroll to the stored top position if one is saved
    scrollToStoredPosition() {
        if (this.scrollPosition && this.document.scrollingElement) {
            // scroll page to the stored position
            this.document.scrollingElement.scrollTo(0, this.scrollPosition);
        }
        this._resetPersistence();
    }
    // default to scroll disabled
    _resetPersistence() {
        // reset the stored scroll position
        this.persistScrollForNextVisit = this.DEFAULT_PERSIST_SCROLL_FOR_NEXT_VISIT;
        // reset the persistence flag
        this.scrollPosition = this.DEFAULT_SCROLL_POSITION;
    }
    // private setup method
    _setup() {
        const scroller = this;
        delegate("[data-turbolinks-scroll]", "click", "submit", function (event) {
            // mark the next turbolinks visit to persist scroll
            scroller.persistScrollForNextVisit = true;
        }, false);
        document.addEventListener("turbolinks:before-render", () => {
            scroller.setScrollPosition();
        });
        document.addEventListener("turbolinks:load", () => {
            scroller.scrollToStoredPosition();
        });
    }
}
let turbolinksScroller;
function turbolinksScrollSetup(document) {
    turbolinksScroller = new TurbolinksScroller(document);
}
exports.turbolinksScrollSetup = turbolinksScrollSetup;
function turbolinksPersistScrollForNextVisit() {
    if (turbolinksScroller) {
        turbolinksScroller.persistScrollForNextVisit = true;
    }
    else {
        throw "Tried to set top for turbolinks-scroller but it was not setup";
    }
}
exports.turbolinksPersistScrollForNextVisit = turbolinksPersistScrollForNextVisit;
function turbolinksScrollsetScrollPosition() {
    if (turbolinksScroller) {
        turbolinksScroller.setScrollPosition();
    }
    else {
        throw "Tried to set top for turbolinks-scroller but it was not setup";
    }
}
exports.turbolinksScrollsetScrollPosition = turbolinksScrollsetScrollPosition;
