import styled from "styled-components";

export const MainDayStyle = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital@0;1&display=swap');  
    font-family: 'Roboto', sans-serif;  
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px;
    height: 100vh;
    font-weight: bold;
    background-color: yellow;
    color: black;
`;

export const DayStyle = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital@0;1&display=swap'); 
    font-family: 'Roboto', sans-serif;   
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
    height: 100vh;
    font-weight: bold;
    color: hsl(0,0%,40%);
`;

export const DayTitle = styled.div`
    font-size: 1.5rem;
    margin-top: 5rem;
`;

export const DayNumber = styled.div`
    font-size: 4rem;
`;

export const WeatherIcon = styled.div`
    font-size: 5rem;
`;

export const WeekContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

