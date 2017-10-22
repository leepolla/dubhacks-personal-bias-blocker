
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

var replacements = {
	"he": :"they", "she": "they",
	"his": "their", "her": "their",
	"him": "them", "her": "them",
	"boy": "person", "girl": "person", "man": "person", "woman": "person",
	"girls": "people", "women": "people", "men" : "people", "boys" : "people"
	
};

nodeReplace(document.body, dictionary);

function nodeReplace(node, dictionary) {
  let child, next;

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
