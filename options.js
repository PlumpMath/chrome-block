window.addEventListener("load", function() {
	var blockedSitesArea = document.getElementById("blockedSites");
	blockedSitesArea.onkeydown = save;

	blockedSitesArea.value = load();
});

var load = function() {
	return localStorage["block.sites"];
}

var save = function(ev) {
	localStorage["block.sites"] = ev.target.value;
	chrome.runtime.sendMessage({reloadBlockedSites: true});
}
