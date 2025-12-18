'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../utils/supabase/client'
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from '@mui/material'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  Add as AddIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'
// import figmaFilesData from '../data/figmaFiles.json' // Removed legacy data
import SortableCard from '../components/SortableCard'
import AddEditForm from '../components/AddEditForm'
import { FigmaFile } from '../types'
import {
  fetchFigmaFiles,
  createFigmaFile,
  updateFigmaFile,
  deleteFigmaFile,
  reorderFigmaFiles
} from '../services/api'

export default function HomePage() {
  const router = useRouter()
  const [figmaFiles, setFigmaFiles] = useState<FigmaFile[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingFile, setEditingFile] = useState<FigmaFile | null>(null)
  const [isReorderMode, setIsReorderMode] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  // Load data from API
  useEffect(() => {
    const loadFiles = async () => {
      try {
        const files = await fetchFigmaFiles()
        setFigmaFiles(files)
      } catch (error) {
        console.error('Error fetching files:', error)
        setFigmaFiles([])
      }
    }

    loadFiles()
  }, [])

  // Check auth state
  useEffect(() => {
    const supabase = createClient()

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session)
      setAdminEmail(session?.user?.email || '')
    })

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session)
      setAdminEmail(session?.user?.email || '')
    })

    return () => subscription.unsubscribe()
  }, [])

  const categories = ['All', 'Frequently Used', 'Mobile', 'Admin', 'Participant']
  const filteredFiles = figmaFiles
    .filter(file => {
      const matchesSearch = file.featureName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === '' || selectedCategory === 'All' ||
        (selectedCategory === 'Frequently Used' ? file.isFrequentlyUsed : file.category === selectedCategory)
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      // Sort frequently used first
      if (a.isFrequentlyUsed && !b.isFrequentlyUsed) return -1
      if (!a.isFrequentlyUsed && b.isFrequentlyUsed) return 1
      return 0
    })

  const handleAddFile = async (newFile: Omit<FigmaFile, 'id' | 'createdAt'>) => {
    try {
      const createdFile = await createFigmaFile(newFile)
      setFigmaFiles(prevFiles => [...prevFiles, createdFile])
      setSelectedCategory('All')
      setShowAddForm(false)
    } catch (error) {
      console.error('Error creating file:', error)
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    setActiveId(null)

    if (active.id !== over?.id) {
      const newFiles = arrayMove(figmaFiles,
        figmaFiles.findIndex((item) => item.id === active.id),
        figmaFiles.findIndex((item) => item.id === over?.id)
      )

      setFigmaFiles(newFiles)

      // Save the new order to the server
      try {
        await reorderFigmaFiles(newFiles)
      } catch (error) {
        console.error('Error saving reorder:', error)
      }
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleEditFile = async (updatedFile: FigmaFile) => {
    try {
      const savedFile = await updateFigmaFile(updatedFile)
      setFigmaFiles(figmaFiles.map(file =>
        file.id === savedFile.id ? savedFile : file
      ))
      setEditingFile(null)
    } catch (error) {
      console.error('Error updating file:', error)
    }
  }

  const handleDeleteFile = async (id: string) => {
    try {
      await deleteFigmaFile(id)
      setFigmaFiles(figmaFiles.filter(file => file.id !== id))
    } catch (error) {
      console.error('Error deleting file:', error)
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setIsAdmin(false)
    setAdminEmail('')
    router.refresh()
  }

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#142641' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '16px' }}>
              <g clipPath="url(#clip0_3_799)">
                <path d="M98.2316 8L93.2218 10.0998V13.8715H90.5389V17.5337H93.2218V31.393H98.2316V17.5303H100.851V13.8681H98.2316V8Z" fill="white" />
                <path d="M21.4528 31.393H26.466V8L21.4528 10.0998V31.393Z" fill="white" />
                <path d="M4.96278 20.8442L5.01987 20.5954C5.44966 18.6615 7.17555 17.3645 9.3111 17.3645C11.4466 17.3645 13.2128 18.6316 13.6661 20.5921L13.7232 20.8442H4.96278ZM9.30774 13.2544C4.17707 13.2511 0 17.4772 0 22.672C0 25.1533 0.973753 27.4853 2.75001 29.2401C4.52292 30.9949 6.88343 31.9635 9.39504 31.9635C13.055 31.9635 16.2247 29.804 17.9473 26.1716H12.8133C11.8664 27.3459 10.8456 27.8502 9.40847 27.8502C7.05468 27.8502 5.26163 26.4171 4.95271 24.2808L4.91913 24.0453H18.592C18.6625 23.6439 18.6927 23.2392 18.686 22.8345C18.686 17.3678 14.6567 13.2478 9.3111 13.2478" fill="white" />
                <path d="M106.28 20.8442L106.337 20.5954C106.767 18.6615 108.493 17.3645 110.628 17.3645C112.764 17.3645 114.53 18.6316 114.984 20.5921L115.041 20.8442H106.28ZM110.628 13.2544C105.494 13.2544 101.321 17.4806 101.321 22.6753C101.321 25.1566 102.294 27.4886 104.071 29.2434C105.844 30.9982 108.204 31.9668 110.716 31.9668C114.372 31.9668 117.545 29.8073 119.268 26.175H114.134C113.187 27.3493 112.166 27.8535 110.729 27.8535C108.372 27.8535 106.582 26.4204 106.27 24.2842L106.237 24.0486H119.909C119.98 23.6506 120.01 23.2426 120.003 22.8345C120.003 17.3678 115.974 13.2478 110.628 13.2478" fill="white" />
                <path d="M34.1351 20.8442L34.1922 20.5954C34.622 18.6615 36.3479 17.3645 38.4834 17.3645C40.6189 17.3645 42.3851 18.6316 42.8384 20.5921L42.8955 20.8442H34.1351ZM38.48 13.2544C33.3494 13.2544 29.1723 17.4806 29.1723 22.6753C29.1723 25.1566 30.1461 27.4886 31.9223 29.2434C33.6952 30.9982 36.0557 31.9668 38.5673 31.9668C42.224 31.9668 45.3971 29.8073 47.1162 26.175H41.9822C41.0387 27.3493 40.0145 27.8535 38.5774 27.8535C36.2236 27.8535 34.4306 26.4204 34.1217 24.2842L34.0881 24.0486H47.7609C47.8314 23.6506 47.8617 23.2426 47.8583 22.8345C47.8583 17.3678 43.829 13.2478 38.4834 13.2478" fill="white" />
                <path d="M78.2562 17.8455C79.5389 17.8455 80.7477 18.3398 81.6543 19.2354C82.5642 20.131 83.0679 21.3252 83.0679 22.5957L82.8597 22.6057H83.0679C83.0981 23.853 82.6314 25.0405 81.7583 25.9494C80.882 26.855 79.7034 27.3725 78.4375 27.4024H78.3166C75.6976 27.3891 73.5822 25.2727 73.5956 22.6886C73.5956 19.9685 75.6405 17.8488 78.2495 17.8488H78.2562V17.8455ZM68.5825 22.609C68.5825 28.0492 72.3197 32 77.4671 32C79.8209 32 81.8893 31.0214 82.6079 29.5619L82.6649 29.4458H83.0679V31.383H88.081V13.8648H83.0679V15.7722H82.6784L82.6179 15.676C81.6543 14.1601 79.7269 13.2512 77.4638 13.2512C72.4842 13.2512 68.5791 17.3612 68.5791 22.609" fill="white" />
                <path d="M54.0735 28.6131L47.9993 13.7587H54.2683L57.2063 20.8674L54.0735 28.6131Z" fill="#00FF93" />
                <path d="M61.4909 31.3863H55.2219L62.4311 13.7587H68.7L61.4909 31.3863Z" fill="#00AC93" />
                <path d="M61.4909 31.383H55.2219L62.4311 13.7587L70.0834 10.5443L61.4909 31.383Z" fill="#00AC93" />
              </g>
              <defs>
                <clipPath id="clip0_3_799">
                  <rect width="120" height="24" fill="white" transform="translate(0 8)" />
                </clipPath>
              </defs>
            </svg>
            <Typography variant="h6" component="div" sx={{ color: 'white' }}>
              Design System
            </Typography>
          </Box>

          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={() => setShowAddForm(true)}
            size="small"
            sx={{ color: 'white', mr: 2 }}
          >
            Add File
          </Button>

          {isAdmin ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.2)' }}>
                <Typography sx={{ color: 'white', fontSize: '14px' }}>
                  {adminEmail.charAt(0).toUpperCase()}
                </Typography>
              </Avatar>
              <Typography variant="body2" sx={{ mr: 2, color: 'white' }}>
                {adminEmail}
              </Typography>
              <Button
                color="inherit"
                onClick={() => setIsReorderMode(!isReorderMode)}
                size="small"
                sx={{
                  color: 'white',
                  bgcolor: isReorderMode ? 'rgba(255,255,255,0.2)' : 'transparent'
                }}
              >
                {isReorderMode ? 'Done' : 'Reorder'}
              </Button>
              <Button
                color="inherit"
                onClick={() => router.push('/admin')}
                size="small"
                sx={{ color: 'white' }}
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                size="small"
                sx={{ color: 'white' }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              onClick={handleLogin}
              sx={{ color: 'white' }}
            >
              Admin Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3, px: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Design Files
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Access all design system files and Figma links in one place
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ minWidth: 200 }}
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <SortableContext items={filteredFiles.map(file => file.id)} strategy={verticalListSortingStrategy}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)'
                },
                gap: 3,
                width: '100%'
              }}
            >
              {filteredFiles.map((file) => (
                <SortableCard
                  key={file.id}
                  file={file}
                  isAdmin={isAdmin}
                  isReorderMode={isReorderMode}
                  onEdit={setEditingFile}
                  onDelete={handleDeleteFile}
                />
              ))}
            </Box>
          </SortableContext>
          <DragOverlay>
            {activeId ? (
              <SortableCard
                file={figmaFiles.find(f => f.id === activeId)!}
                isAdmin={isAdmin}
                isReorderMode={isReorderMode}
                onEdit={handleEditFile}
                onDelete={handleDeleteFile}
                isOverlay
              />
            ) : null}
          </DragOverlay>
        </DndContext>

        {filteredFiles.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No files found matching your search criteria
            </Typography>
          </Box>
        )}
      </Container>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <AddEditForm
          onSave={handleAddFile}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingFile && (
        <AddEditForm
          file={editingFile}
          onSave={(file) => handleEditFile(file as FigmaFile)}
          onCancel={() => setEditingFile(null)}
        />
      )}
    </>
  )
}