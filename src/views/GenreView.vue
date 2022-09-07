<script setup lang="ts">
import {loadingStore} from "@/stores/pageLoading";
import {useRoute, useRouter} from "vue-router";

loadingStore().isLoading = false;

console.log(useRoute())
</script>

<template>
    <div v-if="!loadingStore().isLoading" :key="this.$route.params.name">
        <ButtonBordered class="btn-back" @click="this.$router.back()">Back</ButtonBordered>
        <h1>{{ this.$route.params.name }} - {{ this.$route.params.id }} : {{ this.$route.params.type }}</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci at aut beatae consequatur delectus deserunt dolore enim eum, exercitationem incidunt inventore ipsa laborum mollitia nostrum odit officiis optio, praesentium quas quis quos recusandae repudiandae sequi veritatis voluptate. Amet at culpa dolor eos minima, perferendis quisquam repellat reprehenderit veritatis voluptatibus!</p>
    </div>
</template>



<style scoped>
    .btn-back {
        margin-bottom: 2em;
    }

</style>