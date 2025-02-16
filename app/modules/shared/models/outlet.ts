import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from './supabase'

export interface OutletContext {
  supabase: SupabaseClient<Database>
}
