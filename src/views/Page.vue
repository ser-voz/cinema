<template>
    <ButtonBordered class="btn-back" @click="this.$router.back()">Back</ButtonBordered>
    <h1>{{this.$route.params.id}} - {{this.$route.params.type}}</h1>
    <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum debitis doloribus earum iste modi odit vitae voluptatum? Ab aperiam, asperiores assumenda consequatur dicta dolores, earum enim, error explicabo facere facilis harum impedit ipsa laboriosam minus mollitia obcaecati odit placeat rem saepe similique suscipit ullam! Aperiam atque doloremque libero nobis ratione.
    </div>
</template>

<script>

export default {
    name: "Page",
    mounted() {
        console.log(this.$route.params);
    }
}
</script>

<style scoped>
    .btn-back {
        margin-bottom: 2em;
    }
</style>