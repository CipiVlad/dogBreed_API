import { useLocation } from "react-router-dom"
import { BASE_URL } from "../api/BaseURL";
import { useEffect, useState } from "react";
import axios from "axios";
import { ImageListItem } from "@mui/material";
import ImageList from '@mui/material/ImageList';

const SelectedBreedGallery = () => {
    const { state } = useLocation();

    const paramString = state.join(", ");

    const [images, setImages] = useState<string[]>([]);


    // get hound images by breed
    // const getHound = async () => {
    //     const response = await axios.get(`${BASE_URL}/breed/${paramString}/images/random/3`)
    //     setImages(response.data.message)
    //     // console.log(response.data.message);
    // }

    const getHound = async () => {
        const promises = state.map((hound: string) => axios.get(`${BASE_URL}/breed/${hound}/images/random`));
        const responses = await Promise.all(promises);
        const images = responses.map(response => response.data.message);
        setImages(images);
    }

    useEffect(() => {
        getHound();
    }, [])


    return (
        <div>
            <h1>Selected Breed Gallery: </h1>
            <h2
                style={{ color: 'black' }}
            >{paramString}</h2>
            <div style={{ display: 'grid', justifyContent: 'center' }}>
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
            </div>

        </div>
    )
}
export default SelectedBreedGallery