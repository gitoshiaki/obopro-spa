export default {
    namespaced: true,
    actions: {
        get({ rootGetters }, {
            id
        }) {
            return rootGetters.client.request(`
          query {
            User(id: "${id}") {
              id,
              profile {
                id
              },
            }
          }
        `)
        }
    }
}