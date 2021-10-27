// import Pouch from '~/plugins/pouch'
export const strict = process.env.NODE_ENV !== 'production'

export const state = () => ({
    fullname: '',
    email: '',
    org: '',
    orgs: [],
    avatar: '',
    status: 'inactive',
    role: '',
    meta: {},
    verified: false,
    created: '2021-08-25T08:24:33.382000',
    modified: '2021-08-25T08:24:33.382000',
    created_date: null,
    active_date: null,
    wallet_balance: 0,
    referral: '',
    badges: [],
    libur: false,
    whatsapp: '',
    whatsapp_text: '',
    rekening: { bank: '', cabang: '', norek: '', nama: '' },
    online_store: {
        instagram: '',
        shopee: '',
        tokopedia: '',
        bukalapak: '',
        lazada: '',
        lainnya: '',
    },
    alamat_landing: {
        nama: '',
        whatsapp: '',
        provinsi: 0,
        provinsi_name: '',
        kabupaten: 0,
        kabupaten_name: '',
        kecamatan: 0,
        kecamatan_name: '',
        kelurahan: 0,
        kelurahan_name: '',
        kodepos: '',
        alamat: '',
    },
    alamat_pengiriman: {
        nama: '',
        whatsapp: '',
        provinsi: 0,
        provinsi_name: '',
        kabupaten: 0,
        kabupaten_name: '',
        kecamatan: 0,
        kecamatan_name: '',
        kelurahan: 0,
        kelurahan_name: '',
        kodepos: '',
        alamat: '',
    },
})

export const mutations = {
    SET(state, { k, v }) {
        state[k] = v
    },
}

export const actions = {
    /**
     * Get My Profile
     */
    async GetMe({ commit }) {
        try {
            // submit data to api
            const { data } = await this.$axios.get('v1/auth/me')
            for (const [k, v] of Object.entries(data)) {
                commit('SET', { k, v })
            }
            return data
        } catch (e) {
            return {}
        }
    },
}

// export const getters = {
//     loaded: (state) => state.loaded,
// }

export default {
    namespaced: true,
    strict,
    state,
    actions,
    // getters,
    mutations,
}
