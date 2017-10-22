
const dictionary = [
  'American',
  'North Korea',
  'NO'
];

nodeReplace(document.body, dictionary);

function nodeReplace(node, dictionary) {
  let child, next;
  console.log(node);

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
      textReplace(node, dictionary);
      break;
  }
}

function textReplace(textNode, dictionary) {
  let content = textNode.nodeValue;
  dictionary.forEach(function(bias) {
    content = content.split(bias).join(`<span class=${dictionary.indexOf(bias)}`);
  });
  textNode.nodeValue = content;
}
