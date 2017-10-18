import Lodash from 'lodash'
import {
	SAGA_PUT_EVENT_NAME
} from 'redux/actions/types'


const initialState = {
	index: 0
} 


const General = (state = initialState, action) => {

	let nextState = Lodash.cloneDeep(state)

	switch (action.type) {
		case SAGA_PUT_EVENT_NAME:
			// update nextState

			nextState.index = nextState.index + 1

			break
	}

	return nextState
}

export default General
