<script >
import Header from "@/components/Header.vue";
import MainMenu from "@/components/MainMenu.vue";
import Loading from "@/components/icons/Loading.vue";

export default  {
    components: {
        Header, MainMenu, Loading
    },
    data() {
        return {
            isLoading: false,
        }
    },
    methods: {
        loadingChange() {
            this.isLoading = false;
            if(this.isLoading === false) {
                setTimeout(() => {
                    this.isLoading = true;
                }, 500)
            }
        }
    },
    watch: {
        $route(arg) {
            if(this) {
                this.loadingChange();
            }
            //this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        },
    },
}
</script>

<template>
    <Header/>
    <MainMenu/>
    <main>
        <Loading v-if="!isLoading"/>
        <router-view  v-slot="{ Component, route }">
            <Transition  name="scale" mode="out-in">
                <div v-if="isLoading" :key="route.name">
                    <component :is="Component"></component>
                </div>
            </Transition>
        </router-view>
    </main>
</template>

<style lang="scss">
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