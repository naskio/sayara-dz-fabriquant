import React from 'react';
import {simpleContrast} from "../../utils/colors";


class View extends React.PureComponent {
    render() {
        const {color = "#ffffff", text} = this.props;
        return (
            <div style={{
                backgroundColor: color,
                padding: 8,
                borderRadius: 8,
                textAlign: 'center',
                color: simpleContrast(color),
            }}>{!!text ? text : color}</div>
        );
    }
}

export default View;

