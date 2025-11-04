import { useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from "./ContactStyles.module.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status when user starts typing
    if (status.message) {
      setStatus({ message: '', type: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ message: 'Please fill in all fields', type: 'error' });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ message: 'Please enter a valid email address', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ message: 'Sending...', type: 'info' });

    try {
      // EmailJS credentials from environment variables
      // Add these to your .env file:
      // VITE_EMAILJS_SERVICE_ID=your_service_id
      // VITE_EMAILJS_TEMPLATE_ID=your_template_id
      // VITE_EMAILJS_PUBLIC_KEY=your_public_key
      
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      // Check if credentials are set
      if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
        setStatus({ 
          message: 'EmailJS not configured. Please add your credentials in Contact.jsx', 
          type: 'error' 
        });
        setIsSubmitting(false);
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setStatus({ message: 'Message sent successfully! I\'ll get back to you soon.', type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      
      // More specific error messages
      let errorMessage = 'Failed to send message. Please try again later.';
      
      if (error.text) {
        if (error.text.includes('Invalid Public Key') || error.text.includes('Public Key')) {
          errorMessage = 'Invalid Public Key. Please check Account → General → Public Key in EmailJS dashboard.';
        } else if (error.text.includes('Service') || error.text.includes('service')) {
          errorMessage = 'Invalid Service ID. Please check your Email Service in EmailJS dashboard.';
        } else if (error.text.includes('Template') || error.text.includes('template')) {
          errorMessage = 'Invalid Template ID. Please check your Email Template in EmailJS dashboard.';
        } else {
          errorMessage = error.text || errorMessage;
        }
      }
      
      setStatus({ message: errorMessage, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.container}>
      <h1 className="sectionTitle">Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="name" hidden>
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email" hidden>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="message" hidden>
            Message
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        {status.message && (
          <div className={`${styles.statusMessage} ${styles[status.type]}`}>
            {status.message}
          </div>
        )}
        <input
          type="submit"
          className="hover btn"
          value={isSubmitting ? 'Sending...' : 'Submit'}
          disabled={isSubmitting}
        />
      </form>
    </section>
  );
}

export default Contact;
