<template>
    <button><slot></slot></button>
</template>

<script>
export default {
    name: "ButtonFill"
}
</script>

<style scoped lang="scss">
    button {
        background: var(--main2);
        border: 2px solid var(--main2);

        padding: .55em 1em;
        font-size: 1em;
        cursor: pointer;
        font-weight: 500;
        border-radius: 5px;
        transition: all .3s ease;
        &:last-child {
             margin-left: 1em;
         }
    }
</style>