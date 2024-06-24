import { useLocation } from "react-router-dom"
import { BASE_URL } from "../api/BaseURL";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, ImageListItem } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import { Box, CircularProgress } from "@mui/material";
import GoBack from "../components/GoBack";
// mui instagram icon
import InstagramIcon from '@mui/icons-material/Instagram';
// mui google icon

const SelectedBreedGallery = () => {
    const { state } = useLocation();

    const paramString = state.join(", ");

    const [images, setImages] = useState<string[]>([]);

    const [loading, setLoading] = useState(false);


    const getHound = async () => {
        const promises = state.map((hound: string) => axios.get(`${BASE_URL}/breed/${hound}/images/random`));
        const responses = await Promise.all(promises);
        const images = responses.map(response => response.data.message);
        setImages(images);
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        getHound();
    }, [])


    return (
        <div>
            <GoBack />
            <h1>Selected Breed Gallery: </h1>

            <h4
                style={{
                    margin: '10px',
                    color: '#4a4a4a',
                }}
            >Click on the image to google for the dog images or </h4>

            <Button
                variant="contained"
                startIcon={<InstagramIcon
                    sx={{ color: 'black' }}
                />}
                onClick={() => {
                    window.open(`https://www.instagram.com/explore/tags/dog`);
                }}
                style={{
                    margin: '10px',
                }}
            >
                Share on Instagram
            </Button>

            {
                loading ?
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress
                            color="warning"
                            size={100}
                        />
                    </Box> :
                    <ImageList
                        sx={{ width: '100%', height: '100%', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 30px #ccc' }}
                        variant="masonry"
                        cols={2}
                        gap={8}
                    >
                        {images.map((item) => (
                            <ImageListItem
                                key={item}
                                style={{
                                    cursor: 'pointer',
                                }}

                            >
                                <img
                                    src={`${item}?w=248&fit=crop&auto=format`}
                                    srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item}
                                    loading="lazy"
                                    onClick={() => {
                                        //trim the breed name
                                        const breedName = item.split('/')[4].split('_')[0];
                                        window.open(`https://www.google.com/search?q=dog+breed+${breedName}&tbm=isch`);

                                    }}
                                />
                                <p
                                    style={{
                                        fontSize: '10px',
                                        color: '#4a4a4a',
                                        backgroundColor: 'lightgreen',
                                        padding: '5px',
                                        borderRadius: '0 0 5px 5px ',
                                    }}
                                >{item.split('/')[4].split('_')[0]}</p>
                            </ImageListItem>
                        ))}
                    </ImageList>
            }
        </div>
    )
}
export default SelectedBreedGallery