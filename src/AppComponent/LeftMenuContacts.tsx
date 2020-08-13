import React, { Component } from "react";
import LeftMenuSingleContact from "./LeftMenuSingleContact";
import { User } from "./Models";
import { MyContext } from "./AppProvider";

interface ILeftMenuContactsProps {
    Contacts: User[];
}

class LeftMenuContacts extends Component<ILeftMenuContactsProps, {}> {
    static contextType = MyContext;
    context!: React.ContextType<typeof MyContext>;

    render() {
        return (
            <MyContext.Consumer>
                {(context) => (
                    <div className="LeftMenuContacts">
                        {this.props.Contacts.map((contact) => {
                            let mess = context.state.Messages.filter((mes) => {
                                if (
                                    (mes.senderUserID ===
                                        this.context.state.CurrentUser.userID &&
                                        mes.reciverUserID === contact.userID) ||
                                    (mes.senderUserID === contact.userID &&
                                        mes.reciverUserID ===
                                            context.state.CurrentUser.userID)
                                )
                                    return mes;
                                else return undefined;
                            });
                            return (
                                <LeftMenuSingleContact
                                    key={contact.userID}
                                    user={contact}
                                    Messages={mess}
                                />
                            );
                        })}
                    </div>
                )}
            </MyContext.Consumer>
        );
    }
}
export default LeftMenuContacts;
