<script setup>
import LoadingSmall from "@/components/icons/LoadingSmall.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import {searchStore} from "@/stores/search";
import {useRouter} from "vue-router";
import {ref} from "vue";

const store = searchStore();
const router = useRouter();
const onFocus = ref(false);

const searchClick = () => {
    if(store.searchValue === '') return;
    onFocus.value = false;
    router.push({path: `/search/${store.searchValue}`})
    store.getSearchedItems(String(store.searchValue))
}
</script>

<template>
    <div class="header__search">
        <div v-if="onFocus && store.searchValue"
             class="header__search-overlay"
             @mousedown="onFocus = false">
        </div>
        <span class="clear-field"
              v-if="store.searchValue.length"
              @click="[store.searchValue = '', store.searchDynamic = [], onFocus = false]">
            <CloseIcon :size="15" :fill="'white'"/>
        </span>
        <button type="button"
                class="search-btn"
                @click="searchClick">
            <LoadingSmall v-if="store.status" />
            <img v-else src="@/assets/icons/search.svg" alt="">
        </button>
        <input type="text"
               v-model="store.searchValue"
               @input="store.search"
               @focus="onFocus = true"
               @keyup.enter="searchClick"
               autocomplete="off"
               placeholder="Search...">
        <div class="header__search-result"
             v-if="store.dynamicFiltered.length && onFocus">
            <span class="all-results"
                  @click="searchClick">
                All search results →
            </span>
            <div v-if="store.dynamicFiltered.length" >
                <div class="item"
                     v-for="item in store.dynamicFiltered"
                     @click="[$router.push(`/${item.media_type}/${item.id}`), onFocus = false]">
                    <div class="img skeleton-img">
                        <img v-if="item.poster_path && true"
                             :src="`https://www.themoviedb.org/t/p/w94_and_h141_bestv2/${item.poster_path}`" alt="">
                        <img v-else
                             src="@/assets/img/img-placeholder.jpg"
                             style="object-fit: cover" alt="">
                    </div>
                    <div>
                        <p class="title">
                            {{ item.title || item.name }}
                        </p>
                        <p v-if="item.overview"
                           class="overview">
                            {{ item.overview }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header {
    &__search {
        margin: 0 1em 0 auto;
        position: relative;
        width: clamp(10em, 25em, 30em);
        z-index: 99;
        @media screen and (max-width: 992px) {
            width: clamp(10em, 15em, 30em);
        }
        @media screen and (max-width: 575px) {
            display: none;
        }
        .clear-field {
            display: block;
            position: absolute;
            right: 50px;
            top: 10px;
            z-index: 1;
            opacity: .8;
            &:hover {
                opacity: 1;
                cursor: pointer;
            }
        }
        .all-results {
            text-shadow: none;
            color: var(--main2);
            font-weight: 500;
            text-decoration: underline;
            margin-bottom: 10px;
            display: inline-block;
            cursor: pointer;
        }
        &-overlay {
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            left: 0;
            top: 0;
            z-index: -1;
        }
        &-result {
            padding: 10px;
            background: #fff;
            color: #000;
            margin-top: -3px;
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
            z-index: -1;
            position: absolute;
            width: 100%;
            overflow: auto;
            max-height: 442px;
            > div {
                margin-bottom: 15px;
                &:last-child {
                    margin-bottom: 0;
                }
            }
            .item {
                display: flex;
                align-items: flex-start;
                margin-bottom: 10px;
                width: 100%;
                cursor: pointer;
                &:first-child {
                    margin-top: 5px;
                }
                &:last-child {
                    margin-bottom: 0;
                }
                &:hover {
                    background: rgba(0,0,0, .1);
                    transition: background .2s ease;
                }
                > div {
                    width: calc(100% - 72px);
                    padding: 5px;
                }
                .img {
                    height: 90px;
                    margin-right: 5px;
                    padding: 0;
                    width: 60px;
                    img {
                        height: 100%;
                        object-fit: contain;
                        width: 100%;
                    }

                }
                .title {
                    text-shadow: none;
                    font-weight: 600;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .overview {
                    color: var(--color-1);
                    font-size: .7em;
                    line-height: 1.15;
                    margin-top: 5px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    text-shadow: none;
                    font-weight: 500;
                }
            }
        }
        button {
            background: transparent;
            border: none;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            cursor: pointer;
            height: 2.45em;
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
            padding-right: 4em;
            width: 100%;
            z-index: 1;
        }

        &:hover {
            input {
                opacity: 1;
            }
        }
    }
}
</style>