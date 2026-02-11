/**
 * Orders API – Vercel serverless function.
 * POST: Append order to data/store-data.json in the GitHub repo (so admin and all devices see it).
 * Requires env: GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO; optional GITHUB_BRANCH (default main).
 * CORS: Allow any origin so the storefront can POST from GitHub Pages or any domain.
 * Mobile-safe: explicit body handling, request logging, consistent JSON responses.
 */

const GITHUB_API = 'https://api.github.com';
const STORE_DATA_PATH = 'data/store-data.json';

function corsHeaders(origin) {
  const o = origin || '*';
  return {
    'Access-Control-Allow-Origin': o,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400'
  };
}

function setCors(res, origin) {
  Object.entries(corsHeaders(origin)).forEach(([k, v]) => res.setHeader(k, v));
}

async function getFile(owner, repo, path, branch, token) {
  const url = `${GITHUB_API}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;
  const res = await fetch(url, {
    headers: { 'Accept': 'application/vnd.github+json', 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub GET failed: ${res.status} ${err}`);
  }
  return res.json();
}

async function putFile(owner, repo, path, content, sha, branch, token, message) {
  const url = `${GITHUB_API}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${encodeURIComponent(path)}`;
  const body = {
    message: message || 'Add order via Orders API',
    content: Buffer.from(content, 'utf8').toString('base64'),
    branch
  };
  if (sha) body.sha = sha;
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Accept': 'application/vnd.github+json', 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub PUT failed: ${res.status} ${err}`);
  }
  return res.json();
}

/** Parse request body: Vercel may provide req.body as object or string. */
function parseBody(req) {
  const raw = req.body;
  if (raw === undefined || raw === null) {
    return null;
  }
  if (typeof raw === 'object' && raw !== null && !Array.isArray(raw)) {
    return raw;
  }
  if (typeof raw === 'string') {
    if (raw.trim() === '') return {};
    try {
      return JSON.parse(raw);
    } catch (e) {
      throw new Error('Invalid JSON body');
    }
  }
  throw new Error('Unsupported body type');
}

export default async function handler(req, res) {
  const origin = req.headers.origin || (req.headers.referer ? new URL(req.headers.referer || 'https://example.com').origin : '*');
  const userAgent = req.headers['user-agent'] || '(none)';

  if (req.method === 'OPTIONS') {
    setCors(res, origin);
    res.status(204);
    return res.end();
  }

  if (req.method !== 'POST') {
    setCors(res, origin);
    res.status(405).json({ error: 'Method not allowed', success: false });
    return;
  }

  console.log('[api/orders] POST request', { origin, userAgent: userAgent.slice(0, 80), contentType: req.headers['content-type'] });

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = (process.env.GITHUB_BRANCH || 'main').trim() || 'main';

  if (!token || !owner || !repo) {
    console.error('[api/orders] Missing env: GITHUB_TOKEN, GITHUB_OWNER, or GITHUB_REPO');
    setCors(res, origin);
    res.status(500).json({ error: 'Orders API not configured (missing env)', success: false });
    return;
  }

  let order;
  try {
    order = parseBody(req);
  } catch (e) {
    console.error('[api/orders] Body parse error', e.message);
    setCors(res, origin);
    res.status(400).json({ error: 'Invalid JSON body', success: false });
    return;
  }

  if (!order || typeof order !== 'object') {
    console.error('[api/orders] Empty or non-object body');
    setCors(res, origin);
    res.status(400).json({ error: 'Request body must be a JSON object', success: false });
    return;
  }

  if (!order.fullName && !order.phone) {
    console.error('[api/orders] Validation failed: missing fullName and phone');
    setCors(res, origin);
    res.status(400).json({ error: 'Order must include fullName and phone', success: false });
    return;
  }

  order.id = order.id || 'ord-' + Date.now();
  order.status = order.status || 'pending';
  console.log('[api/orders] Order accepted', { id: order.id, fullName: order.fullName, phone: order.phone });

  try {
    const file = await getFile(owner, repo, STORE_DATA_PATH, branch, token);
    const content = Buffer.from(file.content, 'base64').toString('utf8');
    const data = JSON.parse(content);
    if (!Array.isArray(data.orders)) data.orders = [];
    data.orders.unshift(order);
    const newContent = JSON.stringify(data, null, 2);
    await putFile(owner, repo, STORE_DATA_PATH, newContent, file.sha, branch, token, 'Add order ' + order.id);
    setCors(res, origin);
    res.status(200).json({ success: true, ok: true, id: order.id });
    console.log('[api/orders] Order saved', order.id);
  } catch (err) {
    console.error('[api/orders] Error saving order', err.message);
    setCors(res, origin);
    res.status(500).json({ error: 'Failed to save order', detail: err.message, success: false });
  }
}
