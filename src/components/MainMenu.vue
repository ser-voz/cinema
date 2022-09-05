<template>
    <div class="main-menu">
        <div class="logo">
            <RouterLink :to="{name: 'home'}">Cinema TS</RouterLink>
        </div>
        <ul class="main-menu__list">
            <li><RouterLink :to="{name: 'home'}">Home</RouterLink></li>
            <li><RouterLink :to="{name: 'about'}">Series</RouterLink></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "MainMenu"
}
</script>

<style scoped lang="scss">
    .main-menu {
        display: none;
        height: 100vh;

        padding: 1em 3em;

        .logo {
            align-items: center;
            display: flex;
            font-weight: 700;
            a {
                font-size: 2em;
                text-transform: uppercase;
            }
        }
        &__list {
            margin-top: 6em;
            a {
                font-size: 1.5em;
                font-weight: 500;
            }
            li {
                margin-top: 1em;
                &:first-child {
                    margin-top: 0;
                }
            }
        }
    }
</style>