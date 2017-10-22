
var dictionary = importDictionary("dictionary.json");
var wackyDict = importDictionary("wacky-dictionary.json");

var replacements = importDictionary("replacements.json");
var message;
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    localStorage.setItem('onoff', request.onoff);
    localStorage.setItem('wacky', request.wacky);
    console.log(localStorage);
	
	if (request.onoff == false) {
	var changes = document.querySelectorAll(".blocked, .replaced, .showBlocked");
	changes.forEach(function(change) {
		change.classList.remove("blocked");
		change.classList.remove("replaced");
		change.classList.remove("showBlocked");
		console.log(change.EventListener);
		change.removeEventListener("mouseover", over, false);
		change.removeEventListener("mouseout", out, false);
	});
  }
  });


nodeReplace(document.body);
senseReplaceHover('replaced');
senseReplaceHover('blocked');


function nodeReplace(node) {
  let child, next;
  // if (localStorage.getItem('onoff') == "true") {
  //   return;
  // }
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
      if (localStorage.getItem('wacky')) {
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

function over() {
	console.log(this);
	var change = this;
	var temp = change.innerHTML;
if (temp.length > change.attributes.value.value.length) {
				change.attributes.value.value += "&nbsp;".repeat(temp.length - change.attributes.value.value.length);
			}
			change.innerHTML = change.attributes.value.value;
			change.attributes.value.value = temp;
}

function out() {
	console.log(this);
	var change = this;
	var temp = change.innerHTML;
	change.innerHTML = change.attributes.value.value;
	change.attributes.value.value = temp;
}

function senseReplaceHover(className) {
	var changes = document.querySelectorAll(`.${className}`);
	//mouseover
	changes.forEach(function(change) {
		change.addEventListener("mouseover", over, false);
	});
	//mouseout
	changes.forEach(function(change) {
		change.addEventListener("mouseout", out, false);
	});
}

function importDictionary(filename) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', chrome.runtime.getURL(filename), false);
  xhr.send();
  return JSON.parse(xhr.responseText);
}var dictionary = importDictionary("dictionary.json");

