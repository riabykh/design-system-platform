'use client'

import { login } from './actions'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material'
import { Login as LoginIcon } from '@mui/icons-material'

export default function LoginPage() {


  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <LoginIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Admin Login
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to manage your design system
            </Typography>
          </Box>

          <form action={login}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              margin="normal"
              required
              autoComplete="email"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              margin="normal"
              required
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </form>

          <Button
            fullWidth
            variant="text"
            onClick={() => window.location.href = '/'}
            sx={{ mt: 2 }}
          >
            ← Back to Design System
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}
