import React, { Component } from "react";
import { MyContext } from "./AppProvider";
import { Message } from "./Models";
import $ from "jquery";

class RightMenuBottomBar extends Component {
    static contextType = MyContext;
    context!: React.ContextType<typeof MyContext>;

    static MessageID: number = 0;
    EmojiNumberArray: number[];

    constructor(props: any) {
        super(props);
        this.EmojiNumberArray = Array.from([
            128512,
            128513,
            128514,
            128515,
            128516,
            128517,
            128518,
            128519,
            128520,
            128521,
            128522,
            128523,
            128524,
            128525,
            128526,
            128527,
            128528,
            128529,
            128530,
            128531,
            128532,
            128533,
            128534,
            128535,
            128536,
            128537,
            128538,
            128539,
            128540,
            128541,
            128542,
            128543,
            128544,
            128545,
            128546,
            128547,
            128548,
            128549,
            128550,
            128551,
            128552,
            128553,
            128554,
            128555,
            128556,
            128557,
            128558,
            128559,
            128560,
            128561,
            128562,
            128563,
            128564,
            128565,
            128566,
            128567,
            128568,
            128569,
            128570,
            128571,
            128572,
            128573,
            128574,
            128575,
            128576,
            128577,
            128578,
            129296,
            129297,
            129298,
            129299,
            129300,
            129301,
            129302,
            129303,
            129304,
            129305,
            129306,
            129307,
            129308,
            129309,
            129310,
            129311,
            129312,
            129313,
            129314,
            129315,
            129316,
            129317,
            129318,
            129319,
            129320,
            129321,
            129322,
            129323,
            129324,
            129325,
            129326,
            129488,
        ]);
    }

    OpenCloseEmojeForm = () => {
        let el = document.getElementById("PopupFormContainer")!;
        el.style.display = el.style.display === "block" ? "none" : "block";
    };
    TypeEmoji = (
        emg: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        $("#Message_TextBox").val(
            $("#Message_TextBox").val() + $(emg.target).text()
        );
    };

    OKClick = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        if (ev.keyCode === 13) this.AddMessage();
    };

    AddMessage = () => {
        this.context.AddMessage({
            messageID: RightMenuBottomBar.MessageID++,
            content: $("#Message_TextBox").val(),
            senderUserID: this.context.state.CurrentUser.userID,
            reciverUserID: this.context.state.ConversationUser.userID,
            messageSendDate: new Date(),
            readed: false,
            replayMessageID: undefined,
            reciverGroupID: undefined,
        } as Message);
        $("#Message_TextBox").val("");
    };

    render() {
        return (
            <div className="RightConversationBottomBar continerMiddle">
                <svg
                    className="HoverEffect childCenter"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    width="10mm"
                    height="10mm"
                    viewBox="0 0 1000 1000"
                >
                    <path
                        name="file"
                        d=" M 400 75C 400 75 400 75 400 75C 400 75 650 76 650 76C 650 76 650 275 650 275C 650 289 661 300 675 300C 675 300 873 300 873 300C 873 300 875 700 875 700C 875 741 841 775 800 775C 800 775 400 775 400 775C 359 775 325 741 325 700C 325 700 325 150 325 150C 325 110 357 77 397 75C 398 75 399 75 400 75C 400 75 400 75 400 75C 400 75 400 75 400 75C 400 75 400 75 400 75M 716 83C 716 83 865 228 865 228C 870 233 873 240 873 246C 873 246 873 250 873 250C 873 250 700 250 700 250C 700 250 700 76 700 76C 706 77 712 79 716 83C 716 83 716 83 716 83M 275 210C 275 210 275 699 275 699C 275 775 325 826 400 826C 400 826 675 825 675 825C 675 825 675 845 675 845C 675 881 646 910 610 910C 610 910 190 910 190 910C 154 910 125 881 125 845C 125 845 125 275 125 275C 125 240 153 212 187 210C 188 210 189 210 190 210C 190 210 275 210 275 210"
                        transform=""
                    ></path>
                </svg>

                <input
                    id="Message_TextBox"
                    className="textBox childCenter"
                    type="text"
                    placeholder="Write Your Message..."
                    onKeyDown={(ev) => this.OKClick(ev)}
                />

                <svg
                    className="HoverEffect childCenter"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    width="10mm"
                    height="10mm"
                    viewBox="0 0 1000 1000"
                    onClick={this.OpenCloseEmojeForm}
                >
                    <path
                        name="Smile"
                        d="M 500 0C 224 0 0 224 0 500C 0 776 224 1000 500 1000C 776 1000 1000 776 1000 500C 1000 224 776 0 500 0C 500 0 500 0 500 0 M 412 375C 412 423 373 462 325 462C 277 462 238 423 238 375C 238 327 277 287 325 287C 373 287 412 327 412 375C 412 375 412 375 412 375M 763 375C 763 423 723 462 675 462C 627 462 588 423 588 375C 588 327 627 287 675 287C 723 287 763 327 763 375C 763 375 763 375 763 375M 803 611C 810 622 811 635 805 647C 749 764 630 840 500 840C 370 840 251 765 195 647C 186 628 194 605 213 596C 232 587 254 596 263 615C 306 706 399 765 500 765C 602 765 694 706 737 614C 743 601 757 592 772 593C 785 593 797 600 803 611C 803 611 803 611 803 611"
                        transform=""
                    ></path>
                </svg>

                <div id="PopupFormContainer">
                    {this.EmojiNumberArray.map((num, index) => {
                        return (
                            <button
                                key={index}
                                onClick={(e) => this.TypeEmoji(e)}
                            >
                                {String.fromCodePoint(num)}
                            </button>
                        );
                    })}
                </div>

                <MyContext.Consumer>
                    {(context) => (
                        <div onClick={() => this.AddMessage()}>
                            <svg
                                id="ArrowSVG"
                                className="HoverEffect childCenter"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                width="10mm"
                                height="10mm"
                                viewBox="0 0 1000 1000"
                            >
                                <path
                                    name="Arrow"
                                    d=" M 526 223C 526 223 526 223 526 223C 526 223 526 223 527 223C 527 223 727 423 727 423C 742 438 742 462 727 477C 712 492 688 492 673 477C 673 477 538 341 538 341C 538 341 538 750 538 750C 538 771 522 788 501 788C 480 789 463 771 463 750C 463 750 463 340 463 340C 463 340 327 477 327 477C 312 492 288 492 273 477C 258 462 258 438 273 423C 273 423 469 228 469 228C 476 218 488 212 500 212C 509 212 519 216 526 223C 526 223 526 223 526 223"
                                    transform="rotate(90, 500, 500) "
                                ></path>
                            </svg>
                        </div>
                    )}
                </MyContext.Consumer>
            </div>
        );
    }
}

export default RightMenuBottomBar;
