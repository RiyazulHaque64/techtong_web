'use client';

import type { SyntheticEvent } from 'react';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Box, Slider, TextField, Typography } from '@mui/material';

const productMinPrice = 1000; // Example product minimum price
const productMaxPrice = 90000; // Example product maximum price

const PriceRange = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get values from search params or default to product price range
  const minPrice = Number(searchParams.get('min_price')) || productMinPrice;
  const maxPrice = Number(searchParams.get('max_price')) || productMaxPrice;

  const [price, setPrice] = useState<[number, number]>([minPrice, maxPrice]);

  // Update state when URL params change
  useEffect(() => {
    setPrice([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const updateSearchParams = (newPrice: [number, number]) => {
    const params = new URLSearchParams(searchParams.toString());

    // Handle min_price
    if (newPrice[0] <= productMinPrice) {
      params.delete('min_price'); // Remove from params if it's at the minimum
    } else {
      params.set('min_price', String(newPrice[0]));
    }

    // Handle max_price
    if (newPrice[1] >= productMaxPrice) {
      params.delete('max_price'); // Remove from params if it's at the maximum
    } else if (newPrice[1] < newPrice[0]) {
      params.set('max_price', String(productMaxPrice)); // Reset if max < min
    } else {
      params.set('max_price', String(newPrice[1]));
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    setPrice(newValue as [number, number]);
  };

  const handleSliderCommitted = (
    _: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    const newPrice = newValue as [number, number];
    setPrice(newPrice);
    updateSearchParams(newPrice);
  };

  const handleInputChange = (index: number, value: string) => {
    const newPrice = [...price] as [number, number];
    newPrice[index] = value === '' ? 0 : Number(value);
    setPrice(newPrice);
  };

  const handleInputKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newPrice = [...price] as [number, number];

      // Ensure min_price is valid
      if (index === 0 && newPrice[0] <= productMinPrice) {
        newPrice[0] = productMinPrice;
      }

      // Ensure max_price is valid
      if (index === 1 && newPrice[1] < newPrice[0]) {
        newPrice[1] = productMaxPrice;
      }

      updateSearchParams(newPrice);
    }
  };

  return (
    <Box>
      <Typography variant="caption" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
        Price Range
      </Typography>

      <Box sx={{ px: 1 }}>
        <Slider
          value={price}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderCommitted}
          min={productMinPrice}
          max={productMaxPrice}
          sx={{
            color: 'primary.main',
            '& .MuiSlider-thumb': {
              border: '2px solid',
              borderColor: 'primary.main',
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <TextField
          size="small"
          type="number"
          value={price[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
          onKeyDown={(e) => handleInputKeyDown(0, e as React.KeyboardEvent<HTMLInputElement>)}
          sx={{ width: 80 }}
        />
        <TextField
          size="small"
          type="number"
          value={price[1]}
          onChange={(e) => handleInputChange(1, e.target.value)}
          onKeyDown={(e) => handleInputKeyDown(1, e as React.KeyboardEvent<HTMLInputElement>)}
          sx={{ width: 80 }}
        />
      </Box>
    </Box>
  );
};

export default PriceRange;
