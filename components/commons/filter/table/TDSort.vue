<template lang="pug">
.flex
    .flex.d-flex(@click='Sort(data.field.key)', v-if='data.field.sort')
        .flex {{ data.label }}
        .pl-2
            i.mdi.mdi-sort.pointer.text-muted
    .flex.d-flex(v-else) {{ data.label }}
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import UseSelect from '~/plugins/rizamodules/UseSelect'

export default defineComponent({
    props: {
        data: {
            type: Object,
            default: () => {},
        },
        store: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const { Sort } = UseSelect(props.store)
        return { Sort }
    },
})
</script>
