import React from 'react';

export default function mapAllReactChildren(children, createClone) {
  if(!children || !children.length) {
    return children;
  }
  return React.Children.map(children, child => {
    const transformed = createClone(child);
    if(!transformed || !transformed.props || !transformed.props.children) {
      return transformed;
    }
    return React.cloneElement(transformed, Object.assign({}, transformed.props, {
      children: mapAllReactChildren(transformed.props.children, createClone)
    }));
  });
}
