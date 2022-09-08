<script setup lang="ts">
import ListItems from '@/components/ListItems.vue'
import RightArrow from "@/components/icons/RightArrow.vue";
import LeftArrow from "@/components/icons/LeftArrow.vue";

import {trendsStore} from "@/stores/trends";
import {loadingStore} from "@/stores/pageLoading";

const store = trendsStore();
store.getTrends();

</script>

<template>
    <div v-if="!loadingStore().isLoading">
        <div class="title-nav">
            <h2>Trending</h2>
            <div class="paginate">
                <LeftArrow :class="{'disabled': store.page <= 1}"  @click="store.changePage('minus')" />
                <RightArrow :class="{'disabled': store.hasNextPage}"  @click="store.changePage('plus')" />
            </div>
        </div>
        <div class="top">
            <transition name="fade" mode="out-in">
                <ListItems :items="store.paginated" :key="store.page" />
            </transition>
        </div>
    </div>
</template>
<style scoped lang="scss">

.fade-enter-active,
.fade-leave-active {
    transition: opacity .4s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: .1;
}

.title-nav {
    align-items: flex-start;
    display: flex;
}

.paginate {
    display: flex;
    width: 100px;
    margin: 3px 0 0 auto;
    text-transform: uppercase;
    justify-content: flex-end;
    div {
        cursor: pointer;
        &:last-child {
            margin-left: 10px;
        }
    }
}
.top {
    .list {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
