let isChatOpen = false;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
}

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (message !== '') {
        // Ajouter le message de l'utilisateur
        addMessage(message, 'user');
        
        // Simuler une réponse du bot
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 500);
        
        // Vider l'input
        userInput.value = '';
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

function addMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
    const responses = {
        'مرحبا': 'مرحباً بك! كيف يمكنني مساعدتك؟',
        'السلام عليكم': 'وعليكم السلام ورحمة الله وبركاته',
        'شكرا': 'العفو! هل هناك شيء آخر يمكنني مساعدتك به؟'
    };

    // Recherche de mots clés dans le message
    for (let key in responses) {
        if (message.toLowerCase().includes(key.toLowerCase())) {
            return responses[key];
        }
    }

    // Réponse par défaut
    return 'عذراً، لم أفهم سؤالك. هل يمكنك إعادة صياغته بطريقة أخرى؟';
}

// Gérer l'appui sur la touche Entrée
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Afficher le chat par défaut
document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.style.display = 'block';
}); 