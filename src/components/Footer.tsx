import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const gold = '#FFD700';

const Footer: React.FC = () => {
  const { translations } = useLanguage();

  const footerLinks = {
    quickLinks: [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Experience', href: '#experience' },
      { name: 'Skills', href: '#skills' },
      { name: 'Education', href: '#education' },
      { name: 'Contact', href: '#contact' }
    ],
    services: [
      { name: 'Structural Design', href: '#services' },
      { name: '3D Modeling', href: '#services' },
      { name: 'CAD Drawings', href: '#services' },
      { name: 'Project Management', href: '#services' }
    ],
    resources: [
      { name: 'Certifications', href: '#education' },
      { name: 'Skills', href: '#skills' }
    ]
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/imran-shaikh' },
    { name: 'Email', icon: Mail, href: 'mailto:imraanshaikh039@gmail.com' }
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
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <>
      <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>

        {/* Newsletter Section */}
        <div className="border-b border-white/10 relative z-10">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
                Stay Connected
              </h3>
              <p className="text-white/80 mb-6 text-lg">
                Get updates on new projects, industry insights, and professional achievements
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300"
                />
                <button 
                  onClick={handleNewsletterSubscribe}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 rounded-lg font-semibold text-slate-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
                Imran Shaikh
              </h2>
              <p className="text-white/80 mb-6 leading-relaxed text-lg">
                Senior Design Engineer specializing in Civil & Structural Design, 3D Modeling, and Production Engineering. Transforming concepts into precision structures.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                  <Phone className="text-yellow-400 h-5 w-5" />
                  <div>
                    <p className="text-sm text-white/70">Phone:</p>
                    <p className="font-semibold text-white">+91 8698839883</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                  <Mail className="text-yellow-400 h-5 w-5" />
                  <div>
                    <p className="text-sm text-white/70">Email:</p>
                    <p className="font-semibold text-white">imran.shaikh.contact@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                  <MapPin className="text-yellow-400 h-5 w-5" />
                  <div>
                    <p className="text-sm text-white/70">Location:</p>
                    <p className="font-semibold text-white">Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white border-b border-amber-400/30 pb-2">Quick Links</h3>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/90 hover:text-amber-400 transition-all duration-300 text-left hover:translate-x-1 transform"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white border-b border-amber-400/30 pb-2">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/90 hover:text-amber-400 transition-all duration-300 text-left hover:translate-x-1 transform"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white border-b border-amber-400/30 pb-2">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/90 hover:text-amber-400 transition-all duration-300 text-left flex items-center gap-2 hover:translate-x-1 transform"
                    >
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
                      className="text-white/90 hover:text-amber-400 hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-white/10"
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
                <p className="text-white/90 text-sm">
                  © 2025 <span className="font-bold text-white">Imran Shaikh</span>. All rights reserved.
                </p>
                <p className="text-white/70 text-xs mt-1">
                  Senior Design Engineer | Civil & Structural Design Expert
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="border-t border-white/10 relative z-10">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center">
              <p className="text-white/70 text-sm">
                <span className="font-semibold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Developer-Wajid Daud Tamboli
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-foreground p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Back to top"
        >
          ↑
        </button>
      </footer>
    </>
  );
};

export default Footer;
