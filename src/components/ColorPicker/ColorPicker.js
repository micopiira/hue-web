import React from 'react';
import PropTypes from 'prop-types';
import { rgb_to_cie } from './cie_rgb_converter';

class ColorPicker extends React.Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
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
            this.props.onChange({rgb: this.state, xy: rgb_to_cie(this.state.r, this.state.g, this.state.b).map(parseFloat)});
        });
    }
    drawColorWheel() {
        const canvas = this.refs.canvas;
        this.ctx = canvas.getContext('2d');

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const radius = canvas.height / 2.3;
        const imageData = this.ctx.createImageData(canvas.width, canvas.height);
        const pixels = imageData.data;

        let hue, sat, i = 0, x, y, rx, ry, d, f, g, u, v, w; // Reuse variables for performance?

        for (y = 0; y < canvas.height; y = y + 1) {
            for (x = 0; x < canvas.width; x = x + 1, i = i + 4) {
                rx = x - cx;
                ry = y - cy;
                d = rx * rx + ry * ry;
                if (d < radius * radius) {
                    hue = 6 * (Math.atan2(ry, rx) + Math.PI) / (2 * Math.PI);
                    sat = Math.sqrt(d) / radius;
                    g = Math.floor(hue);
                    f = hue - g;
                    u = 255 * (1 - sat);
                    v = 255 * (1 - sat * f);
                    w = 255 * (1 - sat * (1 - f));
                    pixels[i] = [255, v, u, u, w, 255, 255][g];
                    pixels[i + 1] = [w, 255, 255, v, u, u, w][g];
                    pixels[i + 2] = [u, u, w, 255, 255, v, u][g];
                    pixels[i + 3] = 255;
                }
            }
        }
        this.ctx.putImageData(imageData, 0, 0);
    }
    componentDidMount() {
        this.setState(this.props.color);
        this.drawColorWheel();
    }
    render() {
        return <div><canvas className="img-fluid" height={300} ref="canvas" onClick={this.handleClick}/></div>;
    }
}

export default ColorPicker;