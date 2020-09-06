import React, { Component } from 'react';
import { MyContext } from './AppProvider';

export default class RightConversationTopStats extends Component {

    static contextType = MyContext;
    context!: React.ContextType<typeof MyContext>

    render() {
        return (
            <div className='RightConversationTopStats continerMiddle'>
                <img className='RCTS_Image childCenter' src={require('../Images/Profile.jpg')} alt='Profile' width='50' height='50' />
                <MyContext.Consumer >
                    {
                        (context) => {
                            console.log(context.state.CurrentConversation?.ConversationName)
                            return <React.Fragment>
                                <div className='RCTS_UserName childCenter'>
                                    {
                                        context.state.CurrentConversation?.ConversationName
                                    }
                                </div>
                                <div className='RCTS_UserStatus childCenter'>
                                    {
                                    }
                                </div>
                            </React.Fragment>
                        }
                    }
                </MyContext.Consumer>
            </div>
        );
    }
}