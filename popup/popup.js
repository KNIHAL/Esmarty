// popup/popup.js

const chatDiv = document.getElementById("chat");
const inp = document.getElementById("inp");
const btn = document.getElementById("send");

btn.addEventListener("click", () => {
  const text = inp.value.trim();
  if (!text) return;
  appendMsg("user", text);
  inp.value = "";

  // Decide type: you can treat everything as "summarize" or have logic
  chrome.runtime.sendMessage({ type: "summarize", text }, (resp) => {
    if (resp.summary) {
      appendMsg("bot", resp.summary);
    } else if (resp.error) {
      appendMsg("bot", "Error: " + resp.error);
    } else {
      appendMsg("bot", "No response");
    }
  });
});

function appendMsg(who, text) {
  const div = document.createElement("div");
  div.className = "msg " + who;
  div.innerText = (who === "user" ? "You: " : "AI: ") + text;
  chatDiv.appendChild(div);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}
document.getElementById("askBtn").addEventListener("click", () => {
  const question = document.getElementById("question").value;
  chrome.runtime.sendMessage({ type: "askAI", prompt: question }, (res) => {
    document.getElementById("response").innerText = res?.result || res?.error;
  });
});
