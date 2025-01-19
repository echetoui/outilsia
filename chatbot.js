function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    const toggleBtn = document.querySelector('.toggle-btn');
    
    if (chatContainer.style.display === 'none') {
        chatContainer.style.display = 'block';
        toggleBtn.textContent = '▲';
    } else {
        chatContainer.style.display = 'none';
        toggleBtn.textContent = '▼';
    }
}

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (message !== '') {
        // Ajouter le message de l'utilisateur
        addMessage(message, 'user');
        
        // Obtenir et afficher la réponse du bot
        const botResponse = getBotResponse(message);
        addMessage(botResponse, 'bot');
        
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
        // Outils pour la détection des Deep Fakes
        'deep fake': 'Pour détecter les Deep Fakes, voici les outils recommandés :\n' +
            '1. DeepWare.ai - Détection de vidéos manipulées\n' +
            '2. Sensity - Analyse des Deep Fakes\n' +
            '3. Microsoft Video Authenticator\n' +
            'Voulez-vous plus de détails sur un outil en particulier?',

        // Outils pour les images
        'image': 'Pour l\'analyse des images, voici les outils disponibles :\n' +
            '1. FotoForensics - Analyse forensique d\'images\n' +
            '2. InVID - Vérification d\'images\n' +
            '3. Google Images Reverse Search\n' +
            '4. TinEye - Recherche d\'images sources',

        // Outils pour l'audio
        'voix': 'Pour la détection de manipulation vocale :\n' +
            '1. Deeptrace - Détection de voix clonées\n' +
            '2. Veritone - Analyse vocale\n' +
            '3. Auracle - Authentification audio',

        // Outils pour les documents
        'document': 'Pour l\'analyse des documents :\n' +
            '1. DocVerify - Vérification de documents\n' +
            '2. DigiStamp - Horodatage numérique\n' +
            '3. ValidSign - Validation de signatures',

        // Virus et malware
        'virus': 'Pour la détection de virus dans les documents :\n' +
            '1. VirusTotal - Analyse multi-antivirus\n' +
            '2. Hybrid Analysis - Analyse comportementale\n' +
            '3. ANY.RUN - Analyse dynamique',

        // Commandes en français
        'bonjour': 'Bonjour! Je peux vous aider à trouver des outils pour :\n' +
            '1. Détection de Deep Fakes\n' +
            '2. Analyse d\'images\n' +
            '3. Vérification de voix\n' +
            '4. Analyse de documents\n' +
            'Que souhaitez-vous explorer?',

        'outil': 'Voici les catégories d\'outils disponibles :\n' +
            '1. Analyse d\'images et vidéos\n' +
            '2. Détection de Deep Fakes\n' +
            '3. Vérification de documents\n' +
            '4. Analyse audio\n' +
            'Quelle catégorie vous intéresse?',

        // Commandes en arabe
        'مرحبا': 'مرحباً! يمكنني مساعدتك في العثور على أدوات:\n' +
            '1. كشف التزييف العميق\n' +
            '2. تحليل الصور\n' +
            '3. التحقق من الصوت\n' +
            '4. تحليل المستندات\n' +
            'ما الذي تريد استكشافه؟',

        'أدوات': 'الأدوات المتوفرة حسب الفئة:\n' +
            '1. تحليل الصور والفيديو\n' +
            '2. كشف التزييف العميق\n' +
            '3. التحقق من المستندات\n' +
            '4. تحليل الصوت',

        // Réponses spécifiques pour chaque section
        'تزييف': 'أدوات كشف التزييف المتوفرة:\n' +
            '1. DeepWare.ai\n' +
            '2. FotoForensics\n' +
            '3. Veritone\n' +
            'هل تريد معلومات عن أداة معينة؟',

        'falsification': 'Outils de détection disponibles :\n' +
            '1. DeepWare.ai - Pour les vidéos\n' +
            '2. FotoForensics - Pour les images\n' +
            '3. Veritone - Pour l\'audio\n' +
            'Voulez-vous des détails sur un outil en particulier?'
    };

    // Convertir le message en minuscules pour la recherche
    const messageLower = message.toLowerCase();

    // Chercher une correspondance dans les réponses
    for (let key in responses) {
        if (messageLower.includes(key.toLowerCase())) {
            return responses[key];
        }
    }

    // Réponse par défaut selon la langue
    if (/[\u0600-\u06FF]/.test(message)) {
        return 'عذراً، لم أفهم سؤالك. يمكنك السؤال عن:\n' +
            '- أدوات كشف التزييف\n' +
            '- تحليل الصور\n' +
            '- فحص المستندات\n' +
            '- تحليل الصوت';
    } else {
        return 'Je n\'ai pas compris votre question. Vous pouvez demander des informations sur :\n' +
            '- Les outils de détection\n' +
            '- L\'analyse d\'images\n' +
            '- La vérification de documents\n' +
            '- L\'analyse audio';
    }
}

// Initialisation du chat
window.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const chatContainer = document.getElementById('chatContainer');
    
    // Gérer l'événement Enter
    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    // Afficher le chat par défaut
    chatContainer.style.display = 'block';
}); 