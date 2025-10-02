import Link from 'next/link';
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { getSiteConfig } from '@/lib/content';

export async function Footer() {
  const siteConfig = await getSiteConfig();

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: siteConfig.links.linkedin,
      icon: Linkedin,
    },
    {
      name: 'GitHub',
      href: siteConfig.links.github,
      icon: Github,
    },
  ];

  const quickLinks = [
    { name: 'About', href: '/about' },
    { name: 'Timeline', href: '/timeline' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
    { name: 'WebLoft Studio', href: siteConfig.links.website, external: true },
  ];

  return (
    <footer className="bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
              >
                <Icon className="h-5 w-5" />
              </Link>
            );
          })}
        </div>
        
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex flex-col items-center space-y-4 md:items-start">
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">{siteConfig.name}</p>
              <p className="mt-1">{siteConfig.links.location}</p>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Link
                href={`mailto:${siteConfig.links.email}`}
                className="flex items-center space-x-1 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </Link>
              <Link
                href={`tel:${siteConfig.links.phone}`}
                className="flex items-center space-x-1 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>Call</span>
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 md:justify-start">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="mt-8 border-t border-border pt-8">
            <p className="text-center text-xs text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
