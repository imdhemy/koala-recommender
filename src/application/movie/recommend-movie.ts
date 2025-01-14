import { IMovie, IMovieProps } from './types';
import { db } from '../../infrastructure/database';

export async function recommendMovie(props: Partial<IMovieProps>): Promise<IMovie[]> {
    const aggCursor = db.collection('movies').aggregate([
        {
            $search: {
                moreLikeThis: {
                    like: props,
                }
            }
        },
        {
            $limit: 5
        },
        {
            $addFields: {
                score: { $meta: 'searchScore' }
            }
        }
    ]);
    const result = new Set<IMovie>();

    for await (const movie of aggCursor) {
        movie.id = movie._id.toString();
        delete movie._id;
        result.add(movie as IMovie);
    }

    return Array.from(result);
}
