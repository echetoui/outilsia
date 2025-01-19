// Attendez que la page soit chargée
document.addEventListener('DOMContentLoaded', function() {
    // URL de votre site (à remplacer par l'URL réelle)
    const siteURL = "https://YOUR_USERNAME.github.io/outilsIA";
    
    try {
        // Nettoyage du conteneur
        const qrcodeDiv = document.getElementById("qrcode");
        qrcodeDiv.innerHTML = '';
        
        // Création du QR code
        new QRCode(qrcodeDiv, {
            text: siteURL,
            width: 128,
            height: 128,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        
        console.log("QR Code généré avec succès");
    } catch (error) {
        console.error("Erreur lors de la génération du QR code:", error);
    }
}); 