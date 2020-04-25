import React from 'react';

const Router = ({ children }) => {
  const { pathname } = window.location;
  return children.map((child) => {
    return React.cloneElement(child, { pathname });
  });
};

const Route = ({ children, pathname, path }) => {
  return pathname === path ? children : null;
};

export { Router, Route };
