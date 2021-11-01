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
                //- ================================================
                template(#head(selected)='data')
                    FilterTableTDCheckbox(:store='res.store')

                //- head:sort
                template(#head()='data')
                    FilterTableTDSort(:data='data', :store='res.store')

                //- body:select
                template(v-slot:cell(selected)='{ item, index }')
                    FilterTableTDSelect(
                        :store='res.store',
                        :item='item',
                        :index='index'
                    )
                template(v-slot:cell(edit)='{ item, index }')
                    i.mdi.mdi-pencil.text-muted.pointer
                //- ---------------------------------------------------------------------------------------- -//

                //- ================================================
                //- Custom TD
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
        Pagination(base='users', store='users')
</template>

<script>
import {
    computed,
    onMounted,
    reactive,
    useContext,
} from '@nuxtjs/composition-api'
import UseSelect from '~/plugins/rizamodules/UseSelect'

export default {
    setup() {
        const { store } = useContext()
        const { SelectAll, SelectRow, Sort } = UseSelect('users')
        const res = reactive({
            show: true,
            store: 'users',
            results: computed(() => store.state.users.results),
            fields: computed(() => store.state.users.fields),
        })
        onMounted(() => {
            res.show = true
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
