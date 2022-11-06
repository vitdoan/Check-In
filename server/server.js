const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const port = 3001
let num = 0;
const database = {
    users: [
        {
            id: '773',
            name: 'Vi',
            username: 'vtdoan',
            password: 'cookie',
            joined: new Date(),
            places: [{
                place_id: 'ChIJUQ8hDmEpdTERRjmdgcTBdOE',
                lastVisit: '2022-09-01T04:10:25.565Z',
                numVisits: 20,
                prevVisit: '2022-09-01T04:10:25.565Z'
            },
            {
                place_id: 'ChIJszdHEQN9GGARy9MJ1TY22eQ',
                lastVisit: '2022-08-10T04:10:25.565Z',
                numVisits: 1,
                prevVisit: ''
            }
            ]
        },
        {
            id: '2343',
            name: 'Jimi',
            username: 'jimi',
            password: 'cookies',
            joined: new Date(),
            places: []
        }
    ],
    login: [
        {
            id: '773',
            username: 'vtdoan',
            hash: ''
        },
        {
            id: '2343',
            username: 'jimi',
            hash: ''

        }
    ]
}

app.get('/', (req, res) => {
  res.send(database.users)
})

app.post('/signin', (req, res) => {
    const {username, password} = req.body;
    const result = bcrypt.compareSync(password, '$2b$10$9UX6Fx2ScTPdq/yqnYN9N.hhbr2thuuRNcemI4eOLJVu6aHCBXwqe');
    for(const user of database.users){
        if(user.username === username && user.password === password){
            return res.json(user);
        }
    }
        res.status(404).json('error logging in')
})

app.post('/register', (req, res) => {
    const {name, username, password} = req.body;
    const hash = bcrypt.hashSync(password,10);
    database.users.push({
        id: ++num+"",
        name: name,
        username: username,
        joined: new Date(), 
        places: []
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id',(req,res)=>{
    const {id} = req.params;
    for(const user of database.users){
        if(user.id === id){
            return res.json(user);
        }
    }
    res.json('cannot find user')
})

app.put('/visits', (req, res) => {
    const {id, place_id} = req.body;
    for(const user of database.users){
        if(user.id === id){
            let exist = false;
            let placeArr = user.places;
            for(let i = 0; i < placeArr.length; i++){
                if(placeArr[i].place_id === place_id){
                    placeArr[i].prevVisit = placeArr[i].lastVisit;
                    placeArr[i].numVisits++;
                    placeArr[i].lastVisit = new Date();
                    exist = true;
                    return res.json(placeArr[i]);
                }
            }
            if(!exist){
                let newPlace = {
                    place_id: place_id,
                    lastVisit: new Date(),
                    prevVisit: new Date(),
                    numVisits: 1
                }
                user.places.push(newPlace);
                return res.json(newPlace);
            }
            // return res.json(place);
        }
    }
    res.json('cannot find user')
})

app.listen(port, () => {
  console.log(`App is running on on port ${port}`)
})
