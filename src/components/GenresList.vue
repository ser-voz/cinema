<script setup lang="ts">
import {genresStore} from "@/stores/genres";
import {ref} from "vue";

const genres__wrap = ref(null);
const store = genresStore();
store.getGenres();

const genresMove = (move: string) => {
    const genres: any  = genres__wrap.value;
    const valStep: any = (genres.scrollWidth / genres.clientWidth).toFixed(1)
    const scroll: number  = (genres.scrollWidth - genres.clientWidth) / valStep;
    genres.style.scrollBehavior = 'smooth';
    move === 'next' ? genres.scrollBy(scroll + 23,0) : genres.scrollBy(-scroll + 23,0);
    genres.style.scrollBehavior = 'auto';
}
</script>

<template>
    <div class="genres" >
        <div class="genres__switch">
            <label class="radio-wrap" for="genre1">
                <input id="genre1"
                       v-model="store.genreType"
                       value="movie"
                       checked name="genres"
                       type="radio">
                <span class="text">Movies</span>
                <span class="circle"></span>
            </label>
            <label class="radio-wrap" for="genre2">
                <input id="genre2"
                       v-model="store.genreType"
                       value="tv" name="genres"
                       type="radio">
                <span class="text">TV Shows</span>
                <span class="circle"></span>
            </label>
        </div>
        <span class="genres__prev"
              @click="genresMove('prev')">
        </span>
        <div class="genres__wrap" ref="genres__wrap">

            <RouterLink class="genres__item"
                        v-for="genre in store.genreGenerate"
                        :to="{path: `/genre/${genre.id}-${genre.name}/${store.genreType}`}"
                        :key="genre.id">
                {{ genre.name }}
            </RouterLink>
        </div>
        <span class="genres__next"
              @click="genresMove('next')">
        </span>
    </div>
</template>


<style scoped lang="scss">
.genres {
    display: flex;
    margin: 1em 0 3em;
    position: relative;
    width: 100%;

    @media screen and (max-width: 992px) {
        margin: 1em 0 2em;
    }
    @media screen and (max-width: 575px) {
        flex-wrap: wrap;
    }
    &__switch {
        align-items: center;
        background: rgba(98, 98, 98, .5);
        display: flex;
        justify-content: space-between;
        padding: .7em;
        white-space: nowrap;
        @media screen and (max-width: 575px) {
            justify-content: center;
            margin-bottom: 1px;
            width: 100%;
        }
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
        @media screen and (max-width: 575px) {
            display: none;
        }
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
        @media screen and (max-width: 575px) {
            display: none;
        }
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
            text-shadow: none;
        }
    }
}


</style>