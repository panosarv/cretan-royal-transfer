<template>
  <div class="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50" id="services">
    <div class="max-w-7xl mx-auto">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-stone-900 sm:text-4xl">
          Our Safari Experiences
        </h2>
        <p class="mt-4 text-lg text-stone-600">
          Choose from our carefully crafted safari adventures
        </p>
      </div>

      <div class="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <!-- Mountain Safari -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-stone-200">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3"
            alt="Mountain Safari"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-stone-900 mb-2">Mountain Safari</h3>
            <p class="text-stone-600 mb-4">Explore Crete's majestic mountains and hidden valleys in our specialized 4x4 vehicles.</p>
            <ul class="text-stone-500 mb-4">
              <li class="flex items-center">
                <svg class="h-5 w-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                4-hour adventure
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Professional guide
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Lunch included
              </li>
            </ul>
            <p class="text-2xl font-bold text-amber-600 mb-4">From €89 per person</p>
            <a href="#booking">
            <button class="w-full bg-stone-800 text-white py-2 rounded-md hover:bg-stone-900 transition-colors">
              Book This Tour
            </button>
            </a>
          </div>
        </div>

        <!-- Coastal Safari -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-stone-200">
          <img 
            src="https://plus.unsplash.com/premium_photo-1661819639267-aa793e29e5c6?q=80&w=2147&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Coastal Safari"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-stone-900 mb-2">Coastal Safari</h3>
            <p class="text-stone-600 mb-4">Discover hidden beaches and coastal treasures accessible only by 4x4.</p>
            <ul class="text-stone-500 mb-4">
              <li class="flex items-center">
                <svg class="h-5 w-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                6-hour adventure
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Swimming stops
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                BBQ lunch included
              </li>
            </ul>
            <p class="text-2xl font-bold text-amber-600 mb-4">From €109 per person</p>
            <a href="#booking">
            <button class="w-full bg-stone-800 text-white py-2 rounded-md hover:bg-stone-900 transition-colors">
              Book This Tour
            </button>
            </a>
          </div>
        </div>

        <!-- Village Safari -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-stone-200">
          <img 
            src="https://plus.unsplash.com/premium_photo-1661859352097-855a040f944c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2FmYXJpfGVufDB8fDB8fHww"
            alt="Village Safari"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-stone-900 mb-2">Village Safari</h3>
            <p class="text-stone-600 mb-4">Experience authentic Cretan culture in traditional mountain villages.</p>
            <ul class="text-stone-500 mb-4">
              <li class="flex items-center">
                <svg class="h-5 w-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                8-hour adventure
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Traditional lunch
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Wine tasting
              </li>
            </ul>
            <p class="text-2xl font-bold text-amber-600 mb-4">From €129 per person</p>
            <a href="#booking">
            <button class="w-full bg-stone-800 text-white py-2 rounded-md hover:bg-stone-900 transition-colors">
              Book This Tour
            </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>