import React from 'react';

import Button from '../shared/Button';
import ColorButtons from '../shared/ColorButtons';
import ActiveColorOval from '../shared/ActiveColorOval';

import '../../MultiColor.scss';
import '../shared/shared-styles.scss';

class MultiColor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        };

        this.shiftUp = this.shiftUp.bind(this);
        this.shiftDown = this.shiftDown.bind(this);
    }

    shiftUp() {
        this.setState({
            selected: (this.state.selected + 1) % this.props.colors.length
        });
    };
    shiftDown() {
        this.setState({
            selected: (this.props.colors.length + this.state.selected - 1) % this.props.colors.length
        });
    };

    render() {
        const props =  this.props;
        const state = this.state;
        return props.colors.length ?
            <div className="multi-color">

                <Button className="my-button" clickFunc={this.shiftDown}>Previous color</Button>
                <Button className="my-button" clickFunc={this.shiftUp}>Next color</Button>

                <ActiveColorOval color={props.colors[state.selected]} />

                <ColorButtons colors={props.colors}
                              selectedIndex={state.selected}
                              clickFunc={ i => {
                                  this.setState({selected: (i) % props.colors.length});
                              }}
                />

            </div> :

            <p>Add some color!</p>
    }
}

export default (props) => <MultiColor {...props} />;
