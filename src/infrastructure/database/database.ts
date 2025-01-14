import { Db, MongoClient } from 'mongodb';
import * as process from 'node:process';

export let db: Db;

export async function connectToDb(): Promise<void> {
    const client: MongoClient = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
    db = client.db(process.env.MONGO_DB as string);
}
