import { 
 db, 
 handleFirestoreError, 
 OperationType 
} from './firebase';
import { 
 doc, 
 setDoc, 
 getDoc, 
 collection, 
 addDoc, 
 query, 
 where, 
 getDocs,
 onSnapshot,
 Timestamp,
} from 'firebase/firestore';
import type { 
 AppUser, 
 FarmerProfile, 
 Listing, 
 Order,
 ProductionRecord,
 Forecast
} from './os-types';

// USERS
export const userService = {
 create: async (user: AppUser) => {
 try {
 await setDoc(doc(db, 'users', user.uid), {
 ...user,
 createdAt: Timestamp.now().toDate().toISOString()
 });
 } catch (error) {
 handleFirestoreError(error, OperationType.CREATE, `users/${user.uid}`);
 }
 },
 get: async (uid: string): Promise<AppUser | null> => {
 try {
 const snap = await getDoc(doc(db, 'users', uid));
 return snap.exists() ? snap.data() as AppUser : null;
 } catch (error) {
 handleFirestoreError(error, OperationType.GET, `users/${uid}`);
 return null;
 }
 }
};

// FARMERS
export const farmerService = {
 saveProfile: async (profile: FarmerProfile) => {
 try {
 await setDoc(doc(db, 'farmers', profile.userId), profile);
 } catch (error) {
 handleFirestoreError(error, OperationType.WRITE, `farmers/${profile.userId}`);
 }
 },
 getProfile: async (uid: string): Promise<FarmerProfile | null> => {
 try {
 const snap = await getDoc(doc(db, 'farmers', uid));
 return snap.exists() ? snap.data() as FarmerProfile : null;
 } catch (error) {
 handleFirestoreError(error, OperationType.GET, `farmers/${uid}`);
 return null;
 }
 }
};

// MARKETPLACE
export const marketplaceService = {
 createListing: async (listing: Omit<Listing, 'id' | 'createdAt'>) => {
 try {
 const docRef = await addDoc(collection(db, 'listings'), {
 ...listing,
 createdAt: Timestamp.now().toDate().toISOString()
 });
 return docRef.id;
 } catch (error) {
 handleFirestoreError(error, OperationType.CREATE, 'listings');
 }
 },
 getListings: async (): Promise<Listing[]> => {
 try {
 const q = query(
 collection(db, 'listings'), 
 where('status', '==', 'active')
 );
 const snapshot = await getDocs(q);
 return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Listing));
 } catch (error) {
 handleFirestoreError(error, OperationType.LIST, 'listings');
 return [];
 }
 },
 getActiveListings: (callback: (listings: Listing[]) => void) => {
 const q = query(
 collection(db, 'listings'), 
 where('status', '==', 'active')
 );
 return onSnapshot(q, (snapshot) => {
 const listings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Listing));
 callback(listings);
 }, (error) => {
 handleFirestoreError(error, OperationType.LIST, 'listings');
 });
 },
 createOrder: async (order: Omit<Order, 'id' | 'createdAt'>) => {
 try {
 const docRef = await addDoc(collection(db, 'orders'), {
 ...order,
 createdAt: Timestamp.now().toDate().toISOString()
 });
 return docRef.id;
 } catch (error) {
 handleFirestoreError(error, OperationType.CREATE, 'orders');
 }
 }
};

// FORECASTS
export const forecastService = {
 getLatest: (commodityId: number, callback: (forecasts: Forecast[]) => void) => {
 const q = query(
 collection(db, 'forecasts'),
 where('commodityId', '==', commodityId)
 );
 return onSnapshot(q, (snapshot) => {
 const forecasts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Forecast));
 callback(forecasts);
 }, (error) => {
 handleFirestoreError(error, OperationType.LIST, `forecasts?commodityId=${commodityId}`);
 });
 }
};

// PORTFOLIO
export const portfolioService = {
 getProductionHistory: (farmerId: string, callback: (records: ProductionRecord[]) => void) => {
 const q = query(
 collection(db, 'production_records'),
 where('farmerId', '==', farmerId)
 );
 return onSnapshot(q, (snapshot) => {
 const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProductionRecord));
 callback(records);
 }, (error) => {
 handleFirestoreError(error, OperationType.LIST, `production_records?farmerId=${farmerId}`);
 });
 }
};
