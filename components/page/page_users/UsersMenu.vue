<template lang="pug">
.flex.pt-2
    ContentBox.pb-3
        SidebarMenu(:menu='res.menu_top')
        SidebarMenu.pt-1(:menu='res.menu_roles')
        SidebarMenu.pt-1(:menu='res.menu_status')
        SidebarMenu.pt-1(:menu='res.menu_gender')
        SidebarMenu.pt-1(:menu='res.menu_ras')
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
            menu_gender: [],
            menu_ras: [],
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

                // menu gender
                res.menu_gender.push({
                    head: true,
                    id: 'xgender',
                    title: 'by gender',
                })
                r.data.countby.gender.forEach((x) => {
                    if (x._id !== '' && x._id !== null) {
                        res.menu_gender.push({
                            id: x._id,
                            title: x._id,
                            link: '/users/gender/' + x._id,
                            count: x.count,
                            countVariant: 'light',
                            icon: 'account-arrow-right-outline',
                        })
                    }
                })

                // menu ras
                res.menu_ras.push({
                    head: true,
                    id: 'xras',
                    title: 'by RAS',
                })
                r.data.countby.is_suku_ras.forEach((x) => {
                    if (x._id !== '' && x._id !== null) {
                        res.menu_ras.push({
                            id: x._id,
                            title: x._id,
                            count: x.count,
                            link: '/users/is_suku_ras/' + x._id,
                            countVariant: 'light',
                            icon: 'account-arrow-right-outline',
                        })
                    }
                })
            })
        })
        return { res }
    },
})
</script>
