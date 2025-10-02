import { getSiteConfig } from '@/lib/content';

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Kevin Ortega Rodriguez',
          jobTitle: 'Full Stack Developer & Solutions Architect',
          description: 'I architect and build comprehensive digital solutions that drive business growth. Full Stack Developer, Technical Account Manager, and Founder & CEO of WebLoft Studio.',
          url: 'https://kevin-resume.vercel.app',
          image: 'https://kevin-resume.vercel.app/og-image.jpg',
          sameAs: [
            'https://www.linkedin.com/in/ksor/',
            'https://github.com/kevin1204',
          ],
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'London',
            addressRegion: 'Ontario',
            addressCountry: 'CA',
          },
          worksFor: {
            '@type': 'Organization',
            name: 'WebLoft Studio',
            url: 'https://webloftstudio.com',
          },
          hasOccupation: [
            {
              '@type': 'Occupation',
              name: 'Full Stack Developer',
              description: 'Develops both frontend and backend applications'
            },
            {
              '@type': 'Occupation',
              name: 'Solutions Architect',
              description: 'Designs comprehensive technical solutions for business problems'
            },
            {
              '@type': 'Occupation',
              name: 'Technical Account Manager',
              description: 'Manages technical client relationships and solution delivery'
            }
          ],
          alumniOf: [
            {
              '@type': 'EducationalOrganization',
              name: 'Fanshawe College',
            },
            {
              '@type': 'EducationalOrganization',
              name: 'University of El Salvador',
            },
          ],
        }),
      }}
    />
  );
}
