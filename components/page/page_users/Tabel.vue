<template lang="pug">
.flex
    b-table(
        table-class='text-sm table table-theme v-middle table-hover table-condensed',
        small,
        tdClass='text-danger',
        :fields='fields',
        :items='res.results',
        responsive='sm',
        ref='selectableTable',
        select-mode='multi',
        selectable,
        no-select-on-click,
        selected-variant='active'
    )
        //- ================================================
        //- head:selected_all
        template(#head(selected)='data')
            b-form-checkbox(
                v-model='cfg.select_all',
                name='selected-rows',
                @change='cfg.SelectAllRow'
            )

        template(#head()='data')
            .flex.d-flex(
                @click='cfg.Sort(data.field.key)',
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
                @change='cfg.SelectRow(index, item.select)'
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
</template>
<script>
import { defineComponent, reactive, watchEffect } from '@vue/composition-api'

export default defineComponent({
    props: {
        fields: {
            type: Array,
            default: () => {},
        },
        results: {
            type: Array,
            default: () => {},
        },
    },
    setup(props) {
        const res = reactive({
            selected: [],
            results: [],
        })

        watchEffect(() => {
            res.results = props.results
        })

        // ---------------------
        // cfg start
        // ---------------------
        const cfg = reactive({
            asc: 1,
            Sort: (x) => {},
            select_all: false,
            SelectAllRow: (x) => {
                cfg.select_all = x
                const scid = res.results.map((d) => {
                    d.select = x
                    return d
                })
                res.results = scid
                if (x === false) {
                    res.selected = []
                } else {
                    res.selected = scid.map((x) => x)
                }
            },
            SelectRow: (x, y) => {
                res.results[x].select = !y
                const scid = res.results.filter((x) => x.select === true)
                res.selected = scid.map((x) => x)
            },
        })
        // ---------------------
        // cfg end
        // ---------------------

        return { cfg, res }
    },
})
</script>
