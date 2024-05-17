// src/app/api/countries/add/route.ts

import { NextResponse, NextRequest } from "next/server";
import { createClient } from '@supabase/supabase-js';


const supabase = createClient(

    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

)

export const POST = async (req: NextRequest) => {

    const data = await req.json();

    console.log(data);

    const { error } = await supabase
        .from('countries')
        .insert({ name: data.country })

    return NextResponse.json(data);

} 