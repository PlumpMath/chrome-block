window.addEventListener("load", function() {
	var blockedSitesArea = document.getElementById("blockedSites");
	blockedSitesArea.onkeydown = save;
	blockedSitesArea.value = load();

	var redirectPageField = document.getElementById("redirectPage");
	redirectPageField.onkeydown = function(ev) { localStorage["block.redirect"] = ev.target.value; };
	redirectPageField.value = localStorage["block.redirect"] || "chrome://newtab";
});

var load = function() {
	return localStorage["block.sites"];
}

var save = function(ev) {
	localStorage["block.sites"] = ev.target.value;
	chrome.runtime.sendMessage({reloadBlockedSites: true});
}
