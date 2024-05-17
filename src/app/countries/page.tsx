//src/app/coutries/page.tsx

"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { getAllData } from "@/components/countryData";
import Modal from "@/components/Modal";
import CityModal from "@/components/CityModal";
import UploadModal from "@/components/UploadModal";

type City = {
    id: number;
    name: string;
};

type Country = {
    id: number;
    name: string;
    cities: City[];
};

const page = () => {

    const [country, setCountry] = useState<string>("");
    const [allData, setAllData] = useState<Country[] | null>(null);
    const [dataById, getDataById] = useState<any>(null);
    const [showModal, setShowModal] = useState<boolean>(false);//false from start
    const [showCityModal, setShowCityModal] = useState<boolean>(false);//false from start
    const [showImageModal, setShowImageModal] = useState<boolean>(true);//false from start

    const openModal = () => showModal ? setShowModal(false) : setShowModal(true);

    const openCityModal = () => showCityModal ? setShowCityModal(false) : setShowCityModal(true);

    const openImageModal = () => showImageModal ? setShowImageModal(false) : setShowImageModal(true);

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

    const getCountries = async (e: ChangeEvent<HTMLSelectElement>) => {

        const selectBox = document.querySelector("#mySelect") as HTMLSelectElement;

        setCountry(selectBox.value);

        const selectedValue = selectBox.value;

        try {
            const res = await fetch(`http://localhost:3000/api/countries/${selectedValue}`);

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await res.json();

            getDataById(data.country[0].cities);


        } catch (error) {
            console.error('Error fetching data:', error);
            // You can display an error message to the user here
        }

        console.log("Selected option: " + selectedValue);

    }// end function getCountries


    return (

        <>
            <header>
                <div className="grid grid-cols-3 gap-4 p-2 bg-black text-white">
                    <div className="col-span-2">Lande</div>
                    <div id="shit" className="grid grid-cols-3 w-96 justify-self-end">
                        <button onClick={openModal}>Opret et land</button>
                        <button onClick={openCityModal}>Opret en by</button>
                        <button onClick={openImageModal}>Upload et billede</button>
                    </div>
                </div>
            </header>

            <nav>

                <select className="mSelect" value={country} id="mySelect" onChange={getCountries}>
                    <option value="" disabled>Vælg et land</option>

                    {allData &&

                        allData.map((country: Country) => (
                            <option key={country.id} value={country.id}>{country.name}</option>
                        ))
                    }

                </select>
            </nav>

            <section className="m-2 z-10 absolute">

                {dataById &&

                    dataById.map((city: City, index: number) => (

                        <div key={city.id}>{city.name}</div>

                    ))

                }

            </section>

            <Modal show={showModal} />

            {allData && <CityModal show={showCityModal} countries={allData} />}

            {allData && <UploadModal show={showImageModal} />}

        </>
    )

}

export default page;