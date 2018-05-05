import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLID,
    GraphQLBoolean
} from 'graphql'
import { Artist } from '../artist/model'
import { Album } from '../album/model'
import { Music } from '../music/model'

export const Song = new GraphQLObjectType({
    name: 'Song',
    fields: {
        "id": {
            type: GraphQLID
        },
        "name": {
            type: GraphQLString
        },
        "artists": {
            type: new GraphQLList(Artist)
        },
        "album": {
            type: Album
        },
        "duration": {
            type: GraphQLFloat
        },
        "copyrightId": {
            type: GraphQLID
        },
        "status": {
            type: GraphQLInt
        },
        "starred": {
            type: GraphQLBoolean
        },
        "rtype": {
            type: GraphQLInt
        },
        "ftype": {
            type: GraphQLInt
        },
        "mvid": {
            type: GraphQLID
        },
        "fee": {
            type: GraphQLInt
        },
        "ar": {
            type: new GraphQLList(Artist)
        }, 
        "al": {
            type: Artist
        }, 
        "pst": {
            type: GraphQLInt
        }, 
        "v": {
            type: GraphQLInt
        }, 
        "pop": {
            type: GraphQLInt
        }, 
        "mst": {
            type: GraphQLInt
        }, 
        "cp": {
            type: GraphQLInt
        }, 
        "dt": {
            type: GraphQLInt
        }, 
        "h": {
            type: Music
        }, 
        "l": {
            type: Music
        }, 
        "m": {
            type: Music
        }, 
        "mv": {
            type: GraphQLID
        }, 
        "privilege": {
            type: new GraphQLObjectType({
                name: 'Privilege',
                fields: {
                    "id": {
                        type: GraphQLID
                    }, 
                    "fee": {
                        type: GraphQLInt
                    }, 
                    "payed": {
                        type: GraphQLInt
                    }, 
                    "st": {
                        type: GraphQLInt
                    }, 
                    "pl": {
                        type: GraphQLInt
                    }, 
                    "dl": {
                        type: GraphQLInt
                    }, 
                    "sp": {
                        type: GraphQLInt
                    }, 
                    "cp": {
                        type: GraphQLInt
                    }, 
                    "subp": {
                        type: GraphQLInt
                    }, 
                    "cs": {
                        type: GraphQLBoolean
                    },
                    "maxbr": {
                        type: GraphQLInt
                    }, 
                    "fl": {
                        type: GraphQLInt
                    }, 
                    "toast": {
                        type: GraphQLBoolean
                    }, 
                    "flag": {
                        type: GraphQLInt
                    }, 
                    "preSell": {
                        type: GraphQLBoolean
                    }
                }
            })
        }
    }
})

export const Songs = new GraphQLList(Song)
