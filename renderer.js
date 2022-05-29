console.log("STARING RENDER PROCESS")
function ById(id) {
  return document.getElementById(id);
}
function ByTag(tag) {
  return document.getElementsByTagName(tag)
}

// MIGHT NEED TO USE THIS APPROACH IF USING REACT
// let view = document.createElement('webview')
// view.setAttribute('src', 'https://reddit.com')
// let views = ById('views')
// views.appendChild(view)


function filterKeyUps(e) {
  if (e.key === "ArrowUp") { window.alert("WORKING")}
  if (e.key === "ArrowDown") { toggleMovable() }
}

window.addEventListener('keyup', filterKeyUps, true)


// functions

function toggleMovable() {
  let body = ByTag('body')[0]
  let region = body.style['-webkit-app-region']
  let selectable = body.style['user-select']
  window.alert(JSON.stringify(region), JSON.stringify(selectable))
  let newregion = region === 'drag'? 'no-drag': 'drag'
  let newSelectable = selectable === 'none'? 'auto': 'none'
  body.style['-webkit-app-region'] = newregion
  body.style['user-select'] = newSelectable

  let html = ByTag('html')[0]
  html.style['-webkit-app-region'] = newregion
  html.style['user-select'] = newSelectable
  window.alert(JSON.stringify(body.style['-webkit-app-region']))
  // ISSUES
  // turning off the draggable flag, required you to scroll the window from some reason
  // after changing the css and scrolling, the draggable behaviour is turned off
}
