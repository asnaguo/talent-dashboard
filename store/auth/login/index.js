export const strict = process.env.NODE_ENV !== 'production'

export const state = () => ({
    form: {
        email: '',
        password: '',
    },
    token: '',
    msg: '',
    loading: false,
    login_status: 0 // 1.login gagal, 2.login berhasil
})

export const mutations = {
    SET(state, { k, v }) {
        state[k] = v
    },
    SETFORM(state, { k, v }) {
        state.form[k] = v
    },
    SETLOGINSTATUS(state, v) {
        state.login_status = v
    }
}

export const actions = {

    /**
     * Load form data dari pouchdb _id: authform
     */
    async LoadFormLogin({ state, commit }) {
        for (const [k, v] of Object.entries(state.form)) {
            try {
                const vv = await this.$localForage.user.getItem('form_' + k)
                commit("SETFORM", { k, v: vv })
            } catch {
                await this.$localForage.user.setItem('form_' + k, v)
            }
        }
        await commit('SET', { k: 'loaded', v: true })
    },

    /**
     * Save form data ke pouchdb _id: authform
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
     * Login Action - Axios
    */
    async Login({ state, commit, dispatch }) {
        commit('SET', { k: 'loading', v: true })

        try {
            // submit data to api
            const { data } = await this.$axios.post('v1/auth/login', {
                email: state.form.email,
                password: state.form.password
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
    }
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
