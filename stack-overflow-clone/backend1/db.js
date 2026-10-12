const mongoose = require("mongoose");

const url =
  "mongodb+srv://lavi:<db_password>@cluster0.ihpe7jd.mongodb.net/?appName=Cluster0";

module.exports.connect = () => {
  mongoose
    .connect(url)
    .then((res) => console.log("MongoDB is connected successfully"))
    .catch((error) => console.log("Error: ", error));
};
