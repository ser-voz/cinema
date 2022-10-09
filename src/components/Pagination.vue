<script setup>
import {reactive} from "vue";

const props = defineProps({
    total: Number,
})

const list = reactive([]);
for(let i = 1; i <= props.total; i++) {
    list.push(i);
}


</script>

<template>
    <div class="pagination">
        <ul class="pagination__list">
            <li class="pagination__item" v-for="page in list.slice(0, 20)" @click="$emit('page', page)">
                {{ String(page) }}
            </li>
        </ul>
    </div>
</template>


<style scoped lang="scss">
.pagination {
    &__list {
        display: flex;
        overflow: hidden;
    }
    &__item {
        padding: 5px 10px;
        border: 1px solid var(--main2);
        margin: 0 2px;
        cursor: pointer;
    }
}
</style>