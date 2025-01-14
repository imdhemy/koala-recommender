import { type IScope, Route } from '@koala-ts/framework';
import { createMovie, IMovieProps } from '../application/movie';

export class MovieController {
    @Route({ method: 'POST', path: '/movies' })
    async store(scope: IScope) {
        scope.response.status = 201;

        scope.response.body = await createMovie(scope.request.body as IMovieProps);
    }
}
