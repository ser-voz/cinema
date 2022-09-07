import {defineStore} from "pinia";
import axios from 'axios';
import key from './api-key'
import {loadingStore} from "@/stores/pageLoading";

export const innerStore = defineStore({
    id: 'inner',
    state: () => ({
        item: {},
    }),
    actions: {
        async setInfo(id: string, type: string) {
            try {
                loadingStore().getStatus(true);
                const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${key}&language=en-US`);
                this.item = response.data;
            } catch (err) {
                console.log(err);
            } finally {
                loadingStore().getStatus(false);
            }
        },
    }
});