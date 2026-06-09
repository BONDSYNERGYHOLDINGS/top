// import "server-only";
import {
  getAllProperties as fetchAll,
  getPropertyById as fetchById,
  SheetProperty,
} from "@/lib/sheets";

let _cache: { data: SheetProperty[]; ts: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

export function bustCache() {
  _cache = null;
}

export async function getAllProperties(): Promise<SheetProperty[]> {
  if (_cache && Date.now() - _cache.ts < CACHE_TTL) return _cache.data;
  const data = await fetchAll();
  _cache = { data, ts: Date.now() };
  return data;
}

export async function getPropertyById(id: string): Promise<SheetProperty | undefined> {
  const all = await getAllProperties();
  return all.find(p => p.id === id);
}

export async function getFeaturedProperties(): Promise<SheetProperty[]> {
  const all = await getAllProperties();
  return all.filter(p => p.featured && p.status !== "sold");
}

export async function getPropertiesByType(type: SheetProperty["type"]): Promise<SheetProperty[]> {
  const all = await getAllProperties();
  return all.filter(p => p.type === type);
}