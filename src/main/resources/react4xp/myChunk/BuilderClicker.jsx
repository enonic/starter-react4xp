import React from 'react';

class BuilderClicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: props.first,
            second: props.second,
        }
    };

    // Doubles the 'first' or 'second' string in state, depending on the key.
    makeMore = (key) => {
        this.setState({[key]: this.state[key] + " " + this.state[key]});
    };

    render() {
        return <div className="builderclicker">
            <h3 style={{color:"green"}}>
                <span onClick={() => this.makeMore('first')}
                      style={{cursor: "pointer"}}
                      className="first">{this.state.first}
                </span> <span onClick={() => this.makeMore('second')}
                              style={{cursor: "pointer"}}
                              className="second">{this.state.second}</span>
            </h3>
        </div>;
    }
};

export default (props) => <BuilderClicker {...props} />;
