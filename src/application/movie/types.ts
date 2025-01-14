export interface IMovieProps {
    title: string;
    genre: string[];
    plot: string;
    releaseDate: string;
}

export interface IMovie {
    id: string;
    title: string;
    genre: string[];
    plot: string;
    releaseDate: Date;
}
