import {Nitro} from "nitropack"
import { MongoClient, ServerApiVersion } from "mongodb"
export default async (_nitroApp : Nitro) => {
    const config = useRuntimeConfig()
    const client = new MongoClient(config.mongodbUri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
    })
    try {
        await client.connect()
        const devDB = client.db('dev')
        const mockCollection = devDB.collection('mockData')
        const datas = await mockCollection.find({}).toArray()
        // console.log(datas)
        console.log('Connected to MongoDB')
    } catch(err) {
        console.log(`Error connecting to mongodb: ${err}`)
    }
}