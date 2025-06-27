
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, Linkedin, MessageCircle, Download } from 'lucide-react';

const Footer: React.FC = () => {
  const { translations } = useLanguage();

  const footerLinks = {
    quickLinks: [
      { name: translations.nav.home, href: '#home' },
      { name: translations.nav.about, href: '#about' },
      { name: translations.nav.experience, href: '#experience' },
      { name: translations.nav.contact, href: '#contact' }
    ],
    services: [
      { name: 'Structural Design', href: '#services' },
      { name: '3D Modeling', href: '#services' },
      { name: 'CAD Drawings', href: '#services' },
      { name: 'Project Management', href: '#services' }
    ],
    resources: [
      { name: 'Resume Download', href: '/resume-imran-shaikh.pdf' },
      { name: 'Portfolio', href: '#projects' },
      { name: 'Certifications', href: '#education' },
      { name: 'Skills', href: '#skills' }
    ]
  };

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/in/imran-shaikh-06785a300' 
    },
    { 
      name: 'WhatsApp', 
      icon: MessageCircle, 
      href: 'https://wa.me/918698839883' 
    },
    { 
      name: 'Email', 
      icon: Mail, 
      href: 'mailto:imraanshaikh039@gmail.com' 
    }
  ];

  const handleNewsletterSubscribe = () => {
    const message = "Hi! I would like to subscribe to your professional updates and project insights.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918698839883?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.includes('.pdf')) {
      // Handle resume download
      const link = document.createElement('a');
      link.href = href;
      link.download = 'Imran_Usman_Shaikh_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <>
      <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        {/* Newsletter Section */}
        <div className="border-b border-white/10">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
              <p className="text-gray-300 mb-6">
                Get updates on new projects, industry insights, and professional achievements
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button 
                  onClick={handleNewsletterSubscribe}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-blue-600 rounded-lg font-semibold hover:from-primary/80 hover:to-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Imran Usman Shaikh
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Senior Design Engineer specializing in Civil & Structural Design, 3D Modeling, and Production Engineering. Transforming concepts into precision structures.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="text-primary h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-300">Phone:</p>
                    <p className="font-semibold">+91 8698839883</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-primary h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-300">Email:</p>
                    <p className="font-semibold">imraanshaikh039@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-primary h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-300">Location:</p>
                    <p className="font-semibold">India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-primary transition-colors duration-300 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-primary transition-colors duration-300 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-primary transition-colors duration-300 text-left flex items-center gap-2"
                    >
                      {link.name === 'Resume Download' && <Download className="h-4 w-4" />}
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-white/10 pt-8 mt-12">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex space-x-6 mb-4 sm:mb-0">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="text-gray-300 hover:text-primary hover:scale-110 transition-all duration-300"
                      title={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent className="h-6 w-6" />
                    </a>
                  );
                })}
              </div>
              
              <div className="text-center sm:text-right">
                <p className="text-gray-300 text-sm">
                  © 2025 <span className="text-white font-bold">Imran Usman Shaikh</span>. All rights reserved.
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Senior Design Engineer | Civil & Structural Design Expert
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-primary to-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Back to top"
        >
          ↑
        </button>
      </footer>
    </>
  );
};

export default Footer;
