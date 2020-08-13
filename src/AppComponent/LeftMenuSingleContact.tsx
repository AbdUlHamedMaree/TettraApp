import React, { Component } from "react";
import { IContextInit, MyContext } from "./AppProvider";
import { User, Message } from "./Models";

interface ILeftMenuSingleContactProps {
    user: User;
    Messages: Message[] | undefined;
}

interface ILeftMenuSingleContactState {
    Messages: Message[];
}

export default class LeftMenuSingleContact extends Component<
    ILeftMenuSingleContactProps,
    ILeftMenuSingleContactState
> {
    static contextType = MyContext;
    context!: React.ContextType<typeof MyContext>;

    setConversation = (context: IContextInit) => {
        context.SetContact(this.props.user);
        if (this.props.Messages !== undefined)
            context.SetMessages(this.props.Messages);
    };
    render() {
        return (
            <MyContext.Consumer>
                {(context) => (
                    <div
                        className="LeftMenuSingleContact"
                        onClick={() => this.setConversation(context)}
                    >
                        <div>
                            <img
                                className="LMC_Image"
                                src={require("../Images/Profile.jpg")}
                                width="50px"
                                height="50px"
                                alt="Profile"
                            />
                        </div>
                        <div className="LMC_UserName">
                            {this.props.user.userName}
                        </div>
                        <div className="LMC_LastMessage">
                            {this.props.Messages===undefined?
                            "":
                                this.props.Messages![
                                    this.props.Messages!.length - 1
                                ].content
                            }
                        </div>
                        <div className="LMC_LastSeen">
                            {this.props.user.lastSeen}
                        </div>
                    </div>
                )}
            </MyContext.Consumer>
        );
    }
}
