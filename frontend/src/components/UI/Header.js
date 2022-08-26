import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import withRouter from './withRouter';
import { LogoIcon } from './SvgIcons';

const drawerWidth = 240;
const navItems = ['Home', 'Features', 'Contact Us', 'App', 'Sign in'];
const navUrls = ['/', '/#features', '/#contact-us', '/app', '/sign-in'];

const ListItemRouter = withRouter(ListItem);
const ButtonRouter = withRouter(Button);

export default function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ClipSync
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, i) => (
          <ListItemRouter key={item} linkPath={navUrls[i]} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} sx={{ color: '#666' }} />
            </ListItemButton>
          </ListItemRouter>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', marginBottom: '50px' }}>
      <AppBar component="nav" position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', sm: 'initial' },
              fontSize: { sm: '1.25rem', md: '1.75rem' },
            }}
          >
            <LogoIcon sx={{ fontSize: '32px' }} />
            ClipSync
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, columnGap: '10px' }}>
            {navItems.map((item, i) => {
              const styles =
                i === 4
                  ? {
                      backgroundColor: '#1ba39c',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(236, 240, 241, 0.5)',
                      },
                    }
                  : {
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: 'rgba(236, 240, 241, 0.2)',
                      },
                    };
              return (
                <ButtonRouter key={item} linkPath={navUrls[i]} sx={styles}>
                  {item}
                </ButtonRouter>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
