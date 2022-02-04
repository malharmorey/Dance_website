const express = require('express');
const path = require('path');
const fs = require('fs');
const port = 5500;
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

// app.use(bodyparser.urlencoded({
//     extended:true
// }));

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1/danceWebsite');
}

//Defining mongoose schema
const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    contactNo: String,
    desc: String,
    newsletter: String,
});

const contact = mongoose.model('contact', contactSchema);

//EXPRESS SPECIFIC STUFF(configuration)
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
});

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
});

app.post('/contact', (req, res) => {
    const dataRecieved = new contact(req.body);
    dataRecieved
        .save()
        .then(() => {
            // res.send("Your form has been submitted sucessfully!");
            res.status(200).render('contact.pug');
        })
        .catch(() => {
            res.status(400).send('Error occured while submitting the form.');
        });
});

//START SERVER
app.listen(port, () => {
    console.log(`The application is running at ${port}`);
});
