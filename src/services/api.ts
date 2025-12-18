import { FigmaFile } from '../types'

export const fetchFigmaFiles = async (): Promise<FigmaFile[]> => {
    const response = await fetch('/api/figma-files')
    if (!response.ok) {
        throw new Error('Failed to fetch files')
    }
    return response.json()
}

export const createFigmaFile = async (file: Omit<FigmaFile, 'id' | 'createdAt'>): Promise<FigmaFile> => {
    const response = await fetch('/api/figma-files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(file),
    })
    if (!response.ok) {
        throw new Error('Failed to create file')
    }
    return response.json()
}

export const updateFigmaFile = async (file: FigmaFile): Promise<FigmaFile> => {
    const response = await fetch('/api/figma-files', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(file),
    })
    if (!response.ok) {
        throw new Error('Failed to update file')
    }
    return response.json()
}

export const deleteFigmaFile = async (id: string): Promise<void> => {
    const response = await fetch(`/api/figma-files?id=${id}`, {
        method: 'DELETE',
    })
    if (!response.ok) {
        throw new Error('Failed to delete file')
    }
}

export const reorderFigmaFiles = async (files: FigmaFile[]): Promise<void> => {
    const response = await fetch('/api/figma-files/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files }),
    })
    if (!response.ok) {
        throw new Error('Failed to reorder files')
    }
}
