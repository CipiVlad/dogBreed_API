import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import axios from "axios";
import { BASE_URL } from "../api/BaseURL";

interface BreedProps {
    breed: string;
    getRandomPic: (dogName: string) => void;
}

const BreedItem = ({ breed, getRandomPic }: BreedProps) => {
    const [isChecked, setIsChecked] = useState(false);
    const [image, setImage] = useState<string>();
    // handle users check

    const handleCheckBox = () => setIsChecked(prev => !prev)



    // get hound images by breed
    getRandomPic = async (dogName: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/breed/${dogName}/images/random`)
            // console.log(response.data.message);
            setImage(response.data.message)
        } catch (error) {

        }
    }

    useEffect(() => {
        getRandomPic(breed)
        console.log(image);
    }, [])

    return (
        <>
            <div>
                <Link to={`/breed/${breed}`}>
                    {breed}
                </Link>
                <img src={image} alt={breed} />

                <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    checked={isChecked}
                    onChange={handleCheckBox}
                />


            </div>
        </>
    );
}
export default BreedItem