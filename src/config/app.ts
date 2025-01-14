import { HomeController } from '../controller/HomeController';
import { type IKoalaConfig } from '@koala-ts/framework';
import { MovieController } from '../controller/MovieController';

export const appConfig: IKoalaConfig = {
    controllers: [
        HomeController,
        MovieController,
    ]
};
