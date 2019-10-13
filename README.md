# turbolinks-scroll
[![npm version](https://badge.fury.io/js/turbolinks-scroll.svg)](https://badge.fury.io/js/turbolinks-scroll) [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/) [![npm](https://img.shields.io/npm/dt/turbolinks-scroll)](https://www.npmjs.com/package/turbolinks-scroll) ![GitHub stars](https://img.shields.io/github/stars/szTheory/turbolinks-scroll?style=social)

Persist scroll position between Turbolinks AJAX calls. Based on code from ["How To: Turbolinks 5 Scroll Position Persistence"](https://medium.com/@kosovacsedad/how-to-turbolinks-5-scroll-position-persistence-6e4435a60b2e) by Sedad Kosovac


## Setup

```Javascript
import { turbolinksScrollSetup } from "turbolinks-scroll"

// automatically persist scroll on click or submit
// for any DOM element with data-turbolinks-scroll=false
turbolinksScrollSetup(document)
```

## Usage

#### DOM elements

Set `data-turbolinks-scroll=false` DOM elements you want to persist scroll position for on their `click` or `submit` event

```erb
<%= form_with model: @user, url: users_path, data: { 'turbolinks-scroll': false }  do |f| %>
<% end %>

<%= link_to 'Users', users_path, 'data-turbolinks-scroll': false  %>
```

#### AJAX calls

```JavaScript
import { turbolinksScrollSetTop } from "turbolinks-scroll"

// mark the current scroll top before AJAX submit
// so that it will persist on next Turbolinks visit
turbolinksScrollSetTop()

$.ajax({
  type: 'PUT',
  url: this.updateUrl,
  data: {
    id: id,
    position: newPosition
  },
  success: function (resp) {
  },
  error: function () {
  }
})
```

#### Delegating to other events

```JavaScript
import { turbolinksScrollSetTop } from "turbolinks-scroll"

// set the scroll position for persistence when `myEvent` is triggered
delegate("[data-turbolinks-scroll]", "myEvent", function (e) {
  turbolinksScrollSetTop()
}, false)
```
