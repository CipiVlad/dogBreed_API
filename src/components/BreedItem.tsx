import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/BaseURL";

//mui
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';



interface BreedProps {
    breed: string;
    getRandomPic: (dogName: string) => void;
    onFavoritesChange: (breed: string, isChecked: boolean) => void;
}

const BreedItem = ({ breed, getRandomPic, onFavoritesChange }: BreedProps) => {
    const [isChecked, setIsChecked] = useState(false);
    const [image, setImage] = useState<string>();

    // handle users check
    const handleCheckBox = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onFavoritesChange(breed, newCheckedState);
    }
    // get hound images by breed
    getRandomPic = async (dogName: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/breed/${dogName}/images/random`)
            // console.log(response.data.message);
            setImage(response.data.message)
        } catch (error) {

        }
    }

    // on load
    useEffect(() => {
        getRandomPic(breed)
    }, [])


    return (
        <div style={{ display: 'grid', justifyContent: 'center' }}>
            <ImageList

                // create a card with image that fits the grid
                sx={{
                    width: 350,
                    height: 200,
                    mt: 4,
                    mb: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    objectFit: "cover",
                    transition: "all .3s ease",
                    scrollBehavior: "smooth",
                    overflow: "hidden",
                    backgroundPosition: "center center",
                    "&:hover": {
                        transform: "scale(1.1)",
                        cursor: "pointer",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                        transition: "all .3s ease",
                        zIndex: "10",
                        overflow: "hidden",
                        borderRadius: "10px",
                        border: "1px solid white",
                    }
                }}

                cols={1}
            >

                <ImageListItem
                    key={image}
                >
                    <Link to={`/breed/${breed}`}>
                        <img
                            src={`${image}`}
                            alt={breed}
                            loading="lazy"
                            style={{
                                objectFit: "contain",
                                width: "100%",
                                height: "100%"
                            }}

                        />
                    </Link>
                    <ImageListItemBar
                        sx={{
                            background:
                                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                        }}
                        title={breed}
                        position="top"
                        actionIcon={
                            <Checkbox
                                sx={{ color: 'white' }}
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                                checked={isChecked}
                                onChange={handleCheckBox}
                            />
                        }
                        actionPosition="left"
                    />
                </ImageListItem>

            </ImageList>
        </div>
    );
}

export default BreedItem