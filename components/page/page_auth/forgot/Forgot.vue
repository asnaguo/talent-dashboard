<template lang="pug">
.flex
    .flex
        //- ========================
        //- Form Forgot Password
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

            //- alert message
            transition(name='fade')
                .flex.mb-3(v-if='res.loginData.forgot_status !== 0')
                    //- alert gagal
                    .alert.alert-warning(
                        v-if='res.loginData.forgot_status === 1'
                    ).
                        {{res.loginData.msg}}

                    //- alert berhasil
                    .alert.alert-info(v-if='res.loginData.forgot_status === 2').
                        {{res.loginData.msg}}

            //- button login
            .flex
                b-button.px-4(block, variant='primary', @click='res.Reset')
                    //- loading spinner
                    IconLoading.spin.ml-1(
                        height='18',
                        width='18',
                        v-if='res.loginData.loading'
                    )
                    span(v-else) Reset Password

        //- button login
    .flex.py-1
        .divider-text atau
    .flex
        b-button.px-4(block, variant='light', to='/register') Daftar
    .flex
        .text-left.pt-3.text-sm
            | Lupa password?
            nuxt-link(to='/login', target='_self')
                span.pl-1.text-primary Login
</template>
<script>
import { BButton, BForm, BFormGroup, BFormInput } from 'bootstrap-vue'
import {
    defineComponent,
    onBeforeMount,
    reactive,
    useContext,
    computed,
} from '@nuxtjs/composition-api'
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
            loginData: computed(() => store.state.auth.forgot),

            // save form to pouch
            Change: (k, v) => {
                store.dispatch('auth/forgot/ChangeEmail', { k, v })
            },

            // request reset ke api
            Reset: () => {
                store.dispatch('auth/forgot/RequestPasswordReset').then((r) => {
                    // if true, redirect to dashboard
                })
            },
        })

        // load form before mounted
        onBeforeMount(() => {
            store.dispatch('auth/forgot/LoadForm')
        })

        // return
        return { res }
    },
})
</script>
