import { createClient } from "@supabase/supabase-js";
const PROYECT_URL= 'https://iyfkadraaajbvovcahxw.supabase.co'
const API_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5ZmthZHJhYWFqYnZvdmNhaHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNjMxMjYsImV4cCI6MjA2MjYzOTEyNn0.HfBpEgvWp4CkbdxyV24cKV3MZn9mfPxA7mT9UZuhJhg'

export const supabase = createClient(PROYECT_URL,API_KEY)