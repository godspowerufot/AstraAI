const chatContainer = document.querySelector('.chat-container');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY ="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"

function addChatBubble(message, isIncoming = false) {
  const chatBubble = document.createElement('div');
  chatBubble.classList.add('chat', isIncoming ? 'incoming' : 'outgoing');
  chatBubble.innerHTML = `<p>${message}</p>`;
  chatContainer.appendChild(chatBubble);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function getResponse(prompt) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    return 'Error: Unable to fetch response.';
  }
}

sendBtn.addEventListener('click', async () => {
  const userPrompt = chatInput.value.trim();
  if (!userPrompt) return;
  addChatBubble(userPrompt);
  chatInput.value = '';
  const botResponse = await getResponse(userPrompt);
  addChatBubble(botResponse, true);
});

chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }
});
const chatIcon = document.getElementById("chat-icon");
const chatbotContainer = document.getElementById("chatbot-container");

// Toggle chatbot state
chatIcon.addEventListener("click", () => {
  if (chatbotContainer.classList.contains("inactive")) {
    chatbotContainer.classList.remove("inactive");
    chatbotContainer.classList.add("active");
  } else {
    chatbotContainer.classList.remove("active");
    chatbotContainer.classList.add("inactive");
  }
});