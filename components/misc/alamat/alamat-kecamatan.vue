<template lang="pug">
.flex
    b-form-group(label='Kecamatan', label-for='frm-kecamatan')
        b-form-select#frm-kecamatan(
            :value='kecamatan',
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
    watch,
} from '@nuxtjs/composition-api'

export default defineComponent({
    props: {
        provinsi: {
            type: String,
            default: '',
        },
        kabupaten: {
            type: String,
            default: '',
        },
        kecamatan: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const { $axios, store } = useContext()

        const res = reactive({
            datas: [],
            getKecamatan: (q) => {
                res.kecamatan = ''
                $axios
                    .post(
                        `v1/alamat/kecamatan`,
                        {
                            provinsi: props.provinsi,
                            kabupaten: q,
                        },
                        {
                            headers: {
                                'X-APIKEY': store.state.apikey.alamat,
                            },
                        }
                    )
                    .then((r) => {
                        res.datas = r.data
                    })
            },
        })

        watch(
            () => props.kabupaten,
            (newValue) => {
                res.getKecamatan(newValue)
            }
        )

        onMounted(() => {
            res.getKecamatan(props.kabupaten)
        })

        return { res }
    },
})
</script>
