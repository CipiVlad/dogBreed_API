import { useEffect, useState } from "react"
import axios from 'axios';
import { BASE_URL } from "../api/BaseURL";
import BreedItem from "./BreedItem";
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
//github icon
import GitHubIcon from '@mui/icons-material/GitHub';

import { Box, CircularProgress } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
//clear icon
import ClearIcon from '@mui/icons-material/Clear';
const BreedList = () => {
    const [breedList, setBreedList] = useState([]);
    const getObjEntries = Object.entries(breedList);
    const nameList = getObjEntries.map(e => e[0]);
    const [image, setImage] = useState<string[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<string[]>([]);

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

        // console.log("Favorites: ", favorites);
    }

    const handleFavorites = (breed: string, isChecked: boolean) => {
        setFavorites(prevState => isChecked ? [...prevState, breed] : prevState.filter(e => e !== breed));
    }

    const handleSearch = async (value: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/breed/${value.toLowerCase()}/images`);
            //first 10 images
            setSearchResults(response.data.message.slice(0, 10));
            console.log(response.data.message);

            setSearchTerm(value);
            setLoading(false);
        } catch (error) {
            console.log({ message: `sorry but: ${error}` });
        }
    }

    const handleClearInput = () => {
        setSearchTerm('');
        setSearchResults([]);
    }

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
                            color: '#333',
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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 2
                }}
            >
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleCreateGallery}
                    disabled={favorites.length === 0}
                >
                    Create Gallery
                </Button>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <input
                        type="text"
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            width: '100%',
                            //don't zoom in on mobile
                            WebkitTextSizeAdjust: 'none',
                        }}

                    />

                    {
                        searchTerm &&
                        <ClearIcon
                            sx={{
                                fontSize: 20,
                                cursor: 'pointer',
                            }}
                            color="warning"
                            onClick={handleClearInput}
                        />


                    }
                </div>


                {/* <SearchBar
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}
                /> */}
            </Box>

            {/* loading skeleton */}
            {loading ?
                <Box>
                    <CircularProgress
                        color="warning"
                        size={100}
                    />
                </Box>
                :
                (searchTerm ?
                    searchResults.map((breed, index) => (

                        !searchResults ? (
                            <p key={index}>No images found</p>
                        ) : (
                            <div key={index}
                                style={{

                                }}
                            >
                                <img
                                    src={breed}
                                    alt={breed}

                                    key={index}
                                    style={{
                                        textAlign: "center",
                                        objectFit: "contain",
                                        width: "100%",
                                        height: "100%",
                                        margin: "10px 0",
                                        borderRadius: "10px",
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                                    }}
                                />

                            </div>
                        )



                    ))
                    :
                    nameList.map((breed, index) => (
                        <BreedItem
                            key={index}
                            breed={breed}
                            getRandomPic={(dogName: string) => setImage([...dogName])}
                            onFavoritesChange={handleFavorites}
                        />
                    ))
                )
            }
        </>
    )
}
export default BreedList