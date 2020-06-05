import React from 'react';

import Button from '../shared/Button';
import List from '../shared/List';
import Square from '../shared/Square';

import css from './MultiColor.scss';

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
            <div id="better-example-part">
                <Button clickFunc={this.shiftDown} label="Previous color"/>
                <Button clickFunc={this.shiftUp} label="Next color"/>
                <Square color={props.colors[state.selected]}/>
                <List colors={props.colors}
                      selectedIndex={state.selected}
                      clickFunc={i => {
                          this.setState({selected: (i) % props.colors.length})
                      }}/>
            </div> :

            <p>Add some color!</p>
    }
}

export default (props) => <MultiColor {...props} />;
