<template lang="pug">
.flex
    b-overlay(:show='res.show', rounded='sm')
        Tabel(:results='res.users', :fields='res.fields')
    .m-3
        b-pagination-nav(
            v-model='res.p',
            :base-url='"/users/"',
            :total-rows='res.total',
            :number-of-pages='res.pages || 1',
            use-router
        )
</template>

<script>
import {
    computed,
    ref,
    onMounted,
    reactive,
    useContext,
} from '@nuxtjs/composition-api'
import Tabel from './Tabel.vue'
export default {
    components: { Tabel },
    setup() {
        const { store, route } = useContext()
        const selectableTable = ref(null)
        const res = reactive({
            show: true,
            p: route.value.params.page,
            limit: computed(() => store.state.users.limit),
            pages: computed(() => store.state.users.count.pages),
            total: computed(() => store.state.users.count.total),
            page: computed(() => store.state.users.page),
            q: '',
            scall: false,
            users: [],
            selected: [],
            fields: [
                {
                    key: 'selected',
                    label: '#',
                    tdClass: 'wslctd',
                    sort: false,
                },
                {
                    key: 'avatar',
                    label: 'Ava',
                    tdClass: 'wava',
                    sort: false,
                },
                {
                    key: 'fullname',
                    label: 'Full Name',
                    sort: true,
                    // thClass: 'sortable',
                },
                {
                    key: 'role',
                    label: 'Role',
                    sort: true,
                },
                {
                    key: 'email',
                    label: 'Email',
                    sort: true,
                },
                { key: 'whatsapp', label: 'avatar', sort: true },
                { key: 'status', label: 'status', sort: true },
            ],
        })
        onMounted(() => {
            res.show = true
            store.dispatch('users/FetchAll').then(() => {
                const w = store.state.users.results
                res.show = false
                res.users = w
            })
        })
        return { res, selectableTable }
    },
}
</script>

<style lang="scss">
.wslctd {
    width: 10px;
}
.wava {
    width: 20px;
}
</style>
