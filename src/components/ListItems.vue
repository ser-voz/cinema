<script setup lang="ts">
import ItemCard from "@/components/ItemCard.vue";

const props = defineProps({
    items: Array,
})
</script>

<template>
    <div v-if="items.length" class="list">
        <ItemCard v-for="item in props.items" :key="item.key" :item="item" />
    </div>
</template>

<style scoped lang="scss">

</style>