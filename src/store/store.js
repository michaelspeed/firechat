import React from 'react'
import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore , firestoreReducer} from 'redux-firestore'
import * as firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDsEpBWWg4dFYfQD_PnBaBaQhSQxaV6ANk",
    authDomain: "atmyo-oncall.firebaseapp.com",
    databaseURL: "https://atmyo-oncall.firebaseio.com",
    projectId: "atmyo-oncall",
    storageBucket: "atmyo-oncall.appspot.com",
    messagingSenderId: "123899756677"
}

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

firebase.initializeApp(firebaseConfig)

firebase.firestore()

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase, rrfConfig),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore)

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

const initialState = {}
const Store = createStoreWithFirebase(rootReducer, initialState)
export default Store