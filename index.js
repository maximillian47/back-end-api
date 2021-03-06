const { response } = require("express");
const express = require("express");
let {destinations} = require("./db");
const {uid} = require("./services");
const app = express();

console.log(process.env.port);

app.use(express.json());
const port = process.env.port || 8000;

app.listen(port, ()=> {
    console.log(`Max app is listening on port ${port}`);
});

app.get("/destinations", (req, res) => {
    res.send(destinations);
});

app.post("/destinations", (req, res) => {
    //req.query.search
    const{name, location, photo, description} = req.body;

    if (
        name ===undefined ||
        name.length === 0 ||
        location === undefined ||
        location.length === 0
    ){
        return res.status(400).send ({ error: "name and location are required"});
    }

    destinations.push({
        id: uid(),
        name: name,
        location: location,
        photo: photo ? photo :"",
        description: description ? description : "",
    });

    console.log(req.body);
    res.send({status:"success"});

});

app.delete("/destinations/:id", (req, res) => {
    // console.log(req.params);

    const {id}= req.params;    
 
    let filtered = destinations.filter((dest) => {
        if (dest.id !== id) 
            return true;
        
    })

    destinations = filtered;
    res.send({status:"success"});

});

app.put("/destinations/:id", (req, res) => {
    const {id} = req.params;

    const {name, location, photo, description} = req.body;

    if (!name || !location || !photo || !description) {
        return res.status(400).json({status: "no data to update"})
    }

    for(let dest of destinations) {
        if (dest.id === id) {
            if (name) {
                dest.name = name;
            }
            dest.name = name ? name :dest.name;

            if (location) {
                dest.location = location
            }
            break;
        }
    }

    res.send({status: success});
});

function getPic(destinations) {
    const API = ``;

    let dest = destination;
    const URL = `${API}${dest}`;
    let index = Math.floor(Math.random() *10);
    return fetch(URL)
    .then ((response) => response.json())
    .then ((pics) => pics.results[index].urls.large);
}