import React, { Component } from 'react';
import RightConversationSingleMessage from './RightConversationSingleMessage'
import { Message } from './Models';
import { MyContext } from './AppProvider';

interface props {
    Messages: Message[]
}

interface state {
    Messages: Message[]
}

export default class RightConversationMessages extends Component<props, state> {
    state = {
        Messages: this.context.Messages
    }
    static getDerivedStateFromProps(props: props, state: state) {
        if (props.Messages !== state.Messages) {
            return {
                Messages: props.Messages
            };
        }
        return null;
    }
    render() {
        return (
            <div className='RightConversationMessages'>
                {
                    this.state.Messages!.map((mes: Message) =>
                        <RightConversationSingleMessage
                            key={mes.messageID}
                            Message = {mes}/>
                    )
                }
            </div>
        )
    }
}
RightConversationMessages.contextType = MyContext;
