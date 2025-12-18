import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT - Reorder Figma files
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { files } = body

    if (!Array.isArray(files)) {
      return NextResponse.json({ error: 'Files array is required' }, { status: 400 })
    }

    // Update order for each file in a transaction
    await prisma.$transaction(
      files.map((file: { id: string }, index: number) =>
        prisma.figmaFile.update({
          where: { id: file.id },
          data: { order: index }
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error reordering files:', error)
    return NextResponse.json({ error: 'Failed to reorder files' }, { status: 500 })
  }
}
