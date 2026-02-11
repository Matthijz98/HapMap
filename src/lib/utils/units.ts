// Unit types accepted by the backend
export type BackendUnit = 'gr' | 'ml' | 'pieces' | 'cloves' | 'head';

// Unit configuration with Dutch translations and conversion rules
export interface UnitConfig {
	backend: BackendUnit;
	dutchSingular: string;
	dutchPlural: string;
	convertibleTo?: {
		unit: string;
		dutchSingular: string;
		dutchPlural: string;
		threshold: number; // minimum amount to convert
		factor: number; // multiply by this to convert
	};
}

export const unitConfigs: Record<BackendUnit, UnitConfig> = {
	gr: {
		backend: 'gr',
		dutchSingular: 'gram',
		dutchPlural: 'gram',
		convertibleTo: {
			unit: 'kilo',
			dutchSingular: 'kilo',
			dutchPlural: 'kilo',
			threshold: 1000,
			factor: 0.001
		}
	},
	ml: {
		backend: 'ml',
		dutchSingular: 'milliliter',
		dutchPlural: 'milliliter',
		convertibleTo: {
			unit: 'liter',
			dutchSingular: 'liter',
			dutchPlural: 'liter',
			threshold: 1000,
			factor: 0.001
		}
	},
	pieces: {
		backend: 'pieces',
		dutchSingular: 'stuk',
		dutchPlural: 'stuks'
	},
	cloves: {
		backend: 'cloves',
		dutchSingular: 'teen',
		dutchPlural: 'tenen'
	},
	head: {
		backend: 'head',
		dutchSingular: 'krop',
		dutchPlural: 'kroppen'
	}
};

/**
 * Convert backend unit to Dutch display string
 */
export function unitToDutch(unit: string | null | undefined, quantity?: number): string {
	if (!unit) return '';

	const config = unitConfigs[unit as BackendUnit];
	if (!config) return unit;

	// Use plural if quantity is not 1
	if (quantity !== undefined && quantity !== 1) {
		return config.dutchPlural;
	}

	return config.dutchSingular;
}

/**
 * Format quantity with unit, applying conversion rules if needed
 */
export function formatQuantityWithUnit(
	quantity: number | null | undefined,
	unit: string | null | undefined,
	autoConvert: boolean = true
): string {
	if (quantity === null || quantity === undefined) return '';
	if (!unit) return quantity.toString();

	const config = unitConfigs[unit as BackendUnit];
	if (!config) return `${quantity} ${unit}`;

	// Check if we should convert to larger unit
	if (autoConvert && config.convertibleTo) {
		const { threshold, factor, dutchSingular, dutchPlural } = config.convertibleTo;

		// Only convert if it results in a round number or near-round number
		if (quantity >= threshold) {
			const converted = quantity * factor;
			const rounded = Math.round(converted);

			// Use conversion if difference is less than 0.5%
			if (Math.abs(converted - rounded) / converted < 0.005) {
				const unitName = rounded === 1 ? dutchSingular : dutchPlural;
				return `${rounded} ${unitName}`;
			}
		}
	}

	// Use base unit
	const unitName = quantity === 1 ? config.dutchSingular : config.dutchPlural;

	// Format quantity nicely
	const formattedQuantity = quantity % 1 === 0 ? quantity.toString() : quantity.toFixed(2).replace(/\.?0+$/, '');

	return `${formattedQuantity} ${unitName}`;
}

/**
 * Get unit options for admin dropdown
 * Returns array with { value: backend_unit, label: dutch_name }
 */
export function getUnitOptions(): Array<{ value: BackendUnit; label: string }> {
	return Object.entries(unitConfigs).map(([key, config]) => ({
		value: key as BackendUnit,
		label: config.dutchPlural
	}));
}

/**
 * Convert a quantity from one unit to another (for display purposes)
 */
export function convertUnit(
	quantity: number,
	fromUnit: string,
	toUnit: string
): number | null {
	const fromConfig = unitConfigs[fromUnit as BackendUnit];
	if (!fromConfig || !fromConfig.convertibleTo) return null;

	// Check if conversion is valid
	if (toUnit === fromConfig.convertibleTo.unit) {
		return quantity * fromConfig.convertibleTo.factor;
	}

	// Reverse conversion (e.g., kilo to gram)
	if (fromUnit === fromConfig.convertibleTo.unit) {
		return quantity / fromConfig.convertibleTo.factor;
	}

	return null;
}

/**
 * Validate if a unit string is valid
 */
export function isValidUnit(unit: string): unit is BackendUnit {
	return unit in unitConfigs;
}

/**
 * Get the backend unit value from Dutch name (for reverse lookup if needed)
 */
export function dutchToUnit(dutchName: string): BackendUnit | null {
	for (const [key, config] of Object.entries(unitConfigs)) {
		if (
			config.dutchSingular.toLowerCase() === dutchName.toLowerCase() ||
			config.dutchPlural.toLowerCase() === dutchName.toLowerCase()
		) {
			return key as BackendUnit;
		}
	}
	return null;
}
