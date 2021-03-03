const path = require("path");

const adminSchema = require('../model/signup');

const recordSchema = require('../model/data');


const { validationResult } = require('express-validator');


//===========================ADMIN SECTION===========================



//-----Display all the users
exports.getUsers = async (req, res) => {
    if (!req.session.loggedIN) {
        return res.send("Unauthorised Access")
    }
    // res.send('Hello')
    try {
        const users = await adminSchema.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
}



// //-----display the record with specific id
// exports.getUserById = async (req, res) => {
//     try {
//         const record = await adminSchema.findById(req.params.Id);
//         res.json(record);
//     } catch (error) {
//         res.json({ message: error });
//     }
// }


//-----Display home Root 
exports.adminInfo = (req, res) => {
    res.send("Welcome to the REST API by Nilesh Wahule");
}


//-----updating the record with specific id
// exports.updateWithId = async (req, res) => {
//     try {
//         const updatedRecord = await adminSchema.updateOne(
//             { _id: req.params.Id },
//             { $set: { firstName: req.body.firstName } });
//         res.json(updatedRecord);
//     } catch (err) {
//         res.json({ message: err });
//     }
// }


// //-----remove the User with specific id
// exports.deleteWithId = async (req, res) => {
//     try {
//         const removedRecord = await adminSchema.deleteOne({ _id: req.params.Id });
//         res.json(removedRecord);
//     } catch (err) {
//         res.json({ message: err });
//     }
// };




exports.checkLogin = async (req, res) => {


    if (req.session.loggedIN) {
        res.redirect('/dashboard')
        console.log("redirected");
    } else {
        const user = req.body.username;
        const pass = req.body.password;
        console.log(user, pass);
        const userFound = await adminSchema.findOne({ username: user })
        if (userFound) {
            console.log("This is username", userFound.username);
            if (userFound.username === user) {
                // console.log("username matched");
                if (userFound.password === pass) {
                    // console.log("password matched");
                    req.session.loggedIN = true;
                    return res.send("You are Logged in successfully")
                    // res.redirect('/dashboard');
                }
                else {
                    return res.send("incorrect password")
                }
            }
        }
        res.send("User Not found")
    }

};

exports.dashboard = (req, res) => {
    if (!req.session.loggedIN) {
        return res.send("You need to login First")
    }
    console.log(req.session);
    res.send("Now you can do CRUD");

}

exports.logout = (req, res) => {
    if (!req.session.loggedIN) {
        return res.send("You are already logged out.")
    }
    req.session.destroy();
    res.send("You are logged out succesfully");
}






// //-----display the User with specific id
// exports.getWithId = async (req, res) => {
//     if (!req.session.loggedIN) {
//         return res.send("Unauthorised Access")
//     }
//     try {
//         const user = await adminSchema.findById(req.params.Id);
//         res.json(user);
//     } catch (error) {
//         res.json({ message: error });
//     }
// }



//-----Invalid Route 
exports.notFound = (req, res, next) => {
    res.status(404).send("Oops......Invalid Route")
}



// //-------Adding user to database

// exports.addUser = async (req, res) => {
//     if (!req.session.loggedIN) {
//         return res.send("Unauthorised Access")
//     }
//     // console.log("data is coming");

//     //----validating input fileds 
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }


//     //----adding user Data to Database
//     const user = new adminSchema({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         username: req.body.firstName.toLowerCase() + '.' + req.body.lastName.toLowerCase(),
//         email: req.body.email,
//         phone: req.body.phone,
//         password: req.body.password
//     });
//     try {
//         const savedUser = await user.save()
//         res.json(savedUser);
//         console.log(savedUser);
//     } catch (error) {
//         res.json({ message: error });
//         console.log({ message: error });
//     }
//     // console.log(req.body.firstName);
//     // console.log(req.body.lastName);
//     console.log("Thank you " + req.body.firstName + " for registering");
// }


//==========================Record Section========================


//-----Display home Route 
exports.recordInfo = (req, res) => {
    if (!req.session.loggedIN) {
        return res.send("Unauthorised Access")
    }
    res.send("Now you can perform CRUD");
}


//-----Display all the records
exports.readRecords = async (req, res) => {
    if (!req.session.loggedIN) {
        return res.send("Unauthorised Access")
    }
    // res.send('Hello')
    try {
        const users = await recordSchema.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
}

//-----Display the Record with specific id
exports.readRecordWithId = async (req, res) => {
    if (!req.session.loggedIN) {
        return res.send("Unauthorised Access")
    }
    try {
        const user = await recordSchema.findById(req.params.Id);
        res.json(user);
    } catch (error) {
        res.json({ message: error });
    }
}


//-----delete the record with specific id
exports.deleteRecordWithId = async (req, res) => {
    if (!req.session.loggedIN) {
        return res.send("Unauthorised Access")
    }
    try {
        const removedRecord = await recordSchema.deleteOne({ _id: req.params.Id });
        res.json(removedRecord);
    } catch (err) {
        res.json({ message: err });
    }
};


//-----updating the record with specific id
exports.updateRecordWithId = async (req, res) => {
    if (!req.session.loggedIN) {
        return res.send("Unauthorised Access")
    }
    try {
        const updatedRecord = await recordSchema.updateOne(
            { _id: req.params.Id },
            { $set: { firstName: req.body.firstName } });
        res.json(updatedRecord);
    } catch (err) {
        res.json({ message: err });
    }
}


//-------Adding user to database

exports.addRecord = async (req, res) => {
    if (!req.session.loggedIN) {
        return res.send("Unauthorised Access")
    }
    // console.log("data is coming");

    //----validating input fileds 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    //----adding user Data to Database
    const user = new recordSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone
    });
    try {
        const savedRecord = await user.save()
        res.json(savedRecord);
        console.log(savedRecord);
    } catch (error) {
        res.json({ message: error });
        console.log({ message: error });
    }
    // console.log(req.body.firstName);
    // console.log(req.body.lastName);
    console.log("Thank you " + req.body.firstName + " for registering");
}