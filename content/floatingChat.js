// content/floatingChat.js

(function() {
  // Prevent duplicate injection
  if (window.__geminiFloatingChatInjected) return;
  window.__geminiFloatingChatInjected = true;

  // Create floating button with extension icon
  const button = document.createElement('div');
  button.id = 'geminiFloatingBtn';
  button.style.position = 'fixed';
  button.style.bottom = '24px';
  button.style.right = '24px';
  button.style.width = '56px';
  button.style.height = '56px';
  button.style.background = 'white';
  button.style.borderRadius = '50%';
  button.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.cursor = 'pointer';
  button.style.zIndex = 2147483647;
  button.title = 'Ask Gemini';
  // Use extension icon
  const iconImg = document.createElement('img');
  iconImg.src = chrome.runtime.getURL('assets/icon-48.png');
  iconImg.alt = 'Gemini';
  iconImg.style.width = '32px';
  iconImg.style.height = '32px';
  button.appendChild(iconImg);

  // Create chat window
  const chat = document.createElement('div');
  chat.id = 'geminiChatWindow';
  chat.style.position = 'fixed';
  chat.style.bottom = '90px';
  chat.style.right = '24px';
  chat.style.width = '340px';
  chat.style.maxHeight = '400px';
  chat.style.background = 'white';
  chat.style.borderRadius = '12px';
  chat.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)';
  chat.style.display = 'none';
  chat.style.flexDirection = 'column';
  chat.style.zIndex = 2147483647;
  chat.style.overflow = 'hidden';
  chat.innerHTML = `
    <div style="background:#4285F4;color:white;padding:12px 16px;font-weight:bold;display:flex;align-items:center;justify-content:space-between;">
      ESmarty
      <span id="geminiChatClose" style="cursor:pointer;font-size:18px;">&times;</span>
    </div>
    <div id="geminiChatMessages" style="flex:1;overflow-y:auto;padding:16px 16px 0 16px;min-height:120px;max-height:320px;background:#fff;color:#111;font-size:15px;"></div>
    <div id="geminiQuickActions" style="display:flex;gap:8px;padding:8px 16px 0 16px;">
      <button id="geminiSummarizeBtn" style="flex:1;padding:6px 8px;background:#e3f0fd;color:#4285F4;border:none;border-radius:6px;cursor:pointer;font-weight:bold;">Summarize</button>
      <button id="geminiExplainBtn" style="flex:1;padding:6px 8px;background:#e3f0fd;color:#4285F4;border:none;border-radius:6px;cursor:pointer;font-weight:bold;">Explain</button>
      <button id="geminiSolveBtn" style="flex:1;padding:6px 8px;background:#e3f0fd;color:#4285F4;border:none;border-radius:6px;cursor:pointer;font-weight:bold;">Solve Error</button>
    </div>
    <form id="geminiChatForm" style="display:flex;padding:12px;border-top:1px solid #eee;background:#222;">
      <input id="geminiChatInput" type="text" placeholder="Ask Gemini..." style="flex:1;padding:8px 12px;border-radius:6px;border:1px solid #444;background:#222;color:#fff;font-size:15px;outline:none;" autocomplete="off" />
      <button type="submit" style="margin-left:8px;padding:8px 16px;background:#4285F4;color:white;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">Send</button>
    </form>
  `;

  // --- Mouseup listener for text selection ---
  let lastSelectedText = '';
  document.addEventListener('mouseup', () => {
    const sel = window.getSelection();
    if (sel && sel.toString().trim().length > 0) {
      lastSelectedText = sel.toString();
    }
  });

  // Add to DOM
  document.body.appendChild(button);
  document.body.appendChild(chat);

  // Show/hide chat
  button.onclick = () => {
    chat.style.display = chat.style.display === 'none' ? 'flex' : 'none';
    if (chat.style.display === 'flex') {
      setTimeout(() => {
        document.getElementById('geminiChatInput').focus();
      }, 100);
    }
  };
  chat.querySelector('#geminiChatClose').onclick = () => {
    chat.style.display = 'none';
  };

  // Handle chat form
  chat.querySelector('#geminiChatForm').onsubmit = function(e) {
    e.preventDefault();
    const input = chat.querySelector('#geminiChatInput');
    const msg = input.value.trim();
    if (!msg) return;
    addMessage('user', msg);
    input.value = '';
    input.disabled = true;
    sendToGemini(msg).then(resp => {
      addMessage('gemini', resp);
    }).catch(err => {
      addMessage('gemini', '⚠️ ' + (err.message || 'Error'));
    }).finally(() => {
      input.disabled = false;
      input.focus();
    });
  };

  function addMessage(sender, text) {
    const messages = chat.querySelector('#geminiChatMessages');
    const div = document.createElement('div');
    div.style.margin = '8px 0';
    div.style.padding = '10px 14px';
    div.style.borderRadius = '8px';
    div.style.maxWidth = '95%';
    div.style.wordBreak = 'break-word';
    div.style.background = sender === 'user' ? '#e3f0fd' : '#f5f5f5';
    div.style.alignSelf = sender === 'user' ? 'flex-end' : 'flex-start';
    div.style.color = '#111';
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  // Quick action handlers: work directly on selected text
  function quickActionHandler(type) {
    let text = lastSelectedText.trim();
    if (!text) {
      // fallback to input if nothing selected
      const input = chat.querySelector('#geminiChatInput');
      text = input.value.trim();
      if (!text) return;
    }
    let prompt = text;
    if (type === 'summarize') {
      prompt = `Summarize this:\n\n${text}`;
    } else if (type === 'explain') {
      prompt = `Explain this:\n\n${text}`;
    } else if (type === 'solve') {
      prompt = `Here is an error or code:\n${text}\nHelp me fix it and explain the mistake.`;
    }
    addMessage('user', prompt);
    sendToGemini(prompt).then(resp => {
      addMessage('gemini', resp);
    }).catch(err => {
      addMessage('gemini', '⚠️ ' + (err.message || 'Error'));
    });
  }

  setTimeout(() => {
    const summarizeBtn = document.getElementById('geminiSummarizeBtn');
    const explainBtn = document.getElementById('geminiExplainBtn');
    const solveBtn = document.getElementById('geminiSolveBtn');
    if (summarizeBtn) summarizeBtn.onclick = () => quickActionHandler('summarize');
    if (explainBtn) explainBtn.onclick = () => quickActionHandler('explain');
    if (solveBtn) solveBtn.onclick = () => quickActionHandler('solve');
  }, 500);

  function sendToGemini(prompt) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: 'askAI', prompt }, (res) => {
        if (res && res.result) resolve(res.result);
        else reject(res && res.error ? new Error(res.error) : new Error('No response'));
      });
    });
  }
})();
