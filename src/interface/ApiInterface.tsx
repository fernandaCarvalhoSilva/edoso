
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Image } from 'react-native';


export interface MedsInterface {
    name: string,
    startDate: Date,
    time: string,
    repeat: number,
    client: string
    image: Image
};



const ApiInterface = axios.create({
    baseURL: 'http://localhost:3000'
})

export async function getMeds() {
    const key = await AsyncStorage.getItem('client-key')
    console.log(4,key)
    return ApiInterface.get("/meds?id=" + key);
}

export function removeMeds(id: string | undefined) {
    return ApiInterface.delete("/meds?id=" + id)
}

export async function createMeds(payload: any) {
    const key = await AsyncStorage.getItem('client-key')
    payload.client = key;
    ApiInterface.post("/meds", payload)
}


export default ApiInterface;