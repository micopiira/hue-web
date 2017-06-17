import PropTypes from 'prop-types';

export const effects = ['none', 'colorloop'];

export default {
    light: PropTypes.shape({
        manufacturername: PropTypes.string,
        modelid: PropTypes.string,
        name: PropTypes.string,
        productid: PropTypes.string,
        state: PropTypes.shape({
            alert: PropTypes.oneOf(['none', 'select', 'lselect']),
            bri: PropTypes.number,
            colormode: PropTypes.oneOf(['hs', 'xy', 'ct']),
            ct: PropTypes.number,
            effect: PropTypes.oneOf(effects),
            hue: PropTypes.number,
            on: PropTypes.bool,
            reachable: PropTypes.bool,
            sat: PropTypes.number,
        }),
        swconfigid: PropTypes.string,
        swversion: PropTypes.string,
        type: PropTypes.string,
        uniqueid: PropTypes.string,
    })
}