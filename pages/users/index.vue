<template lang="pug">
Content(title='Users')
    //- in-sidebar
    template(v-slot:insidebar)
        UsersMenu

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
                .ml-2
                    FilterExport(store='users')
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
            //-FilterExport(store='users')
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
            .m-3
                Pagination(base='users', store='users')
</template>

<script>
import { reactive, onBeforeMount, useContext } from '@nuxtjs/composition-api'
import SettingsMenu from '~/components/page/page_settings/SettingsMenu'
import UsersMenu from '~/components/page/page_users/UsersMenu'
import UsersTable from '~/components/page/page_users/UsersTable'

export default {
    components: {
        SettingsMenu,
        UsersMenu,
        UsersTable,
    },
    layout: 'authenticated',
    middleware: 'authenticated',
    setup() {
        const { store } = useContext()
        const res = reactive({})
        onBeforeMount(() => {
            store.commit('users/SET', {
                k: 'match',
                v: 'regex',
            })
            store.commit('users/SET', {
                k: 'filterby',
                v: 'email',
            })
            store.commit('users/SET', {
                k: 'q',
                v: '',
            })
        })
        return { res }
    },
}
</script>
