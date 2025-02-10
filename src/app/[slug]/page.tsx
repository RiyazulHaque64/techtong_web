import React from 'react';

import { Box } from '@mui/material';

import fetchApi from 'src/utils/fetch-api';

const page = async () => {
  const products = await fetchApi('/product');
  console.log(products);
  return <Box>This is shop page</Box>;
};

export default page;
