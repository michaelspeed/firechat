import React, { Component } from 'react';
import { Card , Button, ButtonGroup, Elevation} from '@blueprintjs/core'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import 'firebase/firestore'
import moment from 'moment'

class chatMain extends Component {

    state = {
        all: []
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.allMessages !== undefined){
            this.setState({
                all: nextProps.allMessages
            })
        }
    }

    render(){
        if(this.props.allMessages === undefined){
            return(
                <div/>
            )
        }
        const { all } = this.state
        return(
            <div style={{marginTop: 10, marginBottom: 40}}>
                <Card elevation={Elevation.TWO}>
                    <span>Chat Window</span>
                    <div>
                        { all.map(item => (
                            <div key={item.id}>
                                <Card elevation={Elevation.ONE}>
                                    <span>{item.text}</span>
                                    <div>
                                        <span>user: {item.user}</span>
                                    </div>
                                    <div>
                                        <span>
                                            {moment(item.createdAt).fromNow()}
                                        </span>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        )
    }
}

let ChatMain = compose(
    firestoreConnect([
        {
            collection: 'messages',
            orderBy: ['createdAt', 'desc']
        }
    ]),
    connect((state) => ({
        allMessages : state.firestore.ordered.messages
    }))
)(chatMain)
export default ChatMain