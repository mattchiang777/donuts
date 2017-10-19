import React, {Component} from 'react'
import {connect} from 'react-redux'
import MovingImage from 'components/MovingImage'

import Granim from 'granim'

import {
	event
} from 'redux/actions'

import './app.styl'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

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

		this.donutImage = new Image()
		this.donutImage.src = require('assets/images/donut.png')

		//

		this.donut = {
			x: WIDTH / 2,
			y: HEIGHT / 2,
			positionX: 0
		}
		this.donutArray = []
		for (let i = 0; i < 10; i++) {
			let donut = {
				x: 0,
				y: 0,
				positionX: Math.random(-5, 5)
			}
			this.donutArray.push(donut)
		}

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

		// this.interval = setInterval(this.onInterval, 1000 / 10)

		requestAnimationFrame(this.draw)

	}

	draw = () => {
		console.log("draw")
		this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.moveDonut()
		this.drawDonut()

		// this.canvasContext.drawImage(this.donutImage, 0, 0, 50, 50)
		requestAnimationFrame(this.draw)
	}

	moveDonut = () => {
		for (let i = 0; i < this.donutArray.length; i++) {
			let d = this.donutArray[i]
			d.positionX += Math.random(1, 5)
		}


		// this.donut.positionX += 1

		// if (this.donut.positionX > WIDTH) {
		// 	this.donut.positionX = -50
		// }
	}

	drawDonut() {
		for (let i = 0; i < this.donutArray.length; i++) {
			let d = this.donutArray[i]
			this.canvasContext.drawImage(this.donutImage, d.positionX, 0, 50, 50)	
		}
	}

	// onInterval = () => {
	// 	this.setState({
	// 		positionX: this.state.positionX + 1
	// 	})
	// 	console.log(this.state)

		// this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
		// let img = new Image()
		// img.src = require('assets/images/donut.png')
	// 	this.canvasContext.drawImage(img, this.state.positionX, 0, 50, 50)
	// }


	onClick = (e) => {
		this.props.dispatch(event())
	}

	render() {
		return (
			<main onClick={this.onClick}>
				<canvas id="granim-canvas" width={WIDTH} height={HEIGHT}></canvas>
				<canvas ref={el => this.canvas = el} width={WIDTH} height={HEIGHT}></canvas>
			</main>
		)
	}
}

				// <MovingImage ref={el => this.image = el} image={this.donutImage} positionX={this.state.positionX}/>
export default connect(App.mapStateToProps)(App)