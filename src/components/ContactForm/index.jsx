import React, { useState } from 'react';
import styles from './contactForm.module.css';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Aquí podrías enviar el formulario a un backend o servicio externo
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Nombre
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Email
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>
        Mensaje
        <textarea name="message" value={form.message} onChange={handleChange} required />
      </label>
      <button type="submit">Enviar</button>
      {sent && <p className={styles.success}>¡Mensaje enviado!</p>}
    </form>
  );
}
