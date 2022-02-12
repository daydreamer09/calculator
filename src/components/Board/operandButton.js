import { ACTIONS } from "../../App"

export const OperationButton = ({dispatch, operation}) => {
    return (
        <button
            onClick={ () => dispatch({ type: ACTIONS.chooseOPERATION, payload: {operation} })} 
            className='sign' 
        >
            {operation}
        </button>
    )
}