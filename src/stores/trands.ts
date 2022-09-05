import { defineStore } from 'pinia'

export const popularStore = defineStore({
    id: 'popular',
    state: () => ({
        count: 0,
        items: [],
        genres: {
            movie: [],
            tv: []
        },
        click: false,
        genreType: 'movie',
    }),
    getters: {
        genreGenerate(): any {
            if(this.genreType === 'movie') {
                return [...this.genres.movie];
            } else {
                return [...this.genres.tv];
            }
        }
    },
    actions: {
        getRes() {
            fetch('https://api.themoviedb.org/3/trending/all/day?api_key=0898e07ec04e4845b946f6fbd3ce1d0d')
                .then(response => response.json())
                .then(response => this.items = response.results)
                .catch(err => console.log(err))
        },
        getGenre() {
            fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=0898e07ec04e4845b946f6fbd3ce1d0d&language=en-US')
                .then(response => response.json())
                .then(response => this.genres.movie = response.genres)
                .catch(err => console.log(err));

            fetch('https://api.themoviedb.org/3/genre/tv/list?api_key=0898e07ec04e4845b946f6fbd3ce1d0d&language=en-US')
                .then(response => response.json())
                .then(response => this.genres.tv = response.genres)
                .catch(err => console.log(err));
        },
        getRating() {
            // fetch('https://imdb8.p.rapidapi.com/title/get-ratings?tconst=tt0944947', {
            //     headers: {
            //         'X-RapidAPI-Key': '2d0a0932b1msh87b55256c34e517p1472e4jsnb4c9c93827f3',
            //         'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            //     }
            // })
            //     .then(response => response.json())
            //     .then(response => console.log(response))
            //     .catch(err => console.error(err));

        },
        genresClick(val: boolean) {
            this.click = val;
        },
    },

})
