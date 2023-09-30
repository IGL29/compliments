import { v4 as uuid } from 'uuid';

const generateId = (): string => uuid();

export { generateId };
