import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { isSupabaseConfigured, supabase } from '@/integrations/supabase/client';
import { Building, Calendar, MapPin, Briefcase } from 'lucide-react';

const ExperienceSection = () => {
  const { translations } = useLanguage();
  const [experienceData, setExperienceData] = useState<any>({});

  useEffect(() => {
    fetchExperienceData();
  }, []);

  const fetchExperienceData = async () => {
    if (!isSupabaseConfigured) return;
    try {
      const { data, error } = await supabase
        .from('portfolio_sections')
        .select('content')
        .eq('section_type', 'experience')
        .single();

      if (error) throw error;
      setExperienceData(data?.content || {});
    } catch (error) {
      console.error('Error fetching experience data:', error);
    }
  };

  const experiences = experienceData.experiences || [
    {
      company: "Mfs Formwork Systems LLP",
      position: "Senior Design Engineer",
      duration: "2021 - Present",
      location: "Pune, Maharashtra",
      responsibilities: [
        "Structural design and analysis",
        "3D modeling in AutoCAD",
        "Fabrication drawing preparation",
        "BOM creation and estimation"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Professional Experience
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
            <p className="text-muted-foreground mt-6 text-lg max-w-2xl mx-auto">
              My journey in the field of structural design and engineering, 
              working on diverse projects and gaining valuable expertise.
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp: any, index: number) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-4 gap-6">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3 mb-2">
                        <Building className="h-5 w-5 text-primary" />
                        <h3 className="text-xl font-semibold text-foreground">
                          {exp.company}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-lg font-medium text-foreground">
                          {exp.position}
                        </span>
                      </div>
                    </div>

                    {/* Duration & Location */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {exp.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-foreground mb-3">
                      Key Responsibilities:
                    </h4>
                    <ul className="space-y-2">
                      {exp.responsibilities?.map((resp: string, respIndex: number) => (
                        <li key={respIndex} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection; 