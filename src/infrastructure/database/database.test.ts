import { afterAll, describe, expect, test } from 'vitest';
import { client, connectToDb, db } from './';

describe('connectToDb', () => {
    afterAll(async () => {
        await client.close();
    });

    test('it should connect to mongo db', async () => {
        await connectToDb();

        const pong = await db.command({ ping: 1 });

        expect(pong.ok).toBe(1);
    });
});
