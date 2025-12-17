import { ReactNode } from 'react';

type BentoCardProps = {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export default function BentoCard({ title, children, icon, className = '', actions }: BentoCardProps) {
  return (
    <div className={`bento-card ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="bento-card-title mb-0">
          {icon && <span>{icon}</span>}
          {title}
        </h3>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      <div className="bento-card-content">
        {children}
      </div>
    </div>
  );
}
