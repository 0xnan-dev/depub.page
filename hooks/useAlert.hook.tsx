import Debug from 'debug'
import { FC, useContext, useState, createContext, useReducer, Reducer, useEffect } from 'react'
import Alert from '../components/Common/Alert'

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
    id: number,
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
    { type: ACTION_TYPE.REMOVE,  payload: { id: number } }


export const alertReducer: Reducer<AlertState[], Action> = (state, action ) => {
  switch (action.type) {
    case ACTION_TYPE.ADD:
      return [
        ...state,
        {
          id: +new Date(),
          content: action.payload.content,
          type: action.payload.type
        }
      ];
    case ACTION_TYPE.REMOVE:
      return state.filter(t => t.id !== action.payload.id);
    default:
      return state;
  }
};

const AlertList: FC<{
    alerts: AlertState[],
    onClose: (id: number) => void,
}> = ({ alerts, onClose }) => {

    return (
        <div className="p-4 fixed t-0 l-0 r-0 w-full z-50">
            {
                alerts.map((alert) => 
                    <Alert 
                        key={alert.id}
                        type={alert.type}
                        onClose={() => onClose(alert.id)}
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

    function removeAlert(id: number) {
        alertDispatch({
            payload: { id },
            type: ACTION_TYPE.REMOVE
        })
    }

    function alert(content: String, type?: ALERT_TYPE) {
        const timestamp = new Date().getTime()
        alertDispatch({
            payload: {
                id: timestamp,
                content,
                type: type || ALERT_TYPE.INFO,
            },
            type: ACTION_TYPE.ADD,
        })

        setTimeout(() => {
            removeAlert(timestamp)
        }, AUTO_REMOVE_SECONDS * 1000);
    }

    useEffect(() => {
        debug('alerts:', alerts)
    }, [alerts])

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