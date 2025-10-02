import { CertificationsGrid } from '@/components/certifications-grid';
import { getCertifications } from '@/lib/content';

export const metadata = {
  title: 'Certifications - Kevin Ortega Rodriguez',
  description: 'View Kevin Ortega Rodriguez\'s professional certifications and credentials in web development, project management, and business.',
};

export default async function Certifications() {
  const certifications = await getCertifications();

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-display sm:text-5xl lg:text-6xl mb-4">
            Professional <span className="gradient-text">Certifications</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive collection of certifications demonstrating expertise in web development, 
            project management, and business leadership.
          </p>
        </div>
        
        <CertificationsGrid certifications={certifications} />
      </div>
    </div>
  );
}
