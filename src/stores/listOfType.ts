import {defineStore} from "pinia";
import {loadingStore} from "@/stores/pageLoading";
import axios from "axios";
import key from "@/stores/api-key";

export const listOfType = defineStore({
    id: 'listOfType',
    state: () => ({
        items: [],
        page: 1,
        totalPages: 0,
        type: '',
    } as ListOfType),
    actions: {
        async getItemsByType(type: string) {
            this.type = type;
            this.page = 1;
            try {
                loadingStore().getStatus(true);
                const response = await axios.get(`https://api.themoviedb.org/3/${type}/popular?api_key=${key}&language=en-US&page=${this.page}`);
                this.items = response.data.results;
                this.totalPages = response.data.total_pages;
            } catch (err) {
                console.log(err);
            } finally {
                loadingStore().getStatus(false);
            }
        },
        loadMore() {
            if(this.page + 1 > this.totalPages) return;
            this.page++;
            axios.get(`https://api.themoviedb.org/3/${this.type}/popular?api_key=${key}&language=en-US&page=${this.page}`)
                .then(response => this.items = [...this.items, ...response.data.results])
                .catch(err => console.log(err));
        }
    }
})