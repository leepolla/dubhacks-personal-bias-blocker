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
	update();
}



//console.log(document.getElementsByClassName("onoffswitch"));
var toggleSwitch = document.getElementsByClassName("onoffswitch-checkbox")[0];
var message = {greeting: "hello", onoff: true, wacky: false};
update();

if (document.getElementById("myonoffswitch")) {
	document.getElementById('myonoffswitch').addEventListener('click', function(){
			console.log("test");
			
				console.log(this.checked);
				message.onoff = this.checked;
				console.log("checked/unchecked");
			update();
	});
}


function update() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
		console.log(response.farewell);
	  });
	});
}