import {defineStore} from "pinia";

export const loadingStore = defineStore({
    id: 'loading',
    state: () => ({
        isLoading: true,
        firstLoad: false,
        banner: '',
    }),
    getters: {

    },
    actions: {
        getStatus(status: boolean) {
            this.isLoading = status;
        },
        setFirstLoad() {
            //document.body.style.overflowY = 'hidden';
            document.body.classList.add('no-scroll');
            //setTimeout(() => document.body.style.overflowY = 'auto', 2100);
            setTimeout(() => document.body.classList.remove('no-scroll'), 2180);
            setTimeout(() => this.firstLoad = true, 2000);
        },
        setBanner(img: string) {
            this.banner === '' ? this.banner = img : '';
        }
    }
})