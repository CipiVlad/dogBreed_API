import { useEffect, useState } from "react"
import axios from 'axios';
import { BASE_URL } from "../api/BaseURL";
import BreedItem from "./BreedItem";

const BreedList = () => {
    const [breedList, setBreedList] = useState([]);

    //fetch the list of all breeds by name
    const getBreedList = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/breeds/list/all`);
            setBreedList(response.data.message);
            // console.log(response.data.message);
        } catch (error) {
            console.log({ message: `sorry but: ${error}` });
        }
    }

    useEffect(() => {
        getBreedList()
    }, []);

    const getObjEntries = Object.entries(breedList);

    return (
        <>
            <h1>Welcome to the Dog API</h1>
            {
                getObjEntries && getObjEntries.map(([breed], index) => (
                    <BreedItem
                        key={index}
                        breed={breed}
                    />
                ))
            }
        </>
    )
}
export default BreedList