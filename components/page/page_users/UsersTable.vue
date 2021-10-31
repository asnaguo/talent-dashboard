<template lang="pug">
.flex
    .flex
        b-overlay(:show='res.show', rounded='sm')
            b-table(
                table-class='text-sm table table-theme v-middle table-hover table-condensed',
                small,
                tdClass='text-danger',
                :fields='res.fields',
                :items='res.results',
                responsive='sm',
                select-mode='multi',
                selectable,
                no-select-on-click,
                selected-variant='active'
            )
                //- ================================================
                //- head:selected_all
                template(#head(selected)='data')
                    b-form-checkbox(name='selected-rows', @change='SelectAll')

                //- head:sort
                template(#head()='data')
                    .flex.d-flex(
                        @click='Sort(data.field.key)',
                        v-if='data.field.sort'
                    )
                        .flex {{ data.label }}
                        .pl-2
                            i.mdi.mdi-sort.pointer.text-muted
                    .flex.d-flex(v-else) {{ data.label }}

                //- body:select
                template(v-slot:cell(selected)='{ item, index }')
                    b-form-checkbox(
                        :checked='item.select',
                        name='selected-rows',
                        @change='SelectRow(index, item)'
                    )
                //- ================================================
                //- ================================================

                //- avatar
                template(#cell(avatar)='data')
                    b-avatar(variant='light', :src='data.value', size='24')

                //- role
                template(#cell(role)='{ value }')
                    b-badge(variant='primary', v-if='value === "admin"') {{ value }}
                    b-badge(variant='light', v-else) {{ value }}
                //- status
                template(#cell(status)='{ value }')
                    b-badge(variant='primary', v-if='value === "active"') {{ value }}
                    b-badge(variant='light', v-else) {{ value }}
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
    onMounted,
    reactive,
    useContext,
} from '@nuxtjs/composition-api'
import UseSelect from './UseSelect'

export default {
    setup() {
        const { store, route } = useContext()
        const { SelectAll, SelectRow, Sort } = UseSelect('users')

        const res = reactive({
            show: true,
            p: route.value.params.page || 1,
            limit: computed(() => store.state.users.limit),
            pages: computed(() => store.state.users.count.pages),
            total: computed(() => store.state.users.count.total),
            page: computed(() => store.state.users.page),
            q: '',
            scall: false,
            results: computed(() => store.state.users.results),
            selected: computed(() => store.state.users.selected),
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
            store.commit('users/SET', {
                k: 'page',
                v: route.value.params.page || 1,
            })
            store.dispatch('users/FetchAll').then(() => {
                res.show = false
            })
        })
        return { res, SelectAll, SelectRow, Sort }
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
.tabel {
    border: solid 1px #ff0000;
    overflow-y: scroll;
    height: 300px;
    max-height: 300px;
}
</style>
