
function extractHostname(url) {
    try {
        return new URL(url).hostname;
    } catch {
        return 'link'
    }
}

export const state = () => ({
    apikey: '201b687484997a43f8530b5fe2672a7304122ba13b01c179b2d2bcb0538ff66a',
    loaded: false,
    results: [],
    result: {},
    selected: [],
    page: 1,
    limit: 15,
    match: "match",
    q: "",
    filterby: "fullname",
    sortby: "created",
    sort: "asc",
    count: {
        total: 0,
        pages: 1,
    },
    fields: [
        {
            key: 'selected',
            label: '#',
            tdClass: 'wslctd',
            sort: false,
        },
        {
            key: 'avatar',
            label: 'Avatar',
            tdClass: 'wava',
            sort: false,
        },
        {
            key: 'fullname',
            label: 'Full Name',
            sort: true,
            // thClass: 'sortable',
        }, {
            key: 'gender',
            label: 'Gender',
            sort: true,
            // thClass: 'sortable',
        },
        {
            key: 'created',
            label: 'Created',
            sort: true,
            sortKey: true
            // thClass: 'sortable',
        },
        {
            key: 'email',
            label: 'Email',
            sort: true,
        },
        {
            key: 'is_suku_ras',
            label: 'RAS',
            sort: true,
        },
        {
            key: 'video_ref',
            label: 'Video'
        },
        {
            key: 'role',
            label: 'Role',
            sort: true,
        },
        {
            key: 'status',
            label: 'Status',
            sort: true,
        },
        { key: 'whatsapp', label: 'Whatsapp', sort: true },
        { key: 'edit', label: 'Edit' }
    ],
    url: '',
    users: [],
    landing_prov: '',
    landing_kab: '',
})

export const mutations = {
    SET(state, { k, v }) {
        state[k] = v
    },
    SETUSER(state, { i, v }) {
        state.results[i] = v
    },
    SETLIBUR(state, { i, v }) {
        state.users[i].showlanding = v
    },
    SELECTNONE(state) {
        state.results.map(x => {
            x.select = false
            return x
        })
    },
    SELECTALL(state) {
        state.results.map(x => {
            x.select = true
            return x
        })
    },
    SELECTINDEX(state, id) {
        state.results[id].select = !state.results[id].select
    }
}
export const actions = {
    /**
     * Load Indexed
     */
    async LoadData({ state, commit }) {
        for (const [k] of Object.entries(state)) {
            try {
                const vv = await this.$localForage.user.getItem('store_users_' + k)
                commit("SET", { k, v: vv })
            } catch { }
        }
        await commit('SET', { k: 'loaded', v: true })
        return false
    },
    /**
     * save config ke indexed db
     */
    async SetData({ commit }, { k, v }) {
        await commit('SET', { k, v })
        await this.$localForage.user.setItem('store_users_' + k, v)
        return null
    },
    /**
     * save config ke indexed db
     */
    async SetState({ state }) {
        for (const [k] of Object.entries(state)) {
            try {
                await this.$localForage.user.setItem('store_users_' + k, state[k])
            } catch { }
        }
        // await this.$localForage.user.setItem('store_users_' + k, v)
        return null
    },
    async SET({ commit }, { k, v }) {
        await commit('SET', { k, v })
        return v
    },

    /**
     * get data
     */
    async FetchAll({ state, commit, dispatch }) {
        let u = '?limit=' + state.limit
        u += '&page=' + state.page
        u += '&filterby=' + state.filterby
        u += '&q=' + state.q
        u += '&sort=' + state.sort
        u += '&sortby=' + state.sortby || 'created'
        u += '&match=' + state.match
        commit('SET', { k: 'url', v: u })

        const { data } = await this.$axios.get(`/v1/users${u}`)
        if (data) {
            const ds = data.results
            const wx = ds.map((x) => {
                x.select = false
                x.vid = extractHostname(x.video_ref)
                return x
            })

            commit('SET', { k: 'results', v: wx })
            commit('SET', { k: 'count', v: data.count })
            // dispatch('SetState')

        }
    }
}

export default {
    state,
    mutations,
    actions
}
