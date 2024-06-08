import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const getUsers = async () => {
  console.log('[DB] Query Users');
  const users = await prisma.user.findMany();
  console.log('[DB] Received Users', users);
  return users;
};

export const getUserByEmail = async (email: string) => {
  console.log('[DB] Query User By Email');
  const user = await prisma.user.findUnique({ where: { email } });
  console.log('[DB] Received User By Email', user);
  return user;
};

export const createUser = async (user: { name?: string; email: string; password?: string }) => {
  const hashedPassword = user.password ? await bcrypt.hash(user.password, 10) : undefined;
  const newUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      hashedPassword,
      role: 'USER',
    },
  });
  console.log('[DB] Created User', newUser);
  return newUser;
};

export const updateUser = async (id: string, updatedFields: Partial<{ name?: string; email?: string; password?: string }>) => {
  console.log('[DB] Updating User', id);
  const data = {
    ...updatedFields,
    hashedPassword: updatedFields.password ? await bcrypt.hash(updatedFields.password, 10) : undefined,
  };
  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });
  console.log('[DB] Updated User', updatedUser);
  return updatedUser;
};

export const deleteUser = async (id: string) => {
  console.log('[DB] Deleting User', id);
  const result = await prisma.user.delete({ where: { id } });
  console.log('[DB] Deleted User', result);
  return result;
};

export const getAccounts = async () => {
  console.log('[DB] Query Accounts');
  const accounts = await prisma.account.findMany();
  console.log('[DB] Received Accounts', accounts);
  return accounts;
};

export const getAccountByProvider = async (provider: string, providerAccountId: string) => {
  console.log('[DB] Query Account By Provider');
  const account = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: { provider, providerAccountId },
    },
  });
  console.log('[DB] Received Account By Provider', account);
  return account;
};

export const createAccount = async (account: { userId: string; type: string; provider: string; providerAccountId: string; refresh_token?: string; access_token?: string; expires_at?: number; token_type?: string; scope?: string; id_token?: string; session_state?: string }) => {
  const newAccount = await prisma.account.create({ data: account });
  console.log('[DB] Created Account', newAccount);
  return newAccount;
};

export const deleteAccount = async (id: string) => {
  console.log('[DB] Deleting Account', id);
  const result = await prisma.account.delete({ where: { id } });
  console.log('[DB] Deleted Account', result);
  return result;
};

export const updateAccount = async (id: string, updatedFields: Partial<{ refresh_token?: string; access_token?: string; expires_at?: number; token_type?: string; scope?: string; id_token?: string; session_state?: string }>) => {
  console.log('[DB] Updating Account', id);
  const updatedAccount = await prisma.account.update({
    where: { id },
    data: updatedFields,
  });
  console.log('[DB] Updated Account', updatedAccount);
  return updatedAccount;
};
