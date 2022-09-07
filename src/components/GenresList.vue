<template>
    <div class="genres" >
        <div class="genres__switch">
            <label class="radio-wrap" for="genre1">
                <input id="genre1" v-model="store.genreType" value="movie" checked name="genres" type="radio">
                <span class="text">Movies</span>
                <span class="circle"></span>
            </label>
            <label class="radio-wrap" for="genre2">
                <input id="genre2" v-model="store.genreType" value="tv" name="genres" type="radio">
                <span class="text">TV Shows</span>
                <span class="circle"></span>
            </label>
        </div>
        <span class="genres__prev" v-if="store.click" @click="genresPrev"></span>
        <div class="genres__wrap" ref="genres__wrap">
            <RouterLink class="genres__item"
                        v-for="genre in store.genreGenerate"
                        :to="{path: `/genre/${genre.id}-${genre.name}/${store.genreType}`}"
                        :key="genre.id">
                {{ genre.name }}
            </RouterLink>
        </div>
        <span class="genres__next" @click="genresNext"></span>
    </div>
</template>

<script setup>
import {genresStore} from "@/stores/genres";
import {ref} from "vue";

const genres__wrap = ref();
const store = genresStore();
store.getGenres();

const genresPrev = () => {
    store.genresClick(false);
    const genres = genres__wrap.value;
    let scroll = genres.clientWidth * -1;
    genres.style.scrollBehavior = 'smooth';
    genres.scrollBy(scroll,0);
    genres.style.scrollBehavior = 'auto';
}

const genresNext = () => {
    console.log(genres__wrap);
    store.genresClick(true);
    const genres = genres__wrap.value;
    let scroll = (genres.scrollWidth - genres.clientWidth) / 2;
    genres.style.scrollBehavior = 'smooth';
    genres.scrollBy(scroll,0);
    genres.style.scrollBehavior = 'auto';
}
</script>

<style scoped lang="scss">
.genres {
    display: flex;
    margin: 1em 0 3em;
    position: relative;
    width: 100%;

    &__switch {
        align-items: center;
        background: rgba(98, 98, 98, .5);
        display: flex;
        justify-content: space-between;
        padding: .7em;
        white-space: nowrap;

        .text {
            font-weight: 500;
            line-height: 1;
            margin-right: 5px;
            transition: all .2s ease;
        }

        label {
            &:first-child {
                margin-right: 10px;
            }
        }
    }
    &__next {
        background-color: var(--main2);
        background-image: url('@/assets/icons/right-arrow.svg');
        -webkit-background-size: contain;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% center;
        cursor: pointer;
        height: 100%;
        opacity: .5;
        padding: 0 0.7em;
        transition: opacity .2s ease;

        &:hover {
            opacity: 1;
        }
    }

    &__prev {
        background-color: var(--main2);
        background-image: url('@/assets/icons/right-arrow.svg');
        -webkit-background-size: contain;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% center;
        cursor: pointer;
        height: 100%;
        opacity: .5;
        padding: 0 0.7em;
        transform: scale(-1, 1);
        transition: opacity .2s ease;

        &:hover {
            opacity: 1;
        }
    }

    &__wrap {
        display: flex;
        overflow: auto;
        -ms-overflow-style: none; /* IE 11 */
        scrollbar-width: none;
        transition: all .2s ease;
        white-space: nowrap;
    }

    &__item {
        padding: .7em;
        display: flex;
        align-items: center;
        text-align: center;
        cursor: pointer;
        margin-right: 1px;
        background: rgba(98, 98, 98, .5);

        &.router-link-active {
            background: var(--main2);
            color: initial;
        }
    }
}
</style>