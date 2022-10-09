<script setup lang="ts">
import ListItems from '@/components/ListItems.vue'
import {loadingStore} from "@/stores/pageLoading";
import {searchStore} from "@/stores/search";
import {useRoute} from "vue-router";
import {onUnmounted} from "vue";

const store     = searchStore();
const searching = useRoute().params.searchValue;

store.getSearchedItems( String(searching))

onUnmounted(() => {
    store.reset();
})
</script>
<template>
    <div v-if="!loadingStore().isLoading" :key="Date.now()">
        <h2>Results of "{{ store.title }}":</h2>
        <ListItems :items="store.resultFiltered" />
    </div>
</template>

<style scoped>
</style>