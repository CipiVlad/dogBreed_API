import { useEffect, useState } from "react"
import axios from 'axios';
import { BASE_URL } from "../api/BaseURL";
import BreedItem from "./BreedItem";
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
//github icon
import GitHubIcon from '@mui/icons-material/GitHub';

import { Box, CircularProgress } from "@mui/material";

const BreedList = () => {
    const [breedList, setBreedList] = useState([]);
    const getObjEntries = Object.entries(breedList);
    const nameList = getObjEntries.map(e => e[0]);
    const [image, setImage] = useState<string[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);

    const navigate = useNavigate();

    //loading skeleton
    const [loading, setLoading] = useState(false);

    //fetch the list of all breeds by name
    const getBreedList = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/breeds/list/all`);
            setBreedList(response.data.message);
            setLoading(false);
        } catch (error) {
            console.log({ message: `sorry but: ${error}` });
        }
    }

    useEffect(() => {
        setLoading(true);
        getBreedList();
    }, [])

    const handleCreateGallery = () => {
        navigate('/gallery', { state: favorites });

        console.log("Favorites: ", favorites);
    }

    const handleFavorites = (breed: string, isChecked: boolean) => {
        setFavorites(prevState => isChecked ? [...prevState, breed] : prevState.filter(e => e !== breed));
    }

    useEffect(() => {
        // console.log(favorites);
    }, [favorites])

    // loading skeleton
    return (
        <>
            <header>
                <nav>
                    <img src="/dog.png" alt="dog-favicon" width={50} height={50} />
                    <p> Made with
                        <span style={{ color: 'red' }}>
                            &#10084;
                        </span>
                        by
                        <br />
                        <Link
                            to="https://cipivlad.github.io/myportfoliosite/"
                            target="_blank"
                            style={{ color: 'black', textDecoration: 'none' }}
                        >
                            Cipi
                            {/* space */}
                            <span> </span>
                            <GitHubIcon
                                sx={{ fontSize: 20 }}
                            />
                        </Link>
                    </p>
                </nav>
            </header>
            <h1>Welcome to the
                <span> </span>
                <Button
                    variant="outlined"
                    color="success"
                    sx={{
                        display: 'inline-block',
                        // color: '#5e60ce',
                        textDecoration: 'none',
                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                        fontSize: 20
                    }}
                >

                    <Link
                        to="https://dog.ceo/dog-api/about"
                        style={{
                            display: 'inline-block',
                            color: '#5e60ce',
                            textDecoration: 'none'
                        }}
                        target="_blank"
                    >
                        Dog API
                    </Link>
                </Button>
            </h1>
            <article>
                <p>Click on breed image to show detail pictures or select one or multiple breeds to create a gallery!</p>
            </article>

            {/* create a gallery from favorites chosen */}
            <Button
                variant="contained"
                color="success"
                onClick={handleCreateGallery}
                disabled={favorites.length === 0}
            >
                Create Gallery
            </Button>

            {/* loading skeleton */}
            {loading ?

                <Box>
                    <CircularProgress
                        color="warning"
                        size={100}
                    />
                </Box>

                :
                nameList.map((breed, index) => (
                    <BreedItem
                        key={index}
                        breed={breed}
                        getRandomPic={(dogName: string) => setImage([...dogName])}
                        onFavoritesChange={handleFavorites}
                    />
                ))}
        </>
    )
}
export default BreedList