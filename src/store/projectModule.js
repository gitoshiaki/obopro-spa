export default {
    namespaced: true,
    actions: {
        list({ rootGetters }) {
          return rootGetters.client.request(
          `
            query {
              allProjects {
                id,
                name,
                description,
                updatedAt,
                createdAt,
                owner {
                  id,
                  profile {
                    id,
                    name,
                    thumbnailUrl
                  }
                }
              }
            }
          `)
        },

        get({ rootGetters }, variables) {
          return rootGetters.client.request(
          `
            query (
              $id: ID!
            ){
              Project(
                id: $id
              ){
                id,
                name,
                description,
                updatedAt,
                createdAt,
                owner {
                  id,
                  profile {
                    id,
                    name,
                    thumbnailUrl
                  }
                }
              }
            }
          `
          , variables)
        },

        create({ rootGetters }, variables) {
          return rootGetters.client.request(
          `
            mutation (
              $name: String!
              $description: String!
              $ownerId: ID!
            ){
              createProject(
                name: $name,
                description: $description,
                ownerId: $ownerId
              ) {
                id
              }
            }
          `
          , variables)
        },

        update({ rootGetters }, variables) {
          return rootGetters.client.request(
          `
            mutation (
              $id: ID!
              $name: String!
              $description: String!
            ){
              updateProject(
                id: $id
                name: $name,
                description: $description,
              ) {
                id
              }
            }
          `
          , variables)
        },

        delete({ rootGetters }, variables) {
          return rootGetters.client.request(
          `
            mutation (
                $id: ID!
            ){
              deleteProject(
                id: $id
              ) {
                id
              }
            }
          `
          , variables)
        }

    }
}