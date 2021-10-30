<template lang="pug">
Content(title='Settings')
    template(v-slot:insidebar)
        SettingsMenu

    //- template(v-slot:filter)
        .flex.d-flex.justify-content-between
            h5.mb-0.pb-0 {{ $route.params.page }}
            //-.align-self-center
                h4.pt-1 Profile
                .text-muted Update your photo and personal details here.

    ContentMain
        //- ========================
        //- Project Apikeys
        //- ========================
        ContentBox.bg-white
            div(style='max-width: 600px')
                .flex.m-3 set
</template>

<script>
import { reactive } from '@nuxtjs/composition-api'
import SettingsMenu from '~/components/page/page_settings/SettingsMenu'

export default {
    components: {
        SettingsMenu,
    },
    layout: 'authenticated',
    middleware: 'authenticated',
    setup() {
        const res = reactive({
            menu: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    link: '/',
                    icon: 'collage',
                },
                {
                    id: 'users',
                    title: 'Users',
                    link: '/users',
                    icon: 'account-multiple',
                    iconVariant: 'primary',
                },
            ],
        })
        return { res }
    },
}
</script>
