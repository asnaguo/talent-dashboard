<template lang="pug">
.flex.pt-2
    ContentBox.pb-3
        SidebarMenu(:menu='res.menu_top')
        SidebarMenu.pt-1(:menu='res.menu_roles')
        SidebarMenu.pt-1(:menu='res.menu_status')
        SidebarMenu.pt-1(:menu='res.menu_referral')
        SidebarMenu.pt-1(:menu='res.menu_refname')
        SidebarMenu.pt-1(:menu='res.menu_products')
</template>
<script>
import {
    defineComponent,
    onMounted,
    reactive,
    useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
    setup() {
        const { $axios } = useContext()
        const res = reactive({
            menu_top: [
                {
                    id: 'profile',
                    title: 'Semua Agen',
                    link: '/users',
                    icon: 'account-group',
                },
            ],
            menu_roles: [],
            menu_status: [],
            menu_referral: [],
            menu_refname: [],
            menu_products: [],
            countby: {
                roles: {},
                status: {},
            },
        })

        onMounted(() => {
            $axios.get('/v1/users/stats').then((r) => {
                res.countby = r.data.countby
                // menu roles
                res.menu_roles.push({
                    head: true,
                    id: 'xroles',
                    title: 'by roles',
                })
                r.data.countby.role.forEach((x) => {
                    if (x._id !== '' && x._id !== null) {
                        res.menu_roles.push({
                            id: x._id,
                            title: x._id,
                            link: '/users/role/' + x._id,
                            count: x.count,
                            countVariant: 'light',
                            icon: 'account-arrow-right-outline',
                        })
                    }
                })

                // menu status
                res.menu_status.push({
                    head: true,
                    id: 'xstatus',
                    title: 'by status',
                })
                r.data.countby.status.forEach((x) => {
                    if (x._id !== '' && x._id !== null) {
                        res.menu_status.push({
                            id: x._id,
                            title: x._id,
                            link: '/users/status/' + x._id,
                            count: x.count,
                            countVariant: 'light',
                            icon: 'account-arrow-right-outline',
                        })
                    }
                })

                // menu referral
                res.menu_status.push({
                    head: true,
                    id: 'xreferral',
                    title: 'by referral',
                })
                r.data.countby.referral.forEach((x) => {
                    if (x._id !== '' && x._id !== null) {
                        res.menu_referral.push({
                            id: x._id,
                            title: x._id,
                            link: '/users/referral/' + x._id,
                            count: x.count,
                            countVariant: 'light',
                            icon: 'account-arrow-right-outline',
                        })
                    }
                })

                // menu refname
                res.menu_refname.push({
                    head: true,
                    id: 'xrefname',
                    title: 'by superagen',
                })
                r.data.countby.refname.forEach((x) => {
                    if (x._id !== '' && x._id !== null) {
                        res.menu_refname.push({
                            id: x._id,
                            title: x._id,
                            link: '/users/refname/' + x._id,
                            count: x.count,
                            countVariant: 'light',
                            icon: 'account-arrow-right-outline',
                        })
                    }
                })

                // menu products
                res.menu_products.push({
                    head: true,
                    id: 'xproducts',
                    title: 'by products',
                })
                r.data.countby.products.forEach((x) => {
                    if (x._id !== '' && x._id !== null) {
                        res.menu_products.push({
                            id: x._id,
                            title: x._id,
                            link: '/users/products/' + x._id,
                            count: x.count,
                            countVariant: 'light',
                            icon: 'package-variant-closed',
                            iconVariant: 'success',
                        })
                    }
                })
            })
        })
        return { res }
    },
})
</script>
