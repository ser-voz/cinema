<template>
    <div class="first-loader">
        <div class="slide">Cinema</div> <span>TS</span>
    </div>
</template>

<script>
export default {
    name: "FirstLoader"
}
</script>

<style scoped lang="scss">
.first-loader {
    align-items: center;
    background: var(--main);
    display: flex;
    font-size: 3em;
    font-weight: 700;
    height: 100%;
    justify-content: center;
    left: 0;
    position: fixed;
    text-transform: uppercase;
    top: 0;
    width: 100%;
    z-index: 999;
    span {
        animation: show .5s normal forwards .9s ease-in-out;
        color: var(--main2);
        opacity: 0;

    }
    .slide {
        animation: slide .8s normal forwards .1s ease-in-out;
        overflow: hidden;
        width: 0;
        opacity: 0;
    }
}
@keyframes slide {
    0% {
        width: 0;
        opacity: 0;
    }
    100% {
        width: 4.1em;
        opacity: 1;
    }
}

@keyframes show {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

</style>