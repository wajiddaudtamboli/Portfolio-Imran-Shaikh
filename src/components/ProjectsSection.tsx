import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink, Code, Calendar, CheckCircle } from 'lucide-react';

const ProjectsSection = () => {
  const { translations } = useLanguage();
  const [projectsData, setProjectsData] = useState<any>({});

  useEffect(() => {
    fetchProjectsData();
  }, []);

  const fetchProjectsData = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_sections')
        .select('content')
        .eq('section_type', 'projects')
        .single();

      if (error) throw error;
      setProjectsData(data?.content || {});
    } catch (error) {
      console.error('Error fetching projects data:', error);
    }
  };

  const projects = projectsData.projects || [
    {
      title: "Structural Design Project",
      description: "Complete structural analysis and design for construction project",
      technologies: ["AutoCAD", "STAAD Pro", "Excel"],
      status: "Completed",
      link: ""
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'planned':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Projects
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
            <p className="text-muted-foreground mt-6 text-lg max-w-2xl mx-auto">
              A showcase of my work in structural design, 3D modeling, and engineering projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any, index: number) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Technologies</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech: string, techIndex: number) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Project Link */}
                  {project.link && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Project
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Have a Project in Mind?
                </h3>
                <p className="text-muted-foreground mb-6">
                  I'm always interested in new opportunities and challenging projects. 
                  Let's discuss how I can help bring your ideas to life.
                </p>
                <Button size="lg" className="group">
                  <CheckCircle className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                  Let's Work Together
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 