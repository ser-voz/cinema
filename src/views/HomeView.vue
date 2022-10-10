<script setup lang="ts">
import {trendsStore} from "@/stores/trends";
import {loadingStore} from "@/stores/pageLoading";
import SwiperSlider from "@/components/SwiperSlider.vue";
import ListItems from '@/components/ListItems.vue'

const store = trendsStore();
store.getTrends();
</script>

<template>
    <div >
        <div v-if="!loadingStore().isLoading">
            <SwiperSlider :items="store.items"
                          :title="'Trending'"/>
            <div class="popular">
                <div class="popular__header">
                    <h2>
                        Popular Movies
                    </h2>
                    <RouterLink class="genres__item"
                                :to="{path: `/movie`}">
                        View more
                    </RouterLink>
                </div>
                <transition name="fade" mode="out-in">
                    <ListItems :items="store.popularMovies.slice(0, 5)" :type="'movie'" />
                </transition>
            </div>
            <div class="popular">
                <div class="popular__header">
                    <h2>Popular TV Shows</h2>
                    <RouterLink class="genres__item"
                                :to="{path: `/tv`}">
                        View more
                    </RouterLink>
                </div>
                <transition name="fade" mode="out-in">
                    <ListItems :items="store.popularTV.slice(0, 5)" :type="'tv'"/>
                </transition>
            </div>
        </div>
    </div>

</template>
<style scoped lang="scss">

.title-nav {
    align-items: flex-start;
    display: flex;
}

.popular__header {
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
    a {
        border: 2px solid var(--main2);
        border-radius: 20px;
        background: rgba(0, 0, 0, 0.6);
        margin-top: 5px;
        padding: 5px 15px;
        transition: all .2s ease;
        &:hover {
            background: var(--main2);
            color: var(--main);
        }
    }
}


</style>
