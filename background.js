async function openFloatingWindow(tabId, message) {
	await chrome.scripting.executeScript({
		target: { tabId },
		files: ["src/floatingWindow.js"]
	});

	await chrome.scripting.executeScript({
		target: { tabId },
		func: (msg) => {
			window.showFloatingWindow?.(msg);
		},
		args: [message]
	});
}

async function checkUrl(target) {
	const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
	const url = tabs[0]?.url || "";
	return url.includes(target);
};

async function playVideoDone() {
	return new Promise((resolve) => {
		const listener = (message, sender, sendResponse) => {
			if (message.type !== "VIDEO_ENDED") return;

			chrome.runtime.onMessage.removeListener(listener);

			resolve(message.payload);
		};

		chrome.runtime.onMessage.addListener(listener);
	});
};

async function req(url, method = "GET", data) {
	const options = {
		method,
		credentials: "include",
		headers: {
			"X-Requested-With": "XMLHttpRequest",
		},
	};

	if (data != null && method !== "GET") {
		options.headers["Content-Type"] = "application/json";
		options.body = JSON.stringify(data);
	}

	const res = await fetch(url, options);

	if (!res.ok) {
		throw new Error("HTTP " + res.status);
	}

	try {
		return await res.json();
	} catch {
		throw new Error("非 JSON 回傳");
	}
};

async function getCourseId() {
	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	if (!tab?.url) return null;

	const url = new URL(tab.url);
	const match = url.pathname.match(/course\/(\d+)/);

	return match ? parseInt(match[1]) : null;
};

function waitForTabComplete(tabId) {
	return new Promise((resolve) => {
		function listener(updatedTabId, changeInfo, tab) {
			if (updatedTabId === tabId && changeInfo.status === 'complete') {
				chrome.tabs.onUpdated.removeListener(listener);
				resolve(tab);
			};
		};

		chrome.tabs.onUpdated.addListener(listener);
	});
};

async function goTo(cid, aid) {
	let tab = [];
	do {
		await new Promise(r => setTimeout(r, 2500));
		[tab] = await chrome.tabs.query({ active: true, currentWindow: true });
		// console.log("try to find tabid");
	} while (!tab?.id);

	await chrome.tabs.update(tab.id, {
		url: `https://eclass.yuntech.edu.tw/course/${cid}/learning-activity/full-screen#/${aid}`
	});

	await waitForTabComplete(tab.id);
};

//=====
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
	if (message.action !== "run-start-script") {
		return;
	};

	chrome.storage.local.set({
		selectedMode: message.mode,
		// extra123: Boolean(message.extra123)
	});

	let m = message.mode;

	if (m === "auto") {
		if (!(await checkUrl("eclass.yuntech.edu.tw"))) {
			await openFloatingWindow(message.tabId, "你選了自適應的模式\n但是所在頁面不對捏");
			return;
		};
		if (await checkUrl("learning-activity")) {
			m = "single";
		} else if (await checkUrl("/course/")) {
			m = "all";
		} else {
			await openFloatingWindow(message.tabId, "你選了自適應的模式\n但是所在頁面不對捏");
			return;
		};
	};

	if (m === "all") {
		// console.log("all");
		const courseId = await getCourseId();
		const reqdata = await req(`https://eclass.yuntech.edu.tw/api/courses/${courseId}/activities?sub_course_id=0`);

		const activities = reqdata.activities;

		const videoIds = [];

		activities.forEach(item => {
			if (item.type === 'online_video' || item.type === 'video') {
				videoIds.push(item.id);
			}
		});

		// console.log(videoIds);
		for (let i = 0; i < videoIds.length; i++) {
			await goTo(courseId, videoIds[i]);
			await new Promise(r => setTimeout(r, 5000));
			try {
				const frames = await chrome.webNavigation.getAllFrames({ tabId: message.tabId });

				const youtubeFrame = frames.find((f) =>
					typeof f.url === "string" && (f.url.includes("youtube.com/embed/"))
				);

				let targetFrameId = 0;
				let fileToInject = "src/defultSkip.js";

				if (youtubeFrame) {
					targetFrameId = youtubeFrame.frameId;
					fileToInject = "src/youtubeSkip.js";
					await chrome.scripting.executeScript({
						target: {
							tabId: message.tabId,
							frameIds: [targetFrameId]
						},
						func: () => {
							document.getElementById("movie_player").playVideo();
							document.querySelector("video").playbackRate = 16;
							document.querySelector('video').closest('#movie_player').setPlaybackQualityRange('tiny');
						},
						world: "MAIN"
					});
				};

				await chrome.scripting.executeScript({
					target: {
						tabId: message.tabId,
						frameIds: [targetFrameId]
					},
					files: ["bridge.js"]
				});

				await chrome.scripting.executeScript({
					target: {
						tabId: message.tabId,
						frameIds: [targetFrameId]
					},
					files: [fileToInject],
					world: "MAIN"
				});

				if (await playVideoDone()) {
					continue;
				};

			} catch (err) {
				console.error("injection error:", err);
			};
		};

	} else if (m === "single") {
		// console.log("single");
		if (!(await checkUrl("learning-activity"))) {
			await openFloatingWindow(message.tabId, "你選了刷單一影片的模式\n但是所在頁面不對捏");
			return;
		};

		try {
			const frames = await chrome.webNavigation.getAllFrames({ tabId: message.tabId });

			const youtubeFrame = frames.find((f) =>
				typeof f.url === "string" && (f.url.includes("youtube.com/embed/"))
			);

			let targetFrameId = 0;
			let fileToInject = "src/defultSkip.js";

			if (youtubeFrame) {
				targetFrameId = youtubeFrame.frameId;
				fileToInject = "src/youtubeSkip.js";
				await chrome.scripting.executeScript({
					target: {
						tabId: message.tabId,
						frameIds: [targetFrameId]
					},
					func: () => {
						document.getElementById("movie_player").playVideo();
						document.querySelector("video").playbackRate = 16;
						document.querySelector('video').closest('#movie_player').setPlaybackQualityRange('tiny');
					},
					world: "MAIN"
				});
			};

			await chrome.scripting.executeScript({
				target: {
					tabId: message.tabId,
					frameIds: [targetFrameId]
				},
				files: ["bridge.js"]
			});

			await chrome.scripting.executeScript({
				target: {
					tabId: message.tabId,
					frameIds: [targetFrameId]
				},
				files: [fileToInject],
				world: "MAIN"
			});

			if (await playVideoDone()) {
				openFloatingWindow(message.tabId, "完成ㄌ");
			};

		} catch (err) {
			console.error("injection error:", err);
		};
	};

	return true;
});
