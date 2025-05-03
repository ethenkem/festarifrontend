import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'full' | 'icon' | 'text' | 'white-text';
  theme?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showOnLight?: boolean;
}

const Logo = ({ 
  variant = 'full', 
  theme = 'light', 
  className, 
  size = 'md',
  showOnLight = true 
}: LogoProps) => {
  // Hide based on theme and showOnLight prop
  const shouldHide = theme === 'light' && !showOnLight && variant === 'icon';
  if (shouldHide) {
    return null;
  }

  const getLogoSrc = () => {
    switch (variant) {
      case 'icon':
        return theme === 'light' ? '/logo-icon.png' : '/logo-icon-black.png';
      case 'text':
        return theme === 'light' 
          ? '/base_logo_transparent_background.png'
          : '/black_text-logoname_transparent_background.png';
      case 'white-text':
        return '/white-text.png'
      case 'full':
      default:
        return theme === 'light'
          ? '/base_logo_transparent_background.png'
          : '/black_text-logoname_transparent_background.png';
    }
  };

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  return (
    <img 
      src={getLogoSrc()}
      alt="Festari Logo"
      className={cn(
        'w-auto object-contain',
        sizeClasses[size],
        className
      )}
    />
  );
};

export default Logo;
