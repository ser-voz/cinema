<template>
    <div class="card-item" @click="$router.push(`/${props.item.media_type}/${props.item.id}`)">
        <div class="card-item__img">
            <img :src="'https://www.themoviedb.org/t/p/w300_and_h450_face'+props.item.poster_path" alt="">
        </div>
        <div class="card-item__info">
            <p class="card-item__title">{{ props.item.title || props.item.name }}</p>
            <span class="card-item__year">{{ year(props.item.release_date || props.item.first_air_date) }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    item: Object
})

//const emit = defineEmits(['change', 'delete'])
const year = (date: number) => {
    return String(date).replace(/-.*/, '');
}
</script>

<style scoped lang="scss">
.card-item {
    cursor: pointer;
    width: 15em;
    margin: 0 2em 3em 0;
    &:nth-child(5n) {
        margin-right: 0;
    }
    &__img {
        border: 3px solid transparent;
        border-radius: .8em;
        height: 22em;
        margin: -3px;
        overflow: hidden;
        width: 100%;
        transition: border-color .1s ease-in-out;
        &:hover {
            border-color: var(--light);
        }
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    &__info {
        margin-top: 1em;
    }
    &__title {
        display: -webkit-box;
        font-weight: 400;
        font-size: 1.1em;
        margin: .5em 0 .5em;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

    }
    &__year {
        font-size: 0.9em;
    }
}
</style>