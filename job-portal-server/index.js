require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;


//middleware
app.use(express.json());
app.use(cors());

//user:guryanshsingla
//password:123456@G

const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal.d1nn7k8.mongodb.net/?retryWrites=true&w=majority&appName=job-portal`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
        client.connect();

        //create db
        const db=client.db("mernJobPortal");
        const jobsCollections=db.collection("jobs");

        //post a job
        app.post("/post-job", async(req, res) => {
            const body=req.body;
            body.createAt=new Date();

            const result=await jobsCollections.insertOne(body);
            if(result.insertedId){
                return res.status(200).send(result)
            }else{
                return res.status(404).send({message:"Can't insert! Try again later", status:false});

            }
        })

        //get all jobs
        app.get("/all-jobs", async(req, res) => {
            const jobs= await jobsCollections.find().toArray()
            res.send(jobs);
        })

        //get jobs by email
        app.get("/myJobs/:email", async(req, res) => {
            const jobs=await jobsCollections.find({postedBy:req.params.email}).toArray();
        res.send(jobs);
        })

        //get job by id
        app.get("/all-jobs/:id", async(req, res) => {
            const id=req.params.id;
            const job=await jobsCollections.findOne({_id:new ObjectId(id)});
            res.send(job);
        })

        //delete a job
        app.delete("/job/:id", async(req, res) => {
            const id=req.params.id;
            const filter={_id:new ObjectId(id)}
            const result=await jobsCollections.deleteOne(filter);
            res.send(result);
        })

        //update a job by id
        app.patch("/update-job/:id", async(req, res) => {
            const id=req.params.id;
            const jobData=req.body;
            const filter={_id:new ObjectId(id)};
            const options={upsert:true};
            const updateDoc={
                $set: {...jobData},
            };

            const result=await jobsCollections.updateOne(filter,updateDoc,options);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        client.db("admin").command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         // await client.close();
//     }
// }

// run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Welcome to the JOB PORTAL server!');
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});