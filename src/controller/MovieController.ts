import { type IScope, Route } from '@koala-ts/framework';
import { createMovie, IMovieProps, recommendMovie } from '../application/movie';

export class MovieController {
    @Route({ method: 'POST', path: '/movies' })
    async store(scope: IScope) {
        scope.response.body = await createMovie(scope.request.body as IMovieProps);
        scope.response.status = 201;
    }

    @Route({ method: 'POST', path: '/movies:recommend' })
    async recommend(scope: IScope) {
        scope.response.body = await recommendMovie(scope.request.body as IMovieProps);
    }
}
