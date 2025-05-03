
import React from 'react';
import { ShoppingCart, Leaf, Bird, Tractor, Heart, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';
import { AgricultureProduct } from '@/types/agriculture';

interface ProductCardProps {
  product: AgricultureProduct;
  onInquiry: (productId: string) => void;
  onSave: (productId: string) => void;
  isSaved: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onInquiry, 
  onSave,
  isSaved
}) => {
  const navigate = useNavigate();

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Crops':
        return <Leaf size={16} />;
      case 'Livestock':
        return <Bird size={16} />;
      case 'Machinery':
        return <Tractor size={16} />;
      default:
        return <Leaf size={16} />;
    }
  };

  const handleViewDetails = () => {
    navigate(`/agriculture/product/${product.id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 group h-full flex flex-col">
      <div className="relative h-60 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 flex gap-1">
          <Badge className="bg-festari-accent text-white">
            <span className="flex items-center gap-1">
              {getCategoryIcon(product.category)}
              {product.category}
            </span>
          </Badge>
        </div>
        
        {/* Quick action buttons overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-white text-festari-900 hover:bg-festari-50"
                    onClick={handleViewDetails}
                  >
                    <ExternalLink size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="secondary"
                    size="icon"
                    className={`rounded-full ${isSaved ? 'bg-red-100 text-red-500' : 'bg-white text-festari-900 hover:bg-festari-50'}`}
                    onClick={() => onSave(product.id)}
                  >
                    <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isSaved ? 'Saved' : 'Save for Later'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-festari-900 group-hover:text-accent transition-colors">
            {product.title}
          </h3>
        </div>
        <p className="text-festari-600 mb-2">
          <span className="flex items-center gap-1">
            Location: {product.location}
          </span>
        </p>
        <p className="text-sm text-festari-500 mb-3">
          Quantity: {product.quantity}
        </p>
        <p className="text-sm text-festari-600 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-accent">{product.price}</span>
          <Button 
            onClick={() => onInquiry(product.id)}
            className="bg-festari-accent text-white hover:bg-festari-accent/90 flex items-center gap-1"
          >
            <ShoppingCart size={16} />
            Inquire
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
