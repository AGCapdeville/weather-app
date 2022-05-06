import styled from "styled-components";
import {
  location,
  locationBlue,
} from "../../../images";

export const SourceContainer = styled.div`
    position: absolute;
    right: 15px; 
    bottom: 15px; 
    z-index: 9999; 
`;

export const SourceButton = styled.button`
    appearance: none;
    background-color: #2b2b2b;
    border: 2px solid #1a1a1a;
    border-radius: 15px;
    box-sizing: border-box;
    color: #a2a2a2;
    cursor: pointer;
    display: inline-block;
    font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
        Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    outline: none;
    padding: 11px 20px;
    text-align: center;
    text-decoration: none;
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 100%;
    will-change: transform;

    &:disabled {
        pointer-events: none;
    }
    &:hover {
        color: #ffff01;
        box-shadow: #ffff01 0 8px 15px;
        transform: translateY(-2px);
    }
    &:active {
        box-shadow: none;
        transform: translateY(0);
    }
`;

export const WeatherContainer = styled.div`
    // position: absolute;
    display: flex;
    width: 100%;
    // height: 100%;
    overflow-y: hidden;
    // background: radial-gradient(circle closest-side at top, #30302F, #000000);
    z-index: 1;
`;

export const WeekContainer = styled.div`
    position: absolute;
    display: flex;
    height: 100vh;
    font-weight: bold;
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital@0;1&display=swap'); 
    font-family: 'Roboto', sans-serif;
    // z-index: 1;
    background: black;
`;

export const Icon = styled.img`
    width: 50px;
`;

export const DayCard = styled.div`
    width: max(10vw, 100px);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: hsl(347,17%,42%);
    z-index: 1;
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

export const SelectedBar = styled.div`
    width: max(10vw, 100px);
    margin-left: max(10vw, 100px);
    background-color: #ffff01;
    transition: all 0.5s ease-out;
    z-index: 1;
`;

export const WeatherIcon = styled.div`
    background-color: hsl(0,0%,17%);
    border-radius: 1em;
    padding: 1em;
`;

export const Month = styled.div`
    margin-top: 2rem;
    font-size: 12rem;
    transform: rotate(25deg);
    color: black;
    @media screen and (min-width: 500px) {
        margin-top: 4rem;
    }
`;

export const MonthContainer = styled.div`
    overflow: hidden;
`;

export const Year = styled.div`
    font-size: 3rem;
    color: black;
`;

export const Location = styled.div`
    width: 30px;
    height: 30px;
    background-image: url(${location});
    background-repeat: round;

    @media(min-width: 600px) {
        &:hover {
            background-image: url(${locationBlue});
        }
    }
`;

export const LocationContainer = styled.div`
    left: 0px;
    top: 10px;
    color: #a2a2a2;
    position: absolute;
    background: #2b2b2b;
    width: 140px;
    padding: 5px 0px 5px 10px;
    z-index: 9999;
`;

export const Description = styled.div`
    height: 100px;
`;

export const SideBar = styled.div`
    height: 100vh;
    @media(min-width: 600px) {
        width: 15vw;
    }
`
export const PersonaScreen = styled.div`
    display: flex;
`
// export const DayCard = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center; 
//     color: hsl(347,17%,42%);
//     padding-left: 10px;
//     padding-right: 10px;
//     z-index: 1;
// `;

// width: 7rem;
// export const MainDayCard = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     background-color: yellow;
//     color: hsl(14,100%,24%);
//     padding-left: 10px;
//     padding-right: 10px;
//     z-index: 1;
// `;
