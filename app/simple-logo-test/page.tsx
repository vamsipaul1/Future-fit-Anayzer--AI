'use client';

import React from 'react';

export default function SimpleLogoTest() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Logo Test</h1>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Dynamic Path Test:</h2>
        <img 
          src={`${typeof window !== 'undefined' ? window.location.origin : ''}/images/even.png`}
          alt="even.png" 
          className="w-16 h-16 object-contain border"
          onError={(e) => console.error('Dynamic path failed to load')}
          onLoad={() => console.log('Dynamic path loaded successfully')}
        />
      </div>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Alternative Path Test:</h2>
        <img 
          src="./images/even.png" 
          alt="even.png" 
          className="w-16 h-16 object-contain border"
          onError={(e) => console.error('Alternative path failed to load')}
          onLoad={() => console.log('Alternative path loaded successfully')}
        />
      </div>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Relative Path Test:</h2>
        <img 
          src="images/even.png" 
          alt="even.png" 
          className="w-16 h-16 object-contain border"
          onError={(e) => console.error('Relative path failed to load')}
          onLoad={() => console.log('Relative path loaded successfully')}
        />
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <p className="text-sm">Check browser console for loading messages</p>
        <p className="text-sm">If all images fail, there's a server or path issue</p>
      </div>
    </div>
  );
}
