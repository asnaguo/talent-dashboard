<template lang="pug">
.flex
    .flex
        b-table(
            table-class='text-sm table table-theme v-middle table-hover table-condensed',
            small,
            tdClass='text-danger',
            :fields='res.fields',
            :items='res.users',
            responsive='sm',
            ref='selectableTable',
            select-mode='multi',
            selectable,
            no-select-on-click,
            selected-variant='active'
        )
            template(#head(selected)='data')
                b-form-checkbox(
                    v-model='res.scall',
                    name='selected-rows',
                    @change='res.SelectAllRow'
                )

            //- selected
            template(v-slot:cell(selected)='{ item, index }')
                b-form-checkbox(
                    :checked='item.select',
                    name='selected-rows',
                    @change='res.SelectRow(index, item.select)'
                ) {{ item.select }}

            //- //- avatar
            //- template(#cell(avatar)='data')
            //-     b-avatar(variant='light', :src='data.value', size='24')

            //- //- role
            //- template(#cell(role)='{ value }')
            //-     b-badge(variant='primary', v-if='value === "admin"') {{ value }}
            //-     b-badge(variant='light', v-else) {{ value }}
</template>

<script>
import { ref, onMounted, reactive, useContext } from '@nuxtjs/composition-api'
export default {
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
                    tdClass: 'w-slct',
                },
                {
                    key: 'select',
                    label: 'Select',
                },
                {
                    key: 'email',
                    label: 'Email',
                },
                // {
                //     key: 'avatar',
                //     label: 'Ava',
                //     tdClass: 'w-ava',
                // },
                // {
                //     key: 'fullname',
                //     label: 'Full Name',
                //     tdClass: 'text-primary',
                // },
                // {
                //     key: 'role',
                //     label: 'Role',
                //     tdClass: 'w-status',
                // },
                // {
                //     key: 'email',
                //     label: 'Email',
                //     tdClass: 'w-email',
                // },
                // { key: 'whatsapp', label: 'avatar', tdClass: 'w-input' },
                // { key: 'status', label: 'status', tdClass: 'w-status' },
            ],
            SelectRow: (x, y) => {
                res.users[x].select = !y
                const scid = res.users.filter((x) => x.select === true)
                res.selected = scid.map((x) => x._id)
            },
            SelectAllRow: (x) => {
                res.scall = x
                let scid = []
                if (x === true) {
                    scid = res.users.map((x) => {
                        x.select = true
                        return x
                    })
                } else {
                    scid = res.users.map((x) => {
                        x.select = false
                        return x
                    })
                }
                res.users = scid
                res.selected = scid.map((x) => x._id)
            },
        })
        onMounted(() => {
            store.dispatch('users/FetchAll').then(() => {
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
.w-email {
    width: 250px;
}
.w-input {
    width: 180px;
}
.w-ava {
    width: 24px;
}
.w-slct {
    width: 15px;
}
.w-status {
    width: 100px;
}
</style>
