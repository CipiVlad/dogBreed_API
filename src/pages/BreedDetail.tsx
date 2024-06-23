import { useEffect, useState } from "react"
import { BASE_URL } from "../api/BaseURL"
import axios from "axios"
import { useParams } from "react-router-dom"

//mui
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

//loadig skeleton
import { Box, CircularProgress } from "@mui/material";
import GoBack from "../components/GoBack"

const BreedDetail = () => {
    const { hound } = useParams()

    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);


    // get hound images by breed
    const getHound = async () => {
        const response = await axios.get(`${BASE_URL}/breed/${hound}/images`)
        setImages(response.data.message)
        setLoading(false)
        // console.log(response.data.message);
    }

    useEffect(() => {
        setLoading(true)
        getHound();
    }, [])

    // console.log(images);

    return (

        < div>
            <GoBack />
            <h2>Details of {hound ? hound.slice(0, 1).toUpperCase() + hound.slice(1) : ''}</h2>
            <Box sx={{ width: '100%', height: 450 }}>
                <ImageList variant="masonry" cols={2} gap={8}>
                    {
                        loading ?
                            <Box>
                                <CircularProgress
                                    color="warning"
                                    size={100}
                                />
                            </Box>

                            : images.map((image, index) => <ImageListItem key={index}><img src={image} alt={hound} loading="lazy" /></ImageListItem>)
                    }
                </ImageList>
            </Box>
        </div>

    )
}
export default BreedDetail