
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';

const [key, setKey] = useState<string | null>("1")

export interface MedsInterface {
    name: string,
    startDate: Date,
    time: string,
    repeat: number,
    client: string
    image: Image
};


// useEffect(() => {
//     AsyncStorage.getItem('client-key').then((key) => setKey(key))
// }, [])

const ApiInterface = axios.create({
    baseURL: 'https://edoso-meds-server.herokuapp.com'
})

export function getMeds() {
    return ApiInterface.get("/meds?id=" + key);
}

export function remove(id: string) {
    return ApiInterface.delete("/meds?id=" + id)
}

export function create(payload: any) {
    ApiInterface.post("/meds", payload)
}


export default ApiInterface;