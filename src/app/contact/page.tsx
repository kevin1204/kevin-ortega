import { ContactForm } from '@/components/contact-form';
import { ContactInfo } from '@/components/contact-info';
import { getSiteConfig } from '@/lib/content';

export const metadata = {
  title: 'Contact - Kevin Ortega Rodriguez',
  description: 'Get in touch with Kevin Ortega Rodriguez for web development projects, consultations, or collaboration opportunities.',
};

export default async function Contact() {
  const siteConfig = await getSiteConfig();

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-display sm:text-5xl lg:text-6xl mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your next project? Let&apos;s discuss how I can help bring your ideas to life 
            with modern web development and design.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo siteConfig={siteConfig} />
        </div>
      </div>
    </div>
  );
}
