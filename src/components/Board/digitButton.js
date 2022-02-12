import { ACTIONS } from "../../App";

export const DigitButton = ({dispatch, digit}) => {
    return (
        <button 
            onClick={ () => {dispatch( {type: ACTIONS.addDIGIT, payload: {digit}})}}
        >
        {digit}
        </button>
    )
}