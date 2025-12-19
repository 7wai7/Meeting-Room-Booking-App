export const LS = {
  USERS: "demo_users",
  SESSION: "demo_session", // імітація httpOnly cookie
  ROOMS: "demo_rooms"
};

export const read = <T>(k: string, fallback: T): T => {
  const raw = localStorage.getItem(k);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export const write = (k: string, v: unknown) =>
  localStorage.setItem(k, JSON.stringify(v));
