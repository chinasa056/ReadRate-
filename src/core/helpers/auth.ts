import jwt from 'jsonwebtoken';
import { setting } from '../config/application';
import BadRequestError from '../errors/BadRequestError';
import { cacheExpiry, deleteCache, getCache, setCache } from '../utils/cache';

export const generateAccessJwtToken = (data: { userId: string; user_name: string; isAdmin: boolean }): string => {
  const token = jwt.sign(
    {
      id: data.userId,
      email: data.user_name,
      roleId: data.isAdmin
    },
    setting.jwt.secret,
    { expiresIn: setting.jwt.access_token_expires_in } as jwt.SignOptions
  );
  return token;
};

export const generateRefreshJwtToken = (data: { id: string }): string => {
  const token = jwt.sign(
    {
      id: data.id
    },
    setting.jwt.refresh_token_secret_key,
    { expiresIn: setting.jwt.refresh_token_expires_in } as jwt.SignOptions
  );
  return token;
};

export const verifyJwtAccessToken = (token: string): { id: string; email: string; isAdmin: boolean } => {
  try {
    const decoded = jwt.verify(token, setting.jwt.secret) as { id: string; email: string; isAdmin: boolean };
    return decoded;
  } catch (error) {
    throw new BadRequestError('Invalid token', null);
  }
};
export const verifyJwtRefreshToken = (token: string): { id: string } => {
  try {
    const decoded = jwt.verify(token, setting.jwt.secret) as { id: string };
    return decoded;
  } catch (error) {
    throw new BadRequestError('Invalid token', null);
  }
};

export const cacheRefreshToken = async (data: { userId: string; refreshToken: string }): Promise<void> => {
  const refreshTokenCacheKey = `USER_REFRESH_TOKEN:${data.userId}`;
  const refreshTokenExpiryInSeconds = Number(setting.jwt.refresh_token_expires_in);
  const refreshTokenData = JSON.stringify({ token: data.refreshToken });
  await setCache(refreshTokenCacheKey, refreshTokenData, refreshTokenExpiryInSeconds);
  await cacheExpiry(refreshTokenCacheKey, refreshTokenExpiryInSeconds);
}

export const isRefreshTokenValid = async (data: { userId: string; refreshToken: string }): Promise<boolean> => {
  const refreshTokenCacheKey = `USER_REFRESH_TOKEN:${data.userId}`;
  const cachedData = await getCache(refreshTokenCacheKey);
  if (!cachedData) return false;

  const { token } = JSON.parse(cachedData);
  if (token !== data.refreshToken) {
    return false;
  }

  return true;
}

export const clearCachedToken = async (userId: number): Promise<void> => {
  const accessTokenCacheKey = `USER_ACCESS_TOKEN:${userId}`;
  const refreshTokenCacheKey = `USER_REFRESH_TOKEN:${userId}`;
  await deleteCache(refreshTokenCacheKey);
  await deleteCache(accessTokenCacheKey);
}
