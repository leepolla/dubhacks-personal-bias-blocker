document.getElementById('myonoffswitch').addEventListener('click', function() {
  chrome.storage.local.set({'disabled': !this.checked});
  console.log(chrome.storage.local);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {disabled: !this.checked}, function(r){});
  });
});