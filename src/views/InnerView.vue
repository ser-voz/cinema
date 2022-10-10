<script setup lang="ts">
import {useRoute} from "vue-router";
import {innerStore} from "@/stores/inner";
import {loadingStore} from "@/stores/pageLoading";
import {onMounted,onUpdated, ref} from "vue";

const id = String(useRoute().params.id);
const type = String(useRoute().params.type);
const store = innerStore();

store.setInfo(id, type);
//https://www.themoviedb.org/t/p/w300_and_h450_face

const videoPlay = ref(false);
const trailerPlay = () => {
    videoPlay.value = true;
}

const moreInfo = ref(false);
const showMore = () => {
    moreInfo.value ? moreInfo.value = false : moreInfo.value = true;
}
window.scrollTo(0, 0);

onMounted(() => {
    console.log('qq')
})
</script>

<template>
    <transition name="scale" mode="out-in">
        <div v-if="!loadingStore().isLoading">
        <ButtonBordered
            class="btn-back"
            @click="$router.back()">
            Back
        </ButtonBordered>
        <div class="info-header">
            <div class="img">
                <img v-if="store.item.poster_path" :src="'https://www.themoviedb.org/t/p/w300_and_h450_face'+store.item.poster_path" alt="">
                <img v-else class="placeholder" src="@/assets/img/img-placeholder.jpg" alt="">
            </div>
            <div class="info">
                <h1>{{ store.item.title || store.item.name }}</h1>
                <ul v-if="store.item.genres.length" class="genres">
                    <li v-for="genre in store.item.genres">
                        <RouterLink
                            :to="{path: `/genre/${genre.id}-${genre.name}/${type}`}"
                            :key="genre.id">
                            {{genre.name}}
                        </RouterLink>
                    </li>
                </ul>
                <div class="overview">
                    <p v-if="store.item.overview === ''">
                        No description
                    </p>
                    <div v-else>
                       <p :class="{'hidden': !moreInfo}">{{ store.item.overview}}</p>
                       <span @click="showMore" v-if="store.item.overview.length > 295">
                        <small v-if="moreInfo">less</small>
                        <small v-if="!moreInfo">...more</small>
                    </span>
                   </div>
                </div>
                <div class="actors">
                    <h3>Cast</h3>
                    <div>
                        <div class="actor" v-for="actor in store.item.credits.cast.slice(0, 24)">
                            <img v-if="actor.profile_path" :src="'https://www.themoviedb.org/t/p/w138_and_h175_face'+actor.profile_path" :title="actor.name" :alt="actor.name">
                            <img v-else src="https://orienteering.org.ua/wp-content/uploads/2019/12/person-placeholder-300x300-1.jpg" :title="actor.name" :alt="actor.name">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="info-footer">
            <div class="info-footer__text">
                <h2>Details</h2>
                <p><span>Status:</span> {{ store.item.status }}</p>
                <p><span>Tagline:</span> {{ store.item.tagline }}</p>
                <p v-if="store.item.budget"><span>Budget:</span> {{ store.item.budget }}$</p>
                <p><span>Rating:</span> {{ store.item.vote_average}}</p>
                <ul>
                    <li>Countries:</li>
                    <li v-for="(country, index) in store.item.production_countries"
                        :key="country.id">
                        {{ country.name }}<small v-if="store.item.production_countries.length !== index + 1">,</small>
                    </li>

                </ul>
                <ul class="companies">
                    <li>Companies:</li>
                    <li v-for="(company, index) in store.item.production_companies"
                        :key="company.id">
                        {{ company.name }}<small v-if="store.item.production_companies.length !== index + 1">,</small>
                    </li>

                </ul>
                <p v-if="store.item.revenue"><span>Revenue:</span> {{ store.item.revenue }}$</p>
                <p v-if="store.item.runtime"><span>Running time:</span> ~ {{ store.item?.runtime || store.item?.episode_run_time[0] }} min.</p>

                <ul>
                    <li>Original language:</li>
                    <li v-for="(lang, index) in store.item.spoken_languages"
                        :key="lang.iso_639_1">
                        {{ lang.name }}<small v-if="store.item.spoken_languages.length !== index + 1">,</small>
                    </li>
                </ul>
                <p><span>Release date:</span> {{ store.item.release_date || store.item.first_air_date }}</p>
                <a :href="store.item.homepage" target="_blank">Go to Homepage</a>
            </div>
            <div class="info-footer__video-wrap">
                <ul class="info-footer__video-type">
                    <li class="active">Trailer</li>
                </ul>
                <div class="info-footer__video">
                    <h2 v-if="!store.trailer">
                        Video not found
                    </h2>
                    <div @click="trailerPlay" class="info-footer__video-play" v-if="store.trailer && !videoPlay" :style="{ 'background-image': 'url(https://i3.ytimg.com/vi/'+store.trailer.key+'/maxresdefault.jpg)' }">
                    </div>
                    <iframe v-if="store.trailer && videoPlay" width="100%" :src="'https://www.youtube.com/embed/'+store.trailer.key+'?autoplay=1'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>



