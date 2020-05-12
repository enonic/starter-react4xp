import React from 'react';

import Button from '../../../react4xp/shared/Button';
import List from '../../../react4xp/shared/List';
import Square from '../../../react4xp/shared/Square';

class ColorExample extends React.Component {
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
        return <div>
            <h1>{props.pageTitle}</h1>
            {props.colors.length ?

                (<div id="better-example-part">
                    <Button func={this.shiftDown} label="Previous color"/>
                    <Button func={this.shiftUp} label="Next color"/>
                    <Square color={props.colors[state.selected]}/>
                    <List colors={props.colors}
                          selectedIndex={state.selected}
                          func={i => {
                              this.setState({selected: (i) % props.colors.length})
                          }}/>
                </div>) :

                (<p>Add some color!</p>)
            }
        </div>;
    }
}

export default (props) => <ColorExample {...props} />;
