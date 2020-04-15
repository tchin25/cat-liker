export const state = () => ({
  loggedIn: false,
  data: null
});

export const mutations = {
  SET_LOGGED_IN(state, value) {
    state.loggedIn = value;
  },
  SET_USER(state, data) {
    state.data = data;
  }
};

export const actions = {
  fetchUser({ commit }, user) {
    if (user) {
      commit("SET_LOGGED_IN", true);
      commit("SET_USER", {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        profilePicture: user.photoURL
      });
    } else {
      commit("SET_USER", null);
      commit("SET_LOGGED_IN", false);
    }
  }
};
