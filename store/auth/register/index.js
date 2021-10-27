export const strict = process.env.NODE_ENV !== 'production'

export const state = () => ({
    auth_reg_step: 1,
    form: {
        email: '',
        whatsapp: '',
        password: '',
        fullname: '',
        referral: '',
        refname: '',
        kodeagen: '',
        products: [],
        alamat_landing: {
            nama: '',
            whatsapp: '',
            provinsi: '',
            kabupaten: '',
            kecamatan: '',
            kelurahan: '',
            kodepos: '',
            alamat: '',
        },
        alamat_pengiriman: {
            nama: '',
            whatsapp: '',
            provinsi: '',
            kabupaten: '',
            kecamatan: '',
            kelurahan: '',
            kodepos: '',
            alamat: '',
        },
        marketplace: {
            instagram: '',
            shopee: '',
            tokopedia: '',
            bukalapak: '',
            lazada: '',
            lainnya: '',
        },
    },
    marketplace: {
        instagram: 'https://instagram.com/',
        shopee: 'https://shopee.co.id/',
        tokopedia: 'https://tokopedia.com/',
        bukalapak: 'https://bukalapak.com/',
        lazada: 'https://www.lazada.co.id/shop/',
        lainnya: 'https://',
    },
})

export const mutations = {
    SET(state, { k, v }) {
        state[k] = v
    },
    SETFORM(state, { k, v }) {
        state.form[k] = v
    },
    SETMPC(state, { k, v }) {
        state.form.marketplace[k] = v
    },
    SETALAMAT(state, data) {
        state.form.alamat_landing = data
        state.form.alamat_pengiriman = data
    },
    SETLOGINSTATUS(state, v) {
        state.login_status = v
    },
}

export const actions = {
    /**
     * Load form data dari indexeddb _id: authform
     */
    async LoadSet({ commit }) {
        const vv = await this.$localForage.user.getItem('auth_reg_step')
        if (vv !== null) {
            commit('SET', { k: 'auth_reg_step', v: vv })
        }
    },
    async Set({ commit }, { k, v }) {
        await this.$localForage.user.setItem(k, v)
        commit('SET', { k, v })
    },

    /**
     * Load form data dari indexeddb _id: authform
     */
    async LoadFormLogin({ state, commit }) {
        for (const [k, v] of Object.entries(state.form)) {
            try {
                const vv = await this.$localForage.user.getItem('form_' + k)
                if (vv !== null) {
                    commit('SETFORM', { k, v: vv })
                }
            } catch {
                await this.$localForage.user.setItem('form_' + k, v)
            }
        }
        await commit('SET', { k: 'loaded', v: true })
    },
    /**
     * Save form data ke indexeddb _id: authform
     */
    async SaveFormMarketplace({ state, commit }, { k, v }) {
        await commit('SETMPC', { k, v })
        const py = {}
        for (const [a, b] of Object.entries(state.form.marketplace)) {
            if (k === a) {
                py[a] = v
            } else {
                py[a] = b
            }

        }
        await commit('SETFORM', { k: 'marketplace', v: py })
        await this.$localForage.user.setItem('form_marketplace', state.form.marketplace)

    },

    /**
    * Save form alamat ke indexeddb _id: authform
    */
    async SaveFormAlamat({ commit }, data) {
        await commit('SETALAMAT', data)
        await this.$localForage.user.setItem('form_alamat', data)

    },

    /**
   * load alamat Form
   */
    async LoadFormAlamat({ commit }) {
        const dat = await this.$localForage.user.getItem('form_alamat')
        if (dat) {
            commit('SETALAMAT', dat)
            return dat
        } else {
            return {
                provinsi: '',
                kabupaten: '',
                kecamatan: '',
                kelurahan: '',
                kodepos: '',
                alamat: '',
            }
        }
    },

    /**
     * Save form data ke indexeddb _id: authform
     */
    async SaveFormLogin({ commit }, { k, v }) {
        commit('SETFORM', { k, v })
        await this.$localForage.user.setItem('form_' + k, v)
    },

    /**
     * Save Userdata & Token to cokies
     */
    async SaveCookieToken({ commit }, data) {
        await this.$cookiz.set('auth.token', data.token)
        await this.$cookiz.set('auth.islogin', true)
    },
    /**
         * Register API
         */
    async Register({ state }) {
        try {
            await this.$axios.post('/v1/auth/register', state.form).then(r => {
            })
            return true
        } catch {
            return false
        }
    },
    /**
     * Login Action - Axios
     */
    async Login({ state, commit, dispatch }) {
        commit('SET', { k: 'loading', v: true })

        try {
            // submit data to api
            const { data } = await this.$axios.post('v1/auth/login', {
                email: state.form.email,
                password: state.form.password,
            })

            // save to cookies
            dispatch('SaveCookieToken', data)

            // save state
            commit('SETLOGINSTATUS', 2)
            return true
        } catch (e) {
            commit('SETLOGINSTATUS', 1)
        }

        // timeout effect
        setTimeout(() => {
            commit('SET', { k: 'loading', v: false })
            setTimeout(() => {
                commit('SETLOGINSTATUS', 0)
                return false
            }, 1000)
        }, 1000)
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
