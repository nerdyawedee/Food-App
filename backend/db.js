// connecting express to mongodb
const mongoose = require('mongoose');
const mongoUri = "mongodb+srv://gofood:<>password@cluster0.hlknrya.mongodb.net/<databas_name>?retryWrites=true&w=majority";

const Mongodb = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected successfully");

    // reading data .......................These are admin side............................
    // const fetch_data = await mongoose.connection.db.collection('foodItem');
    // fetch_data.find({}).toArray(async function (err, data) {
    //   if (err) {
    //     console.error("Error fetching food items:", err);
    //     return;
    //   }

    //   try {
    //     const foodCategory = await mongoose.connection.db.collection('foodcategory');
    //     foodCategory.find({}).toArray(function (err, catdata) {
    //       if (err) {
    //         console.error("Error fetching food categories:", err);
    //         return;
    //       }

    //       global.food_items = data;
    //       global.foodCategory = catdata;
    //       console.log("Data fetched successfully");
    //     });
  //     } catch (error) {
  //       console.error("Error fetching food categories:", error);
  //     }
  //   })
 
  const fetch_data = await mongoose.connection.db.collection('foodItem');
    const data = await fetch_data.find({}).toArray();

    const foodCategory = await mongoose.connection.db.collection('foodcategory');
    const catdata = await foodCategory.find({}).toArray();

    global.food_items = data;
          global.foodCategory = catdata;
          console.log("Data fetched successfully");
 }
  catch (error) {
    console.log("Something went wrong!!!");
    console.error(error);
  }
  // .......................error while conecting to the altlas to my apllication....
  // finally {
  //     // Close the connection when done
  //     mongoose.connection.close();
  // }
  // ...................................................................
};


module.exports = Mongodb;
