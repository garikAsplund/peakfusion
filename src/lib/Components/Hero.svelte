<script lang="ts">
    // Assuming enhanced:img setup is correct
    // import heroImageSrc from '$lib/assets/hero.jpg?enhanced'; // Preferred
  </script>
  
  <section
    class="flex flex-col items-center md:max-h-[50vh] overflow-hidden gap-8 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 md:px-6 md:pt-12 pb-16 md:flex-row md:gap-12 md:px-12 md:py-20"
  >
    <!-- Text Content (Order 2 on Mobile, 1 on Desktop) -->
    <div class="w-full md:w-1/2 order-2 md:order-1 flex justify-center md:justify-end">
      <div class="w-full max-w-xl space-y-6 text-center md:text-left">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight font-[Rampart_One]"
        >
          Handmade Soaps
        </h1>
        <p class="text-lg md:text-xl text-amber-700 md:ml-6">
          Crafted in the spirit of
          <span class="font-semibold italic text-amber-800">love, art, and herbalism</span>.
        </p>
        <div class="md:ml-12">
          <a
            href="/shop"
            class="inline-block transform rounded-md bg-amber-600 px-8 py-3 text-lg font-semibold text-white shadow-md transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-amber-700"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  
    <!-- Image (Order 1 on Mobile, 2 on Desktop) -->
    <div class="w-full md:w-1/2 order-1 md:order-2">
      <enhanced:img
        src="/static/pics/hero.jpg"
        alt="Artistically arranged handmade soap bars"
        class="w-full md:h-auto object-cover shadow-xl max-h-[40vh] md:max-h-full"
      />
    </div>
  </section>
  