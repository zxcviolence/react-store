import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const ProductCardSkeleton = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width={280}
    height={390}
    viewBox="0 0 280 390"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="50" y="215" rx="0" ry="0" width="180" height="25" />
    <rect x="153" y="316" rx="0" ry="0" width="0" height="10" />
    <rect x="50" y="0" rx="20" ry="20" width="180" height="200" />
    <rect x="0" y="256" rx="21" ry="21" width="280" height="93" />
    <rect x="0" y="355" rx="6" ry="6" width="115" height="32" />
    <rect x="170" y="355" rx="6" ry="6" width="106" height="32" />
  </ContentLoader>
);

export default ProductCardSkeleton;
