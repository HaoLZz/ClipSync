import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Hero() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        minHeight: '600px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid
        container
        spacing={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: '1300px',
          padding: '50px',
        }}
      >
        <Grid item xs={12} md={7}>
          <Typography
            variant="h3"
            fontWeight={700}
            paddingBottom="15px"
            textTransform="capitalize"
          >
            Keep your clipboards in sync everywhere
          </Typography>
          <Typography
            variant="h6"
            sx={{ opacity: '0.4', paddingBottom: '30px' }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ex
            aspernatur debitis voluptatibus eaque obcaecati molestiae, ipsa
            assumenda autem deserunt consequatur, voluptas sed quam incidunt.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', fontSize: '16px' }}
          >
            Sign Up
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src="/images/hero-image.jpg" alt="productivity" width="100%" />
        </Grid>
      </Grid>
    </Box>
  );
}
