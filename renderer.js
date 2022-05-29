console.log("STARING RENDER PROCESS")

function filterKeyUps(e) {
  if (e.key === "ArrowUp") { window.alert("WORKING")}
  if (e.key === "ArrowDown") {
    let body = document.getElementsByTagName('body')[0]
    let region = body.style['-webkit-app-region']
    let selectable = body.style['user-select']
    window.alert(JSON.stringify(region), JSON.stringify(selectable))
    let newregion = region === 'drag'? 'no-drag': 'drag'
    let newSelectable = selectable === 'none'? 'auto': 'none'
    body.style['-webkit-app-region'] = newregion
    body.style['user-select'] = newSelectable

    let html = document.getElementsByTagName('html')[0]
    html.style['-webkit-app-region'] = newregion
    html.style['user-select'] = newSelectable
    window.alert(JSON.stringify(body.style['-webkit-app-region']))
		// ISSUES
		// console.log above not firing for some reason
		// turning off the draggable flag, required you to scroll the window from some reason
		// after changing the css and scrolling, the draggable behaviour is turned off
  }
}
window.addEventListener('keyup', filterKeyUps, true)
