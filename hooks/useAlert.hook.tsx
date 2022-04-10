import Debug from 'debug'
import { FC, useContext, useState, createContext, useReducer, Reducer, useEffect } from 'react'
import Alert from '../components/Common/Alert'
import { useAppState } from './useAppState.hook'

const debug = Debug('web:alert')


export enum ACTION_TYPE {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
    REMOVE_ALL = 'REMOVE_ALL',
}

export enum ALERT_TYPE {
    INFO = "INFO",
    ERROR = "ERROR",
}

export interface AlertState {
    content: String,
    type: ALERT_TYPE,
}

export interface AlertContext {
    alert: ( content: String, type?: ALERT_TYPE) => void
}

const AUTO_REMOVE_SECONDS = 3


const initialState: AlertState[] = [];
export const AlertContext = createContext<AlertContext>({ 
    alert: null as never,
});

type Action = 
    { type: ACTION_TYPE.ADD,  payload: AlertState } |
    { type: ACTION_TYPE.REMOVE,  payload: { content: String } }


export const alertReducer: Reducer<AlertState[], Action> = (state, action ) => {
  switch (action.type) {
    case ACTION_TYPE.ADD:
        return [
            ...state,
            {
            content: action.payload.content,
            type: action.payload.type
            }
        ];
    case ACTION_TYPE.REMOVE:
        return state.filter(t => t.content !== action.payload.content);
    default:
        return state;
  }
};

const AlertList: FC<{
    alerts: AlertState[],
    onClose: (content: String) => void,
}> = ({ alerts, onClose }) => {

    return (
        <div className="p-4 fixed t-0 l-0 r-0 w-full z-50">
            {
                alerts.map((alert, i) => 
                    <Alert 
                        key={i}
                        type={alert.type}
                        onClose={() => onClose(alert.content)}
                    >
                        {alert.content}
                    </Alert>
                ) 
            }   
        </div>
    )

}


export const AlertProvider: FC<{ }> = ({ children, }) => {
    const [alerts, alertDispatch] = useReducer(alertReducer, initialState)
    const { error: appError } = useAppState()

    function removeAlert(content: String) {
        alertDispatch({
            payload: { content },
            type: ACTION_TYPE.REMOVE
        })
    }

    function alert(content: String, type?: ALERT_TYPE) {
        // prevent duplicate alert message
        if (alerts.filter(a => a.content === content).length) return

        alertDispatch({
            payload: {
                content,
                type: type || ALERT_TYPE.INFO,
            },
            type: ACTION_TYPE.ADD,
        })

        setTimeout(() => {
            removeAlert(content)
        }, AUTO_REMOVE_SECONDS * 1000);
    }

    useEffect(() => {
        if (appError) alert(appError, ALERT_TYPE.ERROR)
    }, [appError])

    return (
        <AlertContext.Provider value={ { alert, } }>
            { <AlertList alerts={alerts} onClose={removeAlert}></AlertList> }
            { children }
        </AlertContext.Provider>
    )
}

export const useAlertContext = () => {
    return useContext(AlertContext);
};