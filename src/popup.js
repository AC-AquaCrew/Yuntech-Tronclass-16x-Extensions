const STORAGE_KEYS = {
    mode: "selectedMode",
    rangestart: "rangeStart",
    rangeend: "rangeEnd"
};

const modeInputs = document.querySelectorAll('input[name="mode"]');
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
        [STORAGE_KEYS.rangestart]: rangeStart.value == "" ? "" : parseInt(rangeStart.value),
        [STORAGE_KEYS.rangeend]: rangeEnd.value == "" ? "" : parseInt(rangeEnd.value)
    });
};

function restoreSettings() {
    chrome.storage.local.get(
        {
            [STORAGE_KEYS.mode]: "auto",
            [STORAGE_KEYS.rangestart]: "",
            [STORAGE_KEYS.rangeend]: ""
        },
        (result) => {
            applyMode(result[STORAGE_KEYS.mode]);
            rangeStart.value = result[STORAGE_KEYS.rangestart];
            rangeEnd.value = result[STORAGE_KEYS.rangeend];
        }
    );
};

modeInputs.forEach((input) => {
    input.addEventListener("change", () => {
        applyMode(input.value);
        saveSettings();
    });
});

rangeStart.addEventListener("change", saveSettings);
rangeEnd.addEventListener("change", saveSettings);

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
            start: rangeStart.value,
            end: rangeEnd.value
        });

        setStatus(`started: ${mode}`);
    } catch (error) {
        console.error("Start failed:", error);
        setStatus("start failed");
    };
});

stopBtn.addEventListener("click", () => {
    setStatus("stopped");
});

document.addEventListener("DOMContentLoaded", restoreSettings);
restoreSettings();
