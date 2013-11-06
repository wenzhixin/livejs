/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 */
(function() {
	
	chrome.browserAction.onClicked.addListener(function() {
		sendMessage('toggle');
	});
	
	chrome.tabs.onActivated.addListener(function() {
		sendMessage('get');
	});
	
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.name === 'livejs') {
			updateIcon(request.state);
		}
	});
	
	function sendMessage(type) {
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {
				name: 'livejs',
				type: type
			});
		});
	}
	
	function updateIcon(flag) {
		chrome.browserAction.setIcon({
			path: flag ? 'logo.png' : 'logo_disabled.png'
		});
	}
})();
