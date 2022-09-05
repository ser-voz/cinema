<template>
    <label class="radio-wrap" for="genre1">
        <input id="genre1" v-model="store.genreType" value="movie" checked name="genres" type="radio">
        <span class="text">Movies</span>
        <span class="circle"></span>
    </label>
</template>

<script>
export default {
    name: "RadioButton"
}
</script>

<style scoped>

</style>