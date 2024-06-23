import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

const LoadingSkeleton = (props: { loading: boolean }) => {
    const { loading = false } = props
    return (
        <div>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ margin: 1 }}>
                    {loading ? (
                        <Skeleton variant="circular">
                            <Avatar />
                        </Skeleton>
                    ) : (
                        <Avatar src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg" />
                    )}
                </Box>
                <Box sx={{ width: '100%' }}>
                    {loading ? (
                        <Skeleton width="100%">
                            <Typography>.</Typography>
                        </Skeleton>
                    ) : (
                        <Typography>Ted</Typography>
                    )}
                </Box>
            </Box>

            {loading ? (
                <Skeleton variant="rectangular" width="100%">
                    <div style={{ paddingTop: '57%' }} />
                </Skeleton>
            ) : (
                // here goes your image
                <img src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg" alt="Ted" style={{ width: '100%', height: 'auto' }} />
            )}
        </div>

    )
}
export default LoadingSkeleton