import mammoth from 'mammoth';

export async function parseResumeFile(file: File): Promise<string> {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  console.log('FileParser: Processing file:', fileName, 'type:', fileType);

  try {
    if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      console.log('FileParser: Parsing PDF file');
      return await parsePDF(file);
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileName.endsWith('.docx')
    ) {
      console.log('FileParser: Parsing DOCX file');
      return await parseDOCX(file);
    } else if (
      fileType === 'application/msword' ||
      fileName.endsWith('.doc')
    ) {
      console.log('FileParser: Parsing DOC file');
      return await parseDOC(file);
    } else if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
      console.log('FileParser: Parsing TXT file');
      return await parseTXT(file);
    } else {
      console.log('FileParser: Unsupported file type:', fileType);
      return `Unsupported file type: ${fileType}. Please upload a PDF, DOCX, DOC, or TXT file.`;
    }
  } catch (error) {
    console.error('FileParser: Error parsing file:', error);
    return `Error processing file: ${file.name}. Please try uploading a different file or convert to PDF/TXT format.`;
  }
}

async function parsePDF(file: File): Promise<string> {
  try {
    console.log('FileParser: Parsing PDF file -', file.name);
    // For client-side PDF parsing, we'll use a simple approach
    // In production, consider using pdf-parse or pdf2pic on the server
    const arrayBuffer = await file.arrayBuffer();
    
    // Basic text extraction from PDF binary data
    // This is a simplified approach - real PDF parsing requires more complex logic
    const uint8Array = new Uint8Array(arrayBuffer);
    let text = '';
    
    // Extract readable text from PDF (basic implementation)
    for (let i = 0; i < uint8Array.length; i++) {
      const byte = uint8Array[i];
      if (byte >= 32 && byte <= 126) { // Printable ASCII characters
        text += String.fromCharCode(byte);
      } else if (byte === 10 || byte === 13) { // Line breaks
        text += ' ';
      }
    }
    
    // Clean up the extracted text
    text = text
      .replace(/\s+/g, ' ')
      .replace(/[^\x20-\x7E\s]/g, '')
      .trim();
    
    console.log('FileParser: PDF text extracted, length:', text.length);
    console.log('FileParser: PDF sample text:', text.substring(0, 200));
    
    return text || `PDF file uploaded: ${file.name}. Please ensure the PDF contains readable text, or try uploading a TXT file for better analysis.`;
  } catch (error) {
    console.error('FileParser: PDF parsing error:', error);
    return `PDF file uploaded: ${file.name}. Please convert to TXT format for better analysis.`;
  }
}

async function parseDOCX(file: File): Promise<string> {
  try {
    console.log('FileParser: Parsing DOCX file -', file.name);
    const arrayBuffer = await file.arrayBuffer();
    
    // Try mammoth first
    try {
      const result = await mammoth.extractRawText({ arrayBuffer });
      console.log('FileParser: DOCX text extracted with mammoth, length:', result.value.length);
      console.log('FileParser: DOCX sample text:', result.value.substring(0, 200));
      
      if (result.value && result.value.trim().length > 0) {
        return result.value;
      }
    } catch (mammothError) {
      console.log('FileParser: Mammoth failed, trying fallback method:', mammothError);
    }
    
    // Fallback: Try to extract text manually from DOCX
    try {
      console.log('FileParser: Trying manual DOCX extraction...');
      const text = await extractTextFromDOCX(arrayBuffer);
      if (text && text.trim().length > 0) {
        console.log('FileParser: Manual DOCX extraction successful, length:', text.length);
        return text;
      }
    } catch (manualError) {
      console.log('FileParser: Manual extraction failed:', manualError);
    }
    
    // Last resort: Return a message asking user to convert to text
    console.log('FileParser: All DOCX parsing methods failed');
    return `DOCX file uploaded: ${file.name}. Please convert to PDF or TXT format for better analysis, or try uploading a different file format.`;
    
  } catch (error) {
    console.error('FileParser: DOCX parsing error:', error);
    return `DOCX file uploaded: ${file.name}. Please convert to PDF or TXT format for better analysis.`;
  }
}

async function parseDOC(file: File): Promise<string> {
  try {
    console.log('FileParser: Parsing DOC file -', file.name);
    // For .doc files, we'll try to extract as much text as possible
    const arrayBuffer = await file.arrayBuffer();
    
    try {
      // Try mammoth for .doc files (limited support)
      const result = await mammoth.extractRawText({ arrayBuffer });
      if (result.value && result.value.trim().length > 0) {
        console.log('FileParser: DOC text extracted with mammoth, length:', result.value.length);
        return result.value;
      }
    } catch (mammothError) {
      console.log('FileParser: Mammoth failed for DOC, trying fallback:', mammothError);
    }
    
    // Fallback to basic text extraction
    const text = new TextDecoder().decode(arrayBuffer);
    const cleanedText = text.replace(/[^\x20-\x7E]/g, ' ').replace(/\s+/g, ' ').trim();
    
    if (cleanedText && cleanedText.length > 0) {
      console.log('FileParser: DOC text extracted with fallback, length:', cleanedText.length);
      return cleanedText;
    }
    
    return `DOC file uploaded: ${file.name}. Please convert to PDF or TXT format for better analysis.`;
  } catch (error) {
    console.error('FileParser: DOC parsing error:', error);
    return `DOC file uploaded: ${file.name}. Please convert to PDF or TXT format for better analysis.`;
  }
}

async function parseTXT(file: File): Promise<string> {
  try {
    console.log('FileParser: Parsing TXT file -', file.name);
    const text = await file.text();
    console.log('FileParser: TXT text extracted, length:', text.length);
    return text;
  } catch (error) {
    console.error('FileParser: TXT parsing error:', error);
    return `TXT file uploaded: ${file.name}. Please check the file format and try again.`;
  }
}

// Manual DOCX text extraction fallback
async function extractTextFromDOCX(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    // Convert ArrayBuffer to Uint8Array
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Look for text content in the DOCX file
    // DOCX files are ZIP archives containing XML files
    let text = '';
    
    // Simple text extraction from DOCX binary data
    // This is a basic implementation - real DOCX parsing requires ZIP extraction
    for (let i = 0; i < uint8Array.length; i++) {
      const byte = uint8Array[i];
      if (byte >= 32 && byte <= 126) { // Printable ASCII characters
        text += String.fromCharCode(byte);
      } else if (byte === 10 || byte === 13) { // Line breaks
        text += ' ';
      }
    }
    
    // Clean up the extracted text
    text = text
      .replace(/\s+/g, ' ')
      .replace(/[^\x20-\x7E\s]/g, '')
      .trim();
    
    return text;
  } catch (error) {
    console.error('FileParser: Manual DOCX extraction error:', error);
    throw error;
  }
}

// Utility function to validate file type
export function validateFileType(file: File): boolean {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain'
  ];
  
  const allowedExtensions = ['.pdf', '.docx', '.doc', '.txt'];
  const fileName = file.name.toLowerCase();
  
  return allowedTypes.includes(file.type) || 
         allowedExtensions.some(ext => fileName.endsWith(ext));
}

// Utility function to get file size in MB
export function getFileSizeMB(file: File): number {
  return file.size / (1024 * 1024);
}

// Utility function to validate file size (max 10MB)
export function validateFileSize(file: File, maxSizeMB: number = 10): boolean {
  return getFileSizeMB(file) <= maxSizeMB;
}
