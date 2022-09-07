<script setup lang="ts">
import {useRoute} from "vue-router";
import {innerStore} from "@/stores/inner";
import {loadingStore} from "@/stores/pageLoading";

const id = String(useRoute().params.id);
const type = String(useRoute().params.type);
const store = innerStore();

store.setInfo(id, type);

</script>


<template>
    <div v-if="!loadingStore().isLoading">
        <ButtonBordered class="btn-back" @click="this.$router.back()">Back</ButtonBordered>
        <h1>{{ store.item.original_title || store.item.original_name }} - {{ store.item.adult }}</h1>
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum debitis doloribus earum iste modi odit vitae voluptatum? Ab aperiam, asperiores assumenda consequatur dicta dolores, earum enim, error explicabo facere facilis harum impedit ipsa laboriosam minus mollitia obcaecati odit placeat rem saepe similique suscipit ullam! Aperiam atque doloremque libero nobis ratione.
        </div>
    </div>
</template>



<style scoped>
    .btn-back {
        margin-bottom: 2em;
    }
</style>