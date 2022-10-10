<script setup lang="ts">
const props = defineProps({
    item: Object,
    type: String
})

//const emit = defineEmits(['change', 'delete'])
const year = (date: number) => {
    return String(date).replace(/-.*/, '');
}
</script>

<template>
    <div v-if="item" class="card-item"
         @click="$router.push(`/${props.item.media_type || $route.params.type || props.type}/${props.item.id}`)">
        <div class="card-item__img">
            <img v-if="props.item.poster_path" :src="'https://www.themoviedb.org/t/p/w300_and_h450_face'+props.item.poster_path"
                 :alt="props.item.title || props.item.name">
            <img v-else class="placeholder" src="@/assets/img/img-placeholder.jpg" alt="">
        </div>
        <div class="card-item__info">
            <p class="card-item__title">{{ props.item.title || props.item.name }}</p>
            <span class="card-item__year">{{ year(props.item.release_date || props.item.first_air_date) }}</span>
        </div>
    </div>
</template>

<style  lang="scss">

.card-item {
    cursor: pointer;
    width: 15em;
    margin: 0 2em 3em 0;
    //perspective: 1000px;
    transform-style: flat;
    @media screen and (max-width: 992px) {
        width: 14em;
        margin: 0 .9em 3em 0;
        &:nth-child(3n) {
            margin-right: 0;
        }
    }
    @media screen and (max-width: 576px) {
        width: calc(50% - .5em);
        margin: 0 0 2em 0;
        &:nth-child(2n) {
            margin-right: 0;
        }
    }
    @media screen and (min-width: 1400px) {
        &:nth-child(5n) {
            margin-right: 0;
        }
    }
    &__img {
        background-color: rgb(16 16 16 / 50%);
        border-radius: .8em;
        height: 22em;
        overflow: hidden;
        position: relative;
        width: 100%;
        transition: transform .3s ease-in-out;
        //transform: rotateX(0deg);
        @media screen and (max-width: 576px) {
            height: 19em;
        }
        &:after {
            background:
                linear-gradient(to left, rgba(187, 187, 187, 0),
                rgba(247, 245, 245, 0.8),
                rgba(187, 187, 187, 0)) no-repeat -.7em 0%;
            content: '';
            height: 100%;
            left: 45px;
            opacity: .3;
            position: absolute;
            top: -230px;
            transform: rotate(-55deg);
            transition: all .3s ease;
            width: 100%;

        }
        &:before {
            content: '';
            width: 500px;
            height: 50%;
            position: absolute;
            left: -100px;
            top: -125px;
            background: linear-gradient(1deg, rgb(245, 245, 245) 0%, rgb(255, 255, 255) 20%, rgb(255, 255, 255) 20%, rgba(255, 255, 255, 0) 90%);
            transform: rotate(225deg);
            transition: all .3s ease;
            display: none;
        }
        &:hover {
            transform: perspective(750px) rotateX(7deg);
            &:after {
                opacity: .7;
                top: -180px;
            }
            &:before {
                top: -90px
            }
        }
        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
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
        @media screen and (max-width: 576px) {
            font-size: .9em;
        }

    }
    &__year {
        font-size: 0.9em;
    }
}
</style>