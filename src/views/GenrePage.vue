<template>
    <ButtonBordered class="btn-back" @click="this.$router.back()">Back</ButtonBordered>
    <h1>{{ this.$route.params.name }}</h1>
    <p>sadasdasd</p>
</template>

<script>
export default {
    name: "GenrePage"
}
</script>

<style scoped>
    .btn-back {
        margin-bottom: 2em;
    }

</style>