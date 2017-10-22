
const dictionary = [
  'American',
  'North Korea',
  'Latino'
];

var replacementDict = [
  'he',
  'him',
  'webpage'
];

var replacements = {};
replacements["he"] = "they";
replacements["him"] = "them";
replacements["webpage"] = "website";

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
  replacementDict.forEach(function(bias) {
    content = content.split(bias).join(`<span class=' replaced'>${replacements[bias]}</span>`);
  });
  textNode.innerHTML = content;
}
