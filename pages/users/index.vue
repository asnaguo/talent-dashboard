<template lang="pug">
Content(title='Settings')
    //- in-sidebar
    //-template(v-slot:insidebar)
        SettingsMenu

    //- toolbar
    //- template(v-slot:toolbar)
        //- --------------------
        //- toolbar block
        //- --------------------
        .flex.d-flex.justify-content-between
            //- toolbar title
            .flex
                h5.mb-0.pb-1 Profile
                .text-muted Update your photo and personal details here.
            //- toolbar buttons
            .ml-2.d-flex.align-self-center
                b-button.btn.btn-xs.btn-primary.ml-2(
                    v-b-modal.ModalNewNamespace
                )
                    i.mdi.mdi-plus.mdi-18px
                    .pl-1 Projects
                b-button.btn.btn-xs.ml-2(variant='outline')
                    i.mdi.mdi-pokeball.mdi-18px

    template(v-slot:filter)
        .flex.d-flex.justify-content-between
            b-button.btn.btn-xs.mr-2(variant='outline')
                i.mdi.mdi-plus.mdi-18px
                .pl-1 Projects

    //- breadcrumb
    template(v-slot:breadcrumb)
        b-breadcrumb.py-2.bg-white.no-radius.text-uppercase
            b-breadcrumb-item(to='/') Dashboard
            b-breadcrumb-item(to='/settings') Settings
            b-breadcrumb-item(active) Profile

    ContentMain
        //- ========================
        //- Project Apikeys
        //- ========================
        ContentBox
            UsersTable
</template>

<script>
import { reactive } from '@nuxtjs/composition-api'
import SettingsMenu from '~/components/page/page_settings/SettingsMenu'
import UsersTable from '~/components/page/page_users/UsersTable.vue'

export default {
    components: {
        SettingsMenu,
        UsersTable,
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
