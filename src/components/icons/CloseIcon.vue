<template>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
         :width="size" :height="size"
         :style="{'fill':fill}"
         viewBox="0 0 22 22"
         xml:space="preserve">
        <path d="M3,0C2.7,0,2.5,0.1,2.3,0.3l-2,2c-0.4,0.4-0.4,1,0,1.4L7.6,11l-7.3,7.3c-0.4,0.4-0.4,1,0,1.4l2,2c0.4,0.4,1,0.4,1.4,0  l7.3-7.3l7.3,7.3c0.4,0.4,1,0.4,1.4,0l2-2c0.4-0.4,0.4-1,0-1.4L14.4,11l7.3-7.3c0.4-0.4,0.4-1,0-1.4l-2-2c-0.4-0.4-1-0.4-1.4,0  L11,7.6L3.7,0.3C3.5,0.1,3.3,0,3,0z"/>
    </svg>
</template>

<script setup>
const props = defineProps({
    size: {
        type: Number,
        default: 30,
        required: false
    },
    fill: {
        type: String,
        default: '#000000',
        required: false
    }
})
</script>

<style scoped>
    svg {
        display: block;
    }
</style>