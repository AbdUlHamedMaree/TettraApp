import React, { Component } from "react";
import $ from "jquery";
import { MyContext } from "./AppProvider";
import { User } from "./Models";
import LeftMenuSingleContact from "./LeftMenuSingleContact";

interface LeftMenuPagesProps {}

interface LeftMenuPagesState {
    ActiveId: string;
    UserToAdd: User[];
}

export default class LeftMenuPages extends Component<
    LeftMenuPagesProps,
    LeftMenuPagesState
> {
    static contextType = MyContext;
    context!: React.ContextType<typeof MyContext>;

    state = {
        ActiveId: "Persone",
        UserToAdd: [] as User[],
    };

    OpenCloseAddUserContiner = () => {
        let el = document.getElementById("PopUpUserAdd")!;
        el.style.display = el.style.display === "block" ? "none" : "block";
    };

    SearchNewUser = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            let usrnm = $(e.target).val()?.toString();
            let usrs = this.context.GetUsersByUserNameOrEMail(usrnm);
            this.setState({ UserToAdd: usrs });
        }
    };

    AddNewUserToConversations = (
        ev: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        for (let i = 0; i < (ev.target as HTMLElement).children.length; i++) {
            const el = (ev.target as HTMLElement).children[i];
            if (el.className === "LMC_UserName") {
                this.context.AddUserToConversations($(el).text()?.toString()!);
                break;
            }
        }
    };

    SVG_style: React.CSSProperties = {
        margin: "0px 5%",
        padding: "5",
        float: "left",
        width: "30px",
        height: "auto",
        transition: ".2s",
        alignSelf: "center",
        borderRadius: "50%",
    };

    Path_style: React.CSSProperties = {
        fill: "rgb(180,180,180)",
        transition: ".2s",
    };

    PlusSVG_Style: React.CSSProperties = {
        position: "relative",
        bottom: "35px",
        backgroundColor: "rgb(0, 100, 200)",
        padding: "20px",
        width: "30px",
        boxShadow: "0px 0px 1px 10px white",
        margin: "0px 10px",
        float: "left",
        height: "auto",
        transition: ".2s",
        alignSelf: "center",
        borderRadius: "50%",
    };

    PlusPath_Style: React.CSSProperties = {
        fill: "white",
    };

    changeCSS: (
        parent: JQuery<HTMLElement>,
        child: JQuery<HTMLElement>
    ) => void = (parent: JQuery<HTMLElement>, child: JQuery<HTMLElement>) => {
        $(parent).css({ backgroundColor: "rgb(240,240,240)" });
        $(child).css({ fill: "rgb(180, 180, 180)" });
    };
    componentDidMount() {
        $(window).on("load", () => {
            $("#" + this.state.ActiveId)
                .children()
                .css({ fill: "rgb(0, 100, 200)" });
        });
        $(".SVG").click((e) => {
            if (
                $(e.target).parent().attr("id") !== "PlusSVG" &&
                e.target.id !== "PlusSVG"
            ) {
                if (e.target.id !== "") {
                    this.setState({ ActiveId: e.target.id });
                    $(e.target)
                        .siblings()
                        .children()
                        .css({ fill: "rgb(180, 180, 180)" });
                    $(e.target).children().css({ fill: "rgb(0, 100, 200)" });
                } else {
                    this.setState({
                        ActiveId: $(e.target).parent().attr("id")!,
                    });
                    $(e.target)
                        .parent()
                        .siblings()
                        .children()
                        .css({ fill: "rgb(180, 180, 180)" });
                    $(e.target).css({ fill: "rgb(0, 100, 200)" });
                }
            }
            $("#PlusSVG").children().css({ fill: "white" });
        });
        $(".SVG")
            .children()
            .on("mouseover", (e) => {
                if ($(e.target).parent().prop("id") !== "PlusSVG") {
                    $(e.target).parent().css({
                        backgroundColor: "rgb(0,100,200)",
                        cursor: "pointer",
                    });
                    $(e.target).css({ fill: "white" });
                } else {
                    $(e.target).parent().css({
                        boxShadow:
                            "0px 0px 1px 10px rgbA(0, 100, 200,.5),0px 0px 1px 10px white",
                    });
                }
            });

        $(".SVG").on("mouseover", (e): void => {
            if ($(e.target).prop("id") !== "PlusSVG") {
                $(e.target).css({
                    backgroundColor: "rgb(0,100,200)",
                    cursor: "pointer",
                });
                $(e.target).children().css({ fill: "white" });
            } else {
                $(e.target).css({
                    boxShadow:
                        "0px 0px 1px 10px rgbA(0, 100, 200,.5),0px 0px 1px 10px white",
                    cursor: "pointer",
                });
            }
        });
        $(".SVG")
            .children()
            .on("mouseout", (e) => {
                if ($(e.target).parent().prop("id") !== "PlusSVG") {
                    this.changeCSS($(e.target).parent(), $(e.target));
                    $("#" + this.state.ActiveId)
                        .children()
                        .css({ fill: "rgb(0, 100, 200)" });
                } else {
                    $(e.target).css({ boxShadow: "0px 0px 1px 10px white" });
                }
            });
        $(".SVG").on("mouseout", (e) => {
            if ($(e.target).prop("id") !== "PlusSVG") {
                this.changeCSS($(e.target), $(e.target).children());
                $("#" + this.state.ActiveId)
                    .children()
                    .css({ fill: "rgb(0, 100, 200)" });
            } else {
                $(e.target).css({ boxShadow: "0px 0px 1px 10px white" });
            }
        });
    }

    render() {
        return (
            <div className="LeftMenuPages continerMiddle">
                <svg
                    id="Persone"
                    style={this.SVG_style}
                    className="SVG LMPHoverEffect"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    viewBox="0 0 1000 1000"
                >
                    <path
                        name="Persone"
                        style={this.Path_style}
                        d=" M 175 750C 175 750 175 750 175 750C 175 625 250 550 375 550C 458 571 458 575 500 575C 542 575 547 571 630 550C 755 550 825 625 825 750C 825 750 825 825 825 825C 825 867 792 900 750 900C 750 900 250 900 250 900C 208 900 175 867 175 825C 175 825 175 750 175 750M 367 173C 367 173 367 173 367 173C 403 138 450 118 500 118C 550 118 597 138 633 173C 668 208 688 256 688 306C 687 409 604 493 500 493C 396 493 312 409 312 306C 312 256 332 208 367 173"
                        transform=""
                    ></path>
                </svg>
                <svg
                    id="Groub"
                    style={this.SVG_style}
                    className="SVG LMPHoverEffect"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    viewBox="0 0 1000 1000"
                >
                    <path
                        name="Groub"
                        style={this.Path_style}
                        d=" M 500 143C 500 143 500 143 500 143C 543 143 584 160 615 191C 645 221 663 263 663 306C 662 396 590 468 500 468C 410 468 337 396 337 306C 337 263 355 221 385 191C 416 160 457 143 500 143M 209 306C 209 306 209 306 209 306C 233 306 256 315 272 332C 289 349 299 372 299 396C 299 446 258 486 209 486C 159 486 118 446 118 396C 118 372 128 349 145 332C 162 315 185 306 209 306M 787 306C 787 306 787 306 787 306C 811 306 834 315 851 332C 868 349 878 372 878 396C 878 446 837 486 787 486C 738 486 697 446 697 396C 697 372 707 349 724 332C 741 315 764 306 787 306M 149 514C 189 524 189 526 209 526C 229 526 231 524 271 514C 308 514 335 527 350 551C 263 559 205 605 184 682C 184 682 88 682 88 682C 68 682 52 666 52 646C 52 646 52 610 52 610C 52 550 88 514 149 514C 149 514 149 514 149 514M 727 514C 767 524 767 526 787 526C 808 526 810 524 850 514C 910 514 944 550 944 610C 944 610 944 646 944 646C 944 666 928 682 908 682C 908 682 817 682 817 682C 796 603 738 556 647 550C 663 527 691 514 727 514C 727 514 727 514 727 514M 633 575C 689 576 729 592 756 620C 784 649 800 692 800 750C 800 750 800 825 800 825C 800 853 778 875 750 875C 750 875 250 875 250 875C 222 875 200 853 200 825C 200 825 200 750 200 750C 200 693 217 650 246 621C 274 592 316 576 372 575C 411 585 431 591 447 595C 464 599 478 600 500 600C 522 600 536 599 555 595C 572 591 594 585 633 575C 633 575 633 575 633 575"
                        transform=""
                    ></path>
                </svg>
                <svg
                    id="PlusSVG"
                    style={this.PlusSVG_Style}
                    className="SVG LMPHoverEffect"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    viewBox="0 0 1000 1000"
                    onClick={this.OpenCloseAddUserContiner}
                >
                    <path
                        name="Plus"
                        style={this.PlusPath_Style}
                        d="M 100 440 L 900 440 L 900 560 L 100 560 Z"
                        transform=""
                    />
                    <path
                        name="Plus"
                        style={this.PlusPath_Style}
                        d="M 440 100 L 440 900 L 560 900 L 560 100 Z"
                        transform=""
                    />
                </svg>

                <div id="PopUpUserAdd">
                    <input
                        id="PopUpUserAdd_SearchBox"
                        type="search"
                        onKeyDown={(e) => this.SearchNewUser(e)}
                    />
                    <div id="PopUpUserAdd_UserList">
                        {this.state.UserToAdd.map((usr) => (
                            <div
                                onClick={(e) =>
                                    this.AddNewUserToConversations(e)
                                }
                            >
                                <LeftMenuSingleContact
                                    user={usr}
                                    Messages={undefined}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <svg
                    id="Setting"
                    style={this.SVG_style}
                    className="SVG LMPHoverEffect"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    viewBox="0 0 1000 1000"
                >
                    <path
                        name="Setting"
                        style={this.Path_style}
                        d=" M 500 328C 500 328 500 328 500 328C 405 328 328 405 328 500C 328 595 405 672 500 672C 595 672 672 595 672 500C 672 405 595 328 500 328M 463 101C 463 101 463 101 463 101C 463 101 534 101 534 101C 558 101 578 118 582 142C 582 142 592 198 592 198C 611 203 630 211 648 221C 648 221 694 188 694 188C 713 174 739 177 758 193C 758 193 807 243 807 243C 825 260 827 287 813 306C 813 306 780 352 780 352C 789 370 796 388 802 407C 802 407 858 416 858 416C 882 420 899 441 899 465C 899 465 899 535 899 535C 899 559 882 580 858 584C 858 584 802 593 802 593C 796 612 789 630 779 648C 779 648 812 694 812 694C 826 714 824 740 807 757C 807 757 757 807 757 807C 741 822 714 826 694 812C 694 812 648 779 648 779C 630 789 612 796 593 802C 593 802 584 858 584 858C 580 882 559 899 535 899C 535 899 465 899 465 899C 441 899 420 882 416 858C 416 858 407 802 407 802C 389 796 371 789 354 780C 354 780 307 814 307 814C 288 827 263 825 244 808C 244 808 194 759 194 759C 177 742 175 715 189 695C 189 695 222 649 222 649C 212 632 205 614 199 595C 199 595 142 586 142 586C 118 582 101 561 101 537C 101 537 101 467 101 467C 101 442 118 422 142 418C 142 418 197 409 197 409C 203 390 210 372 220 354C 220 354 186 307 186 307C 172 288 175 261 192 244C 192 244 241 194 241 194C 257 179 285 175 305 189C 305 189 351 222 351 222C 368 212 386 205 405 199C 405 199 415 142 415 142C 419 118 439 101 463 101"
                        transform=""
                    ></path>
                </svg>
                <svg
                    id="Search"
                    style={this.SVG_style}
                    className="SVG LMPHoverEffect"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    viewBox="0 0 1000 1000"
                >
                    <path
                        name="Search"
                        style={this.Path_style}
                        d=" M 601 199C 601 199 601 199 601 199C 491 199 401 289 401 399C 401 452 422 503 460 540C 497 578 548 599 601 599C 711 599 801 509 801 399C 801 289 711 199 601 199M 601 99C 601 99 601 99 601 99C 767 99 901 233 901 399C 901 479 869 555 813 611C 757 667 681 699 601 699C 534 699 468 676 416 634C 416 634 211 839 211 839C 201 849 176 850 166 840C 166 840 136 809 136 809C 126 799 126 774 136 764C 136 764 345 555 345 555C 316 508 301 454 301 399C 301 319 333 243 389 187C 445 131 521 99 601 99"
                        transform="translate(1000,0) scale(-1,1) "
                    ></path>
                </svg>
            </div>
        );
    }
}
