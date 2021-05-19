const express = require("express");
const app = express();
app.use(express.json());

const {destinations} = require("./db");
const {uid} = require("./services");

app.listen(6000, ()=> {
    console.log('Max app is listening.');
});

app.get("/destinations", (req, res) => {
    res.send(destinations);
});

app.use(express.json());

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
        id: uid,
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
 
    const filtered = destinations.filter((dest) => {
        if (dest.id !== id) 
            return true;
        
    })

    destinations = filtered;
    res.send({status:"success"});

});