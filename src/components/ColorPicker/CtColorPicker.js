import React from 'react';
import PropTypes from 'prop-types';
import ct from 'color-temperature';

const gammaCorrect = input => (input > 0.04045) ? Math.pow((input + 0.055) / (1.0 + 0.055), 2.4) : (input / 12.92);

class CtColorPicker extends React.Component {
    static propTypes = {
        onChange: PropTypes.func,
        color: PropTypes.shape({
            r: PropTypes.number,
            g: PropTypes.number,
            b: PropTypes.number
        })
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
        const data = this.ctx.getImageData(event.nativeEvent.offsetX, event.nativeEvent.offsetY, 1, 1).data;
        this.setState({r: data[0], g: data[1], b: data[2]}, () => {
            console.log(1000000/ct.rgb2colorTemperature({red: this.state.r, green: this.state.g, blue: this.state.b}));
            this.props.onChange({rgb: this.state, ct: Math.round(1000000/ct.rgb2colorTemperature({red: this.state.r, green: this.state.g, blue: this.state.b}))});
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

                const kelvin = ((kelvinEnd-kelvinStart)/width) * w + kelvinStart;
                const rgb = ct.colorTemperature2rgb(kelvin);
                // console.log(rgb);
                pixels[i] = gammaCorrect(rgb.red / 255) * 255;
                pixels[i + 1] = gammaCorrect(rgb.green / 255)* 255;
                pixels[i + 2] = gammaCorrect(rgb.blue / 255)* 255;
                pixels[i + 3] = 255;

            }
        }
        this.ctx.putImageData(imageData, 0, 0);
    }
    componentDidMount() {
        //this.setState(this.props.color);
        this.drawColorWheel();
    }
    render() {
        return (
            <div>
                <canvas ref="canvas" width={300} height={50} onClick={this.handleClick}/>
            </div>
        );
    }
}

export default CtColorPicker;