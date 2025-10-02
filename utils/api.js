export async function callGemini(prompt) {
  const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  const API_KEY = "YOUR API KEY";
  const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [ { parts: [ { text: prompt } ] } ]
    })
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Gemini API failed: " + errorText);
  }
  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response";
}