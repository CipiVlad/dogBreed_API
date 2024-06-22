import { useEffect, useState } from "react"
import { BASE_URL } from "../api/BaseURL"
import axios from "axios"
import { useParams } from "react-router-dom"


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
        <div>
            <h2>Details of {hound}</h2>
            {
                images.map((image, index) => (
                    <img key={index} src={image} alt={`image of ${hound}`} width={350} />
                ))
            }
        </div>
    )
}
export default BreedDetail