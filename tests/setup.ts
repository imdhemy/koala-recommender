import { loadEnvConfig } from '@koala-ts/framework';
import { client, connectToDb } from '../src/infrastructure/database';

async function setup() {
    loadEnvConfig('test');
    await setupAtlasSearchIndex();
}

async function teardown() {
    await client.close();
}

async function setupAtlasSearchIndex() {
    await connectToDb();

    const collection = client.db(process.env.MONGODB_DB).collection('movies');
    await collection.insertOne({ tmp: 1 });
    await collection.createSearchIndex({
        name: 'default',
        definition: {
            'mappings': {
                'dynamic': true
            }
        }
    });
    await collection.deleteOne({ tmp: 1 });
}

export default async function () {
    await setup();
    return teardown;
}
