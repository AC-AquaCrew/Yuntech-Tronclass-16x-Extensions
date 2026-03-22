javascript: (function () {
    async function paly112s() {
        const video = document.querySelector("video");

        video.playbackRate = 16;
        await video.play();

        await new Promise(r => setTimeout(r, 7000));

        await document.getElementById("movie_player").pauseVideo();

        await new Promise(r => setTimeout(r, 300));
    };

    async function getVideo(timeoutMs = 10000) {
        const start = Date.now();
        while (Date.now() - start < timeoutMs) {
            const video = document.querySelector("video");
            if (video && isFinite(video.duration)) return video;
            await new Promise(r => setTimeout(r, 200));
        }
        throw "找不到 YouTube 影片元素";
    };

    (async function () {
        try {
            const video = await getVideo();
            const allTime = parseInt(video.duration);

            for (; ;) {
                console.log("all:", allTime, "cur:", parseInt(video.currentTime));
                if ((allTime - parseInt(video.currentTime)) > 112) {
                    console.log("test");
                    await paly112s();

                } else {
                    video.playbackRate = 16;
                    await video.play();
                    video.addEventListener("ended", () => {
                        window.dispatchEvent(
                            new CustomEvent("my-extension-video-ended", {
                                detail: {
                                    url: location.href,
                                    endedAt: Date.now()
                                }
                            })
                        );
                    });
                    break;
                };
            };
        } catch (e) {
            console.log("error:", e);
        };
    })();
})();