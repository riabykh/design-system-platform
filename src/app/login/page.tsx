'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Card,
  CardContent,
} from '@mui/material'
import { Login as LoginIcon } from '@mui/icons-material'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simple admin authentication (in production, use proper auth)
    if (email === 'admin@designsystem.com' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true')
      localStorage.setItem('adminEmail', email)
      router.push('/admin')
    } else {
      setError('Invalid credentials. Use admin@designsystem.com / admin123')
    }

    setLoading(false)
  }

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
              Access the design system admin panel
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoComplete="email"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              <strong>Demo Credentials:</strong><br />
              Email: admin@designsystem.com<br />
              Password: admin123
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="text"
            onClick={() => router.push('/')}
            sx={{ mt: 2 }}
          >
            ← Back to Design System
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}
