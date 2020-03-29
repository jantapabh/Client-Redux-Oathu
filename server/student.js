let express = require('express')
let bodyParser = require('body-parser');
const session = require('express-session')
let cors = require('cors')
let ngrok = require('ngrok');



let authRoutes = require('./routes/auth');
let fbRoutes = require('./routes/fb');
let psuRoute = require('./routes/psu');


let app = express()
let router = express.Router()

// session is not define

app.use(cors({origin: ['http://localhost:3000'], methods: ['GET', 'POST'], credentials: true}));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 },
   resave : false, saveUninitialized: false }))

//ส่วนการทำงานการดึงค่าจาก API

app.use('/api', bodyParser.json(), router)
app.use('/api', bodyParser.urlencoded({
    extended: false
}), router);

let students = [{
        generation: 59,
        idStudent: '5935512034',
        name: 'Noppadol',
        surname: 'Sangkhla',
        faculty: 'coe',
        advisor: 'Warodom'
    },
    {
        generation: 59,
        idStudent: '5935512027',
        name: 'Narinthip',
        surname: 'Ingjan',
        faculty: 'coe',
        advisor: 'Titinun'

    },
    {
        generation: 59,
        idStudent: '5935512004',
        name: 'Nattapon',
        surname: 'Keakeaw',
        faculty: 'coe',
        advisor: 'Warodom'

    },

    {
        generation: 59,
        idStudent: '5935512040',
        name: 'Julrapon',
        surname: 'Raksa',
        faculty: 'coe',
        advisor: 'Warodom'

    },
    {
        generation: 60,
        idStudent: '6035512034',
        name: 'Jantapa',
        surname: 'Binheem',
        faculty: 'coe',
        advisor: 'Warodom'
    },
    {

        generation: 60,
        idStudent: '6035512080',
        name: 'Teerapat',
        surname: 'Pattanakul',
        faculty: 'coe',
        advisor: 'Titinun'

    },
    {
        generation: 60,
        idStudent: '6035512050',
        name: 'Rusnee',
        surname: 'Awea',
        faculty: 'coe',
        advisor: 'Warodom'

    },

    {
        generation: 60,
        idStudent: '6035512040',
        name: 'Tanapom',
        surname: 'Kamdee',
        faculty: 'coe',
        advisor: 'Warodom'

    },
];

router.route('/students')

.get((req, res) => res.json(students))

.post((req, res) => {

    let student = {}
    student.generation = students[students.length - 1].generation + 1
    student.idStudent = req.body.idStudent;
    student.name = req.body.name;
    student.surname = req.body.surname;
    student.faculty = req.body.faculty;
    student.advisor = req.body.advisor;
    students.push(student)
    res.json({ message: 'Student created!' })
})

router.route('/students/:student_generation')

.get((req, res) => {
    let generation = req.params.student_generation
    let index = students.findIndex(student => (student.generation === +generation))
    res.json(students[index])
})

.put((req, res) => {

    // Update a bear
    let generation = req.params.student_generation
    let index = students.findIndex(student => (student.generation === +generation))
    students[index].idStudent = req.body.idStudent;
    students[index].name = req.body.name;
    students[index].surname = req.body.surname;
    students[index].faculty = req.body.faculty;
    students[index].advisor = req.body.advisor;
    res.json({ message: 'Student Updated!' + req.params.student_generation });

})


.delete((req, res) => {

    let generation = req.params.student_generation
    let index = students.findIndex(student => student.generation === +generation)
    students.splice(index, 1)
    res.json({ message: 'Student Deleted : ' + req.params.student_generation });
})


//ส่วนที่เพิ่มทำการ route ไปยังหน้าต่าง ๆ ที่เรากำหนด

router.route('/auth')
.get(authRoutes.index);

router.route('/auth/logout')
.get(authRoutes.logout);

router.route('/auth/facebook')
.get(fbRoutes.loginUrl);

router.route('/auth/facebook/login/callback')
.get(fbRoutes.loginCallback);

router.route('/auth/psu')
.get(psuRoute.login);


app.use("*", (req, res) => res.status(404).send('404 Not found'));

app.listen(8000, () => { console.log('server is running') })