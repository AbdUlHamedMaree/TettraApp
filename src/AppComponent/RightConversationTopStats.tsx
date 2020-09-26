import React, { Component } from 'react';
import { MyContext } from './AppProvider';
import $ from "jquery";

export default class RightConversationTopStats extends Component {

    static contextType = MyContext;
    context!: React.ContextType<typeof MyContext>
    Exit_Button_Click = () => {
        $(".RightConversation").css({ display: 'none' });
    }
    render() {
        return (
            <div className='RightConversationTopStats continerMiddle'>
                <button onClick={this.Exit_Button_Click} className='childCenter' id="RightConversationExit_Button">X</button>
                <img className='RCTS_Image childCenter' src={require('../Images/Profile.jpg')} alt='Profile' width='50' height='50' />
                <div className='RCTS_UserName childCenter'>
                    {
                        this.context.state.CurrentConversation?.ConversationName
                    }
                </div>
                <div className='RCTS_UserStatus childCenter'>
                    {
                    }
                </div>
            </div>
        );
    }
}