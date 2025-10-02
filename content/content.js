// content/content.js


// Inject the modern floating chat UI
import("./floatingChat.js");

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === "Y") {
    const sel = window.getSelection().toString();
    if (sel && sel.length > 5) {
      chrome.runtime.sendMessage({ type: "summarize", text: sel }, (resp) => {
        if (resp.summary) {
          showOverlay(resp.summary);
        } else {
          showOverlay("Error: " + (resp.error || "no summary"));
        }
      });
    }
  }
});

// Similarly, Ctrl+Shift+E to solve error from selection
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === "E") {
    const sel = window.getSelection().toString();
    if (sel && sel.length > 3) {
      chrome.runtime.sendMessage({ type: "solveError", errorInfo: sel }, (resp) => {
        if (resp.solution) {
          showOverlay(resp.solution);
        } else {
          showOverlay("Error: " + (resp.error || "no solution"));
        }
      });
    }
  }
});

// Function to show overlay in page
function showOverlay(text) {
  // Remove existing
  let existing = document.getElementById("aiAssistantOverlay");
  if (existing) {
    existing.remove();
  }
  const div = document.createElement("div");
  div.id = "aiAssistantOverlay";
  div.style.position = "fixed";
  div.style.bottom = "10px";
  div.style.right = "10px";
  div.style.maxWidth = "300px";
  div.style.padding = "10px";
  div.style.background = "rgba(0,0,0,0.85)";
  div.style.color = "white";
  div.style.fontSize = "14px";
  div.style.zIndex = 999999;
  div.style.borderRadius = "8px";
  div.style.boxShadow = "0 2px 10px rgba(0,0,0,0.5)";
  div.innerText = text;
  document.body.appendChild(div);

  // Auto remove after some time
  setTimeout(() => {
    div.remove();
  }, 10000);
}
console.log("✅ Content script loaded on:", window.location.href);

chrome.runtime.sendMessage({ type: "ping" }, (res) => {
  console.log("Response from background:", res);
});
// content/content.js
document.addEventListener("keydown", (e) => {
  if (e.altKey && e.key === "a") { // Alt + A
    const question = prompt("Ask AI anything:");
    chrome.runtime.sendMessage(
      { type: "askAI", prompt: question },
      (res) => {
        console.log("🤖 AI Response:", res?.result || res?.error);
      }
    );
  }
});
