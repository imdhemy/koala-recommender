import { describe, expect, test } from 'vitest';
import { connectToDb, db } from './';

describe('connectToDb', () => {
    test('it should connect to mongo db', async () => {
        await connectToDb();

        const pong = await db.command({ ping: 1 });

        expect(pong.ok).toBe(1);
    });
});
