import * as mongoose from 'mongoose';
import * as dotenv from "dotenv";
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env" });
(<any>mongoose).Promise = global.Promise;

let mongoOptions: any = {
    keepAlive: true,
    reconnectTries: 5,
    // useMongoClient: true,
}
mongoose.connect(process.env.MONGO_URL, mongoOptions).then(function () {
    console.log('Connected to MongoDB')
}, function (error) {
    console.error('failed to connect to MongoDB...', error);
});

export const mongooseConnection: mongoose.ConnectionBase = mongoose.connection;