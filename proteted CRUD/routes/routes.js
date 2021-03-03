/*=====================Header Section===================== */
//-----Requiring express files
const express = require('express');
const router = express.Router();


const path = require('path');

const { validator } = require('../validator/inputValidate');

//-----Requiring all the controller files
const control = require('../controller/controller')


/*============================ADMIN Login Section ============================ */


//-----login page 
router.post('/login', control.checkLogin);

router.get('/dashboard', control.dashboard);

router.get('/logout', control.logout);

router.get('/', control.adminInfo);

//-----display all users
router.get('/users', control.getUsers);




/*============================CRUD API SECTION============================ */

/*==============READ Section=============== */

//-----display all records
router.get('/records/read', control.readRecords);

//-----display the record with id
router.get('/records/read/:Id', control.readRecordWithId);

//-----display login homepage
router.get('/records', control.recordInfo);



/*===========WRITE Section======= */

//-----adding a record to database
router.post('/records/add', validator, control.addRecord);


/*============UPDATE Section========== */

//-----updating the record
router.patch('/records/update/:Id', control.updateRecordWithId);



/*========DELETE Section======== */

//-----deleting a record
router.delete('/records/delete', control.deleteRecordWithId);




/*=====================Invalid path===================== */
//-----Page not Found
router.use('/', control.notFound);



/*=====================Footer Section===================== */

module.exports = router;
