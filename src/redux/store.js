import 'babel-polyfill'

import { 
	createStore, 
	applyMiddleware 
} from 'redux'

import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import saga from './sagas'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
	reducers,
	applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(saga)

