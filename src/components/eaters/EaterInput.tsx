import { updateAllergies, allergies } from '../stores/eatersStore';
import {useStore} from "@nanostores/react";

export default function EaterInput({allergy}: any) {
    const $value = useStore(allergies);

    const handleButtonClick = (increment: number) => {
        updateAllergies(allergy, ($value[allergy.name] + increment));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue)) {
            updateAllergies(allergy, newValue);
        }
    };

    return (
        <div className={'flex'}>
            <label className={'pr-2'}>{allergy.name}</label>
            <button onClick={() => handleButtonClick(-1)} className={'bg-blue-300 hover:bg-blue-400 hover:text-white px-2 rounded-l font-medium'}>-</button>
            <input type={'number'} value={$value[allergy.name]} onChange={handleInputChange} className={'w-full px-1 py-0.5'}/>
            <button onClick={() => handleButtonClick(1)} className={'bg-blue-300 hover:bg-blue-400 hover:text-white px-2 rounded-r font-medium'}>+</button>
        </div>
    );
}