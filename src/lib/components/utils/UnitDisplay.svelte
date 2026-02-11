<script lang="ts">
	import { formatQuantityWithUnit } from '$lib/utils/units';

	interface Props {
		quantity: number;
		unit: string | null;
	}

	let { quantity, unit }: Props = $props();

</script>

<span class="font-medium">{formatQuantityWithUnit(quantity, unit, true)}</span>
