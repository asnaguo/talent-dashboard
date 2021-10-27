<template lang="pug">
.flex
    .flex
        //- ========================
        //- Form Login
        //- ========================
        b-form(action='#')
            //- input email
            b-form-group(label='Email:', label-for='login_email')
                b-form-input#login_email(
                    type='email',
                    placeholder='Enter email',
                    :value='res.loginData.form.email',
                    @change='res.Change("email", $event)'
                )

            //- input password
            b-form-group(label='Password:', label-for='login_password')
                b-form-input#login_password(
                    type='password',
                    required,
                    :value='res.loginData.form.password',
                    @input='res.Change("password", $event)',
                    @keyup.enter='res.Login'
                )
                //- v-on:keyup="res.Login"

            //- alert message
            transition(name='fade')
                .flex.mb-3(v-if='res.loginData.login_status !== 0')
                    //- alert gagal
                    .alert.alert-warning(
                        v-if='res.loginData.login_status === 1'
                    ) login gagal. periksa email / password anda

                    //- alert berhasil
                    .alert.alert-info(v-if='res.loginData.login_status === 2') login berhasil, tunggu sebentar

            //- button login
            .flex
                b-button.px-4(block, variant='primary', @click='res.Login')
                    IconLoading.spin.ml-1(
                        height='18',
                        width='18',
                        v-if='res.loginData.loading'
                    )
                    span(v-else) Login

        //- button login
        .flex.py-1
            .divider-text atau
        .flex
            b-button.px-4(block, variant='light', to='/register') Daftar
        .flex
            .text-left.pt-3.text-sm
                | Lupa password?
                nuxt-link(to='/auth/forgot', target='_self')
                    span.pl-1.text-primary Reset
</template>
<script>
import {
    defineComponent,
    onBeforeMount,
    reactive,
    useContext,
    computed,
} from '@nuxtjs/composition-api'
import { BButton, BForm, BFormGroup, BFormInput } from 'bootstrap-vue'

export default defineComponent({
    Name: 'LoginBox',
    components: {
        BForm,
        BFormGroup,
        BFormInput,
        BButton,
    },
    setup() {
        const { store } = useContext()

        const res = reactive({
            loginData: computed(() => store.state.auth.login),

            // save form to pouch
            Change: (k, v) => {
                store
                    .dispatch('auth/login/SaveFormLogin', { k, v })
                    .then(() => {
                        // send log
                    })
            },

            // login ke dashboard
            Login: () => {
                store.dispatch('auth/login/Login').then((r) => {
                    // if true, redirect to dashboard
                    if (r) {
                        setTimeout(() => {
                            window.location.assign('/?auth=ok')
                        }, 1000)
                    }
                })
            },
        })

        // load form before mounted
        onBeforeMount(() => {
            store.dispatch('auth/login/LoadFormLogin').then(() => {
                // send log
            })
        })

        //
        return { res }
    },
})
</script>
