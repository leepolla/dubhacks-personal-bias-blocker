var dictionary = importDictionary("dictionary.json");
var wackyDict = importDictionary("wacky-dictionary.json");

var replacements = importDictionary("replacements.json");
var message;
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
	message = request;
    if (request.greeting == "hello") {
      sendResponse({farewell: "goodbye"});
	}
	if (request.onoff == true) {
		nodeReplace(document.body);
		senseReplaceHover('replaced');
		senseReplaceHover('blocked');
	}
	if (request.onoff == false) {

	
		var changes = document.querySelectorAll(".replaced, .blocked");
	//mouseover
	changes.forEach(function(change) {
			var temp = change.innerHTML;
			if (temp.length > change.attributes.value.value.length) {
				change.attributes.value.value += "&nbsp;".repeat(temp.length - change.attributes.value.value.length);
			}
			change.innerHTML = change.attributes.value.value;
			change.attributes.value.value = temp;
	});
	
	
	}
  });




function nodeReplace(node) {
  let child, next;

  switch (node.nodeType) {
    case 1:
    case 9:
    case 11:
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        nodeReplace(child);
        child = next;
      }
      break;
    case 3:
      textReplace(node.parentNode);
      break;
  }
}

function textReplace(textNode) {
  //const wackyMode = true;
  let content = textNode.innerHTML;
  Object.keys(dictionary).forEach(function(biasCategoryName) {
    dictionary[biasCategoryName].forEach(function(bias) {
      let replacementWord = bias;
      let show = '';
      if (message.wacky) {
        show = 'showBlocked';
        const wackyCategory = wackyDict[biasCategoryName];
        replacementWord = wackyCategory[Math.floor(Math.random()*wackyCategory.length)];
      }
      const regex = new RegExp(`\\b${bias}\\b`, 'i');
      content = content.replace(regex, `<span class='blocked ${show}' value='${bias}'>${replacementWord}</span>`);
    });
  });
  Object.keys(replacements).forEach(function(bias) {
    const regex = new RegExp(`\\b${bias}\\b`, 'i');
    content = content.replace(regex, `<span class='replaced' value='${bias}'>${replacements[bias]}</span>`);
	textNode.value = bias.toString();
  });
  textNode.innerHTML = content;
}



function senseReplaceHover(className) {
	var changes = document.querySelectorAll(`.${className}`);
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
  return JSON.parse(xhr.responseText);
}var dictionary = importDictionary("dictionary.json");

