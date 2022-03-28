import styled from "styled-components";


// background-size: 25% 75%;
// background-repeat: no-repeat;

//     background: radial-gradient(circle at 1% top, #30302F, #000000);


export const WeekContainer = styled.div`
    height: 100vh;
    width: fit-content;
    display: flex;
    overflow: auto;
    flex-direction: row;
    justify-content: space-around;
    
    background: radial-gradient(circle closest-side at top, #30302F, #000000);

    min-width: 100vw;
    font-weight: bold;

    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital@0;1&display=swap'); 
    font-family: 'Roboto', sans-serif;  
`;

export const DayCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    color: hsl(347,17%,42%);
    padding-left: 1rem;
    padding-right: 1rem;
`;

// width: 10rem;
export const MainDayCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: yellow;
    color: hsl(14,100%,24%);
    padding-left: 1rem;
    padding-right: 1rem;
`;

export const DayTitle = styled.div`
    margin-top: 5rem;
    font-size: 1.2rem;
`;

export const DayNumber = styled.div`
    font-size: 15vw;
    @media screen and (min-width: 500px) {
        font-size: 5vw;
    }
`;

export const WeatherIcon = styled.div`
    background-color: hsl(0,0%,17%);
    border-radius: 1em;
    padding: 1em;
`;

export const Month = styled.div`
    margin-top: 5rem;
    font-size: 13rem;
    transform: rotate(10deg);
    color: black;
    @media screen and (min-width: 500px) {
        margin-top: 4rem;
    }
`;

