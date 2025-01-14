import { create } from '@koala-ts/framework';
import { appConfig } from './config/app';

const app = create(appConfig);

app.listen(3000);

console.log('Server is running on http://localhost:3000');
