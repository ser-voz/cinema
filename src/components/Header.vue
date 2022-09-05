<template>
    <header class="header">
        <RouterLink class="header__logo" :to="{name: 'home'}">
            <img src="@/assets/icons/logo.svg" alt="">
            Cinema <span>TS</span>
        </RouterLink>
        <div class="header__search">
            <button type="button" class="search-reset-btn" style="display: none;">
            </button>
            <button type="button" class="search-btn">
                <img src="@/assets/icons/search.svg" alt="">
            </button>
            <input type="text" autocomplete="off" placeholder="Search...">
        </div>
        <button-bordered>Log in</button-bordered>
        <button-fill>Sign up</button-fill>
    </header>
    <div class="genres">

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
        <div class="genres__wrap" ref="$genres__wrap">
            <RouterLink class="genres__item" v-for="genre in store.genreGenerate" :to="{path: `/genre/${genre.name}`}" :key="genre.id">
                {{ genre.name }}
            </RouterLink>
        </div>
        <span class="genres__next" @click="genresNext"></span>
    </div>
</template>

<script setup>
import {popularStore} from "@/stores/trands";
import {ref} from "vue";

const $genres__wrap = ref();

const store = popularStore();
store.getGenre();

const genresPrev = () => {
    store.genresClick(false);
    const genres = $genres__wrap.value;
    let scroll = genres.clientWidth * -1;
    genres.style.scrollBehavior = 'smooth';
    genres.scrollBy(scroll,0);
    genres.style.scrollBehavior = 'auto';
}

const genresNext = () => {
    console.log($genres__wrap);
    store.genresClick(true);
    const genres = $genres__wrap.value;
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
            background: rgba(98,98,98, .5);
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
        span {

        }
        &__item {
            padding: .7em;
            display: flex;
            align-items: center;
            text-align: center;
            cursor: pointer;
            margin-right: 1px;
            background: rgba(98,98,98, .5);
            transition: all .2s ease;
            &.router-link-active {
                background: var(--main2);
                color: initial;
            }
            &:hover {
                background: var(--main2);
                color: initial;
            }
        }
    }

    .header {
        align-items: center;
        display: flex;
        width: 100%;
        &__logo {
            align-items: center;
            display: flex;
            font-size: 2em;
            font-weight: 700;
            padding: .5em 0;
            text-transform: uppercase;
            img {
                display: block;
                margin-right: 10px;
                object-fit: contain;
                width: 40px;
            }
            span {
                margin-left: 5px;
                color: var(--main2);
            }
        }
        &__search {
            margin: 0 1em 0 auto;
            position: relative;
            width: clamp(10em, 25em, 30em);
            button {
                background: transparent;
                border: none;
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
                cursor: pointer;
                height: calc(100% - 4px);
                opacity: .7;
                position: absolute;
                right: 2px;
                top: 2px;
                width: 3em;
                z-index: 2;
                &:hover {
                    opacity: 1;
                    background: var(--main2);
                    img {
                        filter: invert(0);
                    }
                }
                img {
                    display: block;
                    object-fit: contain;
                    width: 1.5em;
                    margin-left: 3px;
                    transition: all .2s ease;
                    filter: invert(1);
                }

            }
            input {
                background: var(--dark-grey);
                height: 2.3em;
                padding-right: 3em;
                width: 100%;
            }
            &:hover {
                input {
                    opacity: 1;
                }
            }
        }

    }
</style>