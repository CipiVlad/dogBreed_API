import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
const GoBack = () => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '10px',
                left: '10px'
            }}
        >
            <Link to='/'>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                >
                    Back
                </Button>
            </Link>
        </Box>
    )
}

export default GoBack