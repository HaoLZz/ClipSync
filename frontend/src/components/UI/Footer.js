import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import withRouter from './withRouter';

const LinkRouter = withRouter(Link);

export default function Footer(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <LinkRouter color="inherit" linkPath="/">
        ClipSync
      </LinkRouter>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
