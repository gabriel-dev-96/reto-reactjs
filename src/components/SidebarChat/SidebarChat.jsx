import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
//import "./sidebarChat.css";
import { SidebarChatHTML, SidebarChatInfo, NavLink } from './SidebarChatElements';
import { useParams } from 'react-router-dom';
import db from '../../config/firebase';

const SidebarChat = ({ id, name, addNewChat, room }) => {
    const [seed, setSeed] = useState("");
    const { chatId } = useParams();
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if (id && room===true) {
            db.collection('avatars')
                .doc(id)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot =>
                    setMessages(snapshot.docs.map((doc) =>
                        doc.data()))
                )
        }
    }, [id, room]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [chatId]);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");
        if (roomName) {
            db.collection('avatars').add({
                name: roomName,
                room: true,
            })
        }
    }

    return !addNewChat ? (
        <NavLink to={`/chat/${id}`}>
            <SidebarChatHTML>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <SidebarChatInfo>
                    <h2>{name}</h2>
                    {messages[0]?(<p>{`${messages[0]?.name} : ${messages[0]?.message}`}</p>):null}
                </SidebarChatInfo>
            </SidebarChatHTML>
        </NavLink>
    ) : (
            <SidebarChatHTML onClick={createChat}>
                <h2>Crear Grupo</h2>
            </SidebarChatHTML>
        )
}

export default SidebarChat;
