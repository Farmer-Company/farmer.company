import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const LOCAL_INTENTS_KEY = 'farmer-company-trade-intents';

export type TradeIntentType = 'buy' | 'sell';
export type TradeIntentPersistence = 'firestore' | 'local';

export interface TradeIntentInput {
 type: TradeIntentType;
 marketId: number;
 marketName: string;
 state: string;
 district: string;
 commodityName: string;
 quantityTonnes: number;
 contactName: string;
 phone: string;
 targetPrice?: number | null;
 notes?: string;
 source: 'market_page' | 'prices_page';
 userId?: string | null;
}

export interface SavedTradeIntent extends TradeIntentInput {
 id: string;
 createdAt: string;
 status: 'ops_review';
 persistence: TradeIntentPersistence;
 failureReason?: string;
}

const readLocalIntents = (): SavedTradeIntent[] => {
 if (typeof window === 'undefined') {
 return [];
 }

 try {
 const raw = window.localStorage.getItem(LOCAL_INTENTS_KEY);
 if (!raw) {
 return [];
 }

 const parsed = JSON.parse(raw);
 return Array.isArray(parsed) ? parsed : [];
 } catch {
 return [];
 }
};

const writeLocalIntents = (intents: SavedTradeIntent[]) => {
 if (typeof window === 'undefined') {
 return;
 }

 window.localStorage.setItem(LOCAL_INTENTS_KEY, JSON.stringify(intents));
};

export const getSavedTradeIntents = (): SavedTradeIntent[] => readLocalIntents();

export const createTradeIntent = async (
 input: TradeIntentInput
): Promise<SavedTradeIntent> => {
 const createdAt = new Date().toISOString();
 const baseRecord = {
 ...input,
 createdAt,
 status: 'ops_review' as const,
 };

 try {
 const docRef = await addDoc(collection(db, 'trade_intents'), {
  ...baseRecord,
  createdAt: serverTimestamp(),
  });

 const savedIntent: SavedTradeIntent = {
 ...baseRecord,
 id: docRef.id,
 persistence: 'firestore',
 };

 writeLocalIntents([savedIntent, ...readLocalIntents()].slice(0, 50));
 return savedIntent;
 } catch (error) {
  const failureReason = error instanceof Error ? error.message : String(error);
  console.warn('Trade intent Firestore write failed; saving local fallback.', error);
  const savedIntent: SavedTradeIntent = {
  ...baseRecord,
  id: `local-${Date.now()}`,
  persistence: 'local',
  failureReason,
  };

 writeLocalIntents([savedIntent, ...readLocalIntents()].slice(0, 50));
 return savedIntent;
 }
};
