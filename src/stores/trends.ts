import { defineStore } from 'pinia';
import key from './api-key'
import axios from "axios";
import {loadingStore} from "./pageLoading";



export const trendsStore = defineStore({
    id: 'trends',
    state: () => ({
        items: [],
        popularMovies: [],
        popularTV: [],
    } as Trends),
    actions: {
        async getTrends() {
            try {
                loadingStore().getStatus(true);
                const response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}&page=1`);
                this.items = response.data.results;
                await this.getPopularMovies();
                await this.getPopularTV();
            } catch (err) {
                console.log(err);
            } finally {
                loadingStore().setBanner(this.items[0]['backdrop_path']);
                loadingStore().getStatus(false);
            }
        },
        async getPopularMovies() {
            try {
                loadingStore().getStatus(true);
                const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=1`);
                this.popularMovies = response.data.results;
            } catch (err) {
                console.log(err);
            }
        },
        async getPopularTV() {
            try {
                loadingStore().getStatus(true);
                const response = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${key}&page=1`);
                this.popularTV = response.data.results;
            } catch (err) {
                console.log(err);
            }
        },
    },

})
