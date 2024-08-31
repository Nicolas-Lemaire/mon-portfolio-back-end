const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { user_name, user_object, user_email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465, // Utiliser le port 465 pour SSL ou 587 pour TLS
    secure: true, // true pour SSL, false pour TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: user_email,
      to: process.env.EMAIL_USER,
      subject: user_object,
      text: `Nom: ${user_name}\nObjet: ${user_object}\nMessage: ${message}`,
    });
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
