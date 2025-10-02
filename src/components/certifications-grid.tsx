'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import type { Certification } from '@/lib/types';
import { fadeInUp, staggerContainer, staggerItem, hoverLift } from '@/lib/animations';
import { LoadingGrid } from '@/components/loading';

interface CertificationsGridProps {
  certifications: Certification[];
}

export function CertificationsGrid({ certifications }: CertificationsGridProps) {
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className="space-y-8">
      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {certifications.length} certifications
      </div>

      {/* Certifications Grid */}
      {isLoading ? (
        <LoadingGrid count={6} />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((certification) => (
          <motion.div key={certification.id} variants={staggerItem}>
            <Card className="group h-full transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {certification.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {certification.issuer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Issued {formatDate(certification.issuedOn)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {certification.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto">
                  <Button
                    asChild
                    className="w-full group/btn"
                    size="sm"
                  >
                    <a
                      href={certification.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      View Certificate
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        </motion.div>
      )}

    </div>
  );
}
