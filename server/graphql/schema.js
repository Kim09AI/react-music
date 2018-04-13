import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql'

import banners from './banner/query'
import personalized from './personalized/query'
import search from './search/query'

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            banners,
            personalized,
            ...search
        }
    })
})

export default schema