import { DBService } from './DBService';

const connection = () => new DBService();

export { connection };
