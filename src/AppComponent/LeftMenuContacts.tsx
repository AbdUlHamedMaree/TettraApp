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

    render() {
        return (
            <div className="LeftMenuContacts">
                {
                    this.props.Contacts.map((contact) => {
                        return (
                            <LeftMenuSingleContact
                                key={contact.ConversationID}
                                user={contact}
                            />
                        );
                    })
                }
            </div>
        );
    }
}
export default LeftMenuContacts;
