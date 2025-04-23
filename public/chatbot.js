// Fonction pour basculer l'affichage du chatbot
function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    const toggleBtn = document.querySelector('.toggle-btn');
    
    if (chatContainer.style.display === 'none' || !chatContainer.style.display) {
        chatContainer.style.display = 'block';
        toggleBtn.textContent = '▼';
    } else {
        chatContainer.style.display = 'none';
        toggleBtn.textContent = '▲';
    }
}

// Initialisation du chatbot
document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.style.display = 'none';
}); 