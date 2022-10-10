<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import {Navigation, Autoplay } from "swiper";
import ItemCard from "@/components/ItemCard.vue";
import RightArrow from "@/components/icons/RightArrow.vue";
import LeftArrow from "@/components/icons/LeftArrow.vue";
import 'swiper/css'
import 'swiper/css/navigation'

const modules = [Navigation, Autoplay];

defineProps({
    items: Array,
    title: String
})

const navigation = {
    nextEl: '.nextArrow',
    prevEl: '.prevArrow'
}
</script>

<template>
    <div class="slider">
        <div class="slider__tagline">
            <h2>{{ title }}</h2>
            <div class="slider__arrows">
                <LeftArrow class="prevArrow" />
                <RightArrow  class="nextArrow" />
            </div>
        </div>
        <div class="slider__wrap">
            <swiper
                :modules="modules"
                :slides-per-view="5"
                :loop="true"
                :autoplay="{
                  delay: 3000,
                  disableOnInteraction: true,
                }"
                :space-between="33"
                :navigation="navigation"
                @swiper="Swiper"
                @slideChange="SwiperSlide">
                <swiper-slide
                    v-for="item in items">
                    <ItemCard :item="item"/>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<style  lang="scss">
.slider {
    .swiper {
        &:hover {
            padding: 0 5px;
            margin: 0 -5px;
        }
    }
    &__tagline {
        align-items: flex-start;
        display: flex;
        justify-content: space-between;
    }
    &__arrows {
        display: flex;
        width: 100px;
        margin: 3px 0 0 auto;
        text-transform: uppercase;
        justify-content: flex-end;
        @media screen and (max-width: 575px) {
            width: 70px;
        }
        .swiper-button-disabled{
            opacity: .4;
            pointer-events: none;
        }
        div {
            cursor: pointer;
            &:last-child {
                margin-left: 10px;
            }
        }
    }


}

</style>