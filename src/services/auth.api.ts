import type { AuthData } from "../types/AuthData";
import type { User, UserStorage } from "../types/User";
import { delay } from "../utils/delay";
import { LS, read, write } from "../utils/storage";
import { ValidationError } from "../utils/ValidationError";

export const registerApi = async (authData: AuthData) => {
  await delay();
  const users: UserStorage[] = read(LS.USERS, []);

  const ex = users.find((u) => u.email === authData.email.toLowerCase());
  if (ex) throw new ValidationError({ email: { message: "Email already exists" } });

  const user: UserStorage = {
    id: crypto.randomUUID(),
    ...authData,
  };

  write(LS.USERS, [...users, user]);
  write(LS.SESSION, { userId: user.id });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
};

export const loginApi = async (authData: AuthData): Promise<User> => {
  await delay();

  const users: UserStorage[] = read(LS.USERS, []);
  const user = users.find((u) => u.email === authData.email.toLowerCase());

  if (!user) throw new ValidationError({ email: { message: "User not found" } });

  if (user.password !== authData.password)
    throw new ValidationError({ password: { message: "Invalid password" } });

  write(LS.SESSION, { userId: user.id });

  return { id: user.id, email: user.email, name: user.name };
};

export const meApi = async (): Promise<User | null> => {
  await delay();

  const session = read<{ userId: string } | null>(LS.SESSION, null);
  if (!session) return null;

  const users: UserStorage[] = read(LS.USERS, []);
  const user = users.find((u) => u.id === session.userId);
  if (!user) return null;

  return { id: user.id, email: user.email, name: user.name };
};

export async function logoutApi() {
  write(LS.SESSION, null);
}
