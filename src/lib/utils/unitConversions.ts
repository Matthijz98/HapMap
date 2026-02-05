// Unit conversion system that supports both metric conversions and custom conversions

export interface UnitConversion {
	from: string;
	to: string;
	ratio: number;
}

// Standard metric conversions
const metricConversions: UnitConversion[] = [
	// Weight
	{ from: 'mg', to: 'g', ratio: 0.001 },
	{ from: 'g', to: 'kg', ratio: 0.001 },
	{ from: 'g', to: 'mg', ratio: 1000 },
	{ from: 'kg', to: 'g', ratio: 1000 },
	{ from: 'kg', to: 'mg', ratio: 1000000 },
	{ from: 'mg', to: 'kg', ratio: 0.000001 },
	
	// Volume
	{ from: 'ml', to: 'l', ratio: 0.001 },
	{ from: 'l', to: 'ml', ratio: 1000 },
	{ from: 'cl', to: 'ml', ratio: 10 },
	{ from: 'cl', to: 'l', ratio: 0.01 },
	{ from: 'ml', to: 'cl', ratio: 0.1 },
	{ from: 'l', to: 'cl', ratio: 100 },
	
	// Custom cooking measurements
	{ from: 'tsp', to: 'ml', ratio: 5 },
	{ from: 'tbsp', to: 'ml', ratio: 15 },
	{ from: 'cup', to: 'ml', ratio: 240 },
];

// Custom conversions for specific items (e.g., 12 cans = 1 tray)
const customConversions: UnitConversion[] = [
	{ from: 'blik', to: 'tray', ratio: 1 / 12 },
	{ from: 'tray', to: 'blik', ratio: 12 },
	{ from: 'can', to: 'tray', ratio: 1 / 12 },
	{ from: 'tray', to: 'can', ratio: 12 },
];

// Combine all conversions
const allConversions = [...metricConversions, ...customConversions];

/**
 * Convert a quantity from one unit to another
 * @param quantity The amount to convert
 * @param fromUnit The unit to convert from
 * @param toUnit The unit to convert to
 * @returns The converted quantity or null if conversion is not possible
 */
export function convertUnit(
	quantity: number,
	fromUnit: string,
	toUnit: string
): number | null {
	if (fromUnit === toUnit) return quantity;

	// Direct conversion
	const directConversion = allConversions.find(
		(c) => c.from.toLowerCase() === fromUnit.toLowerCase() && c.to.toLowerCase() === toUnit.toLowerCase()
	);
	if (directConversion) {
		return quantity * directConversion.ratio;
	}

	// Try to find a path through intermediate units
	// For example, mg -> g -> kg
	for (const intermediate of allConversions) {
		if (intermediate.from.toLowerCase() === fromUnit.toLowerCase()) {
			const result = convertUnit(quantity * intermediate.ratio, intermediate.to, toUnit);
			if (result !== null) return result;
		}
	}

	return null;
}

/**
 * Find the best unit to display a quantity in (e.g., 1000g becomes 1kg)
 * @param quantity The amount
 * @param unit The current unit
 * @returns An object with the converted quantity and unit, or the original if no better unit is found
 */
export function formatToOptimalUnit(
	quantity: number,
	unit: string | null
): { quantity: number; unit: string | null } {
	if (!unit) return { quantity, unit };

	const unitLower = unit.toLowerCase();

	// Weight conversions
	if (unitLower === 'g' || unitLower === 'gram') {
		if (quantity >= 1000) {
			return { quantity: quantity / 1000, unit: 'kg' };
		}
		if (quantity < 1) {
			return { quantity: quantity * 1000, unit: 'mg' };
		}
	}

	if (unitLower === 'kg' || unitLower === 'kilo') {
		if (quantity < 1) {
			return { quantity: quantity * 1000, unit: 'g' };
		}
	}

	if (unitLower === 'mg' || unitLower === 'milligram') {
		if (quantity >= 1000) {
			return { quantity: quantity / 1000, unit: 'g' };
		}
	}

	// Volume conversions
	if (unitLower === 'ml' || unitLower === 'milliliter') {
		if (quantity >= 1000) {
			return { quantity: quantity / 1000, unit: 'l' };
		}
		if (quantity >= 10 && quantity < 1000) {
			return { quantity: quantity / 10, unit: 'cl' };
		}
	}

	if (unitLower === 'l' || unitLower === 'liter') {
		if (quantity < 1) {
			return { quantity: quantity * 1000, unit: 'ml' };
		}
	}

	if (unitLower === 'cl' || unitLower === 'centiliter') {
		if (quantity >= 100) {
			return { quantity: quantity / 100, unit: 'l' };
		}
		if (quantity < 1) {
			return { quantity: quantity * 10, unit: 'ml' };
		}
	}

	// Custom conversions
	if ((unitLower === 'blik' || unitLower === 'can') && quantity >= 12) {
		return { quantity: quantity / 12, unit: 'tray' };
	}

	if (unitLower === 'tray' && quantity < 1) {
		return { quantity: quantity * 12, unit: 'blik' };
	}

	return { quantity, unit };
}

/**
 * Format a quantity with its unit for display
 * @param quantity The amount
 * @param unit The unit
 * @param optimize Whether to convert to the optimal unit
 * @returns A formatted string
 */
export function formatQuantityWithUnit(
	quantity: number,
	unit: string | null,
	optimize: boolean = true
): string {
	if (optimize) {
		const optimized = formatToOptimalUnit(quantity, unit);
		return `${optimized.quantity.toFixed(optimized.quantity % 1 === 0 ? 0 : 1)} ${optimized.unit || ''}`.trim();
	}
	return `${quantity.toFixed(quantity % 1 === 0 ? 0 : 1)} ${unit || ''}`.trim();
}

/**
 * Add a custom unit conversion
 * @param from The unit to convert from
 * @param to The unit to convert to
 * @param ratio The conversion ratio
 */
export function addCustomConversion(from: string, to: string, ratio: number): void {
	customConversions.push({ from, to, ratio });
	// Also add the reverse conversion
	customConversions.push({ from: to, to: from, ratio: 1 / ratio });
}
