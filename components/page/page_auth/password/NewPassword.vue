<template lang="pug">
.flex
    //- ========================
    //- Form Login
    //- ========================
    client-only
        //- input password 1
        b-form-group(label='Password:', label-for='login_password1')
            b-form-input#login_password1(
                type='password',
                required,
                v-model='res.password1',
                v-debounce:600ms='res.CekPass1'
            )

        //- input password 2
        b-form-group(label='Konfirmasi Password:', label-for='login_password2')
            b-form-input#login_password2(
                type='password',
                required,
                v-model='res.password2',
                @keyup.enter='res.ResetPassword',
                v-debounce:600ms='res.CekPass2'
            )

        //- alert message
        transition(name='fade')
            .flex.mb-3(v-if='res.msg !== ""')
                .alert.alert-info {{ res.msg }}

        //- button login
        .flex
            b-button.px-4(block, variant='primary', @click='res.ResetPassword')
                IconLoading.spin.ml-1(
                    height='18',
                    width='18',
                    v-if='res.loading'
                )
                span(v-else) Reset Password
</template>
<script>
import {
    defineComponent,
    onBeforeMount,
    reactive,
    useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
    Name: 'LoginBox',
    components: {},
    setup() {
        const { $axios, route } = useContext()
        const res = reactive({
            loading: false,
            password1: '',
            password2: '',
            ok: null,
            msg: '',
            CekPass1: () => {
                if (res.password1.length <= 6) {
                    res.msg = 'password minimal 6 karakter'
                } else {
                    res.msg = ''
                }
            },
            CekPass2: () => {},
            Action: () => {
                $axios
                    .post(
                        `/v1/auth/reset_password/${route.value.params.code}`,
                        {
                            password1: res.password1,
                            password2: res.password2,
                        }
                    )
                    .then(() => {
                        res.loading = false
                        res.msg = 'password updated'
                    })
            },
            ResetPassword: () => {
                if (res.password1.length >= 6) {
                    if (res.password1 !== res.password2) {
                        res.ok = false
                        res.msg = 'password tidak sama'
                    } else {
                        res.ok = true
                        res.msg = ''
                        res.loading = true
                        res.Action()
                    }
                } else {
                    res.msg = 'password minimal 6 karakter'
                }
            },
        })

        onBeforeMount(() => {})

        return { res }
    },
})
</script>
