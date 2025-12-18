'use client'

import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    Box,
    IconButton,
    Chip,
    CardMedia,
} from '@mui/material'
import {
    useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    OpenInNew as OpenInNewIcon,
} from '@mui/icons-material'
import DynamicIcon from './DynamicIcon'
import { FigmaFile } from '../types'

interface SortableCardProps {
    file: FigmaFile
    isAdmin: boolean
    isReorderMode: boolean
    onEdit: (file: FigmaFile) => void
    onDelete: (id: string) => void
    isOverlay?: boolean
}

export default function SortableCard({
    file,
    isAdmin,
    isReorderMode,
    onEdit,
    onDelete,
    isOverlay
}: SortableCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: file.id })

    const style = {
        transform: isOverlay ? undefined : CSS.Transform.toString(transform),
        transition: isOverlay ? undefined : transition,
    }

    const getCategoryColor = (category: string) => {
        const colors = {
            'Mobile': '#025248',
            'Admin': '#3F68FF',
            'Participant': '#142641'
        }
        return colors[category as keyof typeof colors] || '#616161'
    }

    return (
        <Card
            ref={isOverlay ? undefined : setNodeRef}
            style={style}
            {...(isAdmin && isReorderMode && !isOverlay ? attributes : {})}
            {...(isAdmin && isReorderMode && !isOverlay ? listeners : {})}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                cursor: isAdmin && isReorderMode ? 'grab' : 'default',
                opacity: isDragging ? 0.3 : 1,
                transform: isOverlay ? 'scale(1.05)' : undefined,
                boxShadow: isOverlay
                    ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    : undefined,
                '&:hover': {
                    transform: isOverlay ? 'scale(1.05)' : 'translateY(-4px)',
                    boxShadow: isOverlay
                        ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                        : '0 8px 25px rgba(0,0,0,0.15)',
                }
            }}
        >
            {/* Drag handle for admin in reorder mode */}
            {isAdmin && isReorderMode && (
                <Box
                    {...attributes}
                    {...listeners}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        width: 20,
                        height: 20,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'grab',
                        zIndex: 1,
                        '&:hover': {
                            bgcolor: 'white',
                        }
                    }}
                >
                    <Box sx={{
                        width: 12,
                        height: 12,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.5
                    }}>
                        {[...Array(9)].map((_, i) => (
                            <Box
                                key={i}
                                sx={{
                                    width: 2,
                                    height: 2,
                                    bgcolor: 'text.secondary',
                                    borderRadius: '50%'
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            )}
            <CardMedia
                sx={{
                    height: 120,
                    backgroundColor: getCategoryColor(file.category),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                }}
            >
                <Box sx={{ textAlign: 'center', color: 'white' }}>
                    <DynamicIcon iconName={file.icon} sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {file.featureName}
                    </Typography>
                </Box>

                {isAdmin && !isReorderMode && (
                    <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 0.5, zIndex: 2 }}>
                        <IconButton
                            size="small"
                            aria-label="edit file"
                            onClick={(e) => {
                                e.stopPropagation()
                                onEdit(file)
                            }}
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.9)',
                                '&:hover': { bgcolor: 'white' },
                                color: 'text.primary'
                            }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            aria-label="delete file"
                            onClick={(e) => {
                                e.stopPropagation()
                                onDelete(file.id)
                            }}
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.9)',
                                '&:hover': { bgcolor: 'white' },
                                color: 'error.main'
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                )}
            </CardMedia>

            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Chip
                        label={file.category}
                        size="small"
                        color="primary"
                        variant="outlined"
                    />
                    {file.fileName && (
                        <Typography variant="body2" color="text.primary" sx={{
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: 'primary.main'
                        }}>
                            {file.fileName}
                        </Typography>
                    )}
                </Box>

                <Typography variant="body2" color="text.secondary">
                    {file.description}
                </Typography>
            </CardContent>

            <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                    variant="contained"
                    onClick={() => window.open(file.figmaUrl, '_blank')}
                    fullWidth
                    endIcon={<OpenInNewIcon />}
                    sx={{
                        py: 1.5,
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: 2
                    }}
                >
                    Open in Figma
                </Button>
            </CardActions>
        </Card>
    )
}
