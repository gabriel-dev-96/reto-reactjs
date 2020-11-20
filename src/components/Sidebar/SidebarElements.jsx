import styled from 'styled-components';

export const SidebarHTML = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.35;
`

export const SidebarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-right: 1px solid lightgray;
`

export const SidebarHeaderRight = styled.div`
    display: flex;
    /*align-items: center;
    justify-content: space-between;
    min-width: 10vw;
    & .MuiSvgIcon-root{
        margin-left: 2vw;
        font-size: 24px !important;
    }*/
`;

export const SidebarSearch = styled.div`
    display: flex;
    align-items: center;
    background-color: #f6f6f6;
    height: 39px;
    padding: 10px;
`

export const SidebarSearchContainer = styled.div`
    display: flex;
    align-items: center ;
    background-color: white;
    width: 100%;
    height: 35px;
    border-radius: 20px;
    & > input{
        border: none;
        margin-left: 10px;
        width: 80%;
        height: 25px;
    }
    & > .MuiSvgIcon-root{
        color: gray;
        padding: 10px;
    }
`

export const SidebarChats = styled.div`
    flex: 1;
    overflow: scroll;
`