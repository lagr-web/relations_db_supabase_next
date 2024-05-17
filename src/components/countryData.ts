//src/components/countryData.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export const getAllData = async () => {

    const { data, error } = await supabase.from('countries').select(`
      id,
      name,
      cities (
        id,
        name
      )
    `)
    if (error) throw error

    return(data)

}