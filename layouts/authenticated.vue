<template lang="pug">
.flex.flex-column(v-if='!$store.state.core.loaded')
    BOverlay(
        :show='!$store.state.core.loaded',
        rounded='lg',
        :opacity='0.5',
        style='position: absolute; top: 0; left: 0; height: 100vh; width: 100%'
    )

.flex(v-else)
    .flex.flex-column(v-if='$store.state.auth.me.status === "inactive"')
        .container(style='max-width: 400px')
            .flex.m-5
                .card
                    .card-header Account Inactive
                    .card-body
                        b-button(block, variant='light', to='/auth/logout') Logout
    .flex.flex-column(v-else)
        //- header
        HeaderAuth

        //- sidebar
        Sidebar

        //- mainbox
        .mainbox_auth(:class='{ mainbox_sidebarmini: res.sidebarmini }')
            nuxt

        client-only
        Build

    //- MAIN SIDEBAR FLOAT
    mq-layout(:mq='["md", "sm"]')
        BSidebar#MainSidebarX(
            title='Main Menu',
            backdrop,
            bg-variant='white',
            shadow,
            left,
            width='240px'
        )
            .flex.pt-2
                //- load sidebar menu only
                SDefault
</template>
<script>
import { BOverlay } from 'bootstrap-vue'
import { computed, reactive, useContext } from '@nuxtjs/composition-api'
import SDefault from '~/components/menusidebar/index'
export default {
    components: {
        BOverlay,
        SDefault,
    },
    scrollToTop: true,
    setup() {
        const { store } = useContext()
        const res = reactive({
            sidebarmini: computed(() => store.state.core.theme.sidebarmini),
        })
        return { res }
    },
    head() {
        return {
            meta: [
                {
                    hid: 'og:site_name',
                    property: 'og:site_name',
                    content: process.env.site_name,
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: process.env.site_title,
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: process.env.site_description,
                },
            ],
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
            setTimeout(() => this.$nuxt.$loading.finish(), 400)
        })
    },
}
</script>
