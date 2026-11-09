const API_URL = "https://mediax-api.onrender.com";

function detectPlatform(url) {
    try {
        const parsed = new URL(url);
        const host = parsed.hostname.toLowerCase()
            .replace(/^www\./, "");

        if (host === "instagram.com" ||
            host.endsWith(".instagram.com")) {
            return "Instagram";
        }

        if (host === "facebook.com" ||
            host.endsWith(".facebook.com") ||
            host === "fb.watch") {
            return "Facebook";
        }

        if (host === "youtube.com" ||
            host.endsWith(".youtube.com") ||
            host === "youtu.be") {
            return "YouTube";
        }

        return "Other Website";

    } catch {
        return null;
    }
}

async function detectMedia() {
    const input = document.getElementById("mediaUrl");
    const result = document.getElementById("result");

    const url = input.value.trim();

    if (!url) {
        result.textContent = "Please paste a media link.";
        return;
    }

    let parsed;

    try {
        parsed = new URL(url);

        if (!["https:", "http:"].includes(parsed.protocol)) {
            throw new Error();
        }

    } catch {
        result.textContent = "Please enter a valid link.";
        return;
    }

    const platform = detectPlatform(url);

    if (!platform) {
        result.textContent = "Invalid link. Please try again.";
        return;
    }

    result.textContent =
        "Platform detected: " + platform + " ✓";

    // Actual media availability will be checked
    // through the authorized backend integration.
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("mediaUrl");

    if (input) {
        input.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                detectMedia();
            }
        });
    }
});
