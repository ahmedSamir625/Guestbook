import React from 'react';
import './TextBox.css';

const TextBox = (props) => {
    const { onInputChange, onSendClick ,input,action ,cancelAction} = props;
    return (

     
        <div className="textbox-position textbox-style center">
            
            <textarea
                rows='1'
                wrap='on'
                autoCapitalize='on'
                // type='text'
                className="input-style"
                value={input}
                onChange={onInputChange}
            />

            <button
                className="send-btn"
                onClick={onSendClick}
            >{action}</button>
            {
                action!=='Add'? <button onClick={cancelAction} className="cancel-btn">Cancel</button>:''

            }
        </div>
    );
}


export default TextBox
