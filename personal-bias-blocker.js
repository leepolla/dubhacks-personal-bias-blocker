nodeReplace(document.body);

function nodeReplace(node) {
  let child, next;

  if (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea') { return; };

  switch (node.nodeType) {
    case 3:
      textReplace(node)
    case 11:
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        nodeReplace(child);
        child = next;
      }
      return;
    default: return;
  }
}

function textReplace(textNode) {
  let content = textNode.nodeValue;
  console.log('ayy');
  dictionary.forEach(function(bias) {
    content = content.split(bias).join(`<span class=${dictionary.indexOf(bias)}`);
  });
  content.nodeValue = content;
}

const dictionary = [
  'American',
  'North Korea'
];