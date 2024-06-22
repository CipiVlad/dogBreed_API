import { useEffect, useState } from "react"
import { BASE_URL } from "../api/BaseURL"
import axios from "axios"
import { useParams } from "react-router-dom"

//mui
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const BreedDetail = () => {
    const { hound } = useParams()

    const [images, setImages] = useState<string[]>([]);


    // get hound images by breed
    const getHound = async () => {
        const response = await axios.get(`${BASE_URL}/breed/${hound}/images`)
        setImages(response.data.message)
        // console.log(response.data.message);
    }

    useEffect(() => {
        getHound();
    }, [])

    // console.log(images);

    return (

        < div>
            <h2>Details of {hound ? hound.slice(0, 1).toUpperCase() + hound.slice(1) : ''}</h2>
            <Box sx={{ width: 500, height: 450 }}>
                <ImageList variant="masonry" cols={3} gap={8}>
                    {images.map((item) => (
                        <ImageListItem key={item}>
                            <img
                                srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item}?w=248&fit=crop&auto=format`}
                                alt={item}
                                loading="lazy"
                            />
                            {/* <ImageListItemBar position="below" title={item} /> */}
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </div>

    )
}
export default BreedDetail