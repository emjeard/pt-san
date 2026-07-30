import { neon } from "@neondatabase/serverless";

const CLIENT_COLUMNS = `
  id,
  name,
  logo_url,
  website_url,
  display_order,
  status,
  created_at,
  updated_at
`;

const getSql = (databaseUrl) => {
  if (!databaseUrl) {
    const error = new Error("DATABASE_URL is not configured");
    error.code = "DATABASE_NOT_CONFIGURED";
    throw error;
  }
  return neon(databaseUrl);
};

const isoTimestamp = (value) =>
  value instanceof Date ? value.toISOString() : value || undefined;

export const mapClientRow = (row) => ({
  id: row.id,
  name: row.name,
  logoUrl: row.logo_url,
  ...(row.website_url ? { websiteUrl: row.website_url } : {}),
  displayOrder: row.display_order,
  status: row.status,
  createdAt: isoTimestamp(row.created_at),
  updatedAt: isoTimestamp(row.updated_at),
});

export const listPublishedClients = async (databaseUrl) => {
  const sql = getSql(databaseUrl);
  const rows = await sql.query(
    `SELECT ${CLIENT_COLUMNS}
     FROM site_clients
     WHERE status = 'published'
     ORDER BY display_order ASC, name ASC`,
    [],
  );
  return rows.map(mapClientRow);
};

export const listAdminClients = async (databaseUrl) => {
  const sql = getSql(databaseUrl);
  const rows = await sql.query(
    `SELECT ${CLIENT_COLUMNS}
     FROM site_clients
     ORDER BY display_order ASC, name ASC`,
    [],
  );
  return rows.map(mapClientRow);
};

const clientParams = (client) => [
  client.id,
  client.name,
  client.logoUrl,
  client.websiteUrl || null,
  client.displayOrder,
  client.status,
];

export const createClient = async (databaseUrl, client) => {
  const sql = getSql(databaseUrl);
  const rows = await sql.query(
    `INSERT INTO site_clients (id, name, logo_url, website_url, display_order, status)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING ${CLIENT_COLUMNS}`,
    clientParams(client),
  );
  return mapClientRow(rows[0]);
};

export const updateClient = async (databaseUrl, id, client) => {
  const sql = getSql(databaseUrl);
  const rows = await sql.query(
    `UPDATE site_clients SET
       name = $2, logo_url = $3, website_url = $4, display_order = $5,
       status = $6, updated_at = NOW()
     WHERE id = $1
     RETURNING ${CLIENT_COLUMNS}`,
    clientParams({ ...client, id }),
  );
  return rows[0] ? mapClientRow(rows[0]) : null;
};

export const deleteClient = async (databaseUrl, id) => {
  const sql = getSql(databaseUrl);
  const rows = await sql.query(
    "DELETE FROM site_clients WHERE id = $1 RETURNING id",
    [id],
  );
  return Boolean(rows[0]);
};
