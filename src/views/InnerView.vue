<script setup lang="ts">
import {useRoute} from "vue-router";
import {innerStore} from "@/stores/inner";
import {loadingStore} from "@/stores/pageLoading";

const id = String(useRoute().params.id);
const type = String(useRoute().params.type);
const store = innerStore();

store.setInfo(id, type);

</script>

<template>
    <div v-if="!loadingStore().isLoading">
        <ButtonBordered class="btn-back" @click="this.$router.back()">Back</ButtonBordered>
        <div class="wrap">
            <div class="img">
                <img :src="'https://www.themoviedb.org/t/p/w300_and_h450_face'+store.item.poster_path" alt="">
            </div>
            <div class="info">
                <h2>{{ store.item.original_title || store.item.original_name }}</h2>
                <p>{{ store.item.tagline }}</p>
                <a :href="store.item.homepage" target="_blank">Go to Homepage</a>
                <p><span>Status:</span> {{ store.item.status }}</p>


                <p v-if="store.item.budget"><span>Budget:</span> {{ store.item.budget }}</p>
                <p><span>Rating:</span> {{ store.item.vote_average}}</p>
                <ul class="genres">
                    <li>Genres:</li>
                    <li v-for="genre in store.item.genres">
                        <RouterLink
                            :to="{path: `/genre/${genre.id}-${genre.name}/${type}`}"
                            :key="genre.id">
                            {{genre.name}}
                        </RouterLink>
                    </li>
                </ul>
                <ul>
                    <li>Countries:</li>
                    <li v-for="country in store.item.production_countries"
                        :key="country.id">
                        {{ country.name }}
                    </li>
                </ul>
                <ul>
                    <li>Companies:</li>
                    <li v-for="company in store.item.production_companies"
                        :key="company.id">
                        {{ company.name }}
                    </li>
                </ul>
                <p v-if="store.item.revenue"><span>Revenue:</span> {{ store.item.revenue }}</p>
                <p><span>Running time:</span> ~ {{ store.item.runtime || store.item.episode_run_time[0] }} min.</p>

                <ul>
                    <li>Original language:</li>
                    <li v-for="lang in store.item.spoken_languages"
                        :key="lang.iso_639_1">
                        {{ lang.name }}
                    </li>
                </ul>
                <p><span>Release date:</span> {{ store.item.release_date || store.item.first_air_date }}</p>

            </div>
           <div>
               <h3>Overview</h3>
               <p>{{ store.item.overview }}</p>
           </div>
        </div>

    </div>
</template>



<style scoped lang="scss">

    .btn-back {
        margin-bottom: 2em;
    }
    .wrap {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        padding: 20px 0;
        .img {
            border-radius: 0.8em;
            height: 450px;
            overflow: hidden;
            width: 300px;
            img {
                display: block;
                height: 100%;
                object-fit: contain;
                width: 100%;
            }
        }
        .info {
            width: calc(100% - 300px);
            padding-left: 30px;
        }
        ul {
            display: flex;
            flex-wrap: wrap;
            li {
                margin-right: 5px;
                &:first-child {
                    color: var(--main2)
                }
            }
        }
        h3 {
            margin-top: 20px;
            margin-bottom: 10px;
        }
        span {
            color: var(--main2)
        }
        p, ul {
            margin: 10px 0;
        }
    }
</style>