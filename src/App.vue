<script setup lang="ts">
import Header from "@/components/Header.vue";
import Loading from "@/components/icons/Loading.vue";
import FirstLoader from "@/components/FirstLoader.vue";
import Footer from "@/components/Footer.vue";

import {loadingStore} from "@/stores/pageLoading";
import  {watch, ref} from 'vue';

loadingStore().setFirstLoad();

const imgLoad = ref(false);

watch(() => loadingStore().banner, (image) => {
    if(image !== '' && image != null) {
        imgLoad.value = false
        const img = new Image();
        img.src = 'https://image.tmdb.org/t/p/original'+image;
        img.onload = () => imgLoad.value = true;
    } else {
        imgLoad.value = false;
    }
}, { immediate: true });

</script>

<template>
    <transition name="fade" mode="out-in">
        <FirstLoader v-if="!loadingStore().firstLoad"/>
    </transition>
    <transition name="fade" mode="out-in">
        <div class="banner"
             v-if="imgLoad"
             :key="loadingStore().banner"
             :style="{ 'background-image': 'url(https://image.tmdb.org/t/p/original' + loadingStore().banner + ')' }">
        </div>
    </transition>
    <div class="container">
        <Header/>
        <main>
            <Loading v-if="loadingStore().isLoading" />
            <RouterView  v-slot="{ Component, route }">
                <component :route="route" :key="route.params.id || route.name" :is="Component"></component>
            </RouterView>
        </main>
    </div>
    <Footer/>

</template>

<style lang="scss">
    .banner {
        height: 100vh;
        position: fixed;
        left: -10px;
        top: 0;
        width: 100vw;
        background-position: top;
        background-size: cover;
        background-repeat: no-repeat;
        z-index: -1;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.75);
        }
        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 40%;
            background:
                linear-gradient(to bottom,
                rgba(71,71,71,0) 0%,
                rgba(89,89,89,0) 0%,
                rgba(102,102,102,0) 15%,
                rgba(0,0,0,0) 0%,
                rgba(11,11,11,.9) 75%,
                rgba(15,15,15,1) 100%);
            //background-image: linear-gradient(0deg,#0f0f0f,transparent);
        }
    }
    main {
        width: 100%;
        min-height: 80vh;
    }
</style>