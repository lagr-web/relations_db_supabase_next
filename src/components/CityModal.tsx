//src/components/CityModal.tsx
"use client";

import { FormEvent, useRef, useState } from "react";

type City = {
    id: number;
    name: string;
};

type Country = {
    id: number;
    name: string;
    cities: City[];
};


const CityModal = (props: { show: boolean; countries: Country[] }) => {

    const [country, setCountry] = useState<string>("");
    const [city, setCity] = useState<string>("");

    const [cityExist, setCityExist] = useState<Boolean | null>(null);

    //let cityExistRef = useRef<HTMLDivElement | null>(null); 

    if (!props.show) return null;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const submitData = { country, city }
        // const submitData = { countryId: country, city };

        console.log(submitData);

  
        const selectBox = document.querySelector("#mySelect") as HTMLSelectElement;
        const selectedValue = selectBox.value;

        // Check if a value is selected
        if (selectedValue == "") {
            alert("Please select an option from the dropdown.");
            return false; // Prevent form submission
        }

        try {

            const res = await fetch('http://localhost:3000/api/city/add', {
                method: 'POST',
                body: JSON.stringify(submitData),
                headers: {
                    'content-type': 'application/json'
                }
            })


            if (res.ok) {

                setCityExist(false);

                console.log("Byen er nu tilføjet");


            } else if (res.status === 409) {

                console.log("Dine data eksistere allerede");

                setCityExist(true);

            } else {
                console.log("Server error");
            }


        } catch (error) {

            console.log(error);
        }


    }

    return (

        <section className="grid justify-center mt-20 z-53 absolute inset-x-0">

            <div className="shadow-md w-96">

                <div className="bg-black text-white p-1 font-bold">opret en by</div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <select
                            className="mSelect"
                            name="country"
                            value={country}
                            id="mySelect"
                            onChange={(e) => setCountry(e.target.value)}
                            
                            >
                            <option value="" disabled>Vælg et land</option>

                            {props.countries &&
                                props.countries.map((country: Country) => (
                                    <option
                                        key={country.id}
                                        value={country.name}

                                    >
                                        {country.name}
                                    </option>
                                ))
                            }

                        </select>
                    </div>

                    <div className="m-2">

                        <input
                            className="border-2 border-gray-200 rounded-md text-sm p-2 w-full"
                            type="text"
                            name="country"
                            placeholder="indtast en by"
                            onChange={e => setCity(e.target.value)}
                      
                        />

                    </div>

                    <div className="flex justify-end m-2">
                        <button type="submit"
                            className="
                        rounded-md
                      bg-black 
                        w-32
                      text-white
                        font-bold 
                    ">
                            opret en by
                        </button>
                    </div>

                </form>

                {cityExist !== null && (
                        <div className="p-2">
                            {cityExist ? "Byen er allerede oprettet" : "Byen er nu tilføjet"}
                        </div>
                    )}

            </div>

        </section>



    )
}

export default CityModal;