chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "SHOW_ALERT") {
        alert(msg.message);
    };
});