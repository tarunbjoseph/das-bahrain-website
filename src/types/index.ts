export type Language = 'en' | 'ar';

export type ProductCategory = 
  | 'all'
  | 'alsi-cola'
  | 'energy-drinks'
  | 'beverages'
  | 'dry-food'
  | 'confectionery'
  | 'fresh-frozen'
  | 'non-food';

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  brand: string;
  brandAr: string;
  category: ProductCategory;
  categoryName: string;
  categoryNameAr: string;
  description: string;
  descriptionAr: string;
  singlePrice: number; // in BHD
  singleVolume: string; // e.g. "250ml Can"
  cartonPrice: number; // in BHD
  cartonUnits: number; // e.g. 24
  cartonLabel: string; // e.g. "Carton (24 x 250ml)"
  image: string;
  tag?: string;
  tagAr?: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured?: boolean;
  b2bAvailable?: boolean;
  volumeDiscounts?: {
    minCartons: number;
    discountPercent: number;
  }[];
  specifications: {
    origin: string;
    packaging: string;
    shelfLife: string;
  };
}

export type PackagingType = 'single' | 'carton';

export interface CartItem {
  id: string; // combination of productId + packagingType
  product: Product;
  packagingType: PackagingType;
  quantity: number;
  unitPrice: number;
}

export interface B2BInquiry {
  businessName: string;
  crNumber: string;
  contactPerson: string;
  phone: string;
  email: string;
  governorate: string;
  storeType: 'Cold Store / Bakala' | 'Supermarket' | 'Hypermarket' | 'Restaurant / Cafe' | 'Wholesaler / Distributor' | 'Other';
  productInterests: string[];
  estimatedWeeklyCartons: string;
  notes: string;
}

export interface CheckoutDetails {
  customerName: string;
  phoneNumber: string;
  email: string;
  governorate: string;
  block: string;
  road: string;
  building: string;
  notes: string;
  paymentMethod: 'whatsapp' | 'benefitpay' | 'cod' | 'card';
}
