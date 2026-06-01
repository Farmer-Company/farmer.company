import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const LOCAL_COMMODITY_INTERESTS_KEY = 'farmer-company-commodity-interests';

export type CommodityInterestIntent = 'sell' | 'buy' | 'monitor' | 'research';
export type CommodityInterestFeedStatus = 'pilot_validation' | 'queued';
export type CommodityInterestPersistence = 'firestore' | 'local';

export interface CommodityInterestInput {
 commodityName: string;
 commodityCode: string;
 state: string;
 district: string;
 intentType: CommodityInterestIntent;
 volumeBand: string;
 contactName: string;
 organization: string;
 email: string;
 phone: string;
 notes: string;
 source: 'prices_page';
 userId: string | null;
 feedStatus: CommodityInterestFeedStatus;
 pageUrl: string;
 referrer: string;
 userAgent: string;
 locale: string;
 timezone: string;
 screenSize: string;
}

export interface SavedCommodityInterest extends CommodityInterestInput {
 id: string;
 createdAt: string;
 status: 'ops_review';
 persistence: CommodityInterestPersistence;
 failureReason?: string;
}

const readLocalInterests = (): SavedCommodityInterest[] => {
 if (typeof window === 'undefined') {
 return [];
 }

 try {
 const raw = window.localStorage.getItem(LOCAL_COMMODITY_INTERESTS_KEY);
 if (!raw) {
 return [];
 }

 const parsed = JSON.parse(raw);
 return Array.isArray(parsed) ? parsed : [];
 } catch {
 return [];
 }
};

const writeLocalInterests = (interests: SavedCommodityInterest[]) => {
 if (typeof window === 'undefined') {
 return;
 }

 window.localStorage.setItem(
 LOCAL_COMMODITY_INTERESTS_KEY,
 JSON.stringify(interests)
 );
};

export const getSavedCommodityInterests = (): SavedCommodityInterest[] =>
 readLocalInterests();

export const createCommodityInterest = async (
 input: CommodityInterestInput
): Promise<SavedCommodityInterest> => {
 const createdAt = new Date().toISOString();
 const baseRecord = {
 ...input,
 createdAt,
 status: 'ops_review' as const,
 };

 try {
 const docRef = await addDoc(collection(db, 'commodity_interests'), {
 ...baseRecord,
 createdAt: serverTimestamp(),
 });

 const savedInterest: SavedCommodityInterest = {
 ...baseRecord,
 id: docRef.id,
 persistence: 'firestore',
 };

 writeLocalInterests([savedInterest, ...readLocalInterests()].slice(0, 50));
 return savedInterest;
 } catch (error) {
 const failureReason = error instanceof Error ? error.message : String(error);
 console.warn(
 'Commodity interest Firestore write failed; saving local fallback.',
 error
 );

 const savedInterest: SavedCommodityInterest = {
 ...baseRecord,
 id: `local-${Date.now()}`,
 persistence: 'local',
 failureReason,
 };

 writeLocalInterests([savedInterest, ...readLocalInterests()].slice(0, 50));
 return savedInterest;
 }
};
