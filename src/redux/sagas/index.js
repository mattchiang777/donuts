import { delay, takeLatest} from 'redux-saga'
import { call, put, take } from 'redux-saga/effects'

import {
	EVENT_NAME
} from 'redux/actions/types'

import {
	sagaPutEvent
} from 'redux/actions'

function* eventFunction() {
	yield put(sagaPutEvent())
}

export default function* sagas() {
	yield [
		takeLatest(EVENT_NAME, eventFunction)
	]
}
