'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Video, Calendar, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyInterest: 'off-plan',
    budget: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        propertyInterest: 'off-plan',
        budget: '',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our experts',
      value: '+971 50 123 4567',
      action: 'tel:+971501234567',
      bgColor: 'bg-[#10B981]',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Quick chat support',
      value: 'Message Us',
      action: 'https://wa.me/971501234567',
      bgColor: 'bg-[#25D366]',
    },
    {
      icon: Video,
      title: 'Video Call',
      description: 'Face-to-face consultation',
      value: 'Schedule Now',
      action: '#',
      bgColor: 'bg-[#D4AF37]',
    },
    {
      icon: Calendar,
      title: 'Book Meeting',
      description: 'Visit our office',
      value: 'Pick a Time',
      action: '#',
      bgColor: 'bg-[#667EEA]',
    },
  ];

  const officeInfo = [
    {
      icon: MapPin,
      title: 'Office Address',
      lines: ['Business Bay, Dubai', 'Churchill Executive Tower', 'Office 1205, 12th Floor'],
    },
    {
      icon: Clock,
      title: 'Working Hours',
      lines: ['Sunday - Thursday: 9AM - 6PM', 'Friday: 9AM - 1PM', 'Saturday: Closed'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: ['info@aigentsrealty.com', 'sales@aigentsrealty.com'],
    },
  ];

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      {/* Subtle Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#10B981]/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border-2 border-[#10B981] px-4 py-2 rounded-full mb-6">
            <Phone className="w-4 h-4 text-[#10B981]" />
            <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider">Get In Touch</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-[#0A0A0A] mb-4">
            Contact <span className="text-[#D4AF37]">Us</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Ready to find your perfect investment? Our team of experts is here to help you every step of the way.
          </p>
        </div>

        {/* Quick Contact Methods */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactMethods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <a
                key={idx}
                href={method.action}
                target={method.action.startsWith('http') ? '_blank' : undefined}
                rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group bg-white border border-gray-200 shadow-lg rounded-2xl p-6 hover:border-[#10B981] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg"
              >
                <div className={`w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-1">{method.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{method.description}</p>
                <p className="text-sm font-semibold text-[#10B981]">{method.value}</p>
              </a>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#0A0A0A] mb-6">Send Us a Message</h2>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-[#10B981]/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-[#10B981]" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">Message Sent!</h3>
                <p className="text-gray-600 text-center">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#F9FAFB] border-2 border-gray-200 rounded-xl px-4 py-3 text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:border-[#10B981] transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#F9FAFB] border-2 border-gray-200 rounded-xl px-4 py-3 text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:border-[#10B981] transition-all"
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#F9FAFB] border-2 border-gray-200 rounded-xl px-4 py-3 text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:border-[#10B981] transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Interest</label>
                    <select
                      name="propertyInterest"
                      value={formData.propertyInterest}
                      onChange={handleChange}
                      className="w-full bg-[#F9FAFB] border-2 border-gray-200 rounded-xl px-4 py-3 text-[#0A0A0A] focus:outline-none focus:border-[#10B981] transition-all"
                    >
                      <option value="off-plan">Off-Plan Property</option>
                      <option value="ready">Ready Property</option>
                      <option value="commercial">Commercial</option>
                      <option value="investment">Investment Advice</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-[#F9FAFB] border-2 border-gray-200 rounded-xl px-4 py-3 text-[#0A0A0A] focus:outline-none focus:border-[#10B981] transition-all"
                    >
                      <option value="">Select Budget</option>
                      <option value="under-1m">Under 1M AED</option>
                      <option value="1m-2m">1M - 2M AED</option>
                      <option value="2m-5m">2M - 5M AED</option>
                      <option value="5m-10m">5M - 10M AED</option>
                      <option value="10m+">10M+ AED</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-[#F9FAFB] border-2 border-gray-200 rounded-xl px-4 py-3 text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:border-[#10B981] transition-all resize-none"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#10B981] text-white py-4 rounded-xl font-bold text-sm hover:bg-[#059669] transition-all disabled:opacity-50 flex items-center justify-center gap-2 border-2 border-[#10B981] hover:border-[#059669]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Office Info & Map */}
          <div className="space-y-6">
            {/* Office Details */}
            <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[#0A0A0A] mb-6">Office Information</h2>
              <div className="space-y-6">
                {officeInfo.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <div key={idx} className="flex gap-4">
                      <div className="w-12 h-12 bg-[#10B981]/10 border-2 border-[#10B981]/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#10B981]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#0A0A0A] mb-1">{info.title}</h3>
                        {info.lines.map((line, lineIdx) => (
                          <p key={lineIdx} className="text-sm text-gray-600">{line}</p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white border border-gray-200 shadow-lg rounded-3xl overflow-hidden h-[300px] relative shadow-lg">
              <div className="absolute inset-0 bg-[#F9FAFB] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#10B981]/10 border-2 border-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-[#10B981]" />
                  </div>
                  <p className="text-[#0A0A0A] font-semibold mb-2">Business Bay, Dubai</p>
                  <a
                    href="https://maps.google.com/?q=Business+Bay+Dubai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#10B981] hover:text-[#D4AF37] transition-colors font-medium"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
