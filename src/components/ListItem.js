import React from "react";
import PropTypes from "prop-types";
import propTypes, {effects} from "../propTypes";
import ColorPicker from "./ColorPicker/ColorPicker";
import CtColorPicker from "./ColorPicker/CtColorPicker";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setLightStateThunk} from "../redux/actions";
import {cie_to_rgb} from "./ColorPicker/cie_rgb_converter";

export const ListItem = ({light, setLightState}) =>
	<div className="card">
		<div className="card-body">

			<div className="row">
				<div className="col-sm-2">
					<button type="button"
					        disabled={!light.state.reachable}
					        className={'btn btn-primary' + (light.state.on ? ' active' : '')}
					        aria-pressed={light.state.on}
					        onClick={() => setLightState({on: !light.state.on})}>
						<i className="fa fa-power-off" aria-hidden="true"/>
					</button>
				</div>
				<div className="col-sm-10">
					<h5>
						{!light.state.reachable &&
						<i className="fa fa-exclamation-triangle text-warning" aria-hidden="true" title="Unreachable"/>}
						&nbsp;{light.name}</h5>
				</div>
			</div>

			{light.state.on &&
			<div className="row">
				<div className="col">
					<div className="form-group">
						<label htmlFor="effect">Effect</label>
						<select id="effect"
						        className="form-control"
						        onChange={(event) => setLightState({effect: event.target.value})}
						        value={light.state.effect}>
							{effects.map(effect =>
								<option key={effect} value={effect}>{effect}</option>
							)}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="color">Color</label>
						<div className="row">
							<div className="col-sm">
								<ColorPicker
									onChange={({xy}) => setLightState({xy})}
									color={{
										r: cie_to_rgb(light.state.xy[0], light.state.xy[1], light.state.bri)[0],
										g: cie_to_rgb(light.state.xy[0], light.state.xy[1], light.state.bri)[1],
										b: cie_to_rgb(light.state.xy[0], light.state.xy[1], light.state.bri)[2]
									}}/>
							</div>
							<div className="col-sm">
								<CtColorPicker onChange={({ct}) => setLightState({ct})}/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="brightness" className="col-form-label">Brightness</label>
						<input type="range"
						       style={{padding: 0}}
						       className="form-control"
						       id="brightness"
						       value={light.state.bri}
						       onChange={(event) => setLightState({bri: parseInt(event.target.value, 10)})}
						       min={0}
						       max={254}/>
					</div>
				</div>
			</div>
			}

		</div>
	</div>;

ListItem.propTypes = {
	light: PropTypes.shape(propTypes.light),
	setLightState: PropTypes.func,
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	setLightState: state => setLightStateThunk(ownProps.light.id, state)
}, dispatch);

export default connect(null, mapDispatchToProps)(ListItem);