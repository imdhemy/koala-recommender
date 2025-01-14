import { HomeController } from '../controller/HomeController';
import { type IKoalaConfig } from '@koala-ts/framework';

export const appConfig: IKoalaConfig = {
    controllers: [
        HomeController,
    ]
};
