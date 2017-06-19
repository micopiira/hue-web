import React from 'react';
import PropTypes from 'prop-types';

const rgbToXy = ({r, g, b}) => {
    console.log(r, g, b);
    r = (r > 0.04045) ? Math.pow((r + 0.055) / (1.0 + 0.055), 2.4) : (r / 12.92);
    g = (g > 0.04045) ? Math.pow((g + 0.055) / (1.0 + 0.055), 2.4) : (g / 12.92);
    b = (b > 0.04045) ? Math.pow((b + 0.055) / (1.0 + 0.055), 2.4) : (b / 12.92);
    const X = r * 0.664511 + g * 0.154324 + b * 0.162028;
    const Y = r * 0.283881 + g * 0.668433 + b * 0.047685;
    const Z = r * 0.000088 + g * 0.072310 + b * 0.986039;
    return {x: X / (X + Y + Z), y: Y / (X + Y + Z)};
};

class JsColorPicker extends React.Component {
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
    }
    handleClick(event) {
        const x = event.nativeEvent.offsetX;
        const y = event.nativeEvent.offsetY;
        const data = this.ctx.getImageData(x, y, 1, 1).data;
        this.setState({r: data[0], g: data[1], b: data[2]}, () => {
            this.props.onChange({rgb: this.state, xy: rgbToXy(this.state)});
        });
    }
    componentDidMount() {
        this.setState(this.props.color);
        const canvas = this.refs.canvas;
        this.ctx = canvas.getContext('2d');

        // source: https://github.com/ariya/phantomjs/blob/master/examples/colorwheel.js
        var width = 100,
            height = 100,
            cx = width / 2,
            cy = height / 2,
            radius = width  / 2.3,
            imageData,
            pixels,
            hue, sat, value,
            i = 0, x, y, rx, ry, d,
            f, g, p, u, v, w, rgb;

        canvas.width = width;
        canvas.height = height;
        imageData = this.ctx.createImageData(width, height);
        pixels = imageData.data;

        for (y = 0; y < height; y = y + 1) {
            for (x = 0; x < width; x = x + 1, i = i + 4) {
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
    render() {
        return (
            <div>
                <canvas ref="canvas" width={300} height={300} onClick={this.handleClick}/>
            </div>
        );
    }
}

export default JsColorPicker;