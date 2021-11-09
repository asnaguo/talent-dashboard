<template lang="pug">
Content
    .container(style='max-width: 380px')
        .mt-3
            .card
                .card-header.py-2.px-3
                    .flex
                        h4 Password Baru
                .card-body.p-3
                    NewPassword
</template>

<script>
import { onMounted, useContext } from '@nuxtjs/composition-api'
import NewPassword from '~/components/page/page_auth/password/NewPassword.vue'

export default {
    components: {
        NewPassword,
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
