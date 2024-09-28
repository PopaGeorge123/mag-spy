import mongoose from 'mongoose';

const connectMongo = async () => {
  if (!process.env.MONGODB_URI) {
      throw new Error(
        "Add the MONGODB_URI environment variable inside .env.local to use mongoose"
        );
  }
  // Check if the first connection is already active
  if (mongoose.connections[0].readyState) {
    console.log("Connected to Database");
    return true;
  }

  // If not connected, establish a new connection
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    console.log("Connected to Database");
    return true;
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
};



// const connectMongo = async () => {
//   if (!process.env.MONGODB_URI) {
//     throw new Error(
//       "Add the MONGODB_URI environment variable inside .env.local to use mongoose"
//     );
//   }
//   return mongoose
//     .connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .catch((e) => console.error("Mongoose Client Error: " + e.message));
// };

export default connectMongo;
