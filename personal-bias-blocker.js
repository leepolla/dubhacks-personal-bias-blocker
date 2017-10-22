
const dictionary = [
  'American',
  'North Korea',
  'Latino'
];

var replacements = {
	"he":"they", "she": "they",
	"his": "their", "her": "their",
	"him": "them", "her": "them",
	"boy": "person", "girl": "person", "man": "person", "woman": "person",
	"girls": "people", "women": "people", "men" : "people", "boys" : "people"
	
};

nodeReplace(document.body, dictionary);
senseReplace();

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
    const regex = new RegExp(`\\b${bias}\\b`, 'i');
    content = content.replace(regex, `<span class='blocked ${dictionary.indexOf(bias)}'>${bias}</span>`);
  });
  Object.keys(replacements).forEach(function(bias) {
    const regex = new RegExp(`\\b${bias}\\b`, 'i');
    content = content.replace(regex, `<span class='replaced' value='${bias}'>${replacements[bias]}</span>`);
	textNode.value = bias.toString();
  });
  textNode.innerHTML = content;
}

function originalWord() {
	
}

function senseReplace() {
	var changes = document.querySelectorAll(".replaced");
	//mouseover
	changes.forEach(function(change) {
		change.addEventListener("mouseover", function(){
			var temp = change.innerHTML;
			change.innerHTML = change.attributes.value.value;
			change.attributes.value.value = temp;
		});
	});
	//mouseout
	changes.forEach(function(change) {
		change.addEventListener("mouseout", function(){
			var temp = change.innerHTML;
			change.innerHTML = change.attributes.value.value;
			change.attributes.value.value = temp;
		});
	});
}
