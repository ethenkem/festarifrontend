export interface FounderExpertise {
  id: number;
  expertise: string;
  description: string;
  founder: number;
}

export interface FounderEducation {
  id: number;
  degree: string;
  institution: string;
  year: string;
  activities: string;
  founder: number;
}

export interface FounderProfile {
  id: number;
  name: string;
  title: string;
  bio: string;
  long_bio: string;
  profile_image: string;
  email: string;
  phone: string;
  mobile_phone: string;
  location: string;

  expertise: FounderExpertise[];
  experience: any[];  
  organizations: any[];
  certifications: any[];
  education: FounderEducation[];
  publications: any[];
  volunteer: any[];
}
