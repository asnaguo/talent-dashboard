<template lang="pug">
Content(title='Settings')
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
        ContentBox.bg-white
            div(style='max-width: 600px')
                .flex.m-3
                    b-form-group.b-b.pb-3(
                        label-cols-sm='12',
                        label-cols-lg='4',
                        label='User ID'
                    )
                        b-form-input(
                            trim,
                            disabled,
                            style='border: solid 1px #e1e1e1'
                        )

                    b-form-group.b-b.pb-3(
                        label-cols-sm='12',
                        label-cols-lg='4',
                        label='Referral'
                    )
                        b-form-input(
                            trim,
                            disabled,
                            style='border: solid 1px #e1e1e1'
                        )

                    b-form-group.b-b.pb-3(
                        label-cols-sm='12',
                        label-cols-lg='4',
                        label='Nama Lengkap'
                    )
                        b-form-input(trim)

                    b-form-group.b-b.pb-3(
                        label-cols-sm='12',
                        label-cols-lg='4',
                        label='Email'
                    )
                        b-form-input(trim)

                    b-form-group.b-b.pb-3(
                        label-cols-sm='12',
                        label-cols-lg='4',
                        label='Whatsapp'
                    )
                        .flex
                            b-form-input(trim)
                        .flex.pt-3
                            b-form-textarea#textarea(
                                placeholder='halo, saya tertarik dengan produk ini...',
                                rows='3',
                                max-rows='6'
                            )
                            .text-sm.label.text-muted greeting message untuk customer

                    pre {{ $store.state.auth.me }}
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
