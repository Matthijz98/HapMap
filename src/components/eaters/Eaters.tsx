import { useStore } from '@nanostores/react';
import { persons } from '../stores/eatersStore';
import EaterInput from "./EaterInput.tsx";

export default function Eaters(allergies: any){
    return (
        <div className={'bg-slate-200 rounded p-2 mb-2'}>
            <div className={'flex flex-col gap-4'}>
                <div>Eaters</div>

                {allergies.allergies.map(allergy => (
                    <EaterInput allergy={allergy} key={allergy}/>
                ))}
            </div>
        </div>
    );
}