'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { Stack, Button, MenuItem, MenuList, Typography } from '@mui/material';

import { SHOW_OPTIONS, SORT_OPTIONS } from 'src/constants/filter-options';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

const ShopFilterToolbar = () => {
  const [limit, setLimit] = useState(24);
  const [sort, setSort] = useState('Default');

  const limitPopover = usePopover();
  const sortingPopover = usePopover();

  const router = useRouter();
  const pathname = usePathname();

  const handleShow = (value: number) => {
    const params = new URLSearchParams(window.location.search);
    if (value !== 24) {
      params.set('limit', value.toString());
      router.push(`${pathname}?${params.toString()}`);
    } else {
      params.delete('limit');
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleSorting = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('sortBy', 'price');
    switch (value) {
      case 'PRICE_DESC':
        params.set('sortOrder', 'desc');
        router.push(`${pathname}?${params.toString()}`);
        break;
      case 'PRICE_ASC':
        params.set('sortOrder', 'asc');
        router.push(`${pathname}?${params.toString()}`);
        break;
      default:
        params.delete('sortBy');
        params.delete('sortOrder');
        router.push(`${pathname}?${params.toString()}`);
        break;
    }
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 2,
          py: 1,
          alignItems: 'center',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
        }}
      >
        <Typography variant="h6">Speaker</Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <Button
            size="small"
            sx={{ color: 'text.secondary', width: '84px' }}
            onClick={limitPopover.onOpen}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap="4px"
              sx={{ width: '100%' }}
            >
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                Show: {limit}
              </Typography>
              <Iconify icon="solar:alt-arrow-down-line-duotone" sx={{ width: 16, height: 16 }} />
            </Stack>
          </Button>
          <Button size="small" sx={{ color: 'text.secondary' }} onClick={sortingPopover.onOpen}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap="4px"
              sx={{ width: '100%' }}
            >
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                {sort === 'Default' ? 'Sort by' : sort}
              </Typography>
              <Iconify icon="solar:alt-arrow-down-line-duotone" sx={{ width: 16, height: 16 }} />
            </Stack>
          </Button>
        </Stack>
      </Stack>
      <CustomPopover
        open={limitPopover.open}
        anchorEl={limitPopover.anchorEl}
        onClose={limitPopover.onClose}
        slotProps={{ arrow: { placement: 'top-right' } }}
      >
        <MenuList>
          {SHOW_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              selected={option.value === limit}
              onClick={() => {
                setLimit(option.value);
                handleShow(option.value);
                limitPopover.onClose();
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
      <CustomPopover
        open={sortingPopover.open}
        anchorEl={sortingPopover.anchorEl}
        onClose={sortingPopover.onClose}
        slotProps={{ arrow: { placement: 'top-right' } }}
      >
        <MenuList>
          {SORT_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              selected={option.label === sort}
              onClick={() => {
                setSort(option.label);
                handleSorting(option.value);
                sortingPopover.onClose();
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </>
  );
};

export default ShopFilterToolbar;
