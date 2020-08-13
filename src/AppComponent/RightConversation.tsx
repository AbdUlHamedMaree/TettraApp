import React, { Component } from 'react';
import RightConversationTopStats from './RightConversationTopStats';
import RightConversationBottomBar from './RightConversationBottomBar';
import RightConversationMessages from './RightConversationMessages';
import { MyContext } from './AppProvider';
import { Message } from './Models';


interface RightConversationState {
    Messages: Message[]
}

class RightConversation extends Component<{}, RightConversationState>{

    static contextType = MyContext;
    context!: React.ContextType<typeof MyContext>

    render() {
        return (
            <div className='RightConversation'>
                <MyContext.Consumer>
                    {
                        context => (
                            <React.Fragment>
                                <RightConversationTopStats />
                                <RightConversationMessages Messages={context.state.ConversationMessages} />
                            </React.Fragment>
                        )
                    }
                </MyContext.Consumer>
                <RightConversationBottomBar />
            </div>
        );
    }
}

export default RightConversation;