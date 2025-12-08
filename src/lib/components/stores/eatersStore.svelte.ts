import "@macfja/svelte-persistent-runes"
import type { AllergyOutSchema } from "../../client/types.gen";

interface AllergyCountMap {
    [allergyName: string]: number;
}

interface EatersStoreData {
    eaters_total: number;
    allergies: AllergyCountMap;
}

class EatersStore {
    private data: EatersStoreData = $persist(
        {
            eaters_total: 10,
            allergies: {}
        },
        'eaters'
    );

    /**
     * Get the total number of eaters
     */
    get totalEaters(): number {
        return this.data.eaters_total;
    }

    /**
     * Set the total number of eaters
     */
    set totalEaters(value: number) {
        this.data.eaters_total = Math.max(0, value);
    }

    /**
     * Get the number of eaters with a specific allergy
     */
    getEatersWithAllergy(allergyName: string): number {
        return this.data.allergies[allergyName] ?? 0;
    }

    /**
     * Set the number of eaters with a specific allergy
     */
    setEatersWithAllergy(allergyName: string, count: number): void {
        this.data.allergies[allergyName] = Math.max(0, Math.min(count, this.data.eaters_total));
    }

    /**
     * Increment or decrement the number of eaters with a specific allergy
     */
    updateEatersWithAllergy(allergyName: string, change: number): void {
        const currentCount = this.getEatersWithAllergy(allergyName);
        this.setEatersWithAllergy(allergyName, currentCount + change);
    }

    /**
     * Get the number of eaters that have any of the specified allergies
     */
    getEatersWithAnyAllergy(allergies: AllergyOutSchema[] | undefined): number {
        if (!allergies || allergies.length === 0) {
            return 0;
        }

        // Get the maximum count among all allergies (assuming worst case)
        let maxCount = 0;
        for (const allergy of allergies) {
            const count = this.getEatersWithAllergy(allergy.name);
            if (count > maxCount) {
                maxCount = count;
            }
        }
        return maxCount;
    }

    /**
     * Get the number of eaters without any of the specified allergies
     */
    getEatersWithoutAllergies(allergies: AllergyOutSchema[] | undefined): number {
        const eatersWithAllergies = this.getEatersWithAnyAllergy(allergies);
        return Math.max(0, this.data.eaters_total - eatersWithAllergies);
    }

    /**
     * Calculate the total quantity needed for all eaters
     */
    calculateTotalQuantity(quantityPerPerson: number): number {
        return quantityPerPerson * this.data.eaters_total;
    }

    /**
     * Calculate the quantity needed for eaters with a specific allergy
     */
    calculateQuantityForAllergy(quantityPerPerson: number, allergyName: string): number {
        const eatersCount = this.getEatersWithAllergy(allergyName);
        return quantityPerPerson * eatersCount;
    }

    /**
     * Calculate the quantity needed for eaters without any of the specified allergies
     */
    calculateQuantityForNonAllergic(
        quantityPerPerson: number,
        allergies: AllergyOutSchema[] | undefined
    ): number {
        const eatersCount = this.getEatersWithoutAllergies(allergies);
        return quantityPerPerson * eatersCount;
    }

    /**
     * Get all allergies that have at least one eater
     */
    getActiveAllergies(): string[] {
        return Object.entries(this.data.allergies)
            .filter(([, count]) => count > 0)
            .map(([name]) => name);
    }

    /**
     * Reset all allergy counts to 0
     */
    resetAllergies(): void {
        this.data.allergies = {};
    }

    /**
     * Reset everything to default values
     */
    reset(): void {
        this.data.eaters_total = 10;
        this.data.allergies = {};
    }
}

export const eatersStore = new EatersStore();