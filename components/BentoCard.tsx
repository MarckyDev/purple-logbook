import { ReactNode } from 'react';

type BentoCardProps = {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export default function BentoCard({ title, children, icon, className = '' }: BentoCardProps) {
  return (
    <div className={`bento-card ${className}`}>
      <h3 className="bento-card-title">
        {icon && <span>{icon}</span>}
        {title}
      </h3>
      <div className="bento-card-content">
        {children}
      </div>
    </div>
  );
}
