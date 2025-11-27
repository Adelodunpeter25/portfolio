import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ContactProps {
  email: string;
  social: {
    github: string;
    linkedin: string;
  };
}

export default function Contact({ email, social }: ContactProps) {
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'pending'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          website_name: 'Adelodun Peter Portfolio',
          website_url: window.location.origin,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitStatus('error');
        setStatusMessage(data.detail || 'Failed to send message');
        return;
      }

      // Check if activation is required
      if (data.message === 'Activation required' || data.message === 'Pending activation') {
        setSubmitStatus('pending');
        setStatusMessage(data.detail || data.message);
      } else {
        setSubmitStatus('success');
        setStatusMessage(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setStatusMessage('Failed to send message. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus('idle');
        setStatusMessage('');
      }, 8000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      id="contact" 
      className={`py-24 px-8 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-center">Get In Touch</h2>
        <p className="text-2xl text-text-secondary mb-12 text-center leading-relaxed">
          Have a project in mind or want to collaborate? Let's build something amazing together.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-semibold mb-6">Connect With Me</h3>
            <div className="space-y-6">
              <div className="p-6 bg-black border border-border-dark rounded-lg hover:border-primary transition-colors">
                <h4 className="text-xl font-semibold mb-2">Email</h4>
                <a
                  href={`mailto:${email}`}
                  className="text-lg text-primary hover:underline"
                >
                  {email}
                </a>
              </div>

              <div className="p-6 bg-black border border-border-dark rounded-lg hover:border-primary transition-colors">
                <h4 className="text-xl font-semibold mb-2">Phone</h4>
                <a
                  href="tel:+2347039201122"
                  className="text-lg text-primary hover:underline"
                >
                  +234 703 920 1122
                </a>
              </div>

              <div className="p-6 bg-black border border-border-dark rounded-lg hover:border-primary transition-colors">
                <h4 className="text-xl font-semibold mb-2">GitHub</h4>
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-primary hover:underline"
                >
                  View Profile →
                </a>
              </div>

              <div className="p-6 bg-black border border-border-dark rounded-lg hover:border-primary transition-colors">
                <h4 className="text-xl font-semibold mb-2">LinkedIn</h4>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-primary hover:underline"
                >
                  Connect →
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-semibold mb-6">Send a Message</h3>
            <div className="p-6 bg-black border border-border-dark rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-lg font-medium mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-black border border-border-dark rounded-lg focus:border-primary focus:outline-none transition-colors disabled:opacity-50 text-lg"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-medium mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-black border border-border-dark rounded-lg focus:border-primary focus:outline-none transition-colors disabled:opacity-50 text-lg"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-lg font-medium mb-2">
                  Subject:
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-black border border-border-dark rounded-lg focus:border-primary focus:outline-none transition-colors disabled:opacity-50 text-lg"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-medium mb-2">
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={3}
                  className="w-full px-4 py-3 bg-black border border-border-dark rounded-lg focus:border-primary focus:outline-none transition-colors resize-none disabled:opacity-50 text-lg"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-[#0369a1] transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 text-sm">
                  ✓ {statusMessage}
                </div>
              )}

              {submitStatus === 'pending' && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg text-yellow-500 text-sm">
                  ⏳ {statusMessage}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                  ✗ {statusMessage}
                </div>
              )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
