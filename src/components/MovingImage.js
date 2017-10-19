import React, {Component} from 'react'

export default class MovingImage extends Component{

	static defaultProps = {
		image: '',
		positionX: 0
	}

	constructor(props) {
		super(props)

		this.state = {
			granim: undefined
		}

		this.donutImage = require('assets/images/donut.png')

	}

	static mapStateToProps(state) {
		return {
			index: state.general.index
		}
	}

	componentDidMount() {

	}

	reset() {
		
	}

	getStyle() {
		return {
			// left: this.props.positionX
		}
	}


	render() {
		return (
			<img src={this.props.image} style={this.getStyle()}/>
		)
	}
}

