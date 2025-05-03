
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceCategoryProps {
  title: string;
  icon: LucideIcon;
  description?: string;
  children: ReactNode;
  className?: string;
  color?: string;
}

const ServiceCategory = ({ 
  title, 
  icon: Icon, 
  description, 
  children, 
  className,
  color = "text-accent"
}: ServiceCategoryProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg", color)}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-3">
        {children}
      </CardContent>
    </Card>
  );
};

export default ServiceCategory;
