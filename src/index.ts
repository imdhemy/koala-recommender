import { create } from '@koala-ts/framework';
import { appConfig } from './config/app';
import { connectToDb } from './infrastructure/database';

const app = create(appConfig);

await connectToDb();
app.listen(3000);

console.log('Server is running on http://localhost:3000');
