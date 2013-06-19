window.addEventListener("load", function() {
	var blockedSitesArea = document.getElementById("blockedSites");
	blockedSitesArea.onkeydown = save;
	blockedSitesArea.value = load();

	var redirectPageField = document.getElementById("redirectPage");
	redirectPageField.onkeydown = function(ev) { localStorage["block.redirect"] = ev.target.value; };
	redirectPageField.value = localStorage["block.redirect"] || "chrome://newtab";
});

var defaultBlockedSites = [
	"# tech",
	"news.ycombinator.com",
	"",
	"# entertainment",
	"twitter.com",
	"tumblr.com",
	"youtube.com",
	"",
	"questionablecontent.net",
	"xkcd.com"
];
var load = function() {
	return localStorage["block.sites"] || defaultBlockedSites.join("\n");
}

var save = function(ev) {
	localStorage["block.sites"] = ev.target.value;
	chrome.runtime.sendMessage({reloadBlockedSites: true});
}
