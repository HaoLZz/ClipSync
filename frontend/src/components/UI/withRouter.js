import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

/* 
  A HOC to integrate MUI components with React-Router 
*/
export default function withRouter(Component) {
  return ({ children, linkPath, ...props }) => {
    return (
      <Component component={RouterLink} to={linkPath} {...props}>
        {children}
      </Component>
    );
  };
}
