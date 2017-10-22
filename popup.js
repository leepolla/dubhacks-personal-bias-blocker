/*
var censorButton = document.getElementById("censorList");
censorButton.onclick = openList();

function openList() {
	var url = chrome.runtime.getURL('dictionary.txt');
	
}
*/

function keypress(event){
    if(event.type === 'keypress') {
        var code = event.charCode || event.keyCode;
        if((code === 32)|| (code === 13)){
            return true;
        }
    } else {
        return false;
    }
}
console.log(document.getElementsByClassName("onoffswitch"));
var toggleSwitch = document.getElementById("toggleButton");
var onOffSwitch = document.getElementById("focus");
var toggleFocus = document.querySelector("onoffswitch-switch");

toggleSwitch.on('keypress', function(event){
	if(document.activeElement.id === onOffSwitch) {
		console.log("test");
		if(keypress(event) === true){
			console.log(event.keyCode);
			toggle.trigger("click");
			console.log("checked/unchecked");
	    }
	}
});