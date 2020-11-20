import styled from 'styled-components';

export const ChatHTML = styled.div`
    flex: 0.65;
    display: flex;
    flex-direction: column;
`

export const ChatHeader = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
`

export const ChatHeaderInfo = styled.div`
    flex: 1;
    padding-left: 20px;
    & > h3{
        margin-bottom: 3px;
        font-size: 500;
    }
    & > p{
        color: gray;
    }
`

export const ChatMessage = styled.p`
    position: relative;
    font-size: 16px;
    padding: 10px;
    border-radius: 10px;
    width: fit-content;
    background-color: #ffffff;
    margin-bottom: 30px;
`
  
export const ChatReciever = styled.div`
    margin-left: auto;
    background-color: #dcf8c6;
`

export const ChatTimestamp = styled.span`
    margin-left: 10px;
    font-size: xx-small;
` 

export const ChatName = styled.span`
    position: absolute;
    top: -15px;
    font-weight: 800;
    font-size: xx-small;
`

export const ChatHeaderRight = styled.div`
    display: flex;
    justify-content: space-between;
    min-width: 100px;
`

export const ChatBody = styled.div`
    flex: 1;
    background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
    background-repeat: repeat;
    background-position: center;
    padding: 30px;
    overflow-y: scroll;
`

export const ChatFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 62px;
    margin-left: 20px;
    margin-right: 20px;
    border-top: 1px solid lightgray;
    & > form{
        flex: 1;
        display: flex;
        & > button{
            border-radius: 20px;
            margin-left: 10px;
            margin-right: 10px;
            cursor: pointer;
            padding: 10px 10px;
        }
    }
    & > form > input {
        flex: 1;
        border-radius: 30px;
        padding: 10px;
        border: none;
    }
    /*& > form > button > {
        display: none;
    }*/
    & .MuiSvgIcon-root{
        padding: 10px;
        color: gray; 
    }
`
