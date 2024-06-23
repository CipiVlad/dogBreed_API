import { useEffect, useState } from "react"
import axios from 'axios';
import { BASE_URL } from "../api/BaseURL";
import BreedItem from "./BreedItem";
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
//github icon
import GitHubIcon from '@mui/icons-material/GitHub';
const BreedList = () => {
    const [breedList, setBreedList] = useState([]);
    const getObjEntries = Object.entries(breedList);
    const nameList = getObjEntries.map(e => e[0]);
    const [image, setImage] = useState<string[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);

    const navigate = useNavigate();

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
        navigate('/gallery', { state: favorites });

        console.log("Favorites: ", favorites);
    }

    const handleFavorites = (breed: string, isChecked: boolean) => {
        setFavorites(prevState => isChecked ? [...prevState, breed] : prevState.filter(e => e !== breed));
    }

    useEffect(() => {
        // console.log(favorites);
    }, [favorites])

    return (
        <>
            <header>
                <nav>
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
            <h1>Welcome to the Dog API</h1>
            <article>
                <p>Click on breed image to show detail pictures or select one or multiple breeds to create a gallery!</p>
            </article>

            {/* create a gallery from favorites chosen */}
            <Button
                variant="contained"
                color="success"
                onClick={handleCreateGallery}
            >
                Create Gallery
            </Button>

            {/* map the list of all hounds */}
            {
                nameList && nameList.map((breed, index) => (
                    <BreedItem
                        key={index}
                        breed={breed}
                        getRandomPic={(dogName: string) => setImage([...dogName])}
                        onFavoritesChange={handleFavorites}
                    />
                ))
            }
        </>
    )
}
export default BreedList