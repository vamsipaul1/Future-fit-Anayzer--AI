// Environment configuration for FutureFit
// Copy this file to .env.local and update with your actual values

export const envConfig = {
  // Supabase Configuration
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here',
  
  // Development mode
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Default Supabase configuration for demo purposes
export const defaultSupabaseConfig = {
  url: 'https://demo.supabase.co',
  anonKey: 'demo-key',
};

