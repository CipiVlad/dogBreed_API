import { useEffect, useState } from "react"
import axios from 'axios';
import { BASE_URL } from "../api/BaseURL";
import BreedItem from "./BreedItem";
import Button from '@mui/material/Button';

const BreedList = () => {
    const [breedList, setBreedList] = useState([]);
    const getObjEntries = Object.entries(breedList);
    const nameList = getObjEntries.map(e => e[0]);
    const [image, setImage] = useState([]);


    //fetch the list of all breeds by name
    const getBreedList = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/breeds/list/all`);
            setBreedList(response.data.message);
        } catch (error) {
            console.log({ message: `sorry but: ${error}` });
        }
    }

    useEffect(() => {
        getBreedList();
    }, [])


    const handleCreateGallery = () => {
        console.log('works')
    }






    return (
        <>
            <h1>Welcome to the Dog API</h1>
            <article>
                <p>Click on breed to show detail pictures or select one or multiple breeds to create a gallery!</p>
            </article>

            {/* create a gallery from favorites chosen */}
            <Button
                variant="contained"
                color="success"
                onClick={handleCreateGallery}
            >
                Create Gallery
            </Button>


            {
                nameList && nameList.map((breed, index) => (
                    <BreedItem
                        key={index}
                        breed={breed}
                        getRandomPic={(dogName: string) => setImage(dogName)}
                    />
                ))
            }


        </>
    )
}
export default BreedList