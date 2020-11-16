/********************************************************************************* 

 *  WEB322 – Assignment 02 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
  No part * of this assignment has been copied manually or electronically from any other source * (including 3rd party web sites) or distributed to other students. * 
  * Name: Farhang Einifar Student ID: 133018192 Date: 10/06/2020 * * Online (Heroku) Link: https://immense-hollows-55674.herokuapp.com/* 
  ********************************************************************************/

const express = require('express')
const dataService = require('./data-service')
const path = require('path')
const { employees } = require('./data-service')
const app = express()
const port = process.env.PORT || 8080
const multer = require('multer')
var fs = require('fs')
var storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
var upload = multer({ storage: storage });

dataService.initialize().then(
    () => {
        console.log('Start the server')
        app.use(express.static('public'))

        app.get('/', (req, res) => {
            res.status(200).sendFile(path.join(__dirname, './views', 'home.html'))
        })

        app.get('/home', (req, res) => {
            res.status(200).sendFile(path.join(__dirname, './views', 'home.html'))
        })

        app.get('/about', (req, res) => {
            res.status(200).sendFile(path.join(__dirname, './views', 'about.html'))
        })

        app.get('/managers', (req, res) => {
            dataService.getManagers().then(
                managers => res.status(200).json(managers),
                err => res.status(404).send(err),
            )
        })


        app.get('/employees', (req, res) => {
            if (req.query.status != undefined) {
                dataService.getEmployeesByStatus(req.query.status).then(
                    employees => res.status(200).json(employees),
                    err => res.status(404).send(err),
                )
            } else if (req.query.department != undefined) {
                dataService.getEmployeesByDepartment(req.query.department).then(
                    employees => res.status(200).json(employees),
                    err => res.status(404).send(err),
                )
            } else if (req.query.manager != undefined) {
                dataService.getEmployeesByManager(req.query.manager).then(
                    employees => res.status(200).json(employees),
                    err => res.status(404).send(err),
                )
            } else {
                dataService.getAllEmployees().then(
                    employees => res.status(200).json(employees),
                    err => res.status(404).send(err),
                )
            }

        })
        app.get('/employee/:value', (req, res) => {

            dataService.getEmployeeByNum(req.params.value).then(
                employees => res.status(200).json(employees),
                err => res.status(404).send(err),
            )

        })


        app.get('/departments', (req, res) => {
            dataService.getDepartments().then(
                departments => res.status(200).json(departments),
                err => res.status(404).send(err),
            )
        })
        app.get('/employees/add', (req, res) => {
            res.status(200).sendFile(path.join(__dirname, './views', 'addEmployee.html'))
        })

        app.post('/employees/add', (req, res) => {
            console.log("Hello")
            dataService.addEmployee(req.body).then(
                res.redirect('/employees')
            )
        })

        app.get('/images/add', (req, res) => {
            res.status(200).sendFile(path.join(__dirname, './views', 'addImage.html'))
        })

        app.post('/images/add', upload.single("imageFile"), (req, res) => {
            try {
                res.redirect('/images')
            } catch (error) {
                console.log(error);
                res.send(400);
            }
        })
        app.get('/images', (req, res) => {
            var path = "public/images/uploaded";

            fs.readdir(path, function(err, items) {
                res.json({ "images": items })
            });


        })



        app.get('*', function(req, res) {
            res.status(404).send('Page Not Found')
        })

        app.listen(port, () => {
            console.log(`Express http server listening on ${port}`)
        })
    },
    err => {
        console.log(err)
        process.exit(1)
    },
)