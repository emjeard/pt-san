export type ClientStatus = "draft" | "published";

export type SiteClient = {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  displayOrder: number;
};

export type AdminSiteClient = SiteClient & {
  status: ClientStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type SiteClientInput = SiteClient & {
  status: ClientStatus;
};

export class ClientApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ClientApiError";
    this.status = status;
  }
}

const requestClients = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`/api/blog${path}`, {
    credentials: "same-origin",
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...(init?.method && !["GET", "HEAD"].includes(init.method)
        ? { "X-Blog-Admin": "1" }
        : {}),
      ...init?.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ClientApiError(payload.error || "Permintaan klien gagal.", response.status);
  }
  return payload as T;
};

export const fetchPublishedClients = async (): Promise<SiteClient[]> => {
  const payload = await requestClients<{ clients: SiteClient[] }>("/clients");
  return payload.clients;
};

export const fetchAdminClients = async (): Promise<AdminSiteClient[]> => {
  const payload = await requestClients<{ clients: AdminSiteClient[] }>("/admin/clients");
  return payload.clients;
};

export const createSiteClient = async (client: SiteClientInput): Promise<AdminSiteClient> => {
  const payload = await requestClients<{ client: AdminSiteClient }>("/admin/clients", {
    method: "POST",
    body: JSON.stringify(client),
  });
  return payload.client;
};

export const updateSiteClient = async (
  id: string,
  client: SiteClientInput,
): Promise<AdminSiteClient> => {
  const payload = await requestClients<{ client: AdminSiteClient }>(
    `/admin/clients/${encodeURIComponent(id)}`,
    { method: "PUT", body: JSON.stringify(client) },
  );
  return payload.client;
};

export const deleteSiteClient = async (id: string): Promise<void> => {
  await requestClients(`/admin/clients/${encodeURIComponent(id)}`, { method: "DELETE" });
};
