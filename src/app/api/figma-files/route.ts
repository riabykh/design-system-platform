import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Fetch all Figma files
export async function GET() {
  try {
    const files = await prisma.figmaFile.findMany({
      orderBy: {
        order: 'asc'
      }
    })
    return NextResponse.json(files)
  } catch (error) {
    console.error('Error fetching files:', error)
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 })
  }
}

// POST - Create a new Figma file
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Get the current highest order to append to the end
    const lastFile = await prisma.figmaFile.findFirst({
      orderBy: { order: 'desc' }
    })
    const newOrder = (lastFile?.order ?? -1) + 1

    const newFile = await prisma.figmaFile.create({
      data: {
        featureName: body.featureName,
        fileName: body.fileName,
        figmaUrl: body.figmaUrl,
        description: body.description,
        category: body.category,
        icon: body.icon,
        isFrequentlyUsed: body.isFrequentlyUsed || false,
        order: newOrder
      }
    })

    return NextResponse.json(newFile, { status: 201 })
  } catch (error) {
    console.error('Error creating file:', error)
    return NextResponse.json({ error: 'Failed to create file' }, { status: 500 })
  }
}

// PUT - Update an existing Figma file
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    const updatedFile = await prisma.figmaFile.update({
      where: { id: body.id },
      data: {
        featureName: body.featureName,
        fileName: body.fileName,
        figmaUrl: body.figmaUrl,
        description: body.description,
        category: body.category,
        icon: body.icon,
        isFrequentlyUsed: body.isFrequentlyUsed || false
      }
    })

    return NextResponse.json(updatedFile)
  } catch (error) {
    console.error('Error updating file:', error)
    return NextResponse.json({ error: 'Failed to update file' }, { status: 500 })
  }
}

// DELETE - Delete a Figma file
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await prisma.figmaFile.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting file:', error)
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}
