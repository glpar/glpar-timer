import { useContext } from "react";
import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import { 

    HomeContainer, 
    FormError,
    StartCountdownButton, 
    StopCountdownButton, 
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5, "O ciclo precisa ser de no mínimo 5 minutos.").max(60, "O ciclo precisa ser de no máximo 60 minutos."),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){
    const {createNewCycle, interruptCurrentCycle, activeCycle} = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const {handleSubmit, watch, reset, formState: { errors }} = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data);
        reset();
    }

    const task = watch('task');
    const minutesAmount = watch('minutesAmount');
    const isSubmitDisabled = !task?.trim() || minutesAmount < 5 || minutesAmount > 60;

    return (
    <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormProvider {...newCycleForm}>
                    <NewCycleForm/>
                </FormProvider>
                {(errors.task || errors.minutesAmount) && (
                    <FormError role="alert">
                        {errors.task?.message || errors.minutesAmount?.message}
                    </FormError>
                )}
                <Countdown />

        {activeCycle ? (
            <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                <HandPalm size={24}/>
                Interromper
            </StopCountdownButton>
        ) : (
            <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                <Play size={24}/>
                Começar
            </StartCountdownButton>
            )}

        </form>
    </HomeContainer>
    )
}
