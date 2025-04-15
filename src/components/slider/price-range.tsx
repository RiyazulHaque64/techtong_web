'use client';

import type { SyntheticEvent } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Box, Slider, TextField, Typography } from '@mui/material';

const productMinPrice = 0;

type Props = {
  maxPrice: number
}

const PriceRange = ({ maxPrice: productMaxPrice = 1000000 }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get values from search params or use defaults
  const priceRangeParam = searchParams.get('price_range');
  let [minPrice, maxPrice] = priceRangeParam
    ? priceRangeParam.split(',').map(Number)
    : [productMinPrice, productMaxPrice];

  // Reset to 0 if minPrice is greater than maxPrice
  if (minPrice > maxPrice) {
    minPrice = 0;
    maxPrice = 0;
  }

  const [price, setPrice] = useState<[number, number]>([minPrice, maxPrice]);

  // Update state when URL params change
  useEffect(() => {
    setPrice([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const updateSearchParams = (newPrice: [number, number]) => {
    const params = new URLSearchParams(searchParams.toString());

    // If minPrice is greater than maxPrice, reset to 0
    if (newPrice[0] > newPrice[1]) {
      params.set('price_range', '0');
      setPrice([0, 0]);
    }
    // If price is at default values, remove it from URL
    else if (newPrice[0] === productMinPrice && newPrice[1] === productMaxPrice) {
      params.delete('price_range');
    } else {
      params.set('price_range', `${newPrice[0]},${newPrice[1]}`);
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

    if (newPrice[0] > newPrice[1]) {
      setPrice([0, 0]);
      updateSearchParams([0, 0]);
    } else {
      setPrice(newPrice);
      updateSearchParams(newPrice);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const newPrice = [...price] as [number, number];
    newPrice[index] = value === '' ? 0 : Number(value);
    setPrice(newPrice);
  };

  const handleInputKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newPrice = [...price] as [number, number];

      // Ensure minPrice is valid
      if (index === 0 && newPrice[0] <= productMinPrice) {
        newPrice[0] = productMinPrice;
      }

      // If minPrice > maxPrice, reset both to 0
      if (newPrice[0] > newPrice[1]) {
        newPrice[0] = 0;
        newPrice[1] = 0;
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
