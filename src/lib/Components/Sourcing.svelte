<script lang="ts">
	import sourcingImage1 from '$lib/pics/sourcing/lilac.jpg?enhanced';
	import sourcingImage2 from '$lib/pics/sourcing/oils.jpg?enhanced';
	import sourcingImage3 from '$lib/pics/sourcing/yarrow.jpg?enhanced';

	const sources = [
		{
			title: 'Pure Essential Oils',
			description:
				'Organic, 100% natural essential oils from Eden Botanicals (since 1985), who prioritize quality, farmers, climate, and soil health.'
		},
		{
			title: 'Tussah Silk',
			description:
				'Sourced via Living Dreams Yarn, a family-owned, green company passionate about fibers and empowering women artists and farmers.'
		},
		{
			title: 'Botanicals & Teas',
			description:
				'Grown, sustainably wild-harvested, or sourced organically and chemical-free from Mountain Rose Herbs and trusted local gardens.'
		},
		{
			title: 'Clays, Charcoal & Indigo',
			description:
				'Natural clays and powdered additives from From Nature With Love (since 1997), providing quality ingredients from around the world.'
		},
		{
			title: 'Oils & Butters',
			description:
				'Hand-crafted, organic, fair-trade cocoa & shea butter from Baraka Impact (Ghana), supporting women, farmers, and community. Other oils are organic, cold-pressed, extra virgin via Soapers Choice.'
		},
		{
			title: 'Lard, Tallow & Beeswax',
			description:
				'Beautiful fats hand-rendered from Square Mile Ranch (local) and beeswax from my own hives, reflecting a shared passion for animals, soil health, and community.'
		}
	];
</script>

<section
	class="bg-gradient-to-br from-emerald-50 via-lime-50 to-yellow-50 px-6 py-16 md:px-12 md:py-24"
	id="sourcing"
>
	<div class="container mx-auto flex flex-col items-center w-full">
		<div class="mx-auto mb-12 max-w-3xl text-center md:mb-16 space-y-4">
			<h2 class="mb-5 text-2xl leading-tight font-bold text-emerald-800 md:text-3xl lg:text-4xl">
				Our Sourcing Philosophy
			</h2>
			<p class="text-base leading-relaxed text-emerald-700 md:text-lg text-left">
				My sourcing philosophy centers on the well-being of both you and Mother Earth. With intense
				passion, I select every ingredient thoughtfully, starting with botanicals grown, sustainably
				wild-harvested, or purchased at peak ripeness.
			</p>
			<p class="text-base leading-relaxed text-emerald-800 md:text-lg text-left">
				These plant allies are infused into high-quality, fair-trade, organic oils and butters. The
				final creations – artful soaps, bath treats, salves, and more – blend these potent infusions
				with natural clays, roots, silks, micas, and pure essential oils.
			</p>
		</div>

		<div class="mb-16 grid grid-cols-1 gap-6 md:mb-20 md:grid-cols-3 md:gap-8">
			<enhanced:img
				src={sourcingImage1}
				alt="Sourcing example 1: Close up of lilac flowers"
				class="aspect-square h-auto w-full rounded-xl object-cover shadow-lg"
			/>
			<enhanced:img
				src={sourcingImage2}
				alt="Sourcing example 2: Bottles of infused oils"
				class="aspect-square h-auto w-full rounded-xl object-cover shadow-lg"
			/>
			<enhanced:img
				src={sourcingImage3}
				alt="Sourcing example 3: Dried yarrow bundles"
				class="aspect-square h-auto w-full rounded-xl object-cover shadow-lg"
			/>
		</div>

		<div class="max-w-5xl">
			<h3 class="mb-10 text-center text-2xl font-semibold text-emerald-800 md:mb-12 md:text-3xl">
				Where Our Ingredients Come From
			</h3>
			<div class="grid grid-cols-1 gap-x-8 gap-y-3 md:gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
				{#each sources as source}
					<div class="rounded-lg border border-emerald-100/80 bg-white/60 p-6 shadow">
						<h4 class="mb-2 text-xl font-semibold text-emerald-700">
							{source.title}
						</h4>
						<p class="text-sm leading-snug text-emerald-600">
							{source.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
