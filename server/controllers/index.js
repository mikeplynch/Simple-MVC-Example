// pull in our models. This will automatically load the index.js from that folder
const models = require('../models');
const Cat = models.Cat.CatModel;

// default fake data so that we have something to work with until we make a real Cat
const defaultData = {
  name: 'unknown',
  bedsOwned: 0,
};

let lastAdded = new Cat(defaultData);

const hostIndex = (req, res) => {
  res.render('index', {
    currentName: lastAdded.name,
    title: 'Home',
    pageName: 'Home page',
  });
};

const readAllCats = (req, res, callback) => {
  Cat.find(callback);
};

const readCat = (req, res) => {
 
};

const hostPage1 = (req, res) => {
  const callback = (err, docs) => {
    if(err) {
      return res.json({err});
    }
    
    res.render('page1', {cats:docs});
  }
  
  readAllCats(callback);
};

const hostPage2 = (req, res) => {
  res.render('page2');
};

const hostPage3 = (req, res) => {
  res.render('page3');
};

const getName = (req, res) => {

};

const setName = (req, res) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.beds) {
    return res.status(400).json({ error: 'firstname,lastname and beds are all required' });
  }
  
  const name = `${req.body.firstName} ${req.body.lastname}`;
  
  const catData = {
    name,
    bedsOwned: req.body.beds,
  };
  
  const newCat = new Cat(catData);
  
  const savePromise = newCat.save();
  
  savePromise.then(()=> {
    lastAdded = newCat;
    res.json({name});
  });
  
  savePromise.catch((err)=> {
    res.json({err});
  });
  
  
};

const searchName = (req, res) => {
  if (!req.query.name) {
    return res.json({ error: 'Name is required to perform a search' });
  }
};

const updateLast = (req, res) => {
	
};

const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

module.exports = {
  index: hostIndex,
  page1: hostPage1,
  page2: hostPage2,
  page3: hostPage3,
  readCat,
  getName,
  setName,
  updateLast,
  searchName,
  notFound,
};
