<script setup lang="ts">
import Header from "@/components/Header.vue";
import MainMenu from "@/components/MainMenu.vue";
import Loading from "@/components/icons/Loading.vue";
import FirstLoader from "@/components/FirstLoader.vue";

import {loadingStore} from "@/stores/pageLoading";

loadingStore().setFirstLoad();

</script>

<template>
    <transition name="fade" mode="out-in">
        <FirstLoader v-if="!loadingStore().firstLoad"/>
    </transition>
    <div class="container">
        <Header/>
        <MainMenu/>
        <main>
            <Loading v-if="loadingStore().isLoading" />
            <router-view  v-slot="{ Component, route }">
                <Transition  name="scale" mode="out-in">
                    <component :key="route.name" :is="Component"></component>
                </Transition>
            </router-view>
        </main>
    </div>
</template>

<style lang="scss">
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .2s ease-in-out;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: .1;
    }


    main {
        width: 100%;
    }
    .scale-enter-active,
    .scale-leave-active {
        transition: all 300ms ease;
    }
    .scale-leave-to {
        opacity: 0;
        transform: scale(0.9);
    }
    .scale-enter-from {
        opacity: 0;
        transform: scale(1.1);
    }
    .scale-enter-to {
        opacity: 1;
    }
    .scale-leave-from {
        opacity: 1;
    }
</style>