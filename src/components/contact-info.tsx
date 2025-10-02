'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';
import type { SiteConfig } from '@/lib/types';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

interface ContactInfoProps {
  siteConfig: SiteConfig;
}

export function ContactInfo({ siteConfig }: ContactInfoProps) {
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: siteConfig.links.email,
      href: `mailto:${siteConfig.links.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: siteConfig.links.phone,
      href: `tel:${siteConfig.links.phone}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: siteConfig.links.location,
      href: '#',
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: siteConfig.links.linkedin,
    },
    {
      icon: Github,
      label: 'GitHub',
      href: siteConfig.links.github,
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="space-y-8"
    >
      {/* Contact Methods */}
      <motion.div variants={staggerItem}>
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-4">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div key={method.label} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{method.label}</p>
                      <p className="font-medium">{method.value}</p>
                    </div>
                    {method.href !== '#' && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={method.href}>
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Social Links */}
      <motion.div variants={staggerItem}>
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Connect With Me</h2>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button key={social.label} variant="outline" asChild>
                    <Link href={social.href} target="_blank" rel="noopener noreferrer">
                      <Icon className="mr-2 h-4 w-4" />
                      {social.label}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Response Time */}
      <motion.div variants={staggerItem}>
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Response Time</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">Usually responds within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm text-muted-foreground">Available for new projects</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
