<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {genresStore} from "@/stores/genres";
import {loadingStore} from "@/stores/pageLoading";
import {ref} from 'vue';
import ListItems from '@/components/ListItems.vue'
import LoadingSmall from "@/components/icons/LoadingSmall.vue";


const router = useRouter();
const route  = useRoute();

const id: number    = Number(route.params.id);
const type: string  = String(route.params.type);
const name: string  = String(route.params.name);
const page: number  = Number(route.query.page);

const store = genresStore();

if(!page) {
    store.page = 1;
    store.getItemsByGenre(id, type);
}
if(page && id !== store.currentGenre) {
    store.pageLoad(page, id, type);
}


const status = ref(false)
const loadMore = () => {
    status.value = true;
    setTimeout(() => {
        store.getMore();
        router.push({ query: { page: store.page } })
    }, 200)
    setTimeout(() => {
        status.value= false;
    }, 600)
}

</script>

<template>
    <div v-if="!loadingStore().isLoading" :key="id">
        <h2>{{ name }}</h2>
        <ListItems :items="store.genresList"  :key="id"/>
        <div class="load-more" @click="loadMore">
            <span v-if="!status">Load more</span>
            <LoadingSmall v-else/>
        </div>
    </div>
</template>



<style  lang="scss">
.load-more {
    border: 2px solid var(--main2);
    border-radius: 15px;
    cursor: pointer;
    display: block;
    margin: 30px auto 50px;
    max-width: 200px;
    padding: 5px 10px;
    text-align: center;
    svg {
        height: 19px;
    }
}


</style>