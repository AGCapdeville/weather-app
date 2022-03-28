import styled from "styled-components";

export const DayCard = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital@0;1&display=swap'); 
    font-family: 'Roboto', sans-serif;   
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 10rem;
    height: 100vh;
    font-weight: bold;
    color: hsl(347,17%,42%);
`;

export const DayCardTop = styled.div`
    margin-top: 5rem;
    width: auto;
    position: relative;
`;

export const DayTitle = styled.div`
    margin-top: 50px;
    font-size: 1.5rem;
`;

// margin-top: 50px;

export const DayNumber = styled.div`
    font-size: 4rem;
`;

export const WeatherIcon = styled.div`
    background-color: hsl(0,0%,17%);
    border-radius: 15px;
    padding: 15px;
`;

export const WeekContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export const MainDayCard = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital@0;1&display=swap');  
    font-family: 'Roboto', sans-serif;  
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 10rem;
    height: 100vh;
    font-weight: bold;
    background-color: yellow;
    color: hsl(14,100%,24%);
`;
