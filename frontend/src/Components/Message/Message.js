import React from 'react'
import './Message.css'

const dateFormat = require('dateformat');


const Message = ({ msg, delEvent, editMessage, replyMessage, sameUser }) => {

    let backgroundColor = '';
    let usernameColor = msg.user.color;
    let fontColor = ''

    if (sameUser) {
        backgroundColor = '#900c3f';
        usernameColor = '#ffffff';
        fontColor = '#ffffff';
    }

    const date = dateFormat(msg.date, "h:MM TT - dddd, mmmm dS, yyyy");

    return (
        <div align='center' >
            <div className="msg-style " style={{ color: fontColor, backgroundColor: backgroundColor }} align='left' >
                <label className="username-style" style={{ color: usernameColor }}>{msg.user.username}</label>

                <p className="msg-body">{msg.msg}</p>
                {
                    msg.repliedmsgInfo
                        ?
                        <div>
                            {
                                msg.repliedmsgInfo === "deleted message" ?
                                    <div style={{ borderStyle: 'none', color: '#ffaa00' }} className="replied-msg-style">
                                        {'⚠ This Message is Deleted !'}
                                    </div>
                                    :
                                    <div style={{ wordBreak: "break-word", borderLeftColor: msg.repliedmsgInfo.color }} className="replied-msg-style">
                                        <label style={{ color: msg.repliedmsgInfo.color }} className="replied-username-style" >{msg.repliedmsgInfo.username}</label>
                                        <label style={{ textAlign: "left" }}>{msg.repliedmsgInfo.msg}</label>
                                    </div>
                            }
                        </div>
                        : ''
                }
                <div className="footer" >
                    <p className="date-style">{date}    </p>
                    {
                        sameUser
                            ?
                            <div className="btns-position">
                                <button className="btn edit-delete-btn-style" onClick={editMessage}>{'Edit'}</button>
                                <button className="btn edit-delete-btn-style" onClick={delEvent}>{'Delete'}</button>
                            </div>
                            :
                            <div className="btns-position ">
                                <button className="btn reply-btn-style"   onClick={replyMessage} >{'Reply'}</button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Message