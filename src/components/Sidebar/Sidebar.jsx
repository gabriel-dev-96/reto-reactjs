import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Modal, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SidebarChat from '../SidebarChat/SidebarChat';
import { SearchOutlined } from '@material-ui/icons';
import { SidebarHTML, SidebarHeader, SidebarHeaderRight, SidebarSearch, SidebarSearchContainer, SidebarChats } from './SidebarElements';
import db from '../../config/firebase';

//rfce para crear una estructura de un componente
const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: "16px 32px 24px",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    textfield: {
        width: '100%'
    }
}))
const Sidebar = () => {
    const [avatars, setAvatars] = useState([]);
    const [idNickname, setIdNickname] = useState("");
    const [nickname, setNickname] = useState("Anonimo");
    const [modal, setModal] = useState(false);

    const saveNickname = async (e) => {
        e.preventDefault();
        await db.collection('avatars')
            .doc(idNickname)
            .update({
                name: nickname
            })
        setModal(false);

    }
    const handleInputChange = e => {
        setNickname(e.target.value);
    }
    const editNickName = () => {
        setModal(!modal);
    }

    const createAvatar = async () => {
        await db.collection('avatars').add({
            name: nickname,
            room: false
        })
            .then((docRef) => {
                setIdNickname(docRef.id)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const inputSearch = async (e) => {
        e.target.value.toLowerCase() === "" ? (db.collection('avatars').onSnapshot(snapshot =>
            setAvatars(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        )) : setAvatars(avatars.filter(function (avatar) {
            let name = avatar.data.name.toLowerCase();
            return name.indexOf(e.target.value.toLowerCase()) > -1
        }))
    }

    const styles = useStyles();
    const bodyModal = (
        <div className={styles.modal}>
            <div align="center">
                <h2>Cambie su Nickname</h2>
            </div>
            <form onSubmit={saveNickname}>
                <TextField name="nickname" onChange={handleInputChange} label="Avatar" className={styles.textfield} />
                <br />
                <div align="center">
                    <Button type="submit" color="primary">Save</Button>
                </div>
            </form>
        </div>
    )
    useEffect(() => {
        const unsubscribe = db.collection('avatars').onSnapshot(snapshot =>
            setAvatars(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return () => {
            unsubscribe();
        }
    }, []);
    
    useEffect(() => {
        createAvatar();
    }, [])

    return (
        <SidebarHTML>
            <SidebarHeader>
                <p style={{ display: "none" }} id="idNickname">{idNickname}</p>
                <Avatar src="" />
                <h3 id="nickname">{nickname}</h3>
                <SidebarHeaderRight>
                    <IconButton onClick={editNickName}>
                        <EditIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </SidebarHeaderRight>
            </SidebarHeader>

            <SidebarSearch>
                <SidebarSearchContainer>
                    <SearchOutlined />
                    <input onChange={inputSearch} placeholder="Search ..." type="text" />
                </SidebarSearchContainer>
            </SidebarSearch>

            <SidebarChats>
                <SidebarChat addNewChat />
                {avatars.map(avatar => (
                    <SidebarChat
                        key={avatar.id}
                        id={avatar.id}
                        name={avatar.data.name}
                        room={avatar.data.room}
                    />
                ))}
            </SidebarChats>
            <Modal
                open={modal}
                onClose={editNickName}>
                {bodyModal}
            </Modal>
        </SidebarHTML>
    )
}

export default Sidebar
