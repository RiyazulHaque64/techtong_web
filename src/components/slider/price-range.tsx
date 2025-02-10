'use client';

import { useState } from 'react';

import { Box, Slider, TextField, Typography } from '@mui/material';

const minPrice = 0;
const maxPrice = 100000;

const PriceRange = () => {
  const [price, setPrice] = useState<[number, number]>([0, 51500]);

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    setPrice(newValue as [number, number]);
  };

  const handleInputChange = (index: number, value: string) => {
    const newPrice = [...price] as [number, number];
    newPrice[index] = value === '' ? 0 : Number(value);
    setPrice(newPrice);
  };

  return (
    <Box>
      <Typography variant="caption" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
        Price Range
      </Typography>

      <Slider
        value={price}
        onChange={handleSliderChange}
        min={minPrice}
        max={maxPrice}
        sx={{
          color: 'primary.main',
          '& .MuiSlider-thumb': {
            border: '2px solid',
            borderColor: 'primary.main',
          },
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <TextField
          size="small"
          type="number"
          value={price[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
          sx={{ width: 80 }}
        />
        <TextField
          size="small"
          type="number"
          value={price[1]}
          onChange={(e) => handleInputChange(1, e.target.value)}
          sx={{ width: 80 }}
        />
      </Box>
    </Box>
  );
};

export default PriceRange;
