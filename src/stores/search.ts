import { defineStore } from 'pinia';
import key from './api-key'
import axios from "axios";
import {loadingStore} from "./pageLoading";

const defaultState: Search = {
    searchValue: '',
    searchDynamic: [],
    searchResult: [],
    status: false,
    page: 1,
    title: '',
}

export const searchStore = defineStore({
    id: 'search',
    state: () => defaultState,
    getters: {
        dynamicFiltered(): string[] {
            return [...this.searchDynamic]
                .filter(item => item['media_type'] !== 'person' ).slice(0, 5);
        },
        resultFiltered(): string[] {
            return [...this.searchResult].filter(item => item['media_type'] !== 'person');
        }
    },
    actions: {
        async search() {
            this.status = true;
            if(this.searchValue !== '' && this.searchValue.length > 1) {
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&page=1&include_adult=false&query=${this.searchValue}`);
                    this.searchDynamic = response.data.results;
                } catch (err) {
                    console.log(err)
                } finally {
                    this.status = false;
                }
            } else {
                this.searchDynamic = [];
                this.status = false;
            }
        },
        async getSearchedItems(searching: string) {
            this.title = searching;
            this.page = 1;
            try {
                loadingStore().getStatus(true);
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&page=${this.page}&include_adult=false&query=${searching}`);
                this.searchResult = response.data.results;
            } catch (err) {
                console.log(err)
            } finally {
                loadingStore().getStatus(false);
            }
        },
        reset() {
            this.searchResult = [];
        }
    }
})