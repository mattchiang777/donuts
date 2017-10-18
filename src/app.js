import React, {Component} from 'react'
import {connect} from 'react-redux'
import MovingImage from 'components/MovingImage'

import Granim from 'granim'

import {
	event
} from 'redux/actions'

import './app.styl'

class App extends Component{

	static defaultProps = {
		element: '#granim-canvas',
		name: 'granim',
		elToSetClassOn: 'body',
		direction: 'diagonal',
		isPausedWhenNotInView: false,
		opacity: [1, 1, 1, 1],
		// stateTransitionSpeed: 1000,
		states: {
			"default-state": {
				gradients: [
					['#C798E5', '#91B1D5', '#66C9A3', '#66C9D5'],
					['#66C9D5', '#C798E5', '#91B1D5', '#66C9A3'],
					['#66C9A3', '#66C9D5', '#C798E5', '#91B1D5'],
					['#91B1D5', '#66C9A3', '#66C9D5', '#C798E5'],
				],
				transitionSpeed: 500,
				loop: true
			}
		},
		onStart: () => {
			console.log('Granim: onStart')
		},
		onGradientChange: (colorDetails) => {
			// console.log('Granim: onGradientChange, details: ')
			// console.log(colorDetails)
		},
		onEnd: () => {
			console.log('Granim: onEnd')
		}
	}

	constructor(props) {
		super(props)

		this.state = {
			granim: undefined,
			positionX: 0
		}

		this.donutImage = require('assets/images/donut.png')

	}

	static mapStateToProps(state) {
		return {
			index: state.general.index
		}
	}

	componentDidMount() {

		this.setState({
			granim: new Granim({
				...this.props
			})
		})

		this.canvasContext = this.canvas.getContext('2d')

		this.interval = setInterval(this.onInterval, 1000 / 25)

	}

	onInterval = () => {
		this.setState({
			positionX: this.state.positionX + 1
		})
		console.log(this.state)
	}


	onClick = (e) => {
		this.props.dispatch(event())
	}

	render() {
		return (
			<main onClick={this.onClick}>
				<canvas id="granim-canvas"></canvas>
				<canvas ref={el => this.canvas = el}></canvas>
				<MovingImage image={this.donutImage} positionX={this.state.positionX}/>
			</main>
		)
	}
}

export default connect(App.mapStateToProps)(App)