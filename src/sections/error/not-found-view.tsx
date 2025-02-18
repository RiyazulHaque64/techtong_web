'use client';

import { m } from 'framer-motion';

import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { PageNotFoundIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

export const NotFoundView = () => (
  <Container component={MotionContainer}>
    <Stack direction="column" alignItems="center" sx={{ py: 4 }}>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Sorry, page not found!
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
          sure to check your spelling.
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <PageNotFoundIllustration sx={{ my: { xs: 5, sm: 10 } }} />
      </m.div>

      <Button component={RouterLink} href="/" size="large" variant="contained">
        Go to home
      </Button>
    </Stack>
  </Container>
);
