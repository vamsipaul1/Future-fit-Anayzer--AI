import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload PDF, DOC, DOCX, or TXT files.' },
        { status: 400 }
      );
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size too large. Please upload files smaller than 10MB.' },
        { status: 400 }
      );
    }

    let extractedText = '';

    try {
      if (file.type === 'text/plain') {
        extractedText = await file.text();
      } else if (file.type === 'application/pdf') {
        // For PDF files, we'll use a simple approach
        // In production, you might want to use a PDF parsing library
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Simple text extraction (this is basic - consider using pdf-parse or similar)
        extractedText = new TextDecoder().decode(uint8Array);
        
        // Clean up the text
        extractedText = extractedText
          .replace(/[^\x20-\x7E\n\r]/g, ' ') // Remove non-printable characters
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
      } else {
        // For DOC/DOCX files, you might want to use mammoth or similar library
        return NextResponse.json(
          { error: 'DOC/DOCX parsing not implemented yet. Please convert to PDF or TXT.' },
          { status: 400 }
        );
      }
    } catch (extractionError) {
      console.error('Text extraction error:', extractionError);
      return NextResponse.json(
        { error: 'Failed to extract text from file' },
        { status: 500 }
      );
    }

    if (!extractedText.trim()) {
      return NextResponse.json(
        { error: 'No text found in the file' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      text: extractedText,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });

  } catch (error) {
    console.error('File processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    );
  }
}