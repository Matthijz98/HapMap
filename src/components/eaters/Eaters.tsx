import { useStore } from '@nanostores/react';
import { persons } from '../stores/eatersStore';

export default function Eaters(){
    const allergies = useStore(persons);

    return (
        <div className={'bg-slate-200 rounded p-2 mb-2'}>
            <div className={'flex gap-4'}>
                <div>Eaters</div>
                {Object.keys(allergies).map(allergy => (
                    <div key={allergy}>
                        <label>{allergy}</label>
                        <input type={'number'} className={'w-full'} />
                    </div>
                ))}
            </div>
        </div>
    );
}