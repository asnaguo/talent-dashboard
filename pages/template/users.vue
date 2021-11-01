<template lang="pug">
Content(title='Users')
    //- in-sidebar
    template(v-slot:insidebar)
        SettingsMenu

    //- toolbar
    template(v-slot:toolbar)
        //- --------------------
        //- toolbar block
        //- --------------------
        .flex.d-flex.justify-content-between
            //- toolbar title
            .flex
                h5.mb-0.pb-1 Users
                .text-muted Manage users / agen
            //- toolbar buttons
            .ml-2.d-flex.align-self-center
                b-button.btn.btn-sm.btn-primary.ml-2(
                    v-b-modal.ModalNewNamespace
                )
                    i.mdi.mdi-plus.mdi-18px
                    .pl-1 User
                //-b-button.btn.btn-sm.ml-2(variant='outline')
                    i.mdi.mdi-pokeball.mdi-18px

    //- filter
    template(v-slot:filter)
        ContentFilter
            FilterSearch(store='users')
            FilterLimit(store='users')
            FilterSortBy(store='users')
            FilterAscd(store='users')
            FilterTotal(store='users')
            FilterExport(store='users')
            FilterSelected(store='users')

    //- breadcrumb
    template(v-slot:breadcrumb)
        b-breadcrumb.py-2.bg-white.no-radius.text-uppercase
            b-breadcrumb-item(to='/') Dashboard
            b-breadcrumb-item(to='/users') Users

    //- content wajib
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
        const res = reactive({})
        return { res }
    },
}
</script>
