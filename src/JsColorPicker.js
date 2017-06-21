import React from 'react';
import iro from 'iro.js/dist/iro';
import PropTypes from 'prop-types';

class JsColorPicker extends React.Component {
    static propTypes = {
        onChange: PropTypes.func
    };

    componentDidMount() {
        const picker = new iro.ColorPicker(this.colorInput, {});
        picker.watch(this.props.onChange);
    }
    render() {
        return (
            <div style={{width: '320px', height: '270px', overflow: 'hidden'}} ref={(input) => { this.colorInput = input; }} />
        );
    }
}

export default JsColorPicker;