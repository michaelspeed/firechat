import React, { Component } from 'react';
import { Input, message } from 'antd'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'

class chatInput extends Component {

    state = {
        message: ''
    }

    handleMessageSend = () => {
        if(this.state.message === ''){
            return
        }
        const db = firebase.firestore()
        const batch = db.batch()
        let initKey = db.collection('messages').doc().id
        let initRef = db.collection('messages').doc(initKey)
        let messageObj = {
            text: this.state.message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            user: this.props.mainAuth.uid,
            id: initKey
        }
        batch.set(initRef, messageObj)
        batch.commit().then(() => {
            this.setState({
                message: ''
            })
        })
    }

    render(){
        if(this.props.mainAuth === undefined){
            return (
                <div/>
            )
        }
        return(
            <div style={{padding: 15, backgroundColor:'white'}}>
                <Input placeholder='write a message' onChange={event => this.setState({message: event.target.value})} onPressEnter={this.handleMessageSend} value={this.state.message}/>
            </div>
        )
    }
}

let ChatInput = compose(
    connect((state) => ({
        mainAuth: state.firebase.auth
    }))
)(chatInput)
export default ChatInput