import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import Message from "../message/Message.component";
import "./chat.styles.scss"
import {getToken, getUsername} from "../../utils/auth";

const ChatComponent = () => {
    const socket = io("http://localhost:3000");
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleCreateMessage = (evt) => {
        setMessage(evt.target.value);
    }

    const handleSubmitMessage = (evt) => {
        evt.preventDefault();
        socket.emit("message", {message, sender: user, recipient: 'guest'});
        setMessage('');
    }

    useEffect(() => {
        socket.on("message", ({message}) => {
            setMessages(prevState => [...prevState, message])
        });
    }, []);

    useEffect(() => {
        socket.on('all-messages', (data) => {
            console.log(data)
            setMessages([...data]);
        })
    },[])

    useEffect(() => {
        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
    })

    useEffect(() => {
        setUser(getUsername(getToken()))
    }, [])

    return(
        <>
        <div className="chat">
            <div className="chat__wrapper ">
                    {messages.map((_message, idx) => _message.message && <Message key={idx} owner={user === _message.sender} message={_message.message}/>)}
            </div>
        </div>
            <div className="chat__form">
                <form>

                <input id="text-message" value={message} onChange={handleCreateMessage} type="text" placeholder="Type your message here ..."/>
                <button disabled={message === ''} onClick={handleSubmitMessage}>Send</button>
                </form>
            </div>
        </>
    )
}

export default ChatComponent;