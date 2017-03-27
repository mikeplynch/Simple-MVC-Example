const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let CatModel = {};

const CatSchema = new mongoose.Schema({
  name: {
    type: Strinng,
    required: true,
    trim: true,
    unique: true,
  },
  
  bedsOwned: {
    type: Number,
     min: 0,
    required: true,
  },
  
  createdDate: {
    type: Date,
    default: Date.now,
  }
  
});

CatSchema.statics.sayName = (cat) => {
  console.log(cat.name);
};

CatSchema.statics.findByName = (nameString, callback) => {
  const search = {
    name: nameString
  };
  
  return CatModel.findOne(search, callback);
};

catModel = mongoose.model('Cat', CatSchema);

module.exports.sayName = CatSchema.statics.sayName;
module.exports.findByName = CatSchema.statics.findByName