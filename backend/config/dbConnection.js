import mongoose from "mongoose";

mongoose.set('strictQuery', false);

//to check if connection is established one way is using .then and other way is following


const connectionToDB= async()=>{
    try{
        const {connection} = await mongoose.connect(process.env.MONGO_URI);

        if(connection){
            console.log(`Connected to MongoDB: ${connection.host}`);
        } 

    } catch(e){
        console.log(e);
        process.exit(1);
    }
}

export default connectionToDB
