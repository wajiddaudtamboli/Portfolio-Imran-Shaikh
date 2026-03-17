import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { isSupabaseConfigured, supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import { Save, Plus, Trash2, Edit, X, Upload, ExternalLink, FileText, Image, Download } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { setProfileInfo, refreshProfileInfo } = useProfile();
  const [loading, setLoading] = useState(false);
  const [portfolioData, setPortfolioData] = useState<any>({});
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }
    fetchPortfolioData();
    fetchSettings();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_sections' as any)
        .select('*')
        .order('order_index');

      if (error) throw error;

      const organizedData: any = {};
      data?.forEach((section: any) => {
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
        .from('portfolio_settings' as any)
        .select('*');

      if (error) throw error;

      const settingsData: any = {};
      data?.forEach((setting: any) => {
        settingsData[setting.setting_key] = setting.setting_value;
      });

      setSettings(settingsData);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const updateSection = async (sectionType: string, content: any) => {
    if (!isSupabaseConfigured) return;
    try {
      setLoading(true);

      const { error } = await supabase
        .from('portfolio_sections' as any)
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
    if (!isSupabaseConfigured) return;
    try {
      setLoading(true);

      const { error } = await supabase
        .from('portfolio_settings' as any)
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

      // Update local state for live update
      setSettings((prev: any) => ({ ...prev, [settingKey]: settingValue }));
      fetchSettings();
      // If profile_info was updated, update context for live UI
      if (settingKey === 'profile_info') {
        setProfileInfo(settingValue);
        refreshProfileInfo();
      }
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

  const ExperienceSection = () => {
    const [experienceData, setExperienceData] = useState(portfolioData.experience?.content || {});

    const handleSave = () => {
      updateSection('experience', experienceData);
    };

    const addExperience = () => {
      const newExperience = {
        company: '',
        position: '',
        duration: '',
        location: '',
        responsibilities: ['']
      };
      const newExperiences = [...(experienceData.experiences || []), newExperience];
      setExperienceData({...experienceData, experiences: newExperiences});
    };

    const removeExperience = (index: number) => {
      const newExperiences = experienceData.experiences?.filter((_: any, i: number) => i !== index);
      setExperienceData({...experienceData, experiences: newExperiences});
    };

    const updateExperience = (index: number, field: string, value: any) => {
      const newExperiences = [...(experienceData.experiences || [])];
      newExperiences[index] = {...newExperiences[index], [field]: value};
      setExperienceData({...experienceData, experiences: newExperiences});
    };

    const addResponsibility = (expIndex: number) => {
      const newExperiences = [...(experienceData.experiences || [])];
      newExperiences[expIndex].responsibilities = [...(newExperiences[expIndex].responsibilities || []), ''];
      setExperienceData({...experienceData, experiences: newExperiences});
    };

    const removeResponsibility = (expIndex: number, respIndex: number) => {
      const newExperiences = [...(experienceData.experiences || [])];
      newExperiences[expIndex].responsibilities = newExperiences[expIndex].responsibilities?.filter((_: any, i: number) => i !== respIndex);
      setExperienceData({...experienceData, experiences: newExperiences});
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Experience Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {experienceData.experiences?.map((exp: any, expIndex: number) => (
            <div key={expIndex} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Experience {expIndex + 1}</h4>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeExperience(expIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Company</Label>
                  <Input
                    value={exp.company || ''}
                    onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Input
                    value={exp.position || ''}
                    onChange={(e) => updateExperience(expIndex, 'position', e.target.value)}
                    placeholder="Job title"
                  />
                </div>
                <div>
                  <Label>Duration</Label>
                  <Input
                    value={exp.duration || ''}
                    onChange={(e) => updateExperience(expIndex, 'duration', e.target.value)}
                    placeholder="e.g., 2021 - Present"
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={exp.location || ''}
                    onChange={(e) => updateExperience(expIndex, 'location', e.target.value)}
                    placeholder="City, State"
                  />
                </div>
              </div>

              <div>
                <Label>Responsibilities</Label>
                {exp.responsibilities?.map((resp: string, respIndex: number) => (
                  <div key={respIndex} className="flex gap-2 mt-2">
                    <Input
                      value={resp}
                      onChange={(e) => {
                        const newExperiences = [...(experienceData.experiences || [])];
                        newExperiences[expIndex].responsibilities[respIndex] = e.target.value;
                        setExperienceData({...experienceData, experiences: newExperiences});
                      }}
                      placeholder="Responsibility description"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeResponsibility(expIndex, respIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addResponsibility(expIndex)}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Responsibility
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addExperience}>
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>

          <Button onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    );
  };

  const ProjectsSection = () => {
    const [projectsData, setProjectsData] = useState(portfolioData.projects?.content || {});

    const handleSave = () => {
      updateSection('projects', projectsData);
    };

    const addProject = () => {
      const newProject = {
        title: '',
        description: '',
        technologies: [''],
        status: '',
        link: ''
      };
      const newProjects = [...(projectsData.projects || []), newProject];
      setProjectsData({...projectsData, projects: newProjects});
    };

    const removeProject = (index: number) => {
      const newProjects = projectsData.projects?.filter((_: any, i: number) => i !== index);
      setProjectsData({...projectsData, projects: newProjects});
    };

    const updateProject = (index: number, field: string, value: any) => {
      const newProjects = [...(projectsData.projects || [])];
      newProjects[index] = {...newProjects[index], [field]: value};
      setProjectsData({...projectsData, projects: newProjects});
    };

    const addTechnology = (projIndex: number) => {
      const newProjects = [...(projectsData.projects || [])];
      newProjects[projIndex].technologies = [...(newProjects[projIndex].technologies || []), ''];
      setProjectsData({...projectsData, projects: newProjects});
    };

    const removeTechnology = (projIndex: number, techIndex: number) => {
      const newProjects = [...(projectsData.projects || [])];
      newProjects[projIndex].technologies = newProjects[projIndex].technologies?.filter((_: any, i: number) => i !== techIndex);
      setProjectsData({...projectsData, projects: newProjects});
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Projects Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {projectsData.projects?.map((proj: any, projIndex: number) => (
            <div key={projIndex} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Project {projIndex + 1}</h4>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeProject(projIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={proj.title || ''}
                    onChange={(e) => updateProject(projIndex, 'title', e.target.value)}
                    placeholder="Project title"
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Input
                    value={proj.status || ''}
                    onChange={(e) => updateProject(projIndex, 'status', e.target.value)}
                    placeholder="e.g., Completed, In Progress"
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={proj.description || ''}
                  onChange={(e) => updateProject(projIndex, 'description', e.target.value)}
                  placeholder="Project description"
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <Label>Project Link (Optional)</Label>
                <Input
                  value={proj.link || ''}
                  onChange={(e) => updateProject(projIndex, 'link', e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div>
                <Label>Technologies</Label>
                {proj.technologies?.map((tech: string, techIndex: number) => (
                  <div key={techIndex} className="flex gap-2 mt-2">
                    <Input
                      value={tech}
                      onChange={(e) => {
                        const newProjects = [...(projectsData.projects || [])];
                        newProjects[projIndex].technologies[techIndex] = e.target.value;
                        setProjectsData({...projectsData, projects: newProjects});
                      }}
                      placeholder="Technology name"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeTechnology(projIndex, techIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addTechnology(projIndex)}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Technology
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addProject}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>

          <Button onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    );
  };

  const SkillsSection = () => {
    const [skillsData, setSkillsData] = useState(portfolioData.skills?.content || {});

    const handleSave = () => {
      updateSection('skills', skillsData);
    };

    const addSkillCategory = () => {
      const newCategory = {
        category: '',
        items: ['']
      };
      const newSkills = [...(skillsData.skills || []), newCategory];
      setSkillsData({...skillsData, skills: newSkills});
    };

    const removeSkillCategory = (index: number) => {
      const newSkills = skillsData.skills?.filter((_: any, i: number) => i !== index);
      setSkillsData({...skillsData, skills: newSkills});
    };

    const addSkillItem = (catIndex: number) => {
      const newSkills = [...(skillsData.skills || [])];
      newSkills[catIndex].items = [...(newSkills[catIndex].items || []), ''];
      setSkillsData({...skillsData, skills: newSkills});
    };

    const removeSkillItem = (catIndex: number, itemIndex: number) => {
      const newSkills = [...(skillsData.skills || [])];
      newSkills[catIndex].items = newSkills[catIndex].items?.filter((_: any, i: number) => i !== itemIndex);
      setSkillsData({...skillsData, skills: newSkills});
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Skills Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {skillsData.skills?.map((category: any, catIndex: number) => (
            <div key={catIndex} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Skill Category {catIndex + 1}</h4>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeSkillCategory(catIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <Label>Category Name</Label>
                <Input
                  value={category.category || ''}
                  onChange={(e) => {
                    const newSkills = [...(skillsData.skills || [])];
                    newSkills[catIndex].category = e.target.value;
                    setSkillsData({...skillsData, skills: newSkills});
                  }}
                  placeholder="e.g., Design Software, Programming Languages"
                />
              </div>

              <div>
                <Label>Skills</Label>
                {category.items?.map((item: string, itemIndex: number) => (
                  <div key={itemIndex} className="flex gap-2 mt-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const newSkills = [...(skillsData.skills || [])];
                        newSkills[catIndex].items[itemIndex] = e.target.value;
                        setSkillsData({...skillsData, skills: newSkills});
                      }}
                      placeholder="Skill name"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeSkillItem(catIndex, itemIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addSkillItem(catIndex)}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addSkillCategory}>
            <Plus className="h-4 w-4 mr-2" />
            Add Skill Category
          </Button>

          <Button onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    );
  };

  const EducationSection = () => {
    const [educationData, setEducationData] = useState(portfolioData.education?.content || {});

    const handleSave = () => {
      updateSection('education', educationData);
    };

    const addEducation = () => {
      const newEducation = {
        degree: '',
        field: '',
        institution: '',
        year: '',
        grade: ''
      };
      const newEducationList = [...(educationData.education || []), newEducation];
      setEducationData({...educationData, education: newEducationList});
    };

    const removeEducation = (index: number) => {
      const newEducationList = educationData.education?.filter((_: any, i: number) => i !== index);
      setEducationData({...educationData, education: newEducationList});
    };

    const updateEducation = (index: number, field: string, value: string) => {
      const newEducationList = [...(educationData.education || [])];
      newEducationList[index] = {...newEducationList[index], [field]: value};
      setEducationData({...educationData, education: newEducationList});
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Education Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {educationData.education?.map((edu: any, eduIndex: number) => (
            <div key={eduIndex} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Education {eduIndex + 1}</h4>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeEducation(eduIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree || ''}
                    onChange={(e) => updateEducation(eduIndex, 'degree', e.target.value)}
                    placeholder="e.g., Bachelor of Engineering"
                  />
                </div>
                <div>
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field || ''}
                    onChange={(e) => updateEducation(eduIndex, 'field', e.target.value)}
                    placeholder="e.g., Civil Engineering"
                  />
                </div>
                <div>
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution || ''}
                    onChange={(e) => updateEducation(eduIndex, 'institution', e.target.value)}
                    placeholder="University/College name"
                  />
                </div>
                <div>
                  <Label>Year</Label>
                  <Input
                    value={edu.year || ''}
                    onChange={(e) => updateEducation(eduIndex, 'year', e.target.value)}
                    placeholder="e.g., 2017"
                  />
                </div>
                <div>
                  <Label>Grade/Percentage</Label>
                  <Input
                    value={edu.grade || ''}
                    onChange={(e) => updateEducation(eduIndex, 'grade', e.target.value)}
                    placeholder="e.g., First Class, 85%"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addEducation}>
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>

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

    const handleSave = async () => {
      // Only save the profile info, no upload logic
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

          <div className="space-y-2">
            <Label>Profile Image</Label>
            <div className="space-y-2">
              <Label htmlFor="profile_image_url">Profile Image URL</Label>
              <Input
                id="profile_image_url"
                value={profileData.profile_image || ''}
                onChange={(e) => setProfileData({...profileData, profile_image: e.target.value})}
                placeholder="Enter profile image URL"
              />
            </div>
            {profileData.profile_image && (
              <div className="mt-4">
                <Label>Preview</Label>
                <div className="mt-2 w-32 h-32 rounded-full overflow-hidden border">
                  <img
                    src={profileData.profile_image}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
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

    const handleSave = async () => {
      // Only save contact info, no resume upload or editing
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
          <div className="space-y-2">
            <Label>Resume</Label>
            <a
              href="https://drive.google.com/file/d/1s4DrpZOhWF5NqQWPHVmR-qiPxyuZmgMH/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-amber-400 text-[var(--darkBlue)] font-bold hover:bg-amber-500 transition"
            >
              <Download className="h-4 w-4" />
              Download My Resume
            </a>
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
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileSection />
            </TabsContent>

            <TabsContent value="about">
              <AboutSection />
            </TabsContent>

            <TabsContent value="experience">
              <ExperienceSection />
            </TabsContent>

            <TabsContent value="projects">
              <ProjectsSection />
            </TabsContent>

            <TabsContent value="skills">
              <SkillsSection />
            </TabsContent>

            <TabsContent value="education">
              <EducationSection />
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
