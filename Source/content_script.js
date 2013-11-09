var substitutions = [
  [/\b(W|w)itnesses/g, 'these dudes I know'],
  [/\b(A|a)llegedly/g, 'kinda probably'],
  [/\b(N|n)ew study/g, 'tumblr post'],
  [/\b(R|r)ebuild/g, 'avenge'],
  [/\b(S|s)pace/g, 'spaaace'],
  [/\b(G|g)oogle (G|g)lass/g, 'virtual boy'],
  [/\b(S|s)martphone/g, 'pokédex'],
  [/\b(E|e)lectric/g, 'atomic'],
  [/\b(S|s)enator/g, 'elf-lord'],
  [/\b(C|c)ar/g, 'cat'],
  [/\b(E|e)lection/g, 'eating contest'],
  [/\b(C|c)ongressional leaders/g, 'river spirits'],
  [/\b(H|h)omeland security/g, 'homestar runner'],
  [/\b(C|c)ould not be reached for comment/g, 'is guilty and everyone knows it']
]

walk(document.body)

function walk(node) {
  // I stole this function from here:
  // http://is.gd/mwZp7E

  // And I stole this entire module from https://github.com/hank/cloud-to-butt
  // but I modified it - I. S.

  var child, next

  switch (node.nodeType) {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
      child = node.firstChild
      
      while (child) {
        next = child.nextSibling
        walk(child)
        child = next
      }
      
      break

    case 3: // Text node
      handleText(node)
      break
  }
}

function handleText(textNode) {
  var text = textNode.nodeValue

  for (var i = 0; i < substitutions.length; i++) {
    var regexp = substitutions[i][0]
      , sub = substitutions[i][1]

    text = text.replace(regexp, function (match, head, offset, string) {
      if (isCapital(head)) sub = String.fromCharCode(sub.charCodeAt(0) - 32) + sub.substr(1)
      return sub
    })
  }

  textNode.nodeValue = text
}

function isCapital(c) {
  return c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90
}