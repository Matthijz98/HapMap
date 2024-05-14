import EaterInput from "./EaterInput.tsx";
import {useStore} from "@nanostores/react";
import {eaters, updateAllergies} from '../stores/eatersStore';

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
                <div>Eaters</div>
                <input value={$eaters} onChange={handleInputChange}/>
                {allergies.allergies.map(allergy => (
                    <EaterInput allergy={allergy} key={allergy}/>
                ))}
            </div>
        </div>
    );
}