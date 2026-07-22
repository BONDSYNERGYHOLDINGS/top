import "server-only";
import { google } from "googleapis";

export const SHEET_COLUMNS = [
  "id","title","price","priceRaw","location","state",
  "shortDesc","fullDesc","type","status",
  "bedrooms","bathrooms","area","yearBuilt",
  "features","images","featured",
  "agentName","agentPhone","agentWhatsapp",
  "instagramUrl",
];

export interface SheetProperty {
  id: string;
  title: string;
  price: string;
  priceRaw: number;
  location: string;
  state: string;
  shortDesc: string;
  fullDesc: string;
  type: "house" | "apartment" | "land" | "commercial";
  status: "for-sale" | "for-rent" | "sold";
  bedrooms?: string;
  bathrooms?: string;
  area?: string;
  yearBuilt?: string;
  features: string[];
  images: string[];
  featured: boolean;
  agent: { name: string; phone: string; whatsapp: string };
  instagramUrl?: string;
}

function getAuth() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!credentials) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON env var missing");
  return new google.auth.GoogleAuth({
    credentials: JSON.parse(credentials),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSheetId() {
  const id = process.env.GOOGLE_SHEET_ID;
  if (!id) throw new Error("GOOGLE_SHEET_ID env var missing");
  return id;
}

const RANGE_ALL = "Properties!A2:U";
const RANGE_HEADER = "Properties!A1:U1";

export function rowToProperty(row: string[]): SheetProperty {
  const [
    id, title, price, priceRaw, location, state,
    shortDesc, fullDesc, type, status,
    bedrooms, bathrooms, area, yearBuilt,
    featuresRaw, imagesRaw, featuredRaw,
    agentName, agentPhone, agentWhatsapp,
    instagramUrl,
  ] = row;
  return {
    id: id ?? "", title: title ?? "", price: price ?? "",
    priceRaw: Number(priceRaw ?? 0),
    location: location ?? "", state: state ?? "",
    shortDesc: shortDesc ?? "", fullDesc: fullDesc ?? "",
    type: (type ?? "land") as SheetProperty["type"],
    status: (status ?? "for-sale") as SheetProperty["status"],
    bedrooms: bedrooms || undefined,
    bathrooms: bathrooms || undefined,
    area: area || undefined,
    yearBuilt: yearBuilt || undefined,
    features: featuresRaw ? featuresRaw.split("|").map(f => f.trim()).filter(Boolean) : [],
    images: imagesRaw ? imagesRaw.split("|").map(i => i.trim()).filter(Boolean) : [],
    featured: featuredRaw === "TRUE" || featuredRaw === "true",
    agent: { name: agentName ?? "", phone: agentPhone ?? "", whatsapp: agentWhatsapp ?? "" },
    instagramUrl: instagramUrl || undefined,
  };
}

export function propertyToRow(p: SheetProperty): string[] {
  return [
    p.id, p.title, p.price, String(p.priceRaw),
    p.location, p.state, p.shortDesc, p.fullDesc,
    p.type, p.status,
    p.bedrooms ?? "", p.bathrooms ?? "", p.area ?? "", p.yearBuilt ?? "",
    (p.features ?? []).join("|"),
    (p.images ?? []).join("|"),
    p.featured ? "TRUE" : "FALSE",
    p.agent.name, p.agent.phone, p.agent.whatsapp,
    p.instagramUrl ?? "",
  ];
}

export async function getAllProperties(): Promise<SheetProperty[]> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: getSheetId(), range: RANGE_ALL });
  return (res.data.values ?? []).filter(row => row[0]).map(row => rowToProperty(row.map(String)));
}

export async function getPropertyById(id: string): Promise<SheetProperty | null> {
  const all = await getAllProperties();
  return all.find(p => p.id === id) ?? null;
}

export async function createProperty(data: SheetProperty): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: getSheetId(), range: "Properties!A:U",
    valueInputOption: "RAW",
    requestBody: { values: [propertyToRow(data)] },
  });
}

export async function updateProperty(id: string, data: SheetProperty): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const all = await getAllProperties();
  const idx = all.findIndex(p => p.id === id);
  if (idx === -1) throw new Error(`Property ${id} not found`);
  const rowNum = idx + 2;
  await sheets.spreadsheets.values.update({
    spreadsheetId: getSheetId(),
    range: `Properties!A${rowNum}:U${rowNum}`,
    valueInputOption: "RAW",
    requestBody: { values: [propertyToRow(data)] },
  });
}

export async function deleteProperty(id: string): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const meta = await sheets.spreadsheets.get({ spreadsheetId: getSheetId() });
  const sheet = meta.data.sheets?.find(s => s.properties?.title === "properties");


  // if (!sheet?.properties?.sheetId) throw new Error("Properties sheet not found");
  if (sheet?.properties?.sheetId === undefined || sheet?.properties?.sheetId === null) {
  throw new Error("Properties sheet not found");
}
  const all = await getAllProperties();
  const idx = all.findIndex(p => p.id === id);
  if (idx === -1) throw new Error(`Property ${id} not found`);
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: getSheetId(),
    requestBody: {
      requests: [{ deleteDimension: {
        range: { sheetId: sheet.properties.sheetId, dimension: "ROWS", startIndex: idx + 1, endIndex: idx + 2 },
      }}],
    },
  });
}

export async function ensureSheetHeaders(): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.update({
    spreadsheetId: getSheetId(), range: RANGE_HEADER,
    valueInputOption: "RAW",
    requestBody: { values: [SHEET_COLUMNS] },
  });
}

export async function bulkInsertProperties(properties: SheetProperty[]): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: getSheetId(), range: "Properties!A:U",
    valueInputOption: "RAW",
    requestBody: { values: properties.map(propertyToRow) },
  });
}