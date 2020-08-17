import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PepoleFilter from '../components/PepoleFilter'
import { loadPepoles } from '../actions/AppAction';

class PepoleList extends PureComponent {
    state = {
        filterBy: ''
    }
    componentWillMount() {
        this.loadPepoles();
        // console.log('componentWillMount')
    }
    loadPepoles = () => {
        this.props.loadPepoles(this.state.filterBy);
    }
    onFilter = (filterBy) => {
        this.setState((prevState) => {
            return {
                filterBy: {
                    ...prevState.filterBy,
                    ...filterBy,
                },
            };
        }, this.loadPepoles);
    }
    async componentDidMount() {
        this.props.loadPepoles(this.state.filterBy);
        // console.log('componentDidMount')
    }
    render() {
        const { pepoles } = this.props;
        if (!pepoles) {
            return (<div>no pepoles</div>)
        } else {
            return (
                <div className="pepole-list">
                    <header className="list-header">Pepole List</header>
                    <PepoleFilter onFilter={this.onFilter} />
                    <ul className="pepoles-list-ul">
                        {pepoles.map((pepole) => (
                            <Link to={'/Pepole/' + pepole.id} key={pepole.id}>
                                <li className="pepole">{pepole.name}</li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )

        }
    }
}
const mapStateToProps = (state) => {
    // console.count('calls to state in PepoleList:',)
    return {
        pepoles: state.app.pepoles,
    }
}
const mapDispatchToProps = {
    loadPepoles
}
export default connect(mapStateToProps, mapDispatchToProps)(PepoleList)

