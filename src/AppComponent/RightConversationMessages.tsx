import React, { Component } from 'react';
import RightConversationSingleMessage from './RightConversationSingleMessage'
import { Message } from './Models';
import { MyContext } from './AppProvider';

interface RightConversationMessagesState {
    Messages?: Message[]
}

export default class RightConversationMessages extends Component<{}, RightConversationMessagesState> {
    static contextType = MyContext;
    context!: React.ContextType<typeof MyContext>

    render() {
        return (
            <div className='RightConversationMessages'>
                {
                    this.context.state.CurrentConversation?.Messages === undefined ? '' : this.context.state.CurrentConversation.Messages.map((mes: Message) =>
                        <RightConversationSingleMessage
                            key={mes.messageID}
                            Message={mes} />
                    )
                }
            </div>
        )
    }
}