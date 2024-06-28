<template>
    <div class="w-screen h-screen flex lg:flex-row flex-col justify-center lg:items-start items-center">
        <img src="../../assets/images/404.svg" alt="404 image" class="w-[370px] opacity-90 self-center lg:hidden block transform rotate-5">
        <div class="text-white lg:mt-[150px] space-y-[20px] lg:items-start items-center">
            <div class="flex flex-col lg:text-[50px] text-[30px] justify-center leading-[50px] font-black">
                <p class="lg:text-left text-center">404:</p>
                <p class="lg:text-left text-center">Page Not Found.</p>
            </div>
            <div class="lg:text-left text-center">
                <p>it seems you have stubled upon a rarity.</p>
                <p>We apologize for the in convenience</p>
            </div>
            <button class="main-button Manrope capitalize rounded-full md:text-[15px] text-[12px] flex bg-[#F0CF7B] md:px-[30px] px-[20px] md:!py-[15.5px] !py-[7px] lg:mx-0 mx-auto" @click="$router.push({name: 'home'})">
                Go Home
            </button>
        </div>
        <img src="../../assets/images/404.svg" alt="404 image" class="w-[550px] lg:block hidden opacity-90 self-center transform rotate-5">
    </div>
</template>