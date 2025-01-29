import mongoose from "mongoose";

async function DbConnection () {
  await mongoose.connect('mongodb://127.0.0.1:27017/EcomercePhone');
  console.log("Db connect successfully")
}

export default DbConnection