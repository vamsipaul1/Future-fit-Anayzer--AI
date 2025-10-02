import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';

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
        // Better PDF text extraction
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Convert to string and extract readable text
        let pdfText = '';
        
        // Method 1: Try to extract text from PDF structure
        const textDecoder = new TextDecoder('utf-8', { fatal: false });
        const pdfString = textDecoder.decode(uint8Array);
        
        // Extract text between BT (Begin Text) and ET (End Text) markers
        const textMatches = pdfString.match(/BT[\s\S]*?ET/g);
        if (textMatches) {
          for (const match of textMatches) {
            // Extract text content from PDF text objects
            const textContent = match
              .replace(/BT|ET/g, '')
              .replace(/\/[A-Za-z0-9]+\s+[0-9]+\s+Tf/g, '') // Remove font definitions
              .replace(/[0-9]+\s+[0-9]+\s+Td/g, '') // Remove positioning
              .replace(/[0-9]+\s+[0-9]+\s+Tj/g, '') // Remove text positioning
              .replace(/\(([^)]+)\)/g, '$1') // Extract text from parentheses
              .replace(/\[([^\]]+)\]/g, '$1') // Extract text from brackets
              .replace(/[^\x20-\x7E\n\r]/g, ' ') // Remove non-printable characters
              .replace(/\s+/g, ' ')
              .trim();
            
            if (textContent.length > 3) {
              pdfText += textContent + ' ';
            }
          }
        }
        
        // Method 2: Try extracting text from stream objects
        if (!pdfText.trim()) {
          const streamMatches = pdfString.match(/stream[\s\S]*?endstream/g);
          if (streamMatches) {
            for (const stream of streamMatches) {
              const streamContent = stream
                .replace(/stream|endstream/g, '')
                .replace(/[^\x20-\x7E\n\r]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
              
              if (streamContent.length > 10) {
                pdfText += streamContent + ' ';
              }
            }
          }
        }
        
        // Method 3: If no structured text found, try basic extraction
        if (!pdfText.trim()) {
          // Extract readable ASCII text
          for (let i = 0; i < uint8Array.length; i++) {
            const byte = uint8Array[i];
            if (byte >= 32 && byte <= 126) { // Printable ASCII characters
              pdfText += String.fromCharCode(byte);
            } else if (byte === 10 || byte === 13) { // Line breaks
              pdfText += ' ';
            }
          }
        }
        
        // Method 4: Try extracting from PDF content streams
        if (!pdfText.trim()) {
          const contentMatches = pdfString.match(/\/Contents\s*<<[^>]*>>/g);
          if (contentMatches) {
            for (const content of contentMatches) {
              const contentText = content
                .replace(/\/Contents\s*<<[^>]*>>/g, '')
                .replace(/[^\x20-\x7E\n\r]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
              
              if (contentText.length > 5) {
                pdfText += contentText + ' ';
              }
            }
          }
        }
        
        // Clean up the extracted text
        extractedText = pdfText
          .replace(/\s+/g, ' ')
          .replace(/[^\x20-\x7E\s]/g, '')
          .trim();
        
        // If still no readable text, provide helpful message
        if (!extractedText.trim() || extractedText.length < 50) {
          return NextResponse.json({
            success: false,
            error: 'PDF appears to be image-based or corrupted. Please try uploading a text-based PDF or convert to TXT format.',
            suggestion: 'For best results, save your resume as a TXT file or ensure your PDF contains selectable text.'
          }, { status: 400 });
        }
        
        console.log('PDF text extracted successfully, length:', extractedText.length);
        console.log('PDF sample text:', extractedText.substring(0, 200));
        
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                 file.type === 'application/msword') {
        // DOC/DOCX text extraction using mammoth
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ buffer: arrayBuffer });
        
        extractedText = result.value;
        
        if (result.messages.length > 0) {
          console.log('DOC/DOCX extraction warnings:', result.messages);
        }
        
        // Clean up the extracted text
        extractedText = extractedText
          .replace(/\s+/g, ' ')
          .trim();
        
        if (!extractedText.trim() || extractedText.length < 50) {
          return NextResponse.json({
            success: false,
            error: 'No readable text found in the Word document. Please ensure the document contains text content.',
            suggestion: 'Try copying the text to a TXT file or check if the document is corrupted.'
          }, { status: 400 });
        }
        
        console.log('DOC/DOCX text extracted successfully, length:', extractedText.length);
        console.log('DOC/DOCX sample text:', extractedText.substring(0, 200));
        
      } else {
        // For other file types
        return NextResponse.json(
          { error: 'Unsupported file type. Please upload PDF, DOC, DOCX, or TXT files.' },
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