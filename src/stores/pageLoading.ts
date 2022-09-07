import {defineStore} from "pinia";

export const loadingStore = defineStore({
    id: 'loading',
    state: () => ({
        isLoading: true,
        firstLoad: false
    }),
    getters: {

    },
    actions: {
        getStatus(status: boolean) {
            this.isLoading = status;
        },
        setFirstLoad() {
            document.body.style.overflow = 'hidden';
            setTimeout(() => this.firstLoad = true, 2000);
            setTimeout(() => document.body.style.overflow = 'auto', 2100);
        }
    }
})