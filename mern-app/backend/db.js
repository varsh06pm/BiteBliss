// "mongodb+srv://varsha123:varsha123@cluster0.e8jmrg9.mongodb.net/?retryWrites=true&w=majority"

const mongoose = require('mongoose');
const mongo_URI = "mongodb+srv://varsha123:varsha123@cluster0.e8jmrg9.mongodb.net/gofoodmern?retryWrites=true&w=majority"
const connectDB = async () => {
    try {
      await mongoose.connect(mongo_URI);
      console.log('Connected!');
      let fetched_data = mongoose.connection.db.collection("fooditems");
      let data=await fetched_data.find({}).toArray()
         const foodCategory =  mongoose.connection.db.collection("food_category");
        let categoryData=await foodCategory.find({}).toArray()
      global.fooditems = data;
      global.food_category = categoryData;
      //console.log(global.fooditems);
    } catch (error) {
      console.log('err: ', error);
    }
  };

module.exports = connectDB;
