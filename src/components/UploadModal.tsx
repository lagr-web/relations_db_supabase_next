//src/components/UploadModal.tsx
"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getAllData } from "@/components/countryData";
import { createClient } from '@supabase/supabase-js';

import Compressor from "compressorjs";

type City = {
    id: number;
    name: string;
};

type Country = {
    id: number;
    name: string;
    cities: City[];
};

const supabase = createClient(

    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

)


const UploadModal = (props: { show: boolean }) => {

    const [country, setCountry] = useState<string>("");
    const [allData, setAllData] = useState<Country[] | null>(null);
    const [dataById, getDataById] = useState<any>(null);
    const [city, setCity] = useState<string>("");

    const [file, setFile] = useState<File | null>(null);



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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files.length > 0) {

            console.log(e.target.files);

            setFile(e.target.files[0]);

        }
    };


    const getCities = async (e: ChangeEvent<HTMLSelectElement>) => {

        setCity('');
        getDataById(null);

        const selectCityBox = document.querySelector("#mySelectCityModal") as HTMLSelectElement;
        selectCityBox.selectedIndex = 0;

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


    const handleUpload = async (e: FormEvent) => {

        e.preventDefault();


        if (!file) {
            alert('Come on ... select a file first.');
            return;
        }

        const time = new Date().getTime();
        const fileName = `${"myimage"}-${time}.jpg`;

        new Compressor(file, {
            quality: 0.1,
            convertTypes: ['image/jpeg', 'image/png'],
            convertSize: 10000,
            success: async function (result) {

                const submitData = { fileName, city }

                console.log(submitData);


                const { data, error } = await supabase.storage

                    .from('images')
                    .upload(`${fileName}`, result, {
                        cacheControl: '3600',
                        upsert: false,
                    });

                if (error) {
                    console.error('Error uploading file:', error.message);
                } else {

                    console.log('File uploaded successfully:', data);

                    const res = await fetch('http://localhost:3000/api/city/images', {
                        method: 'POST',
                        body: JSON.stringify(submitData),
                        headers: {
                            'content-type': 'application/json'
                        }
                    })

                }




            },
            error(err) {
                console.log(err.message);
            },
        });



    };


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
                                                value={city.name}
                                            >
                                                {city.name}
                                            </option>
                                        ))

                                }

                            </select>
                        </div>

                    </div>

                    <div className="buttonContainer">
                        <div className="p-2">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="fileinput"
                                id="file_input"
                            />
                        </div>
                        <div className="p-2 grid justify-end">
                            <button
                                onClick={handleUpload}
                                className="
                                   rounded-md
                                 bg-black 
                                   w-40
                                 text-white
                                   font-bold 
                                   py-2"
                            >
                                Upload billede
                            </button>
                        </div>

                    </div>
                </form>

            </div>

        </section>


    )
}

export default UploadModal;