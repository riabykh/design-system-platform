'use client'

import { FigmaFile } from '../types'
import { useState } from 'react'
import {
    Card,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography,
} from '@mui/material'
import DynamicIcon from './DynamicIcon'
import IconPickerDialog from './IconPickerDialog'

interface AddEditFormProps {
    file?: FigmaFile | null
    onSave: (file: FigmaFile | Omit<FigmaFile, 'id' | 'createdAt'>) => void
    onCancel: () => void
}

export default function AddEditForm({
    file,
    onSave,
    onCancel
}: AddEditFormProps) {
    const [formData, setFormData] = useState({
        featureName: file?.featureName || '',
        fileName: file?.fileName || '',
        figmaUrl: file?.figmaUrl || '',
        description: file?.description || '',
        category: file?.category || 'Admin',
        icon: file?.icon || 'Widgets',
        isFrequentlyUsed: file?.isFrequentlyUsed || false,
    })
    const [isIconPickerOpen, setIsIconPickerOpen] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (file) {
            onSave({ ...file, ...formData })
        } else {
            onSave(formData)
        }
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
            }}
        >
            <Card sx={{ width: 400, p: 3, maxHeight: '90vh', overflowY: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                    {file ? 'Edit Figma File' : 'Add New Figma File'}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Feature Name"
                        value={formData.featureName}
                        onChange={(e) => setFormData({ ...formData, featureName: e.target.value })}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="File Name"
                        value={formData.fileName}
                        onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                        margin="normal"
                        placeholder="e.g., mobile-design-system-v2"
                    />

                    <TextField
                        fullWidth
                        label="Figma URL"
                        value={formData.figmaUrl}
                        onChange={(e) => setFormData({ ...formData, figmaUrl: e.target.value })}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        margin="normal"
                        multiline
                        rows={3}
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            label="Category"
                        >
                            <MenuItem value="Mobile">Mobile</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Participant">Participant</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ mt: 2, mb: 1 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                            Icon
                        </Typography>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => setIsIconPickerOpen(true)}
                            startIcon={<DynamicIcon iconName={formData.icon} />}
                            sx={{
                                justifyContent: 'flex-start',
                                color: 'text.primary',
                                borderColor: 'rgba(0, 0, 0, 0.23)',
                                py: 1.5
                            }}
                        >
                            {formData.icon}
                        </Button>
                    </Box>

                    <IconPickerDialog
                        open={isIconPickerOpen}
                        onClose={() => setIsIconPickerOpen(false)}
                        onSelect={(icon) => setFormData({ ...formData, icon })}
                        currentIcon={formData.icon}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
                        <input
                            type="checkbox"
                            id="frequentlyUsed"
                            checked={formData.isFrequentlyUsed}
                            onChange={(e) => setFormData({ ...formData, isFrequentlyUsed: e.target.checked })}
                            style={{ marginRight: 8 }}
                        />
                        <label htmlFor="frequentlyUsed">
                            <Typography variant="body2">
                                Mark as frequently used
                            </Typography>
                        </label>
                    </Box>


                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <Button type="submit" variant="contained" fullWidth>
                            {file ? 'Update' : 'Add'} File
                        </Button>
                        <Button onClick={onCancel} fullWidth>
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Card>
        </Box>
    )
}
