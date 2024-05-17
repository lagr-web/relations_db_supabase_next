//src/components/Modal.tsx

import { FormEvent, useState } from "react";

type data = {
    show: boolean;
};

const Modal = (props: data) => {

    const [country, setCountry] = useState<string>('');

    if (!props.show) return null;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        console.log("POST the posted POST post");

        e.preventDefault();

        const submitData = { country }

    
        try {

            const res = await fetch('http://localhost:3000/api/countries/add', {
                method: 'POST',
                body: JSON.stringify(submitData),
                headers: {
                    'content-type': 'application/json'
                }
            })

            console.log(res);
            res.ok ? console.log("ok") : console.log("not ok")



        } catch (error) {

            console.log(error);
        }

        console.log('alllll');

    }

    return (

        <>
            <section className="grid place-items-center mt-20 z-50">
                <div className="shadow-md w-96">
                    <div className="bg-black text-white p-1 font-bold">opret et land</div>
                    <div>
                        <form onSubmit={handleSubmit}>

                            <div className="m-2">

                                <input
                                    className="border-2 border-gray-200 rounded-md text-sm p-1"
                                    type="text"
                                    name="country"
                                    placeholder="indtast et land"
                                    onChange={e => setCountry(e.target.value)}
                                />

                            </div>
                            <div className="flex justify-end m-2">
                                <button
                                    type="submit"
                                    className="
                                rounded-md
                              bg-black w-20
                              text-white
                                font-bold ">
                                    opret
                                </button>
                            </div>
                        </form>

                    </div>

                </div>
            </section>
        </>

    )
}
export default Modal;