import axios from 'axios'

const baseUrl = 'https://swapi.dev/api/people/'
var pepolesWithId = JSON.parse(localStorage.getItem('pepoles'));


async function getPepoles(filterBy = null) {
    var pepolesToReturn = [];
    if (localStorage.getItem('pepoles')) {
        pepolesToReturn = JSON.parse(localStorage.getItem('pepoles'))
    } else {
        pepolesToReturn = await axios.get(`${baseUrl}`)
            .then(res => {
                return res.data.results;
            })
        pepolesToReturn = pepolesToReturn.map(people => {
            people.id = _makeId();
            return people
        })
        localStorage.setItem('pepoles', JSON.stringify(pepolesToReturn));
        // console.log("localStorage.getItem('peoples'):", localStorage.getItem('peoples'))
    }

    if (filterBy && filterBy.term) {
        pepolesToReturn = _filter(filterBy.term, pepolesToReturn)
    }
    pepolesWithId = JSON.parse(JSON.stringify(pepolesToReturn));
    return pepolesToReturn
}

async function getPerson(id) {
    // console.log("pepolesWithId:", localStorage.getItem('pepoles'))
    const currPerson = await pepolesWithId.filter(person => {
        return (person.id === id)
    })
    return currPerson[0];
}

async function removePerson(idToRemove) {
    try {
        let peoples = pepolesWithId;
        const idx = peoples.findIndex(person => person.id === idToRemove)
        peoples.splice(idx, 1)
        localStorage.setItem('pepoles', JSON.stringify(peoples));
        return idx;
    } catch (err) {
        console.log(`ERROR: cannot remove person ${idToRemove}`);
        throw err;
    }
}

async function savePerson(personToAdd) {
    return personToAdd.id ? _updatePerson(personToAdd) : _addPerson(personToAdd)
}

function _addPerson(peopleToAdd) {
    peopleToAdd.id = _makeId();
    peopleToAdd.created = Date.now();
    let peoples = pepolesWithId;
    peoples.push(peopleToAdd);
    localStorage.setItem('pepoles', JSON.stringify(peoples));
    return peopleToAdd;
}
function _updatePerson(personToupdate) {
    personToupdate.edited = Date.now();
    let peoples = pepolesWithId;
    const idx = peoples.findIndex(person => person.id === personToupdate.id)
    if (idx !== -1) {
        peoples[idx] = personToupdate
    }
    localStorage.setItem('pepoles', JSON.stringify(peoples));
    return personToupdate;
}
function _filter(term, peoplesToFilter) {
    term = term.toLocaleLowerCase()
    return peoplesToFilter.filter(person => {
        return person.name.toLocaleLowerCase().includes(term)// ||
        // contact.phone.toLocaleLowerCase().includes(term) ||
        // contact.email.toLocaleLowerCase().includes(term)
    })
}


// function sort(arr) {
//     return arr.sort((a, b) => {
//         if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
//             return -1;
//         }
//         if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
//             return 1;
//         }

//         return 0;
//     })
// }

export default {
    getPepoles,
    getPerson,
    removePerson,
    savePerson
}

function _makeId(length = 10) {
    let txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}