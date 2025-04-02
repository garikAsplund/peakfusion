<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="relative flex h-full w-full flex-col items-center justify-center">
	<h1 class="mt-16 text-5xl text-black">{page.status}: {page.error?.message}</h1>
</div>
