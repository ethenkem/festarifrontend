
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ServiceGridProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

const ServiceGrid = ({ 
  title, 
  description, 
  children, 
  className,
  columns = 3
}: ServiceGridProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <div className={cn("py-8", className)}>
      {title && (
        <div className="mb-8 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-display font-bold mb-3">{title}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className={cn(
        "grid gap-6", 
        gridCols[columns]
      )}>
        {children}
      </div>
    </div>
  );
};

export default ServiceGrid;
