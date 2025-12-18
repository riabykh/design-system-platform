'use client'

import { login, signup } from './actions'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
} from '@mui/material'
import { Login as LoginIcon } from '@mui/icons-material'
import { useState } from 'react'

export default function LoginPage() {
  const [tab, setTab] = useState(0)

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <LoginIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              {tab === 0 ? 'Welcome Back' : 'Create Account'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {tab === 0 ? 'Sign in to manage your design system' : 'Join to start collaborating'}
            </Typography>
          </Box>

          <Tabs value={tab} onChange={(_, v) => setTab(v)} centered sx={{ mb: 4 }}>
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>

          <form action={tab === 0 ? login : signup}>
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
              {tab === 0 ? 'Sign In' : 'Sign Up'}
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
