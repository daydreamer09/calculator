import React from 'react';
import { useReducer } from 'react';
import './App.css';

import { DigitButton } from './components/Board/digitButton';
import { OperationButton } from './components/Board/operandButton';

export const ACTIONS = {
  addDIGIT: 'add-digit',
  chooseOPERATION: 'choose-operation',
  clearOPERATION: 'delete-operation',
  EVALUATE: 'evaluate-operation',
  deleteDIGIT: 'delete-digit'
}

function reducer (state, {type,payload}) {
  switch(type){

    case ACTIONS.addDIGIT: 

    if(state.overwrite){
      return{
        ...state,
        currentOperation: payload.digit,
        overwrite: false
      }
    }

    if (payload.digit === '0' && state.currentOperation === '0') return state;
    if (payload.digit === '.' && state.currentOperation.includes('.')) return state;  

      return {
        ...state,
        currentOperation: `${state.currentOperation||""}${payload.digit}`
      }

    case ACTIONS.chooseOPERATION:
      if(state.prevOperation == null && state.currentOperation == null) return state

      if(state.prevOperation == null){
        return {
          ...state,
          operation: payload.operation,
          prevOperation: state.currentOperation,
          currentOperation: null
        }
      }

      if(state.currentOperation == null){
        return{
          ...state, 
          operation: payload.operation
        }
      }

      if (payload.operation === '='){
        return{
          ...state,
          prevOperation: null,
          operation: null,
          currentOperation: evaluate(state)
        }
      }

      return {
        ...state,
        prevOperation: evaluate(state),
        operation: payload.operation,
        currentOperation: null
      }

    case ACTIONS.clearOPERATION:
      return {}

    case ACTIONS.EVALUATE:
      if(state.currentOperation == null || state.prevOperation == null || state.operation == null){
        return state
      }

      return{
          ...state,
          overwrite: true,
          prevOperation: null,
          operation: null,
          currentOperation: evaluate(state)
      }

    case ACTIONS.deleteDIGIT:
      if(state.currentOperation == null) return state;
      if(state.currentOperation.length === 1){
        return {
          ...state,
          currentOperation: null
        }
      }
    
    return{
      ...state,
      currentOperation: state.currentOperation.slice(0, -1)
    }

    default :
      return state
    
  }

}

const evaluate = ({prevOperation, currentOperation, operation}) => {
  const prev = parseFloat(prevOperation);
  const current = parseFloat(currentOperation);

  if(isNaN(prev) || isNaN(current)) return "";

  let computation = '';

  switch(operation){
    case '÷': 
      computation = prev / current
      break
    
    case '+': 
      computation = prev + current
      break

    case '-': 
      computation = prev - current
      break

    case '*': 
      computation = prev * current
      break


    default:
      break
  }

  return computation.toString();
}

function App() {
  const [{prevOperation, currentOperation, operation}, dispatch] = useReducer( reducer, {});

  return (
    <div className="calculator">

    <section className='output'>
      <div className='prevOperation'> {prevOperation} {operation} </div>
      <div className='currentOperation'> {currentOperation} </div>
    </section>

    <button className='clear' onClick={()=>dispatch({type: ACTIONS.clearOPERATION})}
    >
      clear
    </button>
    <OperationButton operation='÷' dispatch={dispatch} />
    <DigitButton digit='7' dispatch={dispatch} />
    <DigitButton digit='8' dispatch={dispatch} />
    <DigitButton digit='9' dispatch={dispatch} />
    <OperationButton operation='-' dispatch={dispatch} />
    <DigitButton digit='4' dispatch={dispatch} />
    <DigitButton digit='5' dispatch={dispatch} />
    <DigitButton digit='6' dispatch={dispatch} />
    <OperationButton operation='+' dispatch={dispatch} />
    <DigitButton digit='1' dispatch={dispatch} />
    <DigitButton digit='2' dispatch={dispatch} />
    <DigitButton digit='3' dispatch={dispatch} />
    <button className='sign' onClick={ () => dispatch( {type: ACTIONS.EVALUATE} )}>
      = 
     </button>
    <DigitButton digit='0' dispatch={dispatch} />
    <DigitButton digit='.' dispatch={dispatch} />
    <button className='sign' onClick={ () => dispatch( {type: ACTIONS.deleteDIGIT} )}>
      DEL
     </button>
    <OperationButton operation='*' dispatch={dispatch} />
    
    </div>
  );
}

export default App;
