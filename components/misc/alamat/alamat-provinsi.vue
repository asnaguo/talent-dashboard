<template lang="pug">
.flex
    b-form-group(label='Provinsi', label-for='frm-provinsi')
        b-form-select#frm-provinsi(
            :value='provinsi',
            :options='res.datas',
            @change='$emit("change", $event)'
        )
</template>
<script>
import {
    defineComponent,
    onMounted,
    reactive,
    useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
    props: {
        provinsi: {
            type: String,
            default: '',
        },
    },
    setup() {
        const { $axios, store } = useContext()

        const res = reactive({
            datas: [],
        })

        onMounted(() => {
            $axios
                .get(`v1/alamat/provinsi`, {
                    headers: {
                        'X-APIKEY': store.state.apikey.alamat,
                    },
                })
                .then((r) => {
                    res.datas = r.data
                })
        })

        return { res }
    },
})
</script>
