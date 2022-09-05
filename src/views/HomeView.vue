<script setup lang="ts">
import {popularStore} from "@/stores/trands";
const store = popularStore();
store.getRes();
store.getGenre();

const year = (date: number) => {
    return String(date).replace(/\-.*/, '');
}
//release_date first_air_date
</script>

<template>
        <h2>Top Rated</h2>
        <div class="top">
            <div class="list">
                <div class="card-item" v-for="item in store.items.slice(0,5)" :key="item.key" @click="$router.push(`/${item.media_type}/${item.id}`)">
                    <div class="card-item__img">
                        <img :src="'https://www.themoviedb.org/t/p/w300_and_h450_face'+item.poster_path" alt="">
                    </div>
                    <div class="card-item__info">
                        <p class="card-item__title">{{ item.title || item.name }}</p>
                        <span class="card-item__year">{{ year(item.release_date || item.first_air_date) }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="trending">
            <div class="trending__list">

            </div>
        </div>

</template>
<style scoped lang="scss">
.bg {
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    transition: all .3s ease-in-out;
    opacity: 0;
}

.bg.hover {
    opacity: 1;
}

.top {
    .list {
        display: flex;
        flex-wrap: wrap;
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
    }
}


.swiper {
    width: 100%;
    height: 100%;
}


</style>
