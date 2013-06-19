var load = function() {
	var isMatchingLine = function(line) {
		return line[0] != "#" && line.trim() != "";
	};
	return (localStorage["block.sites"] || "")
		.split("\n")
		.filter(isMatchingLine)
		.map(function(line) { return new RegExp(line); });
};
var blockedSites = load();

chrome.runtime.onMessage.addListener(function (request) {
	if (request.reloadBlockedSites) {
		blockedSites = load();
	}
});

chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
	if (isBlocked(details.url)) {
		redirectTabTo(details.tabId, localStorage["block.redirect"] || "chrome://newtab");
	}
});

var isBlocked = function(url) {
	return blockedSites.some(function(re) { return url.search(re) != -1; });
}

var redirectTabTo = function(tabId, url) {
	chrome.tabs.update(tabId, {url: url});
}
