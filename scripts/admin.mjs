#!/usr/bin/env node
import fs from "node:fs/promises";
import fssync from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";

const AUTH_JWT_SECRET = process.env.AUTH_JWT_SECRET;
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const REVOCATION_FILE = process.env.REVOCATION_FILE || path.join(process.cwd(), "storage", "revocations.json");
const DEFAULT_TTL = Number(process.env.DOC_SIGN_TTL_SECONDS || 300);

if (!AUTH_JWT_SECRET) {
  console.error("[ERR] AUTH_JWT_SECRET env var is required.");
  process.exit(1);
}

function hmacHex(data, key) {
  return crypto.createHmac("sha256", key).update(data).digest("hex");
}

async function ensureRevocationFile() {
  const dir = path.dirname(REVOCATION_FILE);
  await fs.mkdir(dir, { recursive: true });
  if (!fssync.existsSync(REVOCATION_FILE)) {
    const empty = { signatures: [], sessions: [] };
    await fs.writeFile(REVOCATION_FILE, JSON.stringify(empty, null, 2));
  }
}

async function readRevocations() {
  await ensureRevocationFile();
  const raw = await fs.readFile(REVOCATION_FILE, "utf8");
  try { return JSON.parse(raw); } catch { return { signatures: [], sessions: [] }; }
}

async function writeRevocations(data) {
  await ensureRevocationFile();
  await fs.writeFile(REVOCATION_FILE, JSON.stringify(data, null, 2));
}

function parseArgs(argv) {
  const [, , cmd, ...rest] = argv;
  const opts = {};
  for (let i = 0; i < rest.length; i++) {
    const k = rest[i];
    if (k.startsWith("--")) {
      const key = k.slice(2);
      const val = rest[i + 1] && !rest[i + 1].startsWith("--") ? rest[++i] : true;
      opts[key] = val;
    }
  }
  return { cmd, opts };
}

function out(obj) { console.log(JSON.stringify(obj, null, 2)); }

async function cmdHelp() {
  console.log(`Admin CLI

Commands:
  help
  sign-doc --docId DOC123 [--ttl 600]
  revoke-signature --docId DOC123 --sig <hex>
  revoke-session --jti <uuid>
  mint-session --email user@co.com --roles lender,partner [--days 1]
  verify-session --token <jwt>
  list-revocations --type signatures|sessions

Env:
  AUTH_JWT_SECRET (required)
  BASE_URL (default: ${BASE_URL})
  REVOCATION_FILE (default: ${REVOCATION_FILE})
  DOC_SIGN_TTL_SECONDS (default: ${DEFAULT_TTL})
`);
}

async function cmdSignDoc({ docId, ttl }) {
  if (!docId) { console.error("--docId required"); process.exit(1); }
  const expMs = Date.now() + (Number(ttl || DEFAULT_TTL) * 1000);
  const exp = String(expMs);
  const sig = hmacHex(`${docId}.${exp}`, AUTH_JWT_SECRET);
  const pathUrl = `/api/docs/${encodeURIComponent(docId)}/download?exp=${encodeURIComponent(exp)}&sig=${encodeURIComponent(sig)}`;
  const fullUrl = `${BASE_URL}${pathUrl}`;
  out({ docId, exp, sig, url: fullUrl, path: pathUrl });
}

async function cmdRevokeSignature({ docId, sig }) {
  if (!docId || !sig) { console.error("--docId and --sig required"); process.exit(1); }
  const data = await readRevocations();
  const key = `${docId}:${sig}`;
  if (!data.signatures.find((x) => x.key === key)) data.signatures.push({ key, revokedAt: Date.now() });
  await writeRevocations(data);
  out({ ok: true, revoked: key });
}

async function cmdRevokeSession({ jti }) {
  if (!jti) { console.error("--jti required"); process.exit(1); }
  const data = await readRevocations();
  if (!data.sessions.find((x) => x.jti === jti)) data.sessions.push({ jti, revokedAt: Date.now() });
  await writeRevocations(data);
  out({ ok: true, revoked: jti });
}

async function cmdMintSession({ email, roles, days }) {
  if (!email) { console.error("--email required"); process.exit(1); }
  const roleArr = typeof roles === "string"
    ? roles.split(",").map((r) => r.trim()).filter(Boolean)
    : ["lender"];
  const jti = crypto.randomUUID();
  const expiresIn = days ? `${Number(days) * 24}h` : "24h";
  const token = jwt.sign({ sub: email, email, roles: roleArr, jti }, AUTH_JWT_SECRET, { expiresIn });
  const setCookie = `gs_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${24 * 60 * 60}`;
  out({ email, roles: roleArr, jti, token, setCookie });
}

async function cmdVerifySession({ token }) {
  if (!token) { console.error("--token required"); process.exit(1); }
  try {
    const payload = jwt.verify(token, AUTH_JWT_SECRET);
    out({ valid: true, payload });
  } catch (e) {
    out({ valid: false, error: String((e && (e as any).message) || e) });
    process.exitCode = 1;
  }
}

async function cmdListRevocations({ type }) {
  const data = await readRevocations();
  if (type === "signatures") out(data.signatures);
  else if (type === "sessions") out(data.sessions);
  else out(data);
}

(async function main() {
  const { cmd, opts } = parseArgs(process.argv);
  switch (cmd) {
    case "help":
    case undefined: await cmdHelp(); break;
    case "sign-doc": await cmdSignDoc(opts); break;
    case "revoke-signature": await cmdRevokeSignature(opts); break;
    case "revoke-session": await cmdRevokeSession(opts); break;
    case "mint-session": await cmdMintSession(opts); break;
    case "verify-session": await cmdVerifySession(opts); break;
    case "list-revocations": await cmdListRevocations(opts); break;
    default:
      console.error(`[ERR] Unknown command: ${cmd}`);
      await cmdHelp();
      process.exit(1);
  }
})();
