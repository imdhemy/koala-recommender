import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { ITestAgent, testAgent } from '@koala-ts/framework';
import { appConfig } from '../src/config/app';
import { client, connectToDb, db } from '../src/infrastructure/database';

describe('Create movie', () => {
    let agent: ITestAgent;

    beforeAll(async function () {
        await connectToDb();
    });

    beforeEach(async function () {
        agent = testAgent(appConfig);
    });

    afterAll(async function () {
        await client.close();
    });

    test('it should create a movie', async () => {
        const attributes = {
            title: 'The Godfather',
            genre: ['Crime', 'Drama'],
            plot: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
            releaseDate: '1972-03-24',
        };

        const response = await agent.post('/movies').send(attributes);

        expect(response.status).toBe(201);
        const movie = await db.collection('movies').findOne({ title: 'The Godfather' });
        expect(movie).toBeDefined();
    });
});
