"use client" // obliger quand on utiliser le useState,useEffect
import { useSettings } from "@/context/SettingsContext";
import { useState } from 'react';
import axios from 'axios';

const Contact = ()=> {
  const { title,email, phone, address } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    subject: '',
    message: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/contact', formData);
      setResponseMessage(response.data.message);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire :', error);
      if (error.response) {
        // Le serveur a répondu avec un code d'état hors de la plage 2xx
        setResponseMessage(error.response.data.message || 'Une erreur est survenue lors de l\'envoi du message, mais vous pouvez nous contacter sur notre numero ou notre email.');
      }
      else setResponseMessage('Une erreur est survenue lors de l\'envoi du message, mais vous pouvez nous contacter sur notr numero ou notre email.');
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-info">
        <h2>{title || "H&H Transport"}</h2>
        <p><strong>Adresse :</strong> {address || "Angers 49100"}</p>
        <p><strong>Téléphone :</strong> {phone || "+33 7 49 89 46 24"}</p>
        <p><strong>Email :</strong> {email || "contact@hh-transports.com"}</p>

        <div className="info-text">
          <h3>Une entreprise à votre service</h3>
            <p>
              Chez <strong>{title || "H&H Transport"}</strong>, notre priorité est d'offrir des solutions de transport et de déménagement 
              <strong> simples, efficaces et sécurisées</strong>. Nous accompagnons aussi bien les particuliers que les entreprises 
              pour un transport sans stress et parfaitement organisé.
            </p>

            <h3>Un accompagnement sur-mesure</h3>
            <p>
              Nous mettons tout en œuvre pour vous offrir un <strong>service personnalisé</strong>, adapté à vos besoins spécifiques.
              Avec une équipe réactive et un suivi constant, nous assurons un transport <strong>fiable et sécurisé</strong>.
            </p>

            <h3>Une question ? Un projet de déménagement ?</h3>
            <p>
              <strong>N’hésitez pas à nous contacter !</strong> Nos experts sont à votre disposition pour vous accompagner et vous proposer
              des solutions adaptées à vos besoins. Faites confiance à <strong>{title || "H&H Transport"}</strong> pour un service de qualité !
            </p>
          </div>
      </div>

      <div className="contact-form">
        <h2>Contactez-nous</h2>
        {responseMessage && <p className="response-message">{responseMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label>Nom <span className="required">*</span></label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Saisissez votre nom..." />

          <label>Adresse e-mail <span className="required">*</span></label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Votre adresse e-mail..." />

          <label>Téléphone <span className="required">*</span></label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Votre numéro de téléphone..." />

          <label>Adresse</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Votre adresse (optionnel)..." />

          <label>Objet <span className="required">*</span></label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Objet de votre message..." />

          <label>Message <span className="required">*</span></label>
          <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Votre message ici..."></textarea>

          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;