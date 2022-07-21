# Databases

## Mongoose
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

In terms of Node.js, [mongodb](https://www.npmjs.com/package/mongodb) is the native driver for interacting with a MongoDB instance and [mongoose](https://www.npmjs.com/package/mongoose) is an Object modeling tool for MongoDB.

Mongoose is built on top of the mongodb driver to provide programmers with a way to conveniently create and manage data and schemas in MongoDB.

### Resources
- [mongoose](https://www.npmjs.com/package/mongoose)
- [Mongoose getting started](https://mongoosejs.com/docs/index.html)
- [Express Tutorial Part 3: Using a Database (with Mongoose)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)
- YouTube [first 8:40 minutes](https://www.youtube.com/watch?v=DZBGEVgL2eE) for basics

## Setup
First install Node.js and MongoDB, then:
```js
npm install mongoose
```

Import `mongoose`:
```js
const mongoose = require('mongoose');
```

We can now start working with mongoose. First, we need to define a connection (with a `mongodb://` URI, or the parameters host, database, port and options):
```js
await mongoose.connect('mongodb://localhost/my_database');
```

#### Note 
Mongoose buffers all the commands until it's connected to the database. This means that you don't have to wait until it connects to MongoDB in order to define models, run queries, etc.

### Defining a Model
Mongoose can define the structure of the documents and the types of data stored in the DB. It is done through the Schema interface. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

Let's define our schema for the supermarket DB (as you can see the schema can have limitations to the content such as min and default):
```js
const ProductSchema = new mongoose.Schema({
  name: String,
  section: String,
  price: { type: Number, min: 0 },
  amountInStock: Number,
  expirationDate: { type: Date, default: Date.now },
  similarItems: [String],
});
```

Now that we've got a schema with properties of different types, the next step is compiling our schema into a Model.
```js
const ProductModel = mongoose.model('Product', ProductSchema);
```

You can use the defined model to create new documents in the DB:
```js
const productDoc = new ProductModel({ name: 'Coffee',...  });
await productDoc.save();
```

## Mongoose CRUD

### Create
Documents can be created in the database. Each document has a unique identifier managed by mongoose and mongoDB.

For the ProductSchema defined inside `Product.js` file:
```js
const Product = require('./Product');

Product.create({
  name: 'Coffee',
  section: 'Hot beverages',
  price: 24,
  amountInStock: 18,
  expirationDate: new Date('24/03/2023'),
  similarItems: [ 'Decaf Coffee', 'Black Tea' ],
})
```

### Read

The API or query language allows developers to query for documents in mongoDB using their unique identifiers or field values (indexes can be added to the database in order to increase read performance).

Mongoose supports the query syntax of MongoDB. Documents can be retrieved using a model's `find`, `findById`, `findOne`, or `where` static methods.
```
Product.find({}).where('price').gt(10)
  .than((products) => {
    console.log(products);
  }) 
```

### Update
In order to update a currently existing item in the DB, use `updateOne()` or `updateMany()`.

With `updateOne()` MongoDB will update only the first document that matches filter. 
Use `replaceOne()` if you want to overwrite an entire document rather than using atomic operators like $set.

With `updateMany()` MongoDB will update all documents that match filter. 

```js
Product.updateMany(
  // filter
  { expirationDate: {$gt: new Date(2022, 7, 1)}},
  // update
  { price: 12 },
  // options
  // callback
  function (err, docs) {
    if (err) {
      console.log(err)
    } else {
      console.log("Updated Docs : ", docs);
    }
  }
);
```

### Delete

Documents can be deleted using mongoose `deleteOne()` and `deleteMany()`:
```
Product.deleteOne({name: 'Coffee'});
```

