<template lang="pug">
.flex
    b-form-group(label='Kelurahan', label-for='frm-kelurahan')
        b-form-select#frm-kelurahan(
            :value='kelurahan',
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
        kelurahan: {
            type: String,
            default: '',
        },
    },
    emits: ['kodepos'],
    setup(props, { emit }) {
        const { $axios, store } = useContext()

        const res = reactive({
            datas: [],
            kelurahan: '',
            getKelurahan: (q) => {
                $axios
                    .post(
                        `v1/alamat/kelurahan`,
                        {
                            provinsi: props.provinsi,
                            kabupaten: props.kabupaten,
                            kecamatan: q,
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
            () => props.kecamatan,
            (newValue) => {
                res.getKelurahan(newValue)
            }
        )

        watch(
            () => props.kelurahan,
            (newValue) => {
                res.datas.forEach((x) => {
                    if (x.value === newValue) {
                        emit('kodepos', { k: x.value, v: x.kodepos.toString() })
                    }
                })
            }
        )

        onMounted(() => {
            res.getKelurahan(props.kecamatan)
        })

        return { res }
    },
})
</script>
