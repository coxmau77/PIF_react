import React from 'react';
import ContactForm from '../../components/ContactForm';
import styles from './contact.module.css';

export default function Contact() {
  return (
    <section className={styles.contactSection}>
      <h1>Contacto</h1>
      <ContactForm />
    </section>
  );
}
