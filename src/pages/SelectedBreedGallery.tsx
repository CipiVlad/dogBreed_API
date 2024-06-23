import { useLocation } from "react-router-dom"
import { BASE_URL } from "../api/BaseURL";
import { useEffect, useState } from "react";
import axios from "axios";
import { ImageListItem } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import { Box, CircularProgress } from "@mui/material";
import GoBack from "../components/GoBack";

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