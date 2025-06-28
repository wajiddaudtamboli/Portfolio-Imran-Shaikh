import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Phone, MapPin, Send, Linkedin, FileText, Download } from 'lucide-react';
import { Label } from '@/components/ui/label';

const gold = '#FFD700';
const darkBlue = '#003366';

const RESUME_LINK = 'https://drive.google.com/file/d/1s4DrpZOhWF5NqQWPHVmR-qiPxyuZmgMH/view';

const ContactSection = ({ whatsappNumber = '918698839883' }) => {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
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
      value: contactInfo.email || "imran.shaikh.contact@gmail.com",
      href: `mailto:${contactInfo.email || "imran.shaikh.contact@gmail.com"}`
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
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
      icon: <FileText className="h-5 w-5" />,
      label: "Resume",
      value: "Download Resume",
      href: RESUME_LINK
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Sindhakhed, Tal. Nilanga, Dist. Latur, Maharashtra",
      href: null
    }
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getWhatsAppText = () =>
    `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nReason: ${form.reason}\nMessage: ${form.message}`;

  const handlePreview = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleSend = () => {
    setSubmitting(true);
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(getWhatsAppText())}`;
    window.open(url, '_blank');
    setSubmitting(false);
    toast({ title: 'Redirecting to WhatsApp', description: 'Your message will be sent via WhatsApp.' });
    setShowPreview(false);
  };

  return (
    <section id="contact" className="py-16 bg-background">
      <div className="container mx-auto max-w-xl bg-background rounded-2xl shadow-2xl p-8 border border-primary/20">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Contact Me</h2>
        <a
          href={RESUME_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-6 w-full"
          style={{ textDecoration: 'none' }}
        >
          <Button
            style={{ background: gold, color: darkBlue, fontWeight: 'bold' }}
            className="h-12 text-lg w-full flex items-center justify-center gap-2 rounded-full shadow-md border-2 border-[var(--gold)] hover:brightness-110 transition"
          >
            <Download className="h-5 w-5 mr-2" />
            Download My Resume
          </Button>
        </a>
        <form onSubmit={handlePreview} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-foreground">Name</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} required placeholder="Your Name" className="bg-background text-foreground border border-primary/30 rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/30" />
          </div>
              <div>
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Your Email" className="bg-background text-foreground border border-primary/30 rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/30" />
                      </div>
                      <div>
            <Label htmlFor="phone" className="text-foreground">Phone</Label>
            <Input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Your Phone (optional)" className="bg-background text-foreground border border-primary/30 rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/30" />
            </div>
                  <div>
            <Label htmlFor="reason" className="text-foreground">Reason for Contact</Label>
            <select
              id="reason"
              name="reason"
              value={form.reason}
              onChange={handleChange}
                      required
              style={{ background: gold, color: form.reason ? darkBlue : '#666', fontWeight: 'bold', border: `2px solid ${gold}` }}
              className="w-full rounded-lg px-3 py-2 focus:outline-none shadow-sm border-2 border-[var(--gold)] hover:brightness-110 transition"
            >
              <option value="" style={{ color: '#666', fontWeight: 'normal' }}>Select an option</option>
              <option value="Want to Hire Me" style={{ color: darkBlue }}>Want to Hire Me</option>
              <option value="Project" style={{ color: darkBlue }}>Project</option>
              <option value="Consultation" style={{ color: darkBlue }}>Consultation</option>
              <option value="Other Work" style={{ color: darkBlue }}>Other Work</option>
            </select>
                  </div>
                  <div>
            <Label htmlFor="message" className="text-foreground">Message</Label>
            <Textarea id="message" name="message" value={form.message} onChange={handleChange} required placeholder="Type your message..." className="bg-background text-foreground border border-primary/30 rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/30" />
                  </div>
          <Button type="submit" disabled={submitting} className="w-full h-12 text-lg rounded-full shadow-md bg-primary text-background font-bold hover:bg-primary/90 transition">
            {submitting ? 'Sending...' : 'Preview WhatsApp Message'}
                  </Button>
                </form>
        {showPreview && (
          <div className="mt-6 p-4 rounded-xl" style={{ border: `2px solid ${gold}`, background: '#fffbe6' }}>
            <h3 className="font-bold mb-2" style={{ color: darkBlue }}>WhatsApp Message Preview</h3>
            <pre className="whitespace-pre-wrap text-base mb-4" style={{ color: darkBlue }}>{getWhatsAppText()}</pre>
            <Button onClick={handleSend} className="w-full h-12 text-lg rounded-full shadow-md" style={{ background: gold, color: darkBlue, fontWeight: 'bold' }}>
              Send via WhatsApp
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
