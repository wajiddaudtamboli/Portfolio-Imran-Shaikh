import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Award, Building, Calendar, MapPin } from 'lucide-react';

const AboutSection = () => {
  const { translations } = useLanguage();
  const [aboutData, setAboutData] = useState<any>({});

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_sections')
        .select('content')
        .eq('section_type', 'about')
        .single();

      if (error) throw error;
      setAboutData(data?.content || {});
    } catch (error) {
      console.error('Error fetching about data:', error);
    }
  };

  const highlights = [
    {
      icon: <Building className="h-5 w-5" />,
      label: "Current Company",
      value: "Mfs Formwork Systems LLP"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Pune, Maharashtra"
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Experience",
      value: "4+ Years"
    },
    {
      icon: <Award className="h-5 w-5" />,
      label: "Specialization",
      value: "Civil & Structural Design"
    }
  ];

  const personalDetails = [
    { label: "Full Name", value: "Imran Usman Shaikh" },
    { label: "Date of Birth", value: "21 September 1994" },
    { label: "Languages", value: "Marathi, Hindi, English" },
    { label: "Interests", value: "Photography, Cricket" }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {translations.about.title}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* About Content */}
            <div className="space-y-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {aboutData.description || translations.about.description}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  With extensive experience in steel engineering, scaffolding systems, and aluminium fabrication, 
                  I bring a comprehensive understanding of both theoretical and practical aspects of structural design. 
                  My expertise spans from 3D modeling and 2D drafting to fabrication drawing preparation and building estimation.
                </p>
              </div>

              {/* Highlights Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="text-primary">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            {item.label}
                          </div>
                          <div className="font-semibold text-foreground">
                            {item.value}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    {personalDetails.map((detail, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                        <span className="text-muted-foreground font-medium">
                          {detail.label}:
                        </span>
                        <span className="text-foreground font-semibold">
                          {detail.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Strengths */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    Core Strengths
                  </h3>
                  <div className="space-y-3">
                    {(aboutData.highlights || [
                      "3D Modeling & 2D Drafting in AutoCAD",
                      "Structural & Reinforcement Drawing Interpretation",
                      "BOM Creation & Building Estimation"
                    ]).map((strength: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">{strength}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
