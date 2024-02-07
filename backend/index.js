const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

const Mongodb = require('./db');
Mongodb()
// dbConnect();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// using middleware
app.use(cors());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Origin","http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE,SEND" 
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization", "Access-Control-Allow-Origin");
    next();
})
app.use(express.json());
app.use('/api',require("./Routes/CreateUser.js"));
app.use('/api',require("./Routes/DisplayData.js"));
app.use('/api',require("./Routes/OrderData.js"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

// ...............................................


// Wrap the entire setup in an async function to ensure proper handling
// const Mongodb = require('./db');
// const startServer = async () => {
//     try {

//         await Mongodb();  // Wait for the MongoDB connection to be established

//         // ... rest of your code
//         app.get('/', (req, res) => {
//             res.send('Hello World!')
//           })
          
//         // using middleware
//         app.use(express.json());
//         app.use('/api', require("./Routes/CreateUser.js"));

//         app.listen(port, () => {
//             console.log(`Example app listening on port ${port}`);
//         });
//     } catch (error) {
//         console.error('Error starting the server:', error);
//     }
// };

// // Start the server
// startServer();
// ...............................................