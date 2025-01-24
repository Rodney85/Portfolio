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
          ? "p-3 rounded-xl bg-[#DDE2C6] text-[#171738] hover:bg-[#DDE2C6]/90 transition-colors"
          : "p-2 rounded-full bg-[#DDE2C6]/10 text-[#DDE2C6] hover:bg-[#DDE2C6]/20 transition-colors"
      }
    >
      {icon}
    </a>
  );
}
