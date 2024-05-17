//src/app/page.tsx

import { QueryData, createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/database.types";

type City = {
  id: number;
  name: string;
};

type Country = {
  id: number;
  name: string;
  cities: City[];
};


export default async function Home() {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const { data, error } = await supabase.from('countries').select(`
  id,
  name,
  cities (
    id,
    name
  )
`)
  if (error) throw error


  //console.log(countriesWithCities);


  return (

    <>

      {data &&

        data.map((country: Country, index: number) => (

          <div key={index}> {/* Don't forget to add a unique key */}

            <div className="font-bold">{country.name}</div>

         {/* Start nested loop */}

            {country.cities.length > 0 &&

              country.cities.map((city: City, cityIndex: number) => (

                <div key={city.id}>
                  {city.name}
                </div>

              )) // END loop

            }

          {/* Slut nested loop */}


          </div>
        ))
      }


    </>

  );
}



