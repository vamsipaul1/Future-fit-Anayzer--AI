import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ 
        success: false,
        error: 'No file provided' 
      }, { status: 400 });
    }

    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    let extractedText = '';

    try {
      if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
        // Handle plain text files
        extractedText = await file.text();
      } else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
        // For PDF files, we'll use a simple approach
        // In production, you'd want to use pdf-parse or similar library
        extractedText = `PDF file: ${fileName}\n\nNote: PDF text extraction requires additional setup. Please copy and paste your resume text directly for now.`;
      } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
        // For DOCX files, we'll use a simple approach
        // In production, you'd want to use mammoth or similar library
        extractedText = `DOCX file: ${fileName}\n\nNote: DOCX text extraction requires additional setup. Please copy and paste your resume text directly for now.`;
      } else {
        return NextResponse.json({ 
          success: false,
          error: 'Unsupported file type. Please use PDF, DOCX, DOC, or TXT files.' 
        }, { status: 400 });
      }
    } catch (extractionError) {
      console.error('Text extraction error:', extractionError);
      return NextResponse.json({ 
        success: false,
        error: 'Failed to extract text from file. Please try copying and pasting your resume text directly.' 
      }, { status: 500 });
    }

    if (!extractedText.trim()) {
      return NextResponse.json({ 
        success: false,
        error: 'No text found in the file. Please ensure the file contains readable text.' 
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      text: extractedText,
      fileName: file.name,
      fileSize: file.size
    });

  } catch (error) {
    console.error('File processing error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to process file. Please try again.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
