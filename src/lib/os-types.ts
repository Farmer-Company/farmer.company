export type UserRole = 'farmer' | 'vendor' | 'logistics' | 'government' | 'researcher' | 'admin';

export interface AppUser {
 uid: string;
 email: string;
 role: UserRole;
 fullName: string;
 language_pref?: string;
 region_state?: string;
 region_district?: string;
 profile_public?: boolean;
 verified?: boolean;
 reliabilityScore?: number;
 createdAt: string;
}

export interface FarmerProfile {
 userId: string;
 farm_name: string;
 land_area: number;
 soil_type?: string;
 irrigation_type?: string;
 certifications?: string[];
 gps?: { lat: number; lng: number };
 village: string;
 district: string;
 state: string;
 pincode: string;
}

export interface Listing {
 id: string;
 farmerId: string;
 skuId: string;
 quantity_tonnes: number;
 asking_price: number;
 suggested_price?: number;
 status: 'active' | 'sold' | 'expired' | 'cancelled';
 expiry_date: string;
 createdAt: string;
}

export interface Order {
 id: string;
 listingId: string;
 buyerId: string;
 sellerId: string;
 price_per_kg: number;
 quantity_tonnes: number;
 total_value: number;
 status: 'pending' | 'accepted' | 'shipped' | 'delivered' | 'cancelled' | 'disputed';
 paymentStatus: 'pending' | 'paid' | 'refunded';
 logisticsId?: string;
 createdAt: string;
}

export interface SKU {
 id: string;
 skuCode: string;
 commodityId: number;
 commodityName: string;
 variety: string;
 grade: string;
 seasonYear: number;
 seasonPeriod: 'Rabi' | 'Kharif' | 'Summer';
}

export interface ProductionRecord {
 id: string;
 farmerId: string;
 skuId: string;
 skuCode: string;
 quantity: number;
 yield: number;
 harvestDate: string;
 plantingDate?: string;
 carbonFootprint?: number;
}

export interface Forecast {
 id: string;
 marketId: number;
 commodityId: number;
 forecastDate: string;
 predictedPrice: number;
 accuracy: number;
}
