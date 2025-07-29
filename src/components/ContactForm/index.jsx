import React, { useState } from 'react';
import styles from './contactForm.module.css';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', birthdate: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Aquí podrías enviar el formulario a un backend o servicio externo
    setSent(true);
    setForm({ name: '', email: '', birthdate: '', message: '' });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} autoComplete="on">
      <label htmlFor="contact-name">Nombre
        <input
          id="contact-name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
      </label>
      <label htmlFor="contact-email">Email
        <input
          id="contact-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </label>
      <label htmlFor="contact-birthdate">Fecha de nacimiento
        <input
          id="contact-birthdate"
          name="birthdate"
          type="date"
          value={form.birthdate}
          onChange={handleChange}
          required
          autoComplete="bday-day"
        />
      </label>
      <label htmlFor="contact-message">Mensaje
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          autoComplete="message"
        />
      </label>
      <button type="submit">Enviar</button>
      {sent && <p className={styles.success}>¡Mensaje enviado!</p>}
    </form>
  );
}
