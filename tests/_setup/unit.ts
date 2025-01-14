import { connectToDb } from '../../src/infrastructure/database';
import { beforeEach } from 'vitest';

beforeEach(async () => {
    await connectToDb();
});
