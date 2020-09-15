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
        console.log("localStorage.getItem('peoples'):", localStorage.getItem('peoples'))
    }

    if (filterBy && filterBy.term) {
        pepolesToReturn = filter(filterBy.term, pepolesToReturn)
    }
    pepolesWithId = JSON.parse(JSON.stringify(pepolesToReturn));
    return pepolesToReturn
}

async function getPepole(id) {
    console.log("pepolesWithId:", localStorage.getItem('pepoles'))
    const currPepole = await pepolesWithId.filter(people => {
        return (people.id === id)
    })
    return currPepole[0];
}



function filter(term, peoplesToFilter) {
    term = term.toLocaleLowerCase()
    return peoplesToFilter.filter(people => {
        return people.name.toLocaleLowerCase().includes(term)// ||
        // contact.phone.toLocaleLowerCase().includes(term) ||
        // contact.email.toLocaleLowerCase().includes(term)
    })
}


function sort(arr) {
    return arr.sort((a, b) => {
        if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
            return -1;
        }
        if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
            return 1;
        }

        return 0;
    })
}

export default {
    getPepoles,
    getPepole
}

function _makeId(length = 10) {
    let txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}