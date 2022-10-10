import {defineStore} from "pinia";
import key from './api-key'
import axios from "axios";
import {loadingStore} from "@/stores/pageLoading";

export const genresStore = defineStore( {
    id: 'genres',
    state: () => ({
        genres: {
            movie: [],
            tv: []
        },
        genresList: [],
        page: 1,
        genreType: 'movie',
        currentGenre: 0,
        totalPages: 0,
        cache: [],
    } as GenresStore),
    getters: {
        genreGenerate(): string[] {
            if(this.genreType === 'movie') {
                return [...this.genres.movie];
            } else {
                return [...this.genres.tv];
            }
        },
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
        async getItemsByGenre(id: number, type: string) {
            if(!id || !type) return;
            this.currentGenre = id;
            try {
                loadingStore().getStatus(true);
                const response = await axios.get(`https://api.themoviedb.org/3/discover/${type}?api_key=${key}&with_genres=${id}&page=${this.page}`);
                this.totalPages = response.data.total_pages;
                this.genresList = response.data.results;
            } catch (err) {
                console.log(err);
            } finally {
                if(this.page === 1) {
                    loadingStore().getStatus(false);
                }
            }
        },
        getMore() {
            if(this.page + 1 > this.totalPages) return;
            this.page++;
            axios.get(`https://api.themoviedb.org/3/discover/${this.genreType}?api_key=${key}&with_genres=${this.currentGenre}&page=${this.page}`)
                .then(response => this.genresList = [...this.genresList, ...response.data.results])
                .catch(err => console.log(err))
        },
        async pageLoad(page: number, id: number, type: string) {
            if(!id || !type) return;
            await this.getItemsByGenre(id, type);
            for(let i=1; i < page; i++) {
                this.getMore();
            }
            loadingStore().getStatus(false);
        }
    }
})