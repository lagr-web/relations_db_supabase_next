//src/components/UploadModal.tsx
"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getAllData } from "@/components/countryData";


type City = {
    id: number;
    name: string;
};

type Country = {
    id: number;
    name: string;
    cities: City[];
};


const UploadModal = (props: { show: boolean }) => {

    const [country, setCountry] = useState<string>("");
    const [allData, setAllData] = useState<Country[] | null>(null);
    const [dataById, getDataById] = useState<any>(null);
    const [city, setCity] = useState<string>("");


    useEffect(() => {

        (async () => {
            try {

                const data: any = await getAllData();
                setAllData(data);

            } catch (error) {

                console.error("Error fetching data:", error);
            }

        })()

    }, [])


    const getCities = async (e: ChangeEvent<HTMLSelectElement>) => {

        const selectBox = document.querySelector("#mySelectModal") as HTMLSelectElement;

        setCountry(selectBox.value);

        const selectedValue = selectBox.value;

        console.log(selectedValue);

        try {
            const res = await fetch(`http://localhost:3000/api/countries/${selectedValue}`);

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await res.json();
            console.log(data);

            getDataById(data.country[0].cities);



        } catch (error) {
            console.error('Error fetching data:', error);
            // You can display an error message to the user here
        }

    }

    const doUpload = () => {

        console.log('do');
    }


    if (!props.show) return null;

    return (

        <section className="grid justify-center mt-20 z-53 absolute inset-x-0">

            <div className="shadow-md w-96">
                <div className="bg-black text-white p-1 font-bold">Upload et billede</div>

                <form>
                    <div>
                        <select
                            className="mSelect"
                            value={country}
                            id="mySelectModal"
                            onChange={getCities}
                        >

                            <option value="" disabled>Vælg et land</option>

                            {allData &&

                                allData.map((country: Country, index: number) => (
                                    <option
                                        key={country.id}
                                        value={country.id}>
                                        {country.name}
                                    </option>
                                ))
                            }

                        </select>

                        <div className="mb-2">

                            <select
                                className="mSelect"
                                value={city}
                                id="mySelectCityModal"
                                onChange={(e) => setCity(e.target.value)}
                            >

                                <option value="" disabled>Vælg en by</option>
                                {dataById &&

                                    dataById.sort((a: City, b: City) => a.name.localeCompare(b.name))
                                        .map((city: City, index: number) => (

                                            <option
                                                key={city.id}
                                                value={city.id}
                                            >
                                                {city.name}
                                            </option>
                                        ))

                                }

                            </select>
                        </div>

                    </div>
                    
                    <div className="flex justify-start m-4">
                        <button type="submit"
                            className="
                        rounded-md
                      bg-black 
                        w-40
                      text-white
                        font-bold 
                    ">
                            Upload et billede
                        </button>

                    </div>
                </form>

            </div>
        </section>


    )
}

export default UploadModal;