const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// this is for heroku. If the environment variable port exisits it assigns, else uses 3000
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Not able to append to server.log');
        }
    });
    console.log(log);

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'FINALYTICS',
//         welcomeMessage: 'Page is under maintenance. we will be right back.',
//         currentYear: new Date().getFullYear()
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello express</h1>');
    // res.send({
    //     name: 'Vipin',
    //     likes: ['learning', 'kungfu']
    // });
    res.render('home.hbs', {
        pageTitle: 'FINALYTICS',
        welcomeMessage: 'Welcome to finalytics',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
    
});


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Something bad has happened',
        subMessages: ['learning', 'kungfu']
    });
});

// for heroku it will use the environment varibale to setup the port
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});