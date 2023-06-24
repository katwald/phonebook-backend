require("dotenv").config();
const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// const password = process.argv[2];
mongoose.set("strictQuery", false);
// const URL = process.env.MONGODB_URI;
const URL = `mongodb+srv://fullstack:AZ3MqfylTsIJCkM4@cluster0.qwydesl.mongodb.net/phoneBook?retryWrites=true&w=majority`;
console.log("connectingURLLL", URL);

mongoose
  .connect(URL)
  .then((result) => console.log("connected to MongoDB"))
  .catch((error) => console.log("error connecting to MongoDb", error.message));

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "chiran",
  number: 5533833,
});

person.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});

Person.find({}).then((persons) => {
  persons.forEach((person) => console.log(person));
  mongoose.connection.close();
});
