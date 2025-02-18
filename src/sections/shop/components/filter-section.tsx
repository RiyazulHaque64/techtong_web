'use client';

import type { IAttribute } from 'src/interfaces/attribute';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Box, Checkbox, FormGroup, Typography, FormControlLabel } from '@mui/material';

type Props = {
  attribute: IAttribute;
};

const FilterSection = ({ attribute }: Props) => {
  const attributeName = attribute.name.toLowerCase();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  // Get the current values for this attribute from the search params
  const currentValues = params.get(attributeName)?.split(',') || [];

  const handleCheckboxChange = (value: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    // Update the current values based on the checkbox state
    let updatedValues;
    if (isChecked) {
      updatedValues = [...currentValues, value]; // Add the value if checked
    } else {
      updatedValues = currentValues.filter((v) => v !== value); // Remove the value if unchecked
    }

    // Update the search params
    if (updatedValues.length > 0) {
      params.set(attributeName, updatedValues.join(',')); // Set comma-separated values
    } else {
      params.delete(attributeName); // Remove the param if no values are selected
    }

    // Update the URL
    router.replace(`?${params.toString()}`);
  };

  return (
    <Box>
      <Typography
        variant="caption"
        sx={{ fontSize: '1rem', fontWeight: 'bold', textTransform: 'capitalize' }}
      >
        {attribute.name}
      </Typography>
      <FormGroup sx={{ ml: 1 }}>
        {attribute.value.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                size="small"
                checked={currentValues.includes(item)}
                onChange={handleCheckboxChange(item)}
              />
            }
            label={item}
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: '14px',
                textTransform: 'capitalize',
              },
            }}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default FilterSection;
