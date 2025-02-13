const express = require('express');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = 3001;

// Configuration OpenAI avec la clé API depuis .env
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Route par défaut
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Route pour l'API chat
app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        console.log('Message reçu:', userMessage); // Pour le débogage

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": "أنت مساعد مفيد يتحدث باللغة العربية."},
                {"role": "user", "content": userMessage}
            ],
        });

        console.log('Réponse OpenAI:', completion.choices[0].message.content); // Pour le débogage
        
        res.json({ 
            message: completion.choices[0].message.content 
        });
    } catch (error) {
        console.error('Erreur OpenAI:', error);
        res.status(500).json({ 
            error: 'Erreur du serveur',
            details: error.message 
        });
    }
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
    console.log('Clé API OpenAI configurée:', process.env.OPENAI_API_KEY ? 'Oui' : 'Non');
}); 