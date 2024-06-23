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
            <h2
                style={{ color: 'black' }}
            >{paramString}</h2>
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
            {/* download images to local folder */}
            {/* <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() => {

                    const promises = state.map((hound: string) => axios.get(`${BASE_URL}/breed/${hound}/images/random`));
                    const responses = Promise.all(promises);
                    responses.then((response) => {
                        response.map((response) => {
                            const link = document.createElement('a');
                            link.href = response.data.message;
                            link.download = 'dogBreed';
                            link.click();
                        })
                    })


                }}
                style={{
                    margin: '10px',
                }}
            >
                Download Images
            </Button> */}

            <div style={{ display: 'grid', justifyContent: 'center', }}>
                {
                    loading ?
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress
                                color="warning"
                                size={100}
                            />
                        </Box> :
                        <ImageList
                            sx={{ width: '100%', height: 450 }}
                            variant="masonry"
                            cols={2}
                            gap={8}
                        >
                            {images.map((item) => (
                                <ImageListItem
                                    key={item}

                                >
                                    <img
                                        src={`${item}?w=248&fit=crop&auto=format`}
                                        srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item}
                                        loading="lazy"
                                        onClick={() => {
                                            window.open(`https://www.google.com/search?q=${item}&tbm=isch`);
                                        }}
                                        style={{
                                            margin: '10px',
                                        }}

                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                }
            </div>

        </div>
    )
}
export default SelectedBreedGallery