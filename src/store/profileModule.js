import { thumbnailDefault } from '@/util/config'
export default {
    namespaced: true,
    actions: {
        list({ rootGetters }) {
            return rootGetters.client.request(`
            query {
                allProfiles {
                    id,
                    name,
                    furigana,
                    thumbnailUrl
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
                    Profile(
                        id: $id
                    ){
                        id,
                        name,
                        furigana,
                        thumbnailUrl
                        description
                        user {
                            id
                            ownerProjects {
                                id,
                                name,
                                updatedAt
                            }
                        }
                    }
                }
            `
            , variables)
        },


        bulkCreate({ rootGetters }, data) {
            const mutations = profiles.map((profile,i) => {
                let {
                    thumbnailUrl,
                    name,
                    furigana,
                    description
                } = profile
                thumbnailUrl = thumbnailUrl ? 
                    thumbnailUrl : 
                    thumbnailDefault;
                return `
                    a${i} : createProfile(
                        thumbnailUrl: "${thumbnailUrl}",
                        name: "${name}",
                        furigana: "${furigana}",
                        description: "${description}",
                    ) {
                        id
                    }
                `
            }).join("\n")

            const mutation = `
            mutation {
                ${mutations}
            }
            `
            
            return rootGetters.client.request(mutation)
        },

        create({ rootGetters }, variables) {
            return rootGetters.client.request(
            `
                mutation (
                    $thumbnailUrl: String!
                    $name: String!
                    $furigana: String!
                    $description: String!
                    $userId: ID!
                ){
                    createProfile(
                        thumbnailUrl: $thumbnailUrl,
                        name: $name,
                        furigana: $furigana,
                        description: $description,
                        userId: $userId
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
                    $thumbnailUrl: String!
                    $name: String!
                    $furigana: String!
                    $description: String!
                ){
                    updateProfile(
                        id: $id
                        thumbnailUrl: $thumbnailUrl,
                        name: $name,
                        furigana: $furigana,
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
                mutation {
                    deleteProfile(
                        id: "${id}"
                    ) {
                        id
                    }
                }
            `
            , variables)
        }

    }
}