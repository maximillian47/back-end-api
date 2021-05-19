

function generateUID(){
    let uid = "";
    for (let index = 0; index < 10; index++) {
        const rand = Math.floor(Math.random() *10)
        uid += rand;
    }
    return uid;
}

// function validateUID() {
//     let id = generateUID();

//     while (UIDs[id]) {
//         id = generateUID();
//     }

//     UIDs[id] = true;

//     return id;
// }
exports.uid = generateUID;