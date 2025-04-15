import type { SxProps } from "@mui/material";
import type { ReactNode } from "react";

import { Box, Container } from "@mui/material";

type Props = {
    children: ReactNode,
    sx?: SxProps
}
export const CustomContainer = ({ children, sx }: Props) => (
    <Container sx={{ mt: 3, mb: 15, ...sx }} maxWidth="xl">
        <Box sx={{ px: { lg: 6 } }}>
            {children}
        </Box>
    </Container>
)