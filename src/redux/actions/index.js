import {
	EVENT_NAME,
	SAGA_PUT_EVENT_NAME
} from './types'

export function event(payload) {
	return {
		type: EVENT_NAME,
		// payload: {
		// 	payloadVariable: payloadVariable
		// }
	}
}

export function sagaPutEvent(payload) {
	return {
		type: SAGA_PUT_EVENT_NAME,
		// payload: {
		// 	payloadVariable: payloadVariable
		// }
	}
}