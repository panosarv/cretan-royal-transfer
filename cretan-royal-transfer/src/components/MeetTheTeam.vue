<template>
      <div class="absolute inset-0 flex items-center justify-center">
      </div>
  
      <div class="relative text-center md:text-left max-w-4xl">
        <Transition
          appear
          enter-active-class="transition duration-1000"
          enter-from-class="opacity-0 translate-y-6"
          enter-to-class="opacity-100 translate-y-0"
        >
          <h1 class="text-3xl sm:text-4xl md:text-6xl font-bold text-[#E5E5E5] mb-6">
            Meet the Team
          </h1>
        </Transition>
  
        <Transition
          appear
          enter-active-class="transition duration-1000 delay-300"
          enter-from-class="opacity-0 translate-y-6"
          enter-to-class="opacity-100 translate-y-0"
        >
          <p class="text-lg sm:text-xl md:text-2xl text-[#E5E5E5] leading-relaxed text-justify">
            At Cretan Royal Transfer, we are dedicated to delivering exceptional transportation services, ensuring 
            every ride is <strong>safe, reliable, and professional</strong>. Our team consists of highly trained drivers who uphold 
            the highest industry standards, providing a seamless and comfortable experience.
            <br /><br />
            With extensive knowledge of Crete, our experts are committed to punctuality, professionalism, and hospitality. 
            Whether you're traveling for business, leisure, or special occasions, our premium fleet guarantees a luxurious 
            and efficient journey.
          </p>
        </Transition>
      </div>
  </template>
  