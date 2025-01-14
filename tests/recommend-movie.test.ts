import { beforeEach, describe, expect, test } from 'vitest';
import { ITestAgent, testAgent } from '@koala-ts/framework';
import { db } from '../src/infrastructure/database';
import { appConfig } from '../src/config/app';
import { createMovie, IMovie } from '../src/application/movie';
import { ObjectId } from 'mongodb';

describe('Recommend movie', () => {
    let agent: ITestAgent;

    beforeEach(async function () {
        agent = testAgent(appConfig);
    });

    test('it should recommend similar movies', async () => {
        const movie1: IMovie = await createMovie({
            title: 'Goodfellas',
            genre: ['Crime'],
            plot: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.',
            releaseDate: '1990-09-19',
        });

        const movie2: IMovie = await createMovie({
            title: 'Scarface',
            genre: ['Crime'],
            plot: 'In 1980 Miami, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.',
            releaseDate: '1983-12-09',
        });

        const movie3: IMovie = await createMovie({
            title: 'Casino',
            genre: ['Drama'],
            plot: 'A tale of greed, deception, money, power, and murder between two best friends who run a casino in Las Vegas.',
            releaseDate: '1995-11-22',
        });

        const movie4: IMovie = await createMovie({
            title: 'The Sopranos',
            genre: ['Drama'],
            plot: 'New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and business life.',
            releaseDate: '1999-01-10',
        });

        await refreshIndexFor([movie1.id, movie2.id, movie3.id, movie4.id]);

        const response = await agent.post('/movies:recommend').send({ genre: 'Crime' });

        expect(response.status).toBe(200);
        expect(response.body.length).not.toEqual(0);
    });
});

async function refreshIndexFor(movieIdList: string[]) {
    for (const movieId of movieIdList) {
        await untilIsIndexed(movieId);
    }
}

async function untilIsIndexed(movieId: string) {
    const moviesCollection = db.collection('movies');
    const pipeline = [
        {
            $search: {
                index: 'default',
                compound: {
                    must: [
                        {
                            in: {
                                path: '_id',
                                value: new ObjectId(movieId),
                            },
                        },
                    ],
                },
            },
        },
    ];

    while (true) {
        const result = await moviesCollection.aggregate(pipeline).toArray();
        if (result.length !== 0) {
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}
