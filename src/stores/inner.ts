import {defineStore} from "pinia";
import axios from 'axios';
import key from './api-key'
import {loadingStore} from "@/stores/pageLoading";

interface Inner {
    item: object | any,
    trailer: string
}
export const innerStore = defineStore({
    id: 'inner',
    state: () => ({
        item: {},
        trailer: ''
    } as Inner),
    actions: {
        async setInfo(id: string, type: string) {
            try {
                loadingStore().getStatus(true);
                const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${key}&language=en-US&append_to_response=videos,credits`);
                this.item = response.data;
                this.getVideo();
                this.trailer = response.data.videos.results.reverse().find((item: any) => item.type === this.trailer);
            } catch (err) {
                console.log(err);
            } finally {
                loadingStore().banner = this.item.backdrop_path;
                loadingStore().getStatus(false);
            }
        },
       getVideo() {
            if(this.item.videos.results.reverse().find(item => item.type === 'Trailer') ) {
                this.trailer = 'Trailer';
                return true;
            } else if(this.item.videos.results.reverse().find(item => item.type === 'Teaser')) {
                this.trailer = 'Teaser';
                return true;
            } else if(this.item.videos.results.reverse().find(item => item.type === 'Clip')) {
                this.trailer = 'Clip';
                return true;
            }
        }
    }
});