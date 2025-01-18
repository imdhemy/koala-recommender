import { IMovie, IMovieProps } from './types';
import { db } from '../../infrastructure/database';

export async function createMovie(props: IMovieProps): Promise<IMovie> {
    const doc: Partial<IMovie> = { ...props, releaseDate: new Date(props.releaseDate) };

    const result = await db.collection('movies').insertOne({ ...doc });
    doc.id = result.insertedId.toString();

    return doc as IMovie;
}
