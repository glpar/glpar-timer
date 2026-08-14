import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { Cycle, cycleReducer } from "../reducers/cycles/reducer";
import { AddNewCycleAction, MarkCurrentCycleAsFinishedAction, interruptCurrentCycleAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface CycleContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CycleContextType)

interface CycleContextProviderProps {
    children: ReactNode;
}

export function CyclesContextProvider({children}: CycleContextProviderProps){
    const [cycleState, dispatch] = useReducer(cycleReducer, {
        cycles: [],
        activeCycleId: null,
     }, (initialState) => {
        const storedStateAsJSON = localStorage.getItem('@glpar-timer:cycles-state-1.0.0');

        if (storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON)
        }

        return initialState
    })

    const {cycles, activeCycleId} = cycleState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId); 

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if(activeCycle){
            return differenceInSeconds(
                new Date(),
                new Date(activeCycle.startDate)
            )
        }
        return 0
    })

    useEffect(() => {
        const stateJSON = JSON.stringify(cycleState)

        localStorage.setItem('@glpar-timer:cycles-state-1.0.0',stateJSON)
    },[cycleState])

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        dispatch(MarkCurrentCycleAsFinishedAction())

        // setCycles((state) => 
        //     state.map((cycle) => {
        //         if(cycle.id === activeCycleId) {
        //             setActiveCycleId(null)
        //             return {...cycle, finishedDate: new Date(),}
        //         }
        //         else{
        //             return cycle
        //         }
        //     }),
        // )
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        
        dispatch(AddNewCycleAction(newCycle))
        // setCycles((state) => [...state, newCycle]);
        setAmountSecondsPassed(0)

    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction())
    }


    return (
        <CyclesContext.Provider value={{
            activeCycle, 
            activeCycleId, 
            markCurrentCycleAsFinished, 
            amountSecondsPassed, 
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle,
            cycles
        }}>
        
        {children}
        </CyclesContext.Provider>
    )
}
