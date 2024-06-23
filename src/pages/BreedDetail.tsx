import { useEffect, useState } from "react"
import { BASE_URL } from "../api/BaseURL"
import axios from "axios"
import { useParams } from "react-router-dom"

//mui
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

//loadig skeleton
import LoadingSkeleton from "../components/LoadingSkeleton"

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
            <h2>Details of {hound ? hound.slice(0, 1).toUpperCase() + hound.slice(1) : ''}</h2>
            <Box sx={{ width: '100%', height: 450 }}>
                <ImageList variant="masonry" cols={2} gap={8}>
                    {
                        loading ? <LoadingSkeleton loading={loading} /> : images.map((image, index) => <ImageListItem key={index}><img src={image} alt={hound} loading="lazy" /></ImageListItem>)
                    }
                </ImageList>
            </Box>
        </div>

    )
}
export default BreedDetail