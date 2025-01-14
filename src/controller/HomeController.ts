import { type IScope, Route } from '@koala-ts/framework';

export class HomeController {
    @Route({ method: 'GET', path: '/' })
    index(scope: IScope): void {
        scope.response.body = 'KoalaTS: Effortlessly elegant, relentlessly efficient. 🎩🐨';
    }
}
