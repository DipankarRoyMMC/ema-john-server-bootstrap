const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

// middleware 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Ema-john server is running!!')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tmkhisl.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const productCollection = client.db('emaJohn').collection('products');
        app.get('/products', async (req, res) => {
            const page = req.query.page;
            const size = req.query.size;
            console.log(page, size);

            const query = {}
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            const count = await productCollection.estimatedDocumentCount();
            res.send({ count, products });
        })

    }
    finally {

    }

}
run().catch(err => console.log(err));


app.listen(port, () => {
    console.log(`my server is running ${port}`);
})
