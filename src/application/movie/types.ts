interface CommonMovieProps {
    title: string;
    genre: string[];
    plot: string;
}

export interface IMovieProps extends CommonMovieProps {
    releaseDate: string;
}

export interface IMovie {
    id: string;
    releaseDate: Date;
}
