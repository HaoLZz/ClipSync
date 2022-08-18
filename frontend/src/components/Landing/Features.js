import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CloudSyncOutlinedIcon from '@mui/icons-material/CloudSyncOutlined';
import ContentPasteGoOutlinedIcon from '@mui/icons-material/ContentPasteGoOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';

export default function Features() {
  const featuresItems = [
    {
      id: 1,
      icon: <CloudSyncOutlinedIcon sx={{ fontSize: 100 }} color="primary" />,
      content:
        'Synchronizing your clipboards across multiple devices with ease ',
    },
    {
      id: 2,
      icon: (
        <ContentPasteGoOutlinedIcon sx={{ fontSize: 100 }} color="primary" />
      ),
      content: 'Just copy whatever you want and we will take care of the rest',
    },
    {
      id: 3,
      icon: <PhotoOutlinedIcon sx={{ fontSize: 100 }} color="primary" />,
      content:
        'Stop emailing yourself and start sharing photos with a simple click',
    },
  ];
  return (
    <Box sx={{ flexGrow: 1, minHeight: '400px' }} id="features">
      <Typography variant="h4" textAlign="center">
        Features
      </Typography>
      <Grid
        container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          minHeight: '400px',
        }}
      >
        {featuresItems.map((item) => (
          <Grid
            item
            xs={12}
            md={3.5}
            minHeight={300}
            key={item.id}
            sx={{
              backgroundColor: '#f2f0f1',
              textAlign: 'center',
              padding: '30px',
              width: '200px',
              borderRadius: '10px',
              margin: '10px',
            }}
          >
            {item.icon}
            <Typography variant="subtitle1" component="p" mt={2}>
              {item.content}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
