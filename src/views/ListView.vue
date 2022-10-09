<script setup lang="ts">
import {useRoute} from "vue-router";
import {listOfType} from "@/stores/listOfType";
import {loadingStore} from "@/stores/pageLoading";
import ListItems from '@/components/ListItems.vue'

const type: string = String(useRoute().params.type);

const store = listOfType();
store.getItemsByType(type);

window.scrollTo(0, 0);


</script>

<template>
    <div v-if="!loadingStore().isLoading">
        <h2>{{ type === 'movie' ? 'Movies' : 'TV Shows' }}</h2>
        <transition name="fade" mode="out-in">
            <ListItems :items="store.items" />
        </transition>
        <span class="load-more" v-if="store.items.length" v-intersection="store.loadMore">Load more</span>
    </div>
</template>

<style scoped lang="scss">
.load-more {
    border: 2px solid var(--main2);
    border-radius: 15px;
    cursor: pointer;
    display: block;
    margin: 30px auto 50px;
    max-width: 200px;
    padding: 5px 10px;
    text-align: center;
    opacity: 0;
    svg {
        height: 19px;
    }
}


</style>