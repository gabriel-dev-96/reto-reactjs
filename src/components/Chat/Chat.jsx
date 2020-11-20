import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChatHTML, ChatHeader, ChatHeaderInfo, ChatMessage, ChatTimestamp, ChatName, ChatHeaderRight, ChatBody, ChatFooter } from './ChatElements';
import db from '../../config/firebase';

const Chat = () => {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { chatId } = useParams();
    const [messages, setMessages] = useState([]);
    const [toNickname, setToNickname] = useState("");
    const [room, setRoom] = useState(false);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
        if (chatId) {
            db.collection('avatars')
                .doc(chatId)
                .onSnapshot((snapshot) => setToNickname
                    (snapshot.data().name));
            db.collection('avatars')
                .doc(chatId)
                .onSnapshot((snapshot) => setRoom
                    (snapshot.data().room));
            if(room){
                db.collection('avatars')
                .doc(chatId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => (
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                ))
            }
            else{
                //Realizar una consulta a la bd , usando el id de quien envia y el id de quien recibe
                let idFrom = document.getElementById("idNickname").innerHTML;
                console.log(room, 'este chat es private',idFrom);
                db.collection('messagesPrivate')
                .doc(`${[chatId,idFrom].sort()[0]}${[chatId,idFrom].sort()[1]}`)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => (
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                ))
            }
        }
    }, [chatId, room]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('You typed', input);
        let idFrom = document.getElementById("idNickname").innerHTML;
        let nicknameFrom = document.getElementById("nickname").innerHTML;
        console.log(idFrom, nicknameFrom);
        room?(db.collection('avatars')
        .doc(chatId)
        .collection('messages').add({
            message: input,
            name: nicknameFrom,
            timestamp: new Date(),
            toIdNickname: idFrom,
        })):
        db.collection('messagesPrivate')
        .doc(`${[chatId,idFrom].sort()[0]}${[chatId,idFrom].sort()[1]}`)
        .collection('messages').add({
            message: input,
            name: nicknameFrom,
            timestamp: new Date(),
        })

        setInput("");
    }
    return (
        <ChatHTML>
            <ChatHeader>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <ChatHeaderInfo>
                    <h3>{toNickname}</h3>
                    <p>Last seen at ....
                    17-11-2020
                    </p>
                </ChatHeaderInfo>
                <ChatHeaderRight>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </ChatHeaderRight>
            </ChatHeader>
            <ChatBody>
                {messages.map((message, index) => (
                    <ChatMessage
                        key={index}>
                        <ChatName>{message.name}</ChatName>
                        {message.message}
                        <ChatTimestamp>{new Date(message.timestamp?.toDate()).toLocaleString()}</ChatTimestamp>
                    </ChatMessage>
                ))}
            </ChatBody>
            <ChatFooter>
                <form>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        type="text" />
                    <button
                        onClick={sendMessage}
                        type="submit">Send a message
                    </button>
                </form>
            </ChatFooter>
        </ChatHTML>
    )
}

export default Chat
