import { Link } from "react-router-dom";

interface BreedProps {
    breed: string;
}

const BreedItem = ({ breed }: BreedProps) => {
    return (
        <ul>
            <li>
                <Link to={`/breed/${breed}`}>
                    {breed}
                </Link>
            </li>
        </ul>

    )
}
export default BreedItem