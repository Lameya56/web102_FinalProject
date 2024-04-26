import { createClient } from '@supabase/supabase-js'
const supabaseURL = "https://sndjxqxgejubkwazovpw.supabase.co"
const API_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZGp4cXhnZWp1Ymt3YXpvdnB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5Mzg1NDEsImV4cCI6MjAyODUxNDU0MX0.IsxXhAY2YXA9dXOS_uqsZEn6JKFnElckWu_SX6xcwds"
export const supabase = createClient(supabaseURL, API_key)