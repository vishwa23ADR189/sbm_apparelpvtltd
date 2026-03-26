import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We will get back to you soon!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="products" style={{ paddingBottom: '0' }}>
      <div className="products__header">
        <h1 className="products__title">Contact Us</h1>
        <p className="products__subtitle">
          We''d love to hear from you. Get in touch with us for any inquiries or feedback.
        </p>
      </div>

      <section style={{ padding: '4rem 2rem', maxWidth: '1140px', margin: '0 auto', width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            marginBottom: '4rem',
          }}
        >
          {/* Contact Info Card */}
          <div style={{ padding: '2rem', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: '0 18px 40px rgba(58, 42, 34, 0.08)' }}>
            <h3 style={{ margin: '0 0 1rem', color: 'var(--brand-dark)', fontFamily: 'Playfair Display, serif', fontSize: '1.3rem' }}>
               Address
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
              smart Textile
              <br />
              248, Main Road
              <br />
              Bhavani – 638301
              <br />
              Erode District, Tamil Nadu.
            </p>
          </div>

          <div style={{ padding: '2rem', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: '0 18px 40px rgba(58, 42, 34, 0.08)' }}>
            <h3 style={{ margin: '0 0 1rem', color: 'var(--brand-dark)', fontFamily: 'Playfair Display, serif', fontSize: '1.3rem' }}>
               Phone
            </h3>
            <p style={{ color: 'var(--text-muted)', margin: '0' }}>
              <a href="tel:+919171407570" style={{ color: 'var(--brand-warm)', textDecoration: 'none' }}>
                +91 9171407570
              </a>
            </p>
          </div>

          <div style={{ padding: '2rem', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: '0 18px 40px rgba(58, 42, 34, 0.08)' }}>
            <h3 style={{ margin: '0 0 1rem', color: 'var(--brand-dark)', fontFamily: 'Playfair Display, serif', fontSize: '1.3rem' }}>
               Email
            </h3>
            <p style={{ color: 'var(--text-muted)', margin: '0' }}>
              <a href="mailto:vtext84@gmail.com" style={{ color: 'var(--brand-warm)', textDecoration: 'none' }}>
                vtext84@gmail.com
              </a>
            </p>
          </div>

          <div style={{ padding: '2rem', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: '0 18px 40px rgba(58, 42, 34, 0.08)' }}>
            <h3 style={{ margin: '0 0 1rem', color: 'var(--brand-dark)', fontFamily: 'Playfair Display, serif', fontSize: '1.3rem' }}>
               Hours
            </h3>
            <p style={{ color: 'var(--text-muted)', margin: '0' }}>
              Mon–Sat: 10 AM – 8 PM
              <br />
              Sunday: 11 AM – 6 PM
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontFamily: 'Playfair Display, serif', textAlign: 'center', marginBottom: '2rem', color: 'var(--brand-dark)' }}>
            Send us a Message
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                style={{
                  padding: '0.9rem 1rem',
                  borderRadius: '14px',
                  border: '1px solid rgba(58, 42, 34, 0.15)',
                  background: 'rgba(245, 241, 237, 0.88)',
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                  color: 'var(--brand-dark)',
                  transition: 'border var(--transition)',
                  resize: 'vertical',
                }}
                required
              />
            </div>

            <button type="submit" className="form__submit">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
