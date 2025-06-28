
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Phone, MapPin, Send, MessageCircle, Linkedin } from 'lucide-react';

const ContactSection = () => {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState<any>({});

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_settings')
        .select('setting_value')
        .eq('setting_key', 'contact_info')
        .single();

      if (error) throw error;
      setContactInfo(data?.setting_value || {});
    } catch (error) {
      console.error('Error fetching contact info:', error);
    }
  };

  const contactInfoItems = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: contactInfo.phone || "+91 8698839883",
      href: `tel:${contactInfo.phone || "+918698839883"}`
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: contactInfo.email || "imraanshaikh039@gmail.com",
      href: `mailto:${contactInfo.email || "imraanshaikh039@gmail.com"}`
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: "WhatsApp",
      value: `+91 ${contactInfo.whatsapp || "8698839883"}`,
      href: `https://wa.me/${contactInfo.whatsapp || "918698839883"}`
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      value: "LinkedIn Profile",
      href: contactInfo.linkedin || "https://www.linkedin.com/in/imran-shaikh-06785a3a00"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Sindhakhed, Tal. Nilanga, Dist. Latur, Maharashtra",
      href: null
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {translations.contact.title}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
            <p className="text-muted-foreground mt-6 text-lg max-w-2xl mx-auto">
              Let's discuss your project requirements or explore collaboration opportunities. 
              I'm always open to new challenges and innovative projects.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  {translations.contact.info}
                </h3>
                <div className="space-y-6">
                  {contactInfoItems.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        {info.icon}
                      </div>
                      <div>
                        <div className="font-medium text-foreground mb-1">
                          {info.label}
                        </div>
                        {info.href ? (
                          <a 
                            href={info.href}
                            target={info.href.startsWith('http') ? '_blank' : undefined}
                            rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className="text-muted-foreground">
                            {info.value}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Note */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Professional Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Structural Design Consultation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>3D Modeling & CAD Services</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Fabrication Drawing Preparation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Building Estimation & BOM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      {translations.contact.name}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      {translations.contact.email}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      {translations.contact.message}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your project or inquiry..."
                      className="w-full min-h-[120px] resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    {isSubmitting ? 'Sending...' : translations.contact.send}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
