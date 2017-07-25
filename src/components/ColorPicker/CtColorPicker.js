import React from 'react';
import PropTypes from 'prop-types';
import ct from 'color-temperature';

class CtColorPicker extends React.Component {
    static propTypes = {
        onChange: PropTypes.func
    };
    state = {
        r: 0,
        g: 0,
        b: 0
    };
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.drawColorWheel = this.drawColorWheel.bind(this);
    }
    handleClick(event) {
        const {data} = this.ctx.getImageData(event.nativeEvent.offsetX, event.nativeEvent.offsetY, 1, 1);
        this.setState({r: data[0], g: data[1], b: data[2]}, () => {
            this.props.onChange({
                rgb: this.state,
                ct: Math.round(1000000/ct.rgb2colorTemperature({red: this.state.r, green: this.state.g, blue: this.state.b}))
            });
        });
    }
    drawColorWheel() {
        const canvas = this.refs.canvas;
        this.ctx = canvas.getContext('2d');

        const kelvinStart = 2000;
        const kelvinEnd = 6500;

        const { width, height } = canvas;
        const imageData = this.ctx.createImageData(canvas.width, canvas.height);
        const pixels = imageData.data;

        for (let w = 0; w < width; w += 1) {
            for (let h = 0; h < height; h += 1) {
                const i = ((h * width) + w) * 4;
                const kelvin = ((kelvinEnd-kelvinStart) / width) * w + kelvinStart;
                const {red, green, blue} = ct.colorTemperature2rgb(kelvin);
                pixels[i] = red;
                pixels[i + 1] = green;
                pixels[i + 2] = blue;
                pixels[i + 3] = 255;
            }
        }
        this.ctx.putImageData(imageData, 0, 0);
    }
    componentDidMount() {
        this.drawColorWheel();
    }
    render() {
        return <div><canvas className="img-fluid" height={50} ref="canvas" onClick={this.handleClick}/></div>;
    }
}

export default CtColorPicker;