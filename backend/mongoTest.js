// Standalone Temporary Test Code for MongoDB

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client)
{
    console.log('Connected!');

    // database name
    const dbName = `MITxPRO-WEEK27-Test`;
    const db = client.db(dbName);

    // new user
    var name = 'user' + Math.floor(Math.random() * 1000);
    var email = name + '@mit.edu';

    // insert into customer table
    var collection = db.collection('Customers');
    var doc = {name, email};
    collection.insertOne(doc, {w: 1}, function (err, result)
    {
        console.log(`Document inserted for ${name}.`);
    });

    // read customers
    var customers = db
        .collection('Customers')
        .find()
        .toArray(function (err, docs)
        {
            console.log('Collection:', docs);

            client.close();
        });
});