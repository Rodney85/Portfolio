import { ReactNode } from 'react';

interface SocialLinkProps {
  href: string;
  icon: ReactNode;
  variant?: 'default' | 'ghost';
}

export function SocialLink({ href, icon, variant = 'default' }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        variant === 'default'
          ? "p-3 rounded-xl bg-custom-beige text-[#171738] hover:bg-custom-beige/90 transition-colors"
          : "p-2 rounded-full bg-custom-beige/10 text-custom-beige hover:bg-custom-beige/20 transition-colors"
      }
    >
      {icon}
    </a>
  );
}
