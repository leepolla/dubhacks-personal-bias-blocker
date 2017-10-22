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



//console.log(document.getElementsByClassName("onoffswitch"));
var toggleSwitch = document.getElementsByClassName("onoffswitch-checkbox")[0];
var message = {greeting: "hello", onoff: true, wacky: "off"};
console.log(toggleSwitch);
document.getElementById('myonoffswitch').addEventListener('click', function(){
		console.log("test");
		
			console.log(message);
			message.onoff = !message.onoff;
			console.log("checked/unchecked");
	    
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
    console.log(response.farewell);
  });
});