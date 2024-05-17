//src/app/api/countries/[id]/routes.ts

import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

type RouteParams = {
    params: {
        id: string;
    };
};

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const GET = async (req: NextRequest, route: RouteParams) => {

    const countryid: string = route.params.id;

    // Initialize Supabase client
 
    let { data: countriesWithCities, error } = await supabase
        .from('countries')
        .select('*, cities(id, name)')
        .eq('id', countryid)

    if (error) {
        return NextResponse.json({ error: 'Error fetching data' });
    }

    // Check if countriesWithCities is null (i.e., country not found)
    if (!countriesWithCities) {
        return NextResponse.json({ error: 'Country not found' });
    }

    // Return data
    return NextResponse.json({ country: countriesWithCities });
};
