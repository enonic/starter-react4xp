import React from 'react';

class InnerGreeter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            greetings: props.greeting,
            targets: props.greetee,
        }
    };

    // Adds one greeting
    moreGreetings = () => {
        this.setState({greetings: this.state.greetings + " " + this.state.greetings});
    };

    // Doubles the targets
    moreTargets = () => {
        this.setState({targets: this.state.targets + " " + this.state.targets});
    };

    render() {
        return <div className="worldGreeter">
            <h1>
                <span onClick={() => this.moreGreetings()}
                      style={{cursor: "pointer"}}
                      className="greeting">{this.state.greetings}
                </span> <span onClick={() => this.moreTargets()}
                      style={{cursor: "pointer"}}
                      className="target">{this.state.targets}</span>
                !
            </h1>
        </div>;
    }
};


// ----------------------------------------------  Export

export default (props) => <InnerGreeter {...props} />;
