// background/background.js
// MV3 service worker (module type)

import { callGemini } from "../utils/api.js"; // change the callGemini import path if needed according to your api name.
import { getContextMemory, setContextMemory } from "../utils/memory.js";

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.type === "summarize") {
    (async () => {
      const resp = await callGemini(req.text);
      sendResponse({ summary: resp });
    })();
    return true;
  }
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("BG got message:", request, sender);

  if (!request || !request.type) {
    sendResponse({ error: "Bad request" });
    return;
  }

  switch (request.type) {
    case "summarize":
      (async () => {
        try {
          const prevContext = await getContextMemory();
          const prompt = `Summarize this:\n\n${request.text}\n\nContext: ${JSON.stringify(prevContext)}`;
          const resp = await callGemini(prompt);
          // Update context memory (push this query & response)
          const newCtx = [...prevContext, { type: "summarize", input: request.text, output: resp }];
          await setContextMemory(newCtx);
          sendResponse({ summary: resp });
        } catch (err) {
          console.error("summarize error:", err);
          sendResponse({ error: "Summarize failed" });
        }
      })();
      return true;

    case "askAI":
      (async () => {
        try {
          const prompt = request.prompt;
          const resp = await callGemini(prompt);
          sendResponse({ result: resp });
        } catch (err) {
          console.error("askAI error:", err);
          sendResponse({ error: "askAI failed" });
        }
      })();
      return true;

    case "solveError":
      (async () => {
        try {
          const prevContext = await getContextMemory();
          const prompt = `Here is an error: ${request.errorInfo}\nHelp me fix it. Context: ${JSON.stringify(prevContext)}`;
          const resp = await callGemini(prompt);
          const newCtx = [...prevContext, { type: "solveError", input: request.errorInfo, output: resp }];
          await setContextMemory(newCtx);
          sendResponse({ solution: resp });
        } catch (err) {
          console.error("solveError error:", err);
          sendResponse({ error: "SolveError failed" });
        }
      })();
      return true;

    case "getContextMemory":
      (async () => {
        try {
          const ctx = await getContextMemory();
          sendResponse({ context: ctx });
        } catch (err) {
          console.error("getContextMemory error:", err);
          sendResponse({ error: "GetContext failed" });
        }
      })();
      return true;

    case "clearContext":
      (async () => {
        try {
          await setContextMemory([]);
          sendResponse({ success: true });
        } catch (err) {
          console.error("clearContext error:", err);
          sendResponse({ error: "Clear failed" });
        }
      })();
      return true;

    default:
      sendResponse({ error: "Unknown type" });
  }
});
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "ping") {
    sendResponse("pong from background ✅");
  }
});
