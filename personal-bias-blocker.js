
const dictionary = importDictionary("dictionary.txt");
var replacements = importDictionary("replacements.txt");

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
			if (temp.length > change.attributes.value.value.length) {
				change.attributes.value.value += "&nbsp;".repeat(temp.length - change.attributes.value.value.length);
			}
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

function importDictionary(filename) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', chrome.runtime.getURL(filename), false);
  xhr.send();
  return xhr.responseText.split("\r\n");
}
