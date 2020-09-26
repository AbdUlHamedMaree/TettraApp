import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css'
import App from './AppComponent/App';
import * as serviceWorker from './serviceWorker';

$(window).on('load', () => {
    setWidth();
})

$(window).on('resize', () => {
    setWidth();
})

function setWidth() {
    const  windowWidth = $(window).width(),
        windowHeight = $(window).height();
    $('.LeftMenu').css({
        height: (windowHeight! - 50)
    });
    $('.RightConversationMessages').css({
        height: (windowHeight! - 110)
    });
    if (windowWidth! <= 800) {
        $('.LeftMenu').css({
            width: (windowWidth!),
            borderWidth: '0px'
        });
        $('.LeftMenuPages').css({
            width: (windowWidth!),
            borderWidth: '0px'
        });
        $('.RightConversation').css({
            width: '100%',
            height: (windowHeight! - 1),
            position: 'absolute',
            boxShadow: 'inset gray 1px 0px 3px 0px'
        })
        $('.LMPHoverEffect').css({
            margin: '0px ' + (windowWidth! / 150) + '%'
        })
    } else {
        $('.LeftMenu').css({
            width: '30%',
            borderWidth: '0',
        });
        $('.LeftMenuPages').css({
            width: '30%',
            borderWidth: '5px'
        });
        $('.RightConversation').css({
            width: '69.9%',
            height: (windowHeight! - 1),
            position: 'relative',
            boxShadow: 'inset gray 1px 0px 3px 0px'
        });
        $('.RightConversationBottomBar').css({
            width: '99.8%'
        });
        $('.textBox').css({
            width: '100%'
        });
        $('.LMPHoverEffect').css({
            margin: '0px ' + (windowWidth! / 400) + '%'
        })
    }
}

ReactDOM.render(< App />, document.getElementById("root"))


serviceWorker.register();