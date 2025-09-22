import { useState } from 'react';
import { X, Upload, MapPin, DollarSign, Home, FileText, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { BACKEND_URL } from '@/configs/constants';
import { useAuth } from '@/context/auth-context';

const PropertySubmissionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    type: '',
    features: '',
    description: '',
    image: null
  });
  const { userData } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      type: value
    }));
  };

  const handleImageChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create FormData object for file upload
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== '') {
        submitData.append(key, formData[key]);
      }
    });

    try {
      const res = await axios.post(`${BACKEND_URL}/v1/real-estates/my-listings/create/`, submitData, {
        headers: {
          Authorization: `Bearer ${userData.access}`
        }
      })
      console.log(res.data)
      // Reset form and close modal
      setFormData({
        title: '',
        price: '',
        location: '',
        type: '',
        features: '',
        description: '',
        image: null
      });
      setImagePreview(null);
      onClose();

      // Show success message (you can replace this with your toast system)
      alert('Property submitted successfully! It will be reviewed before being published.');
    } catch (error) {
      console.error('Error submitting property:', error);
      alert('Error submitting property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card className="bg-white shadow-2xl">
          <CardHeader className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
            <CardTitle className="text-2xl font-bold text-festari-900 font-display">
              Submit Your Property
            </CardTitle>
            <CardDescription>
              List your property on Festari. All submissions are reviewed before being published.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              {/* Property Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                  <Home size={16} className="text-festari-accent" />
                  Property Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Modern 3BR Apartment in Downtown"
                  required
                  className="focus:ring-festari-accent focus:border-festari-accent"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Upload size={16} className="text-festari-accent" />
                  Property Image *
                </Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragActive
                    ? 'border-festari-accent bg-festari-50'
                    : 'border-gray-300 hover:border-festari-accent'
                    }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {imagePreview ? (
                    <div className="space-y-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-32 w-auto rounded-lg object-cover"
                      />
                      <p className="text-sm text-green-600">Image selected successfully</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, image: null }));
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload size={40} className="mx-auto text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">
                          Drag and drop an image here, or{' '}
                          <label className="text-festari-accent hover:underline cursor-pointer">
                            browse files
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageChange(e.target.files[0])}
                            />
                          </label>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Supported formats: JPG, PNG, GIF (Max 5MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Price and Type Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium flex items-center gap-2">
                    <DollarSign size={16} className="text-festari-accent" />
                    Price *
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                    className="focus:ring-festari-accent focus:border-festari-accent"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Tag size={16} className="text-festari-accent" />
                    Listing Type *
                  </Label>
                  <Select value={formData.type} onValueChange={handleSelectChange} required>
                    <SelectTrigger className="focus:ring-festari-accent focus:border-festari-accent">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sale">For Sale</SelectItem>
                      <SelectItem value="Rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                  <MapPin size={16} className="text-festari-accent" />
                  Location *
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., 123 Main Street, Downtown, City"
                  required
                  className="focus:ring-festari-accent focus:border-festari-accent"
                />
              </div>

              {/* Features */}
              <div className="space-y-2">
                <Label htmlFor="features" className="text-sm font-medium">
                  Property Features
                </Label>
                <Input
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  placeholder="e.g., 3 bedrooms, 2 bathrooms, parking, balcony, gym"
                  className="focus:ring-festari-accent focus:border-festari-accent"
                />
                <p className="text-xs text-gray-500">
                  Separate features with commas
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
                  <FileText size={16} className="text-festari-accent" />
                  Property Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide a detailed description of your property, including unique features, nearby amenities, and any other relevant information..."
                  rows={4}
                  required
                  className="focus:ring-festari-accent focus:border-festari-accent resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.title || !formData.price || !formData.type || !formData.location || !formData.description}
                  className="bg-festari-accent hover:bg-festari-700 min-w-[120px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Submit Property'
                  )}
                </Button>
              </div>

              {/* Disclaimer */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong>Note:</strong> All property submissions are reviewed by our team before being published.
                  You will receive an email notification once your property is approved and live on the platform.
                  Please ensure all information is accurate and complete.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertySubmissionModal;
