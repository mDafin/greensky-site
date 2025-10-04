import fs from "node:fs/promises";
import path from "node:path";

type Revocations = {
  signatures: { key: string; revokedAt: number }[]; // key = `${docId}:${sig}`
  sessions: { jti: string; revokedAt: number }[];
};

const DEFAULT_PATH = path.join(process.cwd(), "storage", "revocations.json");

async function ensureFile() {
  const file = process.env.REVOCATION_FILE || DEFAULT_PATH;
  try {
    await fs.access(file);
  } catch {
    const empty: Revocations = { signatures: [], sessions: [] };
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(empty, null, 2));
  }
  return file;
}

async function readAll(): Promise<Revocations> {
  const file = await ensureFile();
  const raw = await fs.readFile(file, "utf8");
  try {
    return JSON.parse(raw) as Revocations;
  } catch {
    return { signatures: [], sessions: [] };
  }
}

async function writeAll(data: Revocations) {
  const file = await ensureFile();
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

export async function revokeSignature({ docId, sig }: { docId: string; sig: string }) {
  const data = await readAll();
  const key = `${docId}:${sig}`;
  if (!data.signatures.find((x) => x.key === key)) {
    data.signatures.push({ key, revokedAt: Date.now() });
    await writeAll(data);
  }
}

export async function isSignatureRevoked({ docId, sig }: { docId: string; sig: string }) {
  const data = await readAll();
  const key = `${docId}:${sig}`;
  return !!data.signatures.find((x) => x.key === key);
}

export async function revokeSessionJti(jti: string) {
  const data = await readAll();
  if (!data.sessions.find((x) => x.jti === jti)) {
    data.sessions.push({ jti, revokedAt: Date.now() });
    await writeAll(data);
  }
}

export async function isSessionRevoked(jti: string) {
  const data = await readAll();
  return !!data.sessions.find((x) => x.jti === jti);
}
