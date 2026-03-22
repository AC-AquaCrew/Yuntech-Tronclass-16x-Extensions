const STORAGE_KEYS = {
    mode: "selectedMode",
    // extra123: "extra123"
};

const modeInputs = document.querySelectorAll('input[name="mode"]');
// const extra123Input = document.getElementById("extra123");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const statusText = document.getElementById("statusText");
const rangeStart = document.getElementById("rangeStart");
const rangeEnd = document.getElementById("rangeEnd");

function setStatus(text) {
    statusText.textContent = text;
};

function getSelectedMode() {
    const selected = document.querySelector('input[name="mode"]:checked');
    return selected ? selected.value : "auto";
};

function applyMode(mode) {
    const safeMode = ["auto", "single", "all"].includes(mode) ? mode : "auto";
    modeInputs.forEach((input) => {
        input.checked = input.value === safeMode;
    });
    setStatus(`mode: ${safeMode}`);
};

function saveSettings() {
    chrome.storage.local.set({
        [STORAGE_KEYS.mode]: getSelectedMode(),
        // [STORAGE_KEYS.extra123]: extra123Input.checked
    });
};

function restoreSettings() {
    chrome.storage.local.get(
        {
            [STORAGE_KEYS.mode]: "auto",
            // [STORAGE_KEYS.extra123]: false
        },
        (result) => {
            applyMode(result[STORAGE_KEYS.mode]);
            // extra123Input.checked = Boolean(result[STORAGE_KEYS.extra123]);
        }
    );
};

modeInputs.forEach((input) => {
    input.addEventListener("change", () => {
        applyMode(input.value);
        saveSettings();
    });
});

// extra123Input.addEventListener("change", saveSettings);

startBtn.addEventListener("click", async () => {
    const mode = getSelectedMode();
    saveSettings();

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab?.id) {
            setStatus("start failed: no active tab");
            return;
        }

        await chrome.runtime.sendMessage({
            action: "run-start-script",
            tabId: tab.id,
            mode,
            // extra123: extra123Input.checked
        });

        setStatus(`started: ${mode}`);
    } catch (error) {
        console.error("Start failed:", error);
        setStatus("start failed");
    }
});

stopBtn.addEventListener("click", () => {
    setStatus("stopped");
});

document.addEventListener("DOMContentLoaded", restoreSettings);
restoreSettings();
