interface Component {name: string}

interface Items {name: string};

interface Item {
    title?: string,
    name?: string,
    status?: string,
}

interface GenresStore {
    genres: {
        movie: string[];
        tv: string[];
    },
    genresList: string[],
    page: number,
    genreType: string,
    currentGenre: number,
    totalPages: number,
    cache: string[],
}

interface ListOfType {
    items: string[],
    page: number,
    totalPages: number,
    type: string
}

interface Search {
    searchValue: string,
    searchDynamic: string[] | any,
    searchResult: string[] | any,
    status: boolean,
    page: number,
    title: string,
}

interface Trends {
    items: string[] | any,
    popularMovies: string[],
    popularTV: string[],
}