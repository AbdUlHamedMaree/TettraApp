import React, { Component } from 'react'
import { Message } from './Models'
import { MyContext } from './AppProvider';

interface IRightConversationSingleMessageProps {
    Message: Message
}

interface IRightConversationSingleMessageState {
    Message: Message
}

export default class RightConversationSingleMessage extends Component<IRightConversationSingleMessageProps, IRightConversationSingleMessageState> {

    static contextType = MyContext;
    context!: React.ContextType<typeof MyContext>

    state = {
        Message: this.props.Message
    }
    static getDerivedStateFromProps(props: IRightConversationSingleMessageProps, state: IRightConversationSingleMessageState) {
        if (props !== state) {
            return {
                Message: props.Message
            };
        }
        return null;
    }

    render() {
        return (
            <div className={'msg RCSM_' + ((this.props.Message.senderUserID === this.context.state.CurrentUser.userID) ? 'Sen' : 'Res')}>
                {this.state.Message.content}
            </div>
        );
    }
}