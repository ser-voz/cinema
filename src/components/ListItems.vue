<script setup lang="ts">
import ItemCard from "@/components/ItemCard.vue";

const props = defineProps({
    items: {
        type: Array,
        required: false,
        default: [],
    },
    type: {
        type: String,
        required: false,
    }
})
</script>

<template>
    <div v-if="items.length" class="list">
        <ItemCard v-for="item in props.items" :key="item.id" :item="item" :type="props.type" />
    </div>
</template>

<style scoped lang="scss">
.list {
    display: flex;
    flex-wrap: wrap;
    @media screen and (max-width: 576px) {
        justify-content: space-between;
    }
    @media screen and (min-width: 577px) and (max-width: 992px) {
        justify-content: space-around;
    }
}
</style>