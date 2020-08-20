export const songStore = {
    state: {
        activeSong: {},
        allSongs: []
    },

    mutations: {
        setSongs(state, songs) {
            state.allSongs = songs;

        },
        activeSong(state, song) {
            state.activeSong = state.allSongs[0];
        }
    },

    actions: {
        fetchSongs({ commit }) {
            return axios.get('api/songs')
                .then(response => {
                    commit('setSongs', response.data);
                    commit('activeSong', response.data[0]);
                });
        },
    },

    getters: {
        getActiveSong: (state) => { return state.allSongs[0] },
        getAllSongs: (state) => { return state.allSongs }
    }
};