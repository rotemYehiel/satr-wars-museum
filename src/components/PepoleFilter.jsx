import React, { PureComponent } from 'react';

export default class PepoleFilter extends PureComponent {
    state = {
        term: '',
    };

    onChangeHandler = (ev) => {
        const { value, name } = ev.target;
        this.setState({ [name]: value }, () => {
            this.props.onFilter({ ...this.state });
        });
    };

    render() {
        return (
            <form className="pepole-filter">
                <input
                    type="text"
                    placeholder="Enter Name..."
                    onChange={this.onChangeHandler}
                    name="term"
                    value={this.state.term}
                />

            </form>
        );
    }
}
