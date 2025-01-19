let isChatOpen = false;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    const toggleBtn = document.querySelector('.toggle-btn');
    isChatOpen = !isChatOpen;
    
    if (isChatOpen) {
        chatContainer.classList.add('active');
        toggleBtn.textContent = '▲';
    } else {
        chatContainer.classList.remove('active');
        toggleBtn.textContent = '▼';
    }
}

async function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // Afficher un indicateur de chargement
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('message', 'bot', 'loading');
        loadingDiv.textContent = '...';
        document.getElementById('chatMessages').appendChild(loadingDiv);
        
        try {
            const response = await getOpenAIResponse(message);
            // Supprimer l'indicateur de chargement
            loadingDiv.remove();
            addMessage(response, 'bot');
        } catch (error) {
            loadingDiv.remove();
            addMessage('عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.', 'bot');
            console.error('Error:', error);
        }
    }
}

async function getOpenAIResponse(message) {
    try {
        const response = await fetch('https://votre-serveur.com/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "system",
                        content: "أنت مساعد ذكي يدعى 'زميلك الرقمي'، متخصص في مجال الجرائم المدعومة بالذكاء الاصطناعي. أجب باللغة العربية."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

function addMessage(text, sender) {
    const messages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

// Permettre l'envoi du message avec la touche Enter
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
}); 