import { ProjectsGrid } from '@/components/projects-grid';
import { getProjects } from '@/lib/content';

export const metadata = {
  title: 'Projects - Kevin Ortega Rodriguez',
  description: 'Explore Kevin Ortega Rodriguez\'s portfolio of web development projects, showcasing modern design and development expertise.',
};

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-display sm:text-5xl lg:text-6xl mb-4">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, featuring modern web development projects 
            that combine beautiful design with robust functionality.
          </p>
        </div>
        
        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}
