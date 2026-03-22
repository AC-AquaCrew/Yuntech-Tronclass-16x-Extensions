if (!window.__VIDEO_BRIDGE__) {
	window.__VIDEO_BRIDGE__ = true;

	window.addEventListener("play-video-ended", (event) => {
		chrome.runtime.sendMessage({
			type: "VIDEO_ENDED",
			payload: event.detail
		});
	});
};