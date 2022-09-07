import {defineStore} from "pinia";
import key from './api-key'
import axios from "axios";

export const genresStore = defineStore({
    id: 'genres',
    state: () => ({
        genres: {
            movie: [],
            tv: []
        },
        click: false,
        genreType: 'movie',
    }),
    getters: {
        genreGenerate(): string[] {
            if(this.genreType === 'movie') {
                return [...this.genres.movie];
            } else {
                return [...this.genres.tv];
            }
        }
    },
    actions: {
        getGenres() {
            const movie = axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`);
            const tv =    axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${key}&language=en-US`);
            axios.all([movie, tv])
                .then(axios.spread((resMovie, resTv) => {
                    this.genres.movie = resMovie.data.genres;
                    this.genres.tv = resTv.data.genres;
                }))
                .catch((err) => {
                    console.log(err)
                });
        },

        genresClick(val: boolean) {
            this.click = val;
        },
    }
})