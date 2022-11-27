const mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://127.0.0.1:27017',
                    { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;
    const db = client.db('mongo-web');
    console.log(db);
});