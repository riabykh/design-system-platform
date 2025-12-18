import { useState, useMemo } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Grid,
    IconButton,
    Box,
    Typography,
    InputAdornment,
} from '@mui/material'
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material'
import DynamicIcon from './DynamicIcon'
import { POPULAR_ICONS } from '../constants/icons'

interface IconPickerDialogProps {
    open: boolean
    onClose: () => void
    onSelect: (iconName: string) => void
    currentIcon: string
}

export default function IconPickerDialog({
    open,
    onClose,
    onSelect,
    currentIcon,
}: IconPickerDialogProps) {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredIcons = useMemo(() => {
        if (!searchTerm) return POPULAR_ICONS
        return POPULAR_ICONS.filter(icon =>
            icon.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm])

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { height: '80vh', maxHeight: 600 }
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h6">Select Icon</Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <Box sx={{ px: 3, pb: 2 }}>
                <TextField
                    fullWidth
                    placeholder="Search icons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    size="small"
                />
            </Box>

            <DialogContent dividers sx={{ p: 3 }}>
                <Grid container spacing={1}>
                    {filteredIcons.map((icon) => (
                        <Grid key={icon}>
                            <IconButton
                                onClick={() => {
                                    onSelect(icon)
                                    onClose()
                                }}
                                sx={{
                                    width: 48,
                                    height: 48,
                                    border: icon === currentIcon ? '2px solid' : '1px solid',
                                    borderColor: icon === currentIcon ? 'primary.main' : 'transparent',
                                    bgcolor: icon === currentIcon ? 'primary.light' : 'transparent',
                                    '&:hover': {
                                        bgcolor: 'action.hover',
                                        borderColor: 'action.hover',
                                    },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5
                                }}
                                title={icon}
                            >
                                <DynamicIcon iconName={icon} />
                            </IconButton>
                        </Grid>
                    ))}
                </Grid>

                {filteredIcons.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography color="text.secondary">
                            No icons found matching &quot;{searchTerm}&quot;
                        </Typography>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    )
}
