<script lang="ts">
    import { Globe, MapPin } from 'lucide-svelte';
  
    const stockists = [
      {
        name: 'Wild Carrot Herbals',
        displayAddress: ['112 W Main St.', 'Enterprise, OR 97828'],
        mapQuery: '112 W Main St, Enterprise, OR 97828',
        url: 'https://www.wildcarrotherbals.com/',
      },
      {
        name: 'Josephy Center',
        displayAddress: ['403 Main St.', 'Joseph, OR 97846'],
        mapQuery: '403 Main St, Joseph, OR 97846',
        url: 'https://josephy.org/',
      },
      {
        name: 'Moonlight Graphics',
        displayAddress: ['102 North Main Street', 'Joseph, OR 97846'],
        mapQuery: '102 North Main Street, Joseph, OR 97846',
        url: 'https://moonlightscreenprint.square.site/',
      },
    ];
  
    function createMapLink(query: string): string {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    }
  </script>
  
  <section class="flex flex-grow flex-col bg-stone-50">
    <div class="flex-grow px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div class="mx-auto max-w-4xl">
        <h1 class="mb-10 text-center text-3xl font-bold text-stone-800 md:mb-12 md:text-4xl">
          Stockists
        </h1>
  
        <div class="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {#each stockists as stockist}
            <div class="flex h-full flex-col rounded-xl border border-stone-200 bg-white p-6">
              <h2 class="mb-4 text-xl font-semibold text-stone-800">
                {stockist.name}
              </h2>
  
              {#if stockist.url}
                <a
                  href={stockist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-auto mb-5 inline-flex items-center space-x-2 text-sm text-stone-600 transition-colors duration-200 hover:text-stone-900 hover:underline"
                >
                  <Globe size={16} class="flex-shrink-0" />
                  <span>Visit Website</span>
                </a>
              {/if}
  
              <div class="mt-auto flex items-center space-x-2 border-t border-stone-100 pt-4">
                <a
                  href={createMapLink(stockist.mapQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 text-stone-500 transition-colors duration-200 hover:text-stone-800"
                  aria-label="Get directions to {stockist.name}"
                  title="Get Directions"
                >
                  <MapPin size={18} />
                  <address class="text-sm leading-relaxed text-stone-600 not-italic">
                    {#each stockist.displayAddress as line}
                      <span>{line}</span><br />
                    {/each}
                  </address>
                </a>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>
  