//need expresso coffee
const express = require('express');
//body  is cut half (parse) and seprate into   part 
const bodyParser = require('body-parser');
//cookies is divided into pieces 
const cookieParser = require('cookie-parser');
// apple is making expresso
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise = global.Promise;
//mongoose is process connecting ...datadonkey 
mongoose.connect(process.env.DATABASE)

app.use(bodyParser.urlencoded({


    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());


//==========
//      MODEL
//=============
const {
    User
} = require('./models/user');
const {
    Brand
} = require('./models/brand');

const {
    Wood
} = require('./models/wood');

//===== MiddleWare======//
const {
    admin
} = require('./middleware/admin');
const {
    auth
} = require('./middleware/auth');



///======================
// BRANDS 
//=======================
app.post('/api/product/brand', auth, admin, (req, res) => {
    const brand = new Brand(req.body);
    brand.save((err, doc) => {
        if (err) return res.json({
            sucess: false,
            err
        })
        res.status(200).json({
            success: true,
            brand: doc
        })
    })
});

app.get('/api/product/brands', (req, res) => {
    Brand.find({}, (err, brands) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(brands);
    });
})
///======================
// Brands-woods 
//=======================
app.post('/api/product/wood', auth, admin, (req, res) => {
    const wood = new Wood(req.body);
    wood.save((err, doc) => {
        if (err) return res.json({
            sucess: false,
            err
        });
        res.status(200).json({
            sucess: true,
            wood: doc

        })

    })
});

app.get('/api/product/woods', (req, res) => {
    Wood.find({}, (err, woods) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(woods);
    })
})
//========================
//      USERS
//========================
app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role == 0 ? false : true,
        isAuth: true,
        eamil: req.user.email,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history,


    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({
        _id: req.user._id
    }, {
            token: ''
        },
        (err, doc) => {
            if (err) return res.json({
                sucess: false,
                err
            });
            return res.status(200).send({
                sucess: true
            })
        }


    );
});
app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if (err) return res.json({
            sucess: false,
            err
        });
        res.status(200).json({
            sucess: true,
            userdata: doc

        });
    })
})

app.post('/api/users/login', (req, res) => {
    User.findOne({
        'email': req.body.email
    }, (err, user) => {
        if (!user) return res.json({
            loginSucess: false,
            message: 'Auth fail email not found '
        });
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({
                loginSucess: false,
                message: "wrong password"
            });
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie('e_commerce', user.token).status(200).json({
                    loginSucess: true
                });
            });
        });
    });



})
const port = process.env.PORT || 3002

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})