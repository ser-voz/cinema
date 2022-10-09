import {defineStore} from "pinia";

export const AuthenticationStore = defineStore({
    id: 'authentication',
    state:() => ({
        isAuth: false,
        name: '',
        password: '',
        users: [
            {name: 'user', password: '12345'}
        ],
        validate: false,
        error: false,
    }),
    actions: {
        logIn() {
            if(this.name === '' && this.password === '') return;
            this.users.map(item => {
                if(item.name === this.name && item.password === this.password) {
                    if(this.error) this.error = false;
                    this.validate = true;
                    this.isAuth = true;
                    return;
                } else {
                    this.error = true;
                    return;
                }
            })

        },
        signUp() {
            if(this.name === '' && this.password === '') return;
            const user = {
                name: this.name,
                password: this.password
            }
            this.users.push(user);
            this.validate = true;
            this.isAuth = true;
        },
    }
})