<template lang="pug">
.flex
    Tabel(:results='res.users', :fields='res.fields')
</template>

<script>
import { ref, onMounted, reactive, useContext } from '@nuxtjs/composition-api'
import Tabel from './Tabel.vue'
export default {
    components: { Tabel },
    setup() {
        const { store } = useContext()
        const selectableTable = ref(null)
        const res = reactive({
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
            store.dispatch('users/FetchAll').then(() => {
                require('consola').info('users loaded')
                const w = store.state.users.results
                const ws = JSON.parse(JSON.stringify(w))
                const wx = ws.map((x) => {
                    x.select = false
                    return x
                })
                res.users = wx
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
