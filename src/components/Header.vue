<script setup>
import Search from "@/components/Search.vue";
import GenresList from "@/components/GenresList.vue";
import Modal from "@/components/Modal.vue";
import {ref} from "vue";

const showModal = ref(false);
const showModal2 = ref(false);

import {AuthenticationStore} from "@/stores/authentication";

const store = AuthenticationStore();

const signUp = () => {
    store.signUp();
    if(store.validate) showModal2.value = false;
}

const logIn = () => {
    store.logIn();
    if(store.validate) showModal.value = false;
}
</script>

<template>
    <header class="header">
        <RouterLink class="header__logo" :to="{name: 'home'}">
            <img src="@/assets/icons/logo.svg" alt="">
            Cinema <span>TS</span>
        </RouterLink>
        <Search/>
        <div v-if="!store.isAuth">
            <button-bordered @click="[showModal = true, logIn]">Log in</button-bordered>
            <button-fill @click="showModal2 = true">Sign up</button-fill>
        </div>
        <div v-else>
            Hello {{ store.name }}
        </div>
        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </header>
    <GenresList/>
    <Teleport to="body">
        <Modal :show="showModal" @close="showModal = false">
            <template #header>
                <h2>Log in</h2>
            </template>
            <template #body>
                <div class="form" :class="{'error': store.error}">
                    <input type="text" v-model="store.name" placeholder="Enter your name">
                    <input type="text" v-model="store.password" placeholder="Enter password">
                    <small>You can use name: user and password: 12345</small>
                    <ButtonFill @click="logIn">Submit</ButtonFill>
                </div>
            </template>
        </Modal>
    </Teleport>
    <Teleport to="body">
        <Modal class="sign" :show="showModal2" @close="showModal2 = false">
            <template #header>
                <h2>Sign up</h2>
            </template>
            <template #body>
                <div class="form" >
                    <input type="text" v-model="store.name" placeholder="Enter your name">
                    <input type="text" v-model="store.password" placeholder="Enter password">
                    <ButtonFill @click="signUp" type="submit">Submit</ButtonFill>
                </div>
            </template>
        </Modal>
    </Teleport>

</template>

<style scoped lang="scss">
    .modal-header {
        h2 {
            margin-bottom: 0;
        }
    }
    .form {
        small {
            display: inline-block;
            margin-bottom: 10px;
            text-align: center;
            width: 100%;
        }
        input {
            margin-bottom: 15px;
        }
        &.error {
            input {
                border-color: red;
            }
        }
        button {
            width: 100%;
        }
    }
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
            @media screen and (max-width: 575px) {
                font-size: 1.5em;
                padding: .2em 0;
                margin: 0 auto 0 0;
                img {
                    display: none;
                    margin-right: 5px;
                    width: 30px;

                }
            }
        }
        button {
            @media screen and (min-width: 767px) {
                &:nth-last-child(-n+2) {
                    margin-left: 1em;
                }
            }
            @media screen and (max-width: 991px) {
                &:nth-last-child(-n+2) {
                    margin-left: .5em;
                }
            }
        }
        @media screen and (max-width: 575px) {
            button {
                margin-right: 10px;
            }
            .hamburger {
                cursor: pointer;
                span {
                    width: 40px;
                    height: 4px;
                    background-color: var(--color-3);
                    display: block;
                    margin: 8px auto;
                    -webkit-transition: all 0.3s ease-in-out;
                    -o-transition: all 0.3s ease-in-out;
                    transition: all 0.3s ease-in-out;
                }
            }
        }
    }
</style>