import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import moment from 'moment'
import axios from 'axios'

import { loadPepole } from '../actions/AppAction';

import AxiosHandlerCmp from '../components/AxiosHandlerCmp'
import dashboard from '../assets/dashboard.svg'

class PepoleDetails extends PureComponent {
    state = {
        homeworld: ''
    }
    componentWillMount() {
        const id = this.props.match.params.id;
        this.props.loadPepole(id);
    }
    // componentDidMount() {
    //     axios.get('https://swapi.dev/api/planets/1/').then(res => {
    //         console.log(res)
    //         this.setState({ homeworld: res.data.name })
    //     })
    // }
    handelAxiosGet = async (url) => {
        const res = await axios.get(url)
        // .then(res => res.data)
        const data = res.data.name
        console.log("data:", data)
        return (data);
    }
    render() {
        const { currPepole } = this.props;
        if (!currPepole) {
            return (<div>no pepole</div>)
        } else {
            return (
                <div className="pepole-details">
                    <h2>Name: {currPepole.name}</h2>
                    <img src={dashboard} className="App-Dashboard-svg" alt="dashboard" />
                    <img src={`https://robohash.org/${currPepole.name}.png`} alt="" />
                    <p>Height:{currPepole.height}</p>
                    <p>Mass:{currPepole.mass}</p>
                    <p>Hair color:{currPepole.hair_color}</p>
                    <p>Skin color:{currPepole.skin_color}</p>
                    <p>Eye color:{currPepole.eye_color}</p>
                    <p>Year of birth:{currPepole.birth_year}</p>
                    <p>gender:{currPepole.gender}</p>
                    <p>His homeworld:<AxiosHandlerCmp url={currPepole.homeworld} /></p>
                    <ul className="Films-list-ul">Films:
                            {currPepole.films.map((film) => (
                        <li key={film} className="film">
                            <AxiosHandlerCmp url={film} />
                        </li>
                    ))}
                    </ul>
                    {(currPepole.species.length > 0) ? (<ul className="species-list-ul">Species:
                        {currPepole.species.map((specie) => (
                            <li key={specie} className="specie">
                                <AxiosHandlerCmp url={specie} />
                            </li>
                        ))}
                    </ul>) : null}
                    {(currPepole.vehicles.length > 0) ? (<ul className="vehicles-list-ul">Vehicles:
                        {currPepole.vehicles.map((vehicle) => (
                            <li key={vehicle} className="vehicle">
                                <AxiosHandlerCmp url={vehicle} />
                            </li>
                        ))}
                    </ul>) : null}
                    {(currPepole.starships.length > 0) ? (<ul className="starships-list-ul">Starships:
                        {currPepole.starships.map((starship) => (
                            <li key={starship} className="starship">
                                <AxiosHandlerCmp url={starship} />
                            </li>
                        ))}
                    </ul>) : null}
                    <p>Created at: {moment(currPepole.created).format('LLL')}</p>
                    <p>Edited at: {moment(currPepole.edited).format('LLL')}</p>
                </div>
            )

        }
    }
}
const mapStateToProps = (state) => {
    return {
        currPepole: state.app.currPepole,
    }
}
const mapDispatchToProps = {
    loadPepole
}
export default connect(mapStateToProps, mapDispatchToProps)(PepoleDetails)

