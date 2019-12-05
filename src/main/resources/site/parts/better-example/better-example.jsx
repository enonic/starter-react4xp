import React from 'react';

import Button from '../../../react4xp/components/Button';
import List from '../../../react4xp/components/List';
import Square from '../../../react4xp/components/Square';

class ColorClicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        };

        this.shiftUp = this.shiftUp.bind(this);
    }

    shiftUp() {
        this.setState({selected: (this.state.selected + 1) % this.props.colors.length});
    };

    render() {
        return (<div>
            <Button func={this.shiftUp} label="Next color" />
            {this.props.colors.length ?
                [
                    <Square color={this.props.colors[this.state.selected]} />,
                    <List colors={this.props.colors}
                          selectedIndex={this.state.selected}
                          func={i => {
                              this.setState({selected: (i) % this.props.colors.length})
                          }} />
                ] :
                <p>Add some color!</p>
            }

        </div>);
    }
}

export default (props) => <ColorClicker {...props} />;
