import { Db, MongoClient } from 'mongodb';
import * as process from 'node:process';

export let db: Db;
export let client: MongoClient;

export async function connectToDb(): Promise<void> {
    client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
    db = client.db(process.env.MONGODB_DB as string);
}