<style scoped lang="scss">
    p, ul {
        margin: 10px 0;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        li {
            margin-right: 8px;
            &:last-child {
                margin-right: 0;
            }
        }
    }
    .genres {
        margin-top: 0;
        li {
            padding: 5px 15px;
            border: 2px solid var(--main2);
            border-radius: 20px;
            background: rgba(0,0,0, .6);
        }
    }
    .info {
        display: flex;
        flex-direction: column;
        p {
            font-size: 1.2em;
            line-height: 1.4;
        }
        &-info {
            width: 100%;
        }
    }
    .actors {
        margin: auto 0 0 0;
        > div {
            display: flex;
            overflow: auto;
            scrollbar-width: thin;
            width: 100%;
            padding-bottom: 10px;
            &::-webkit-scrollbar {
                height: 5px;
            }
        }
        .actor {
            margin-right: 15px;
            max-width: 100px;
            &:last-child {
                margin-right: 0;
            }
            img {
                width: 100px;
                height: 135px;
                object-fit: cover;
                display: block;
                border-radius: 5px;
            }
            p {
                font-size: .7em;
                line-height: 1.2;
            }
            h5 {
                margin: 5px 0;
            }
        }
    }

    .btn-back {
        margin-bottom: 2em;
    }
    .info-header {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        padding: 20px 0;
        @media screen and (max-width: 576px) {
            flex-direction: column;
        }
        .img {
            border-radius: 0.8em;
            height: 450px;
            overflow: hidden;
            flex: 1 1;

            @media screen and (max-width: 576px) {
                margin: 0 auto 30px;
            }
            img {
                display: block;
                height: 100%;
                object-fit: cover;
                width: 100%;
            }
        }
        .info {
            width: 77%;
            padding-left: 30px;
        }
        h3 {
            margin-top: 20px;
            margin-bottom: 10px;
        }
        .overview {
            .hidden {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
            span {
                color: var(--main2);
                cursor: pointer;
            }
        }
    }
    .info-footer {
        display: flex;
        flex-wrap: wrap;
        margin: 50px 0;
        &__video-wrap {
            display: flex;
            flex-direction: column;
            flex: 1 1;
            padding-left: 30px;
            //border: 2px solid var(--main2);
        }
        &__video-type {
            background: rgba(0, 0, 0, 0.5);
            border-bottom: 2px solid var(--main2);
            margin: 0;
            width: 100%;
            li {
                //border-right: 2px solid var(--main2);
                cursor: pointer;
                padding: 10px 20px;
                &.active {
                    background: var(--main2);
                    color: var(--main);
                    text-shadow: none;
                    font-weight: 500;
                }
            }
        }
        &__video {
            background: #000;
            height: 558px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            h2 {
                text-transform: uppercase;
            }
            @media screen and (max-width: 1400px) {
                height: calc(var(--index) * 19);
            }

            iframe {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
            &-play {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                &:after {
                    content: '';
                    background: url("@/assets/icons/youtube-play.png") center no-repeat;
                    -webkit-background-size: contain;
                    background-size: contain;
                    position: absolute;
                    width: 100px;
                    height: 70px;
                    transition: all .2s ease-out;
                }
            }
        }
        &__text {
            width: 23%;
            ul {
                li {
                    margin-bottom: 5px;
                    &:first-child {
                        color: var(--main2)
                    }
                }
            }
        }
        span {
            color: var(--main2)
        }
    }
</style>