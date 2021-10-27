<template lang="pug">
.flex
    AlamatProvinsi(
        :provinsi='res.provinsi',
        @change='res.Change("provinsi", $event)'
    )
    AlamatKabupaten(
        :provinsi='res.provinsi',
        :kabupaten='res.kabupaten',
        @change='res.Change("kabupaten", $event)'
    )
    AlamatKecamatan(
        :provinsi='res.provinsi',
        :kabupaten='res.kabupaten',
        :kecamatan='res.kecamatan',
        @change='res.Change("kecamatan", $event)'
    )
    AlamatKelurahan(
        :provinsi='res.provinsi',
        :kabupaten='res.kabupaten',
        :kecamatan='res.kecamatan',
        :kelurahan='res.kelurahan',
        @change='res.Change("kelurahan", $event)',
        @kodepos='res.ChangeKodepos($event)'
    )
    AlamatKodepos(:kodepos='res.kodepos', @change='res.ChangeKPOS($event)')
    AlamatLengkap(:alamat='res.alamat', @change='res.ChangeAlamat($event)')
</template>
<script>
import { defineComponent, onMounted, reactive } from '@nuxtjs/composition-api'
import AlamatProvinsi from './alamat-provinsi.vue'
import AlamatKabupaten from './alamat-kabupaten.vue'
import AlamatKecamatan from './alamat-kecamatan.vue'
import AlamatKelurahan from './alamat-kelurahan.vue'
import AlamatKodepos from './alamat-kodepos.vue'
import AlamatLengkap from './alamat-lengkap.vue'

export default defineComponent({
    components: {
        AlamatProvinsi,
        AlamatKabupaten,
        AlamatKecamatan,
        AlamatKelurahan,
        AlamatKodepos,
        AlamatLengkap,
    },
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
        kodepos: {
            type: String,
            default: '',
        },
        alamat: {
            type: String,
            default: '',
        },
    },
    emits: ['change'],
    setup(props, { emit }) {
        const res = reactive({
            provinsi: '',
            kabupaten: '',
            kecamatan: '',
            kelurahan: '',
            kodepos: '',
            alamat: '',
            Change: (k, v) => {
                if (k === 'provinsi') {
                    res.provinsi = v
                    res.kabupaten = ''
                    res.kecamatan = ''
                    res.kelurahan = ''
                }
                if (k === 'kabupaten') {
                    res.kabupaten = v
                    res.kecamatan = ''
                    res.kelurahan = ''
                }
                if (k === 'kecamatan') {
                    res.kecamatan = v
                    res.kelurahan = ''
                }

                if (k === 'kelurahan') {
                    res.kelurahan = v
                }

                emit('change', {
                    provinsi: res.provinsi,
                    kabupaten: res.kabupaten,
                    kecamatan: res.kecamatan,
                    kelurahan: res.kelurahan,
                    kodepos: res.kodepos,
                    alamat: res.alamat,
                })
            },
            ChangeKodepos: (x) => {
                res.kodepos = x.v
            },
            ChangeKPOS: (v) => {
                res.kodepos = v
                emit('change', {
                    provinsi: res.provinsi,
                    kabupaten: res.kabupaten,
                    kecamatan: res.kecamatan,
                    kelurahan: res.kelurahan,
                    kodepos: res.kodepos,
                    alamat: res.alamat,
                })
            },
            ChangeAlamat: (v) => {
                res.alamat = v
                emit('change', {
                    provinsi: res.provinsi,
                    kabupaten: res.kabupaten,
                    kecamatan: res.kecamatan,
                    kelurahan: res.kelurahan,
                    kodepos: res.kodepos,
                    alamat: res.alamat,
                })
            },
        })

        onMounted(() => {
            setTimeout(() => {
                res.provinsi = props.provinsi
                res.kabupaten = props.kabupaten
                res.kecamatan = props.kecamatan
                res.kelurahan = props.kelurahan
                res.kodepos = props.kodepos
                res.alamat = props.alamat
            }, 1000)
        })

        return { res }
    },
})
</script>
