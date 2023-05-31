import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { 
    chooseModel,
    chooseMake,
    chooseYear,
    chooseColor 
} from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface CarFormProps {
    id?:string;
    data?:{}
}

interface CarState {
    model: string;
    make: string;
    year: string;
    color: string;
}

export const CarForm = (props:CarFormProps) => {

    const dispatch = useDispatch();
    let { carData, getData } = useGetData();
    const store = useStore()
    const model = useSelector<CarState>(state => state.model)
    console.log(model)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseModel(data.model))
            dispatch(chooseMake(data.make))
            dispatch(chooseYear(data.year))
            dispatch(chooseColor(data.color))
            console.log(event)
            console.log(store.getState)
            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="model">Model Name</label>
                    <Input {...register('model')} name="model" placeholder='model' />
                </div>
                <div>
                    <label htmlFor="make">Make Name</label>
                    <Input {...register('make')} name="make" placeholder="make"/>
                </div>
                <div>
                    <label htmlFor="Year">Year</label>
                    <Input {...register('Year')} name="year" placeholder="year"/>
                </div>
                <div>
                    <label htmlFor="color">color</label>
                    <Input {...register('color')} name="color" placeholder="color"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}