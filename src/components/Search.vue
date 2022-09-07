<template>
    <div class="header__search">
        <button type="button" class="search-btn">
            <img src="@/assets/icons/search.svg" alt="">
        </button>
        <input type="text" autocomplete="off" placeholder="Search...">
    </div>
</template>

<script>
export default {
    name: "Search"
}
</script>

<style scoped lang="scss">
    .header {
        &__search {
            margin: 0 1em 0 auto;
            position: relative;
            width: clamp(10em, 25em, 30em);

            button {
                background: transparent;
                border: none;
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
                cursor: pointer;
                height: calc(100% - 4px);
                opacity: .7;
                position: absolute;
                right: 2px;
                top: 2px;
                width: 3em;
                z-index: 2;

                &:hover {
                    opacity: 1;
                    background: var(--main2);

                    img {
                        filter: invert(0);
                    }
                }

                img {
                    display: block;
                    object-fit: contain;
                    width: 1.5em;
                    margin-left: 3px;
                    transition: all .2s ease;
                    filter: invert(1);
                }

            }

            input {
                background: var(--dark-grey);
                height: 2.3em;
                padding-right: 3em;
                width: 100%;
            }

            &:hover {
                input {
                    opacity: 1;
                }
            }
        }
    }
</style>