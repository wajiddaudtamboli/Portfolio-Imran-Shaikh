import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Code, Settings, Palette, Database } from 'lucide-react';

const SkillsSection = () => {
  const { translations } = useLanguage();
  const [skillsData, setSkillsData] = useState<any>({});

  useEffect(() => {
    fetchSkillsData();
  }, []);

  const fetchSkillsData = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_sections')
        .select('content')
        .eq('section_type', 'skills')
        .single();

      if (error) throw error;
      setSkillsData(data?.content || {});
    } catch (error) {
      console.error('Error fetching skills data:', error);
    }
  };

  const skills = skillsData.skills || [
    {
      category: "Design Software",
      items: ["AutoCAD", "STAAD Pro", "Revit", "Excel"]
    },
    {
      category: "Engineering",
      items: ["Structural Design", "3D Modeling", "Fabrication Drawing", "Building Estimation"]
    }
  ];

  const getCategoryIcon = (category: string) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('design') || categoryLower.includes('software')) {
      return <Settings className="h-6 w-6" />;
    } else if (categoryLower.includes('engineering')) {
      return <Code className="h-6 w-6" />;
    } else if (categoryLower.includes('modeling') || categoryLower.includes('3d')) {
      return <Palette className="h-6 w-6" />;
    } else {
      return <Database className="h-6 w-6" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
            <p className="text-muted-foreground mt-6 text-lg max-w-2xl mx-auto">
              My expertise spans across various tools and technologies in the field of structural design and engineering.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skillCategory: any, index: number) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-primary">
                      {getCategoryIcon(skillCategory.category)}
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {skillCategory.category}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillCategory.items?.map((skill: string, skillIndex: number) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">
                            {skill}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {Math.floor(Math.random() * 30) + 70}%
                          </span>
                        </div>
                        <Progress 
                          value={Math.floor(Math.random() * 30) + 70} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Skills */}
          <div className="mt-16">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                  Additional Competencies
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Settings className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">Technical Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      Structural analysis and design calculations
                    </p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Code className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">Documentation</h4>
                    <p className="text-sm text-muted-foreground">
                      Technical documentation and drawing preparation
                    </p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Database className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">Project Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Coordination and project delivery
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

export default SkillsSection; 