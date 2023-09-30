import { Token } from '~src/types/token';

export const getAuthHeader = (token: Token | null) => {
  return { Authorization: `Bearer ${token}` };
};
