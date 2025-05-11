
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  color?: string;
  link?: string;
  className?: string;
  onClick?: () => void;
}

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  color = "bg-accent/10 text-accent", 
  link, 
  className,
  onClick
}: ServiceCardProps) => {
  const CardContent = () => (
    <div className={cn(
      "p-6 border rounded-lg transition-all duration-300 h-full flex flex-col",
      "hover:shadow-md group",
      className
    )}>

      <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{title}</h3>
      {description && (
        <p className="text-muted-foreground text-sm mt-2 flex-grow">{description}</p>
      )}
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="text-left w-full">
        <CardContent />
      </button>
    );
  }

  if (link) {
    return (
      <Link to={link} className="block h-full">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};

export default ServiceCard;
