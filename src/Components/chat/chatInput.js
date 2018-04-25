import React, { Component } from 'react';
import { Input, message, Button } from 'antd'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { connect } from 'react-redux'
import { compose } from 'redux'
import sizer from 'react-sizer';

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

    handelImageSend = (e) => {
        message.loading('Sending Image');
        console.log(e.target.files[0])
      let storage = firebase.storage();
        let path = storage.ref(`/message/${new Date()}.jpg`);
        const uploadTask = path.put(e.target.files[0])
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snap) => {console.log(snap)}, (error) => {console.log(error.message)}, () => {
          const downloadUrl = uploadTask.snapshot.downloadURL
        const db = firebase.firestore()
        const batch = db.batch()
        let initKey = db.collection('messages').doc().id
        let initRef = db.collection('messages').doc(initKey)
        let messageObj = {
          text: 'Image',
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          user: this.props.mainAuth.uid,
          id: initKey,
          image: downloadUrl
        }
        batch.set(initRef, messageObj)
        batch.commit().then(() => {
          this.setState({
            message: ''
          })
        })
      })
    };

    render(){
        console.log(this.props)
        if(this.props.mainAuth === undefined){
            return (
                <div/>
            )
        }
        return(
            <div style={{padding: 15, backgroundColor:'white'}}>
              {this.props.width > 1000 ? <div style={{display:'flex', flexDirection:'row'}}>
                <Input placeholder='write a message' onChange={event => this.setState({message: event.target.value})} onPressEnter={this.handleMessageSend} value={this.state.message}/>
                  <div style={{marginLeft: 5}}>
                    <Button shape='circle' icon='picture' onClick={() => this.imageInput.click()}/>
                  </div>
                    <div style={{marginLeft: 5}}>
                      <Button shape='circle' icon='notification' onClick={() => this.audioInput.click()}/>
                    </div>
              </div> : <span/>}
              <input type='file' ref={(ref) => this.imageInput = ref} style={{ display: 'none' }} accept='image/*' onChange={this.handelImageSend} />
              <input type='file' ref={(ref) => this.audioInput = ref} style={{ display: 'none' }} accept='audio/*' />
            </div>
        )
    }
}

let ChatInput = compose(
    connect((state) => ({
        mainAuth: state.firebase.auth
    }))
)(chatInput)
export default sizer()(ChatInput);