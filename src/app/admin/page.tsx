'use client'

import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import figmaFilesData from '../../data/figmaFiles.json'

interface FigmaFile {
  id: string
  featureName: string
  fileName: string
  figmaUrl: string
  description: string
  category: string
  icon: string
  isFrequentlyUsed: boolean
  createdAt: string
}

// Helper function to format dates consistently
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// Helper function to get category colors
const getCategoryColor = (category: string) => {
  const colors = {
    'Mobile': '#025248',
    'Admin': '#3F68FF',
    'Participant': '#142641'
  }
  return colors[category as keyof typeof colors] || '#616161'
}

export default function AdminPage() {
  const router = useRouter()
  const [figmaFiles, setFigmaFiles] = useState<FigmaFile[]>(figmaFilesData)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication
    const adminStatus = localStorage.getItem('isAdmin') === 'true'
    const adminEmail = localStorage.getItem('adminEmail')

    if (!adminStatus || !adminEmail) {
      router.push('/login')
      return
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAuthenticated(true)
  }, [router])

  const handleDeleteFile = (id: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      setFigmaFiles(figmaFiles.filter(file => file.id !== id))
    }
  }

  const handleEditFile = (file: FigmaFile) => {
    // In a real app, this would open an edit modal
    alert(`Edit functionality for "${file.featureName}" would open here`)
  }

  const handleAddFile = () => {
    // In a real app, this would open an add modal
    alert('Add new file functionality would open here')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={() => router.push('/')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Admin Dashboard
        </Typography>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Figma Files Management
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddFile}
            >
              Add New File
            </Button>
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Feature Name</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>Frequently Used</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {figmaFiles
              .map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {file.featureName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      <a
                        href={file.figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#1976d2', textDecoration: 'none' }}
                      >
                        View in Figma →
                      </a>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {file.fileName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={file.category}
                      size="small"
                      sx={{
                        backgroundColor: getCategoryColor(file.category),
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {file.icon}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {file.isFrequentlyUsed ? (
                      <Chip label="★" size="small" color="warning" />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 200 }}>
                      {file.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {formatDate(file.createdAt)}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleEditFile(file)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteFile(file.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {figmaFiles.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No Figma files found
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddFile}
            sx={{ mt: 2 }}
          >
            Add Your First File
          </Button>
        </Box>
      )}
    </Container>
  )
}
