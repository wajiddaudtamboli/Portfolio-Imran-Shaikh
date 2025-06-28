
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Save, Plus, Trash2, Edit, X, Upload, ExternalLink } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [portfolioData, setPortfolioData] = useState<any>({});
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    fetchPortfolioData();
    fetchSettings();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_sections')
        .select('*')
        .order('order_index');

      if (error) throw error;

      const organizedData: any = {};
      data?.forEach((section) => {
        organizedData[section.section_type] = {
          id: section.id,
          title: section.title,
          content: section.content,
          order_index: section.order_index,
          is_active: section.is_active
        };
      });

      setPortfolioData(organizedData);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      toast({
        title: "Error",
        description: "Failed to load portfolio data",
        variant: "destructive"
      });
    }
  };

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_settings')
        .select('*');

      if (error) throw error;

      const settingsData: any = {};
      data?.forEach((setting) => {
        settingsData[setting.setting_key] = setting.setting_value;
      });

      setSettings(settingsData);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const updateSection = async (sectionType: string, content: any) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('portfolio_sections')
        .update({ 
          content,
          updated_at: new Date().toISOString()
        })
        .eq('section_type', sectionType);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${sectionType} section updated successfully`,
      });

      fetchPortfolioData();
    } catch (error) {
      console.error('Error updating section:', error);
      toast({
        title: "Error",
        description: "Failed to update section",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (settingKey: string, settingValue: any) => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('portfolio_settings')
        .update({ 
          setting_value: settingValue,
          updated_at: new Date().toISOString()
        })
        .eq('setting_key', settingKey);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Settings updated successfully",
      });

      fetchSettings();
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const AboutSection = () => {
    const [aboutData, setAboutData] = useState(portfolioData.about?.content || {});

    const handleSave = () => {
      updateSection('about', aboutData);
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>About Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={aboutData.description || ''}
              onChange={(e) => setAboutData({...aboutData, description: e.target.value})}
              placeholder="Enter about description"
              className="min-h-[100px]"
            />
          </div>
          <div>
            <Label>Highlights</Label>
            {aboutData.highlights?.map((highlight: string, index: number) => (
              <div key={index} className="flex gap-2 mt-2">
                <Input
                  value={highlight}
                  onChange={(e) => {
                    const newHighlights = [...(aboutData.highlights || [])];
                    newHighlights[index] = e.target.value;
                    setAboutData({...aboutData, highlights: newHighlights});
                  }}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newHighlights = aboutData.highlights?.filter((_: any, i: number) => i !== index);
                    setAboutData({...aboutData, highlights: newHighlights});
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                const newHighlights = [...(aboutData.highlights || []), ''];
                setAboutData({...aboutData, highlights: newHighlights});
              }}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Highlight
            </Button>
          </div>
          <Button onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    );
  };

  const ContactSection = () => {
    const [contactData, setContactData] = useState(settings.contact_info || {});

    const handleSave = () => {
      updateSettings('contact_info', contactData);
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={contactData.email || ''}
              onChange={(e) => setContactData({...contactData, email: e.target.value})}
              placeholder="Enter email address"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={contactData.phone || ''}
              onChange={(e) => setContactData({...contactData, phone: e.target.value})}
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <Label htmlFor="whatsapp">WhatsApp Number</Label>
            <Input
              id="whatsapp"
              value={contactData.whatsapp || ''}
              onChange={(e) => setContactData({...contactData, whatsapp: e.target.value})}
              placeholder="Enter WhatsApp number (without +)"
            />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              value={contactData.linkedin || ''}
              onChange={(e) => setContactData({...contactData, linkedin: e.target.value})}
              placeholder="Enter LinkedIn profile URL"
            />
          </div>
          <div>
            <Label htmlFor="resume">Resume Link</Label>
            <div className="flex gap-2">
              <Input
                id="resume"
                value={contactData.resume || ''}
                onChange={(e) => setContactData({...contactData, resume: e.target.value})}
                placeholder="Enter resume URL"
              />
              {contactData.resume && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(contactData.resume, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <Button onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    );
  };

  const ProfileSection = () => {
    const [profileData, setProfileData] = useState(settings.profile_info || {});

    const handleSave = () => {
      updateSettings('profile_info', profileData);
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profileData.name || ''}
              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              placeholder="Enter full name"
            />
          </div>
          <div>
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              value={profileData.title || ''}
              onChange={(e) => setProfileData({...profileData, title: e.target.value})}
              placeholder="Enter professional title"
            />
          </div>
          <div>
            <Label htmlFor="profile_image">Profile Image URL</Label>
            <Input
              id="profile_image"
              value={profileData.profile_image || ''}
              onChange={(e) => setProfileData({...profileData, profile_image: e.target.value})}
              placeholder="Enter profile image URL"
            />
          </div>
          <Button onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <Button variant="outline" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-6">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <ProfileSection />
            </TabsContent>
            
            <TabsContent value="about">
              <AboutSection />
            </TabsContent>
            
            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle>Experience Section</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Experience management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Projects Section</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Projects management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Skills Section</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Skills management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contact">
              <ContactSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
