import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql'

import banners from './banner/query'
import personalized from './personalized/query'

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            banners,
            personalized
        }
    })
})

export default schema