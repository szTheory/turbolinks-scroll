# turbolinks-scroll
Persist scroll position between Turbolinks AJAX calls. Based on code from ["How To: Turbolinks 5 Scroll Position Persistence"](https://medium.com/@kosovacsedad/how-to-turbolinks-5-scroll-position-persistence-6e4435a60b2e) by Sedad Kosovac


## Usage

With `data-turbolinks-scroll=false` on the DOM:

```erb
<%= form_with model: @user, url: users_path, data: { 'turbolinks-scroll': false }  do |f| %>
<% end %>

<%= link_to 'Users', users_path, 'data-turbolinks-scroll': false  %>
```

JS setup:

```Javascript
import { turbolinksScrollSetup } from "turbolinks-scroll"

// automatically persist scroll on click or submit
// for any DOM element with data-turbolinks-scroll=false
turbolinksScrollSetup(document)
```

AJAX calls:

```JavaScript
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