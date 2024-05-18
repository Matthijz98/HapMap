import EaterInput from "./EaterInput.tsx";
import {useStore} from "@nanostores/react";
import {eaters, updateAllergies} from '../stores/eatersStore';
import type {AllergyType} from "../../content/config.ts";

export default function Eaters(allergies: any){
    const $eaters = useStore(eaters);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue)) {
            eaters.set(newValue);
        }
    };

    return (
        <div className={'bg-slate-200 rounded p-2 mb-4'}>
            <div className={'flex flex-col gap-4'}>
                <div className={'flex gap-4'}>
                    <label className={'text-nowrap'}>Aantal eeters:</label>
                    <input className={"w-full rounded px-1 py-0.5"} value={$eaters} onChange={handleInputChange}/>
                </div>

                {allergies.allergies.map((allergy: AllergyType) => (
                    <EaterInput allergy={allergy} key={allergy}/>
                ))}
            </div>
        </div>
    );
}