<template lang="pug">
Content
    .container(style='max-width: 380px')
        .mt-3
            .card
                .card-header.py-2.px-3
                    .flex
                        h4 Sign In
                        div Selamat datang, Silahkan login
                .card-body.p-3
                    LoginBox
</template>

<script>
import { onMounted, useContext } from '@nuxtjs/composition-api'
import LoginBox from '~/components/page/page_auth/login/Login'

export default {
    components: {
        LoginBox,
    },
    layout: 'default',
    scrollToTop: true,
    setup() {
        const { store } = useContext()
        onMounted(() => {
            store.commit('core/SET_THEME', { k: 'sidebarmini', v: false })
        })
    },
}
</script>
