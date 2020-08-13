import React, { Component } from 'react';
import AppProvider, { MyContext } from './AppProvider';
import LeftMenu from './LeftMenu';
import RightConversation from './RightConversation';

export default class App extends Component {
    
    static contextType = MyContext;
    context!: React.ContextType<typeof MyContext>
    
    render() {
        return (
            <div className='App'>
                <AppProvider>
                    <LeftMenu />
                    <RightConversation />
                </AppProvider>
            </div>
        );
    }
}