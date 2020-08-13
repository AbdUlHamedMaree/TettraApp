import React, { Component } from 'react';
import LeftMenuContacts from './LeftMenuContacts';
import LeftMenuPages from './LeftMenuPages';
import LeftMenuTopState from './LeftMenuTopState'
import { MyContext } from './AppProvider';

class LeftMenu extends Component {
    render() {
        return (
            <div className='LeftMenu'>
                <MyContext.Consumer>
                    {
                        context => (
                            <React.Fragment>
                                <LeftMenuTopState User = {context.state.CurrentUser} />
                                Chats:
                                <LeftMenuContacts Contacts = {context.state.UserContacts}/>
                                <LeftMenuPages />
                            </React.Fragment>
                        )
                    }
                </MyContext.Consumer>
            </div>
        );
    }
}


export default LeftMenu;