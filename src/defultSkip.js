javascript: (function () {
    async function paly112s() {
        const video = document.querySelector("video");

        video.playbackRate = 16;
        do {
            await new Promise(r => setTimeout(r, 1000));
            await video.play();
        } while (video.paused);

        await new Promise(r => setTimeout(r, 7000));

        video.pause();

        await new Promise(r => setTimeout(r, 300));
    };

    function req(url, method = "GET", data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

            if (method === "POST") {
                xhr.setRequestHeader("Content-Type", "application/json");
            };

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        resolve(JSON.parse(xhr.responseText));
                    } catch {
                        reject("not JSON");
                    };
                } else {
                    reject("HTTP " + xhr.status);
                };
            };

            xhr.onerror = () => reject("Request Error");
            xhr.send(data ? JSON.stringify(data) : null);
        });
    };

    function getActivityVideoDuration(data, activityId) {
        const activity = data.activities.find(a => a.id === activityId);

        if (activity.uploads && activity.uploads.length > 0) {
            return activity.uploads[0].videos[0].duration;
        };

        return activity.data.duration;
    };

    (async function () {
        try {
            while (!document.querySelector("video")) {
                await new Promise(r => setTimeout(r, 1000));
            };
            const video = document.querySelector("video");
            const courseId = parseInt(location.pathname.match(/course\/(\d+)/)?.[1]);
            const activitiesId = parseInt(location.hash.match(/#\/(\d+)/)?.[1]);
            const reqdata = await req(`${location.origin}/api/courses/${courseId}/activities?sub_course_id=0`);
            const allTime = parseInt(getActivityVideoDuration(reqdata, activitiesId));

            let c = 0;
            for (; ;) {
                if ((allTime - parseInt(video.currentTime)) > 112) {
                    await paly112s();
                    const n = Math.min(c + 112, parseInt(video.currentTime));
                    await req(
                        `${location.origin}/api/course/activities-read/${activitiesId}`,
                        "POST",
                        { start: c, end: n }
                    );
                    c = n;
                } else {
                    video.playbackRate = 16;
                    await video.play();
                    video.addEventListener("ended", () => {
                        window.dispatchEvent(
                            new CustomEvent("play-video-ended", { detail: { url: location.href, endedAt: Date.now() } })
                        );
                    });
                    break;
                };
            };
        } catch (e) {
            console.log(e);
        };
    })();
})();