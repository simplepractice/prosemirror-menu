var SVG = "http://www.w3.org/2000/svg"
var XLINK = "http://www.w3.org/1999/xlink"

var prefix = "ProseMirror-icon"

function hashPath(path) {
  var hash = 0
  for (var i = 0; i < path.length; i++)
    { hash = (((hash << 5) - hash) + path.charCodeAt(i)) | 0 }
  return hash
}

function getIcon(icon) {
  var node = document.createElement("div")
  node.className = prefix
  if (icon.path) {
    var name = "pm-icon-" + hashPath(icon.path).toString(16)
    if (!document.getElementById(name)) { buildSVG(name, icon) }
    var svg = node.appendChild(document.createElementNS(SVG, "svg"))
    svg.style.width = (icon.width / icon.height) + "em"
    var use = svg.appendChild(document.createElementNS(SVG, "use"))
    use.setAttributeNS(XLINK, "href", /([^#]*)/.exec(document.location)[1] + "#" + name)
  } else if (icon.dom) {
    node.appendChild(icon.dom.cloneNode(true))
  } else {
    node.appendChild(document.createElement("span")).textContent = icon.text || ''
    if (icon.css) { node.firstChild.style.cssText = icon.css }
  }
  return node
}
exports.getIcon = getIcon

function buildSVG(name, data) {
  var collection = document.getElementById(prefix + "-collection")
  if (!collection) {
    collection = document.createElementNS(SVG, "svg")
    collection.id = prefix + "-collection"
    collection.style.display = "none"
    document.body.insertBefore(collection, document.body.firstChild)
  }
  var sym = document.createElementNS(SVG, "symbol")
  sym.id = name
  sym.setAttribute("viewBox", "0 0 " + data.width + " " + data.height)
  var path = sym.appendChild(document.createElementNS(SVG, "path"))
  path.setAttribute("d", data.path)
  collection.appendChild(sym)
}
