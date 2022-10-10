<script setup>
import CloseIcon from "@/components/icons/CloseIcon.vue";

defineProps({
    show: Boolean
})
</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="modal" @mousedown="$emit('close')">
            <div class="modal-wrapper" @mousedown.stop>
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header"></slot>
                        <div class="modal-close">
                            <CloseIcon @mousedown="$emit('close')" :size="25" :fill="'white'"/>
                        </div>
                    </div>
                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>


<style lang="scss" scoped>
.modal {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;
    &-container {
        width: 500px;
        margin: 0 auto;
        padding: 30px 30px;
        background-color: var(--color-1);
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
        position: relative;
    }
    &-header {
        margin-bottom: 20px;
        text-align: center;
    }
    &-close {
        position: absolute;
        right: 15px;
        top: 15px;
        cursor: pointer;
        svg {
            display: block;
        }
    }
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>