import React, { Component } from 'react';
import RightConversationTopStats from './RightConversationTopStats';
import RightConversationBottomBar from './RightConversationBottomBar';
import RightConversationMessages from './RightConversationMessages';
import { MyContext } from './AppProvider';


interface RightConversationState {
}

class RightConversation extends Component<{}, RightConversationState>{

    static contextType = MyContext;
    context!: React.ContextType<typeof MyContext>

    render() {
        return (
            <div className='RightConversation'>
                            <React.Fragment>
                                <RightConversationTopStats />
                                <RightConversationMessages />
                            </React.Fragment>
                <RightConversationBottomBar />
            </div>
        );
    }
}

export default RightConversation;