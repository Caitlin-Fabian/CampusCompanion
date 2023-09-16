/** @format */


const express = require("express");
const app = express();

const { MongoClient} = require("mongodb");


const url =
    'mongodb+srv://Dynie:AKLbJ58eXZ2B5yKv@cluster0.w5l1p5w.mongodb.net/'


const client = new MongoClient(url);

app.use(express.json());
    
let collection; 

async function connectToDB() {
	try {
		await client.connect();
		console.log("Connected to MongoDB");

		
		const db = client.db("db");
		collection = db.collection("contacts"); 
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
}

connectToDB();


app.get("/contacts", async (req, res) => {
    try {
        
        await client.connect();

       
        const db = client.db("db");
        const collection = db.collection("contacts");
       
    
        const c = await collection.find({}).toArray();
        res.status(200).json(c);
        
    }
     catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        
        await client.close();
    }
});

app.post("/submit", async (req, res) => {
	
	const { userid, name, phonenumber } = req.body;

	const contact = {
		userid,
		name,
		phonenumber,
	};

	try {
		
		const result = await collection.insertOne(contact);

		res
			.status(201)
			.json({
				message: "Data received and processed successfully",
				insertedId: result.insertedId,
			});
	} catch (error) {
		console.error("Error saving data to MongoDB:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});