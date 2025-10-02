// utils/memory.js

export async function getContextMemory() {
  const result = await chrome.storage.local.get(["contextMemory"]);
  return result.contextMemory || [];
}

export async function setContextMemory(newCtx) {
  await chrome.storage.local.set({ contextMemory: newCtx });
}
