<template>
    <header class="header">
        <RouterLink class="header__logo" :to="{name: 'home'}">
            <img src="@/assets/icons/logo.svg" alt="">
            Cinema <span>TS</span>
        </RouterLink>
        <Search/>
        <button-bordered>Log in</button-bordered>
        <button-fill>Sign up</button-fill>
    </header>
    <GenresList/>


</template>

<script setup>
import Search from "@/components/Search.vue";
import GenresList from "@/components/GenresList.vue";

</script>

<style scoped lang="scss">
    .header {
        align-items: center;
        display: flex;
        width: 100%;
        &__logo {
            align-items: center;
            display: flex;
            font-size: 2em;
            font-weight: 700;
            padding: .5em 0;
            text-transform: uppercase;
            img {
                display: block;
                margin-right: 10px;
                object-fit: contain;
                width: 40px;
            }
            span {
                margin-left: 5px;
                color: var(--main2);
            }
        }
    }
</style>