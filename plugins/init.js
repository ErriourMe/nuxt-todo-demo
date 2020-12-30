export default function ({ $axios, store }) {
  if (Object.keys(store.getters['user/currentUser']).length) {
    $axios
      .get(`${process.env.API_DOMAIN}/${process.env.API_VERSION}/oauth/me`)
      .then((res) => {
        store.dispatch('user/refreshed', { user: res.data.user })
      })
  }
}
