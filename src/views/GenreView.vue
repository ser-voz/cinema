<script setup lang="ts">
import {useRoute} from "vue-router";
import ListItems from '@/components/ListItems.vue'

import {genresStore} from "@/stores/genres";
import {loadingStore} from "@/stores/pageLoading";

const id = useRoute().params.id;
const type = useRoute().params.type;

const store = genresStore();
store.getItemsByGenre(id, type);

console.log('123')
</script>

<template>
    <div v-if="!loadingStore().isLoading" :key="id">
        <h2>{{ this.$route.params.name }}</h2>
        <transition name="fade" mode="out-in">
            <ListItems :items="store.genresList"  :key="id"/>
        </transition>
    </div>
</template>



<style scoped>



</style>