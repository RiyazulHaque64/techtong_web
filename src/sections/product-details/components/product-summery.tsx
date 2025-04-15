import type { IProduct } from 'src/interfaces/product';

import { Box, Divider, Rating } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paramCase } from 'src/utils/change-case';
import { intervalDays } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

type Props = {
    product: IProduct;
    disableActions?: boolean;
    onGotoStep?: (step: number) => void;
    onAddCart?: (cartItem: any) => void;
};

export function ProductSummary({
    product,
    onAddCart,
    onGotoStep,
    disableActions,
    ...other
}: Props) {
    const {
        name,
        price,
        discount_price,
        retailer_price,
        created_at,
        stock,
        key_features,
        tags,
        code,
        model,
        categories,
        brand,
        avg_rating,
        reviews,
    } = product;

    const renderLabel = (
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
            <Stack direction="row" gap={1} alignItems="center" sx={{ mb: 1 }}>
                {intervalDays(new Date().toDateString(), created_at) < 30 && (
                    <Label color="info" sx={{ textTransform: 'uppercase' }}>
                        New
                    </Label>
                )}
                <Label
                    variant="soft"
                    color={stock === 0 ? 'error' : stock < 5 ? 'warning' : 'success'}
                    sx={{ textTransform: 'uppercase' }}
                >
                    {stock === 0 ? 'Out of stock' : stock < 5 ? 'Low stock' : 'In stock'}
                </Label>
            </Stack>
            {
                code && (
                    <Label variant="outlined" sx={{ textTransform: 'uppercase' }}>
                        {code}
                    </Label>
                )
            }
        </Stack>
    );

    const renderPrice = (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Stack direction="row" alignItems="center">
                <Typography variant="caption" sx={{ fontWeight: 'medium', fontSize: '0.9rem' }}>
                    Regular Price: {price}
                </Typography>
                <Iconify icon="tabler:currency-taka" sx={{ width: 16, height: 16, ml: -0.4 }} />
            </Stack>
        </Stack>
    );

    const renderTagAndFeatures = (
        <Stack direction="column" gap={2}>
            {
                key_features.length > 0 && (
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                            Key Features
                        </Typography>
                        {key_features.map((feature) => (
                            <Typography key={feature} variant="body2" sx={{ color: 'text.secondary' }}>
                                {feature}
                            </Typography>
                        ))}
                    </Box>
                )
            }
            {
                tags && tags.length > 0 && (
                    <Stack direction="row" gap={1} alignItems="center">
                        <Typography variant="caption" sx={{ fontSize: '0.9rem' }}>
                            Tags:{' '}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                            {tags.map((tag) => paramCase(tag)).join(', ')}
                        </Typography>
                    </Stack>
                )
            }
        </Stack>
    );

    return (
        <Box sx={{ pt: 3 }} {...other}>
            {renderLabel}
            <Typography variant="h5">{name}</Typography>
            <Stack
                direction='row'
                alignItems='center'
                gap={0.2}
                divider={<Iconify icon='pepicons-pop:line-y' sx={{ height: '0.9rem', color: 'grey.300' }} />}
                sx={{
                    color: 'text.secondary',
                }}
            >
                <Typography sx={{ fontSize: '0.9rem' }}>
                    {categories?.map((c) => c.title).join(', ')}
                </Typography>
                {
                    brand && (
                        <Typography sx={{ fontSize: '0.9rem' }}>{brand.name}</Typography>
                    )
                }
                <Typography sx={{ fontSize: '0.9rem', textTransform: 'uppercase' }}>{model}</Typography>
            </Stack>

            {renderPrice}
            <Divider sx={{ borderStyle: 'dashed', my: 2 }} />
            {renderTagAndFeatures}
            <Divider sx={{ borderStyle: 'dashed', my: 2 }} />
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ color: 'text.disabled', typography: 'body2' }}
            >
                <Typography variant="caption" component="div" sx={{ fontSize: '1rem' }}>
                    Available: {stock}
                </Typography>
                <Stack direction="row" alignItems="center">
                    <Rating size="small" value={avg_rating} precision={0.1} readOnly sx={{ mr: 1 }} />
                    <Typography variant="caption" sx={{ fontSize: '0.9rem' }}>
                        {reviews.length} reviews
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
}
