
const dictionary = [
  'American',
  'North Korea',
  'Latino'
];

nodeReplace(document.body, dictionary);

function nodeReplace(node, dictionary) {
  let child, next;

  // if (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea') { return; };

  switch (node.nodeType) {
    case 1:
    case 9:
    case 11:
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        nodeReplace(child, dictionary);
        child = next;
      }
      break;
    case 3:
      textReplace(node.parentNode, dictionary);
      break;
  }
}

function textReplace(textNode, dictionary) {
  let content = textNode.innerHTML;
  dictionary.forEach(function(bias) {
    content = content.split(bias).join(`<span class=' blocked ${dictionary.indexOf(bias)}'>${bias}</span>`);
  });
  textNode.innerHTML = content;
}
