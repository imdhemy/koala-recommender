import { IMovie, IMovieProps } from './types';
import { db } from '../../infrastructure/database';

export async function recommendMovie(props: Partial<IMovieProps>): Promise<IMovie[]> {
    const cursor = db.collection('movies').aggregate([
        { $search: { moreLikeThis: { like: props } } },
        { $limit: 5 },
        { $addFields: { score: { $meta: 'searchScore' } } }
    ]);

    const result: IMovie[] = [];
    for await (const movie of cursor) {
        result.push({ ...movie, id: movie._id.toString() } as IMovie);
    }

    return result;
}
