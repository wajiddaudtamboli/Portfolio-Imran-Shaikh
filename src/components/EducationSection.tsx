import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { isSupabaseConfigured, supabase } from '@/integrations/supabase/client';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

const EducationSection = () => {
  const { translations } = useLanguage();
  const [educationData, setEducationData] = useState<any>({});

  useEffect(() => {
    fetchEducationData();
  }, []);

  const fetchEducationData = async () => {
    if (!isSupabaseConfigured) return;
    try {
      const { data, error } = await supabase
        .from('portfolio_sections')
        .select('content')
        .eq('section_type', 'education')
        .single();

      if (error) throw error;
      setEducationData(data?.content || {});
    } catch (error) {
      console.error('Error fetching education data:', error);
    }
  };

  const education = educationData.education || [
    {
      degree: "Bachelor of Engineering",
      field: "Civil Engineering",
      institution: "Engineering College",
      year: "2017",
      grade: "First Class"
    }
  ];

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Education
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
            <p className="text-muted-foreground mt-6 text-lg max-w-2xl mx-auto">
              My academic background and qualifications in the field of engineering.
            </p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-8">
            {education.map((edu: any, index: number) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 w-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-muted-foreground">
                          {edu.field}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {edu.institution}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {edu.year}
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {edu.grade}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Certifications & Achievements */}
          <div className="mt-16">
            <Card>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    Certifications & Achievements
                  </h3>
                  <p className="text-muted-foreground">
                    Professional certifications and notable achievements
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">AutoCAD Certification</h4>
                    <p className="text-sm text-muted-foreground">
                      Professional certification in AutoCAD design
                    </p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">Structural Design</h4>
                    <p className="text-sm text-muted-foreground">
                      Advanced structural analysis and design
                    </p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">Project Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Engineering project management skills
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection; 