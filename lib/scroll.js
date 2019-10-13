"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delegate = require("delegate");
// Based on code from "How To: Turbolinks 5 Scroll Position Persistence" by Sedad Kosovac
// ref: https://medium.com/@kosovacsedad/how-to-turbolinks-5-scroll-position-persistence-6e4435a60b2e
class TurbolinksScroller {
    constructor(document) {
        this.top = null;
        this.document = document;
        this._setup();
    }
    setTop() {
        if (this.document.scrollingElement && this.document.scrollingElement.scrollTop !== null) {
            this.top = this.document.scrollingElement.scrollTop;
        }
        else {
            throw "Tried to set top for turbolinks-scroll but document.scrollingElement.scrollTop was not set";
        }
    }
    scrollToTop() {
        if (this.top && this.document.scrollingElement && this.document.scrollingElement.scrollTop !== null) {
            this.document.scrollingElement.scrollTo(0, this.top);
        }
        this.top = null;
    }
    _setup() {
        const scroller = this;
        delegate("[data-turbolinks-scroll]", "click", "submit", function (event) {
            scroller.setTop();
        }, false);
        document.addEventListener("turbolinks:load", () => {
            scroller.scrollToTop();
        });
    }
}
let turbolinksScroller;
function turbolinksScrollSetup(document) {
    turbolinksScroller = new TurbolinksScroller(document);
}
exports.turbolinksScrollSetup = turbolinksScrollSetup;
function turbolinksScrollSetTop() {
    if (turbolinksScroller) {
        turbolinksScroller.setTop();
    }
    else {
        throw "Tried to set top for turbolinks-scroller but it was not setup";
    }
}
exports.turbolinksScrollSetTop = turbolinksScrollSetTop;
