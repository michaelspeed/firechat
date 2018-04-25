import React, { Component } from 'react';
import {Card, Elevation , Button, ButtonGroup, Intent} from '@blueprintjs/core'
import { Input } from 'antd'
import * as firebase from 'firebase'
import { firebaseConnect } from 'react-redux-firebase' // <-- Important
import { compose } from 'redux'
import { connect } from 'react-redux'
import 'firebase/firestore' // <-- important
import ChatMain from '../chat/chatMain'
import ChatInput from '../chat/chatInput'

class homeComponent extends Component{
    state = {
        email: '',
        password:'',
        empty: true
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.mainAuth !== null){
            if(nextProps.mainAuth.isLoaded){
                if(nextProps.mainAuth.isEmpty){
                   this.setState({
                       empty: true
                   })
                } else {
                    this.setState({
                        empty: false
                    })
                }
            }
        }
    }

    onCreateUser = () => {
        const { email, password} = this.state
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            this.props.firebase.login({
                email: email,
                password: password
            })
        })
    }

    sigin = () => {
        const { email, password } = this.state
        this.props.firebase.login({
            email: email,
            password: password
        })
    }

    logout = () => {
        this.props.firebase.logout()
    }
    render(){
        const {email, password} = this.state
        return(
            <div style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
                <Card elevation={Elevation.TWO}>
                    <span style={{fontSize: 20}}>Firechat</span>
                    {this.state.empty ? <div>
                        <Input value={email} onChange={event => this.setState({email: event.target.value})} placeholder='email' style={{marginBottom: 10}}/>
                        <Input value={password} onChange={event => this.setState({password: event.target.value})} placeholder='password' type='password'/>
                        <div style={{marginTop: 10}}>
                            <ButtonGroup minimal={true}>
                                <Button text='Sign In' intent={Intent.PRIMARY} onClick={this.sigin}/>
                                <Button text='Sign Up' intent={Intent.SUCCESS} onClick={this.onCreateUser}/>
                                <Button text='Logout' intent={Intent.SUCCESS} onClick={() => this.logout()}/>
                            </ButtonGroup>
                        </div>
                    </div> : <div><span>Your are logged in</span></div>}
                </Card>
                {
                    this.state.empty ? <div/> : <div>
                        <ChatMain/><div style={{position: 'fixed', left: 0, bottom: 0, width: '100%'}}>
                        <ChatInput/>
                    </div>
                    </div>
                }


            </div>
        )
    }

}

let HomeComponent = compose(
    firebaseConnect(),
    connect((state) => ({
        mainAuth: state.firebase.auth
    }))
)(homeComponent)
export default HomeComponent