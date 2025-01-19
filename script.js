const chatContainer = document.querySelector('.chat-container');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = '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'; // Replace with your OpenAI API key

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