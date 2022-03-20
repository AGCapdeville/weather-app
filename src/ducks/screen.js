import { createAction, handleActions } from "redux-actions";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

export const updateScreen = createAction('screen/UPDATE_SCREEN');
const initialSreenState = 'Main';

export default handleActions({
    [updateScreen]: (state, action) => {
        return(state=action.payload)
    },
}, initialSreenState);

const selectScreen = createSelector(
    state => state.screen,
    screen => screen   
)

export const useScreen = () => useSelector(selectScreen);