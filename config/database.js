const mongoose= require("mongoose");

require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL)

    .then( () => {console.log("DB connected successfully")})
    .catch( (err) => {
        console.log("DB CONECTION ISSUES");
        console.log(err);
        process.exit(1);
    });
}