import { defineStore } from 'pinia';
import key from './api-key'
import axios from "axios";
import {loadingStore} from "./pageLoading";



export const trendsStore = defineStore({
    id: 'trends',
    state: () => ({
        items: [],
        page: 1,
        showItems: 10,
    }),
    getters: {
        paginationCount(): number {
            return Math.ceil(this.items.length / this.showItems);
        },
        startIndex(): number {
            return (this.page - 1) * this.showItems;
        },
        endIndex(): number {
            return this.page * this.showItems;
        },
        hasNextPage(): any {
            return (this.page + 1) > this.paginationCount;
        },
        paginated(): string[] {
            return [...this.items].slice(this.startIndex, this.endIndex);
        },
    },
    actions: {
        async getTrends() {
            try {
                loadingStore().getStatus(true);
                const response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}&page=1`);
                this.items = response.data.results;
            } catch (err) {
                console.log(err);
            } finally {
                loadingStore().getStatus(false);
            }
        },

        changePage(pageNum: string) {
            pageNum === 'plus' ? this.page += 1 : pageNum === 'minus' ? this.page -= 1 : this.page;
        },

        autoPage(): void {
            setInterval(() => {
                if(!this.hasNextPage) {
                    this.page++
                } else {
                    this.page = 1;
                }
            },8000);
        },
    },

})
