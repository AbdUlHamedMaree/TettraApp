import React, { Component } from "react";
import LeftMenuSingleContact from "./LeftMenuSingleContact";
import { ConversationUser } from "./Models";
import { MyContext } from "./AppProvider";

interface ILeftMenuContactsProps {
    Contacts: ConversationUser[];
}

class LeftMenuContacts extends Component<ILeftMenuContactsProps, {}> {
    static contextType = MyContext;
    context!: React.ContextType<typeof MyContext>;

    SetConversation = (usr: ConversationUser) => {
        this.context.SetContact(usr);
    }

    render() {
        return (
            <div className="LeftMenuContacts">
                {
                    this.props.Contacts.map((contact) => {
                        return (
                            <LeftMenuSingleContact
                                key={contact.ConversationID}
                                user={contact}
                                setContact={this.SetConversation}
                            />
                        );
                    })
                }
            </div>
        );
    }
}
export default LeftMenuContacts;
