import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const ProductIdSkeleton = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width={1070}
    height={500}
    viewBox="0 0 1070 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="40" y="335" rx="20" ry="20" width="280" height="65" />
    <rect x="50" y="46" rx="33" ry="33" width="260" height="270" />
    <rect x="440" y="49" rx="0" ry="0" width="450" height="45" />
    <rect x="440" y="104" rx="0" ry="0" width="450" height="220" />
    <rect x="440" y="358" rx="13" ry="13" width="130" height="38" />
    <rect x="760" y="358" rx="13" ry="13" width="130" height="38" />
  </ContentLoader>
);

export default ProductIdSkeleton;
