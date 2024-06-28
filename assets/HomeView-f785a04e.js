import{_ as $,o as l,c as n,a as e,d as pe,b as xe,r,i as Ae,u as ue,e as he,f as me,g as ge,G as ve,m as fe,H as we,l as t,z as x,p as u,h as w,n as d,F as h,D as m,I as ee,t as z,S as c,q as _e,B as be,C as ye}from"./index-8b4b7f3d.js";import{S as b,C as y}from"./carousel.es-cc9b5232.js";import{d as C}from"./behaviours-87802d59.js";/* empty css                    */import{u as Ce}from"./audioplayer-fe638ff8.js";import{S as ke}from"./ShareModel-d4c80aa8.js";import{a as P}from"./actions-830a8f09.js";import{j as I}from"./jollofEmpty-1e702da2.js";const Be="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABwCAYAAAD/h0UQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAU4SURBVHgB7Z2Bdds2EIZ/9XkAZ4JiAzsTlJmg7QR2N+gIHcWdINkgygSRN4AniDIBA5hAxOAREinjcDgA33t8pEDpieDPOxyP5BFgZhzHW3Q28xv4+QudzbAKZ6zt3swUOpvhtjhlpt/R2Qy3cNbiBnQ2wy3cHbqrvIoSXKUd67q7lMR44hGdTbBZnIsoPQqdTXC6SjVb7q5yI5zCzS1uQGcTnMLdzZYVOpsoxVX2yHIjpbhKy3t0VsMiXBBRehQ6q+GyOLXQdofOariEu1/Z1onAJdySdSl0VlOSq7ztkeV6SnKVlmoiS+pbMrILF4koPQr1QHpLBofFqTPraoos/wQhHMLdX7lOGopyzOYQ7pxVKdSDPQg/gIjSXGUVkeVsHFcgojThLDVElsrN63CV7ki8FCYryMdb3AAibkCMO59RmDrzx4qfPJjf2PnBTrvd7gh5+HFcgYgdEhEIdDdbVngbVriDm14gQFCzL77iZHXKbOsLErNZOEKBtlKsoKNzGY5/zDY9ITE3Z/68FIFi2O0bEIwjZrtZBV3IDCkQcDP7s1IF2soWQbURVCMtKvhMEll6i9OYOmw7t5st15LJsH3RbnrxywSiWcJ9NoCAs2Occ5c+hA8tskS8VT1jEif7uGf22Uf8mmA+mv9/h8RcHVXOnm3jEFTj5PL8cimByTyi9CSPLJOdDngSC6oRBBmYXBy7QDGCiNLzt9nmT5CIFdRM/42X+ei+ewthuO1e4l8kJlvKyxxx1lqeVnz1i/2u0IyJirQnv86YNVfporhLghwgl/uN7VeTfIy7RGTwnvNOgrVFEhQD4kn0PRImBTiEezKzh8hqktD5LRBnkK7O8pBfHVjAbtzDmXUsjDwpvqvTdhzC6TPrnpEZs5MGM3vEJFYpiYUlQY9mW62A/5tpz2VxMTQyY47iPabxJ8wUDZjE9G25CLM/djqE6bnsY5zF7KBvWB7EP7gdWRwEmaI3pee4hItFlu/d+Z4YAkEfsDwmWjGsixOR/YliI8uF7MI3CMdmSCKZk89IDNezA4eVbdLQkfbvSAyXcHqhLXnnGIgdfHskpiSL20M4Z1J6yb0Ji3CRDtbgKi16oS15IMJZdUEHn+VFWcuESYQjRaTMKdy8g0dppwFnOFz4nARO4Q6RZeno4DNJ0FWKq6whovSEB+EeBHSLS8xC4FWXqww6WJOrtOjZMknQxV3aVwfzWvgZeFEFXdzCvXawoojScwjmyeG4HjfHdqzGGl7azZM/XuUpwVWSdY4RcovjFs5fn6qKWeBVp3Cug3vUiUZ9QdcJibear8HdhtiRhrt7rEMBpbXX6kmKYBT8ahjuqJIb0gp3lLQuHGmFuw4R7ta5RwikWYsbM1S4o6RlV6ncXKSrbFk4b3EDBNKycOQV7ijprhL9TVqiCB7KeIQwmrS4MVOFO0padZUq+CzOVbYqXGhxA4TRqnDhfS7iMvndVU6Ie99Bd5UnRL3voDnhxvjbtBQE0aLFqUi7qPs7WxQuW4U7SljqnOSCu8IdJVUIV2qFO0pECTeW9RILVkFFCFdohbslvJivFe6I3mvwijhXKanCHSVVBSelVbijpOqo0tNUhbtayVnhjpIWT8B1pF1UyY4WhctW4Y6S5oTLWeGOklYv6+iFNlGBSKvCZalwR0mrwmWpcEdJd5UT4orAdYub2KMjA1suf3byPUAYLT87oGfL4lJbLQtHXuGOkpaFI6+3RUl3lUKLwHWL6xYnixwV7ihpvc6JhtAKd60L91xhWeH6kXji3YHsCnc/ANGCsB+t53zuAAAAAElFTkSuQmCC",Ee="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI5SURBVHgB5ZvRccMgEERXnhTgDkIHcgdRCSkhHSYlKBXEqcByBXEqIGDBWCFCjGz5log3w4CFf265Yy1LAGS01lsQ2YBPg5IxGfCKUrHpb9oXiLBLYGfalrkP5CCARYEEWwDl+h1IsAWoXV+sAPQSoOEcwHNAaZigG/0bihMwSyCsewUCTAFU8JmyETIFqIPPxQmQRQlQCByA6gSsDBhLd8VwgpwEsCgIwxJARa6Lb4QsAerI9WIEyKYExIk4AM0JGBkwlebiTsAQIBWggiAMAZrEvOhGyBCgTsyvXoCsSuABAriNTaFf3dQKP5nvP5v+ZNq+qqoT7kiFBXGB+iAfXa9w26ru4cQw7R0LC3OVAJFAzw85IIcXxbajH88VZlIAE6jCZRXrwVj8rm0Gs4Q5C/BPA53LqDCbwaRX6HswXhM+xmowTpbAsNYVLtmRc2Z0CFbZXpssgbkMhLF9g14Yf02KDjMCjXEvG1xSmM60Fn2gdnxVoHSMODv7A0enOZj24jbm9eECnOINgjDuBfY3zi8KQ4BjYn71AqQC7LBm3GYYBcIwMqCbmBNNf4u4AM6/u8i0uLezngvEVvoTwrAEiDlBC2Fyy4A13oX+ZcIJ1vT/Qxw9/njsAwQoJRBxAkr6M98RCvcBcQewMAUInaAFgZwyoAwH8Iw4QRkO4AmcgHZshlYCgROI3wR52OcFfOAUB7CwBfBO0IEEW4DO9bQSoKIvhybKcgCPLv3gpHOCFiWj+9dhyoVd/z9vHccYt/pDygAAAABJRU5ErkJggg==",K="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAvCAYAAABzJ5OsAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGuSURBVHgB1ZmNTcMwEIVfEAOwAd6gbEA2YAVGYwM6AhuQTkA6ATCBuaO2aqV2mrb3rPiTrFRupH4+nV/zAxDx3j+AyB24PDEXQJcPgwJb3oEofw8uGxBhy2vVf9EaulH9gS+0hkj3/gglcZgbNt2oDgSY8i75TEkcpnyaNM3J09uGQpI0npk4rMpP28QxEqeWvOJgDEveZebMNy1LPndN04x8lbYxJ5M0tMRhVL7UHuaJc/MlcRCKd0yPMvqZ09/l/EGOexl6HLqu+8GVdEtPlB91QdAFySh8azVVfgjjokV1ZyQ3yWfqk4AMZxf1Ly/CKvgq4wXrT4WdjDcZ21zl0x52OFa/duVHTKqucyeVX0JhUXGOKllisXyJZFF67GU8o7yg7TWS1dD948vUbr3LmPmH/YQx5v+woQ3GzFfm7cG6MBsyczsYw5LfZ+Y+YEzNyq8nVeYoJM66kyaSSRzzpFEobZNJHErLMB86pX1vnjQKUz5NnBEEalV+QEtMEqeNpIkkifMNErS2CYkTb+UosF9lqjglaRS2vIqPIMGWH9Fa0kT84Y1gW0kTYYv/AVZ3N0MKf+8JAAAAAElFTkSuQmCC",Se="/jollof-landing/assets/design1-c437dd99.png",Ie="/jollof-landing/assets/moon-5c233a51.png",Me="data:image/png;base64,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",Ve="/jollof-landing/assets/model-6fdc9b94.png",Fe="/jollof-landing/assets/design1-c437dd99.png",Le="/jollof-landing/assets/Frame2-5e356cff.png",Qe="/jollof-landing/assets/Frame3-07378fd8.png",Te="/jollof-landing/assets/Frame4-bdcf4999.png",Oe="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABNCAYAAAAMy4KOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG6SURBVHgB7dvtbcIwEMbxywZsgDdoRygbtBt0lI6QDegGdAO6AXQC0gnIBq5NzuCavAkFaNL/T7KcuF+qhzOWfEIEAAAAgIi1duaGEfTjwtrZytqNV8Lr4ALK7TnCa6Pb0ge0qgnPrz0L6kXhrZPgdm4s3XgU1PNbUsPbJOFt2LIdfGW58W5Ph0Tgq+5J0Kxly1J1bXTLvlF1F/AnqT0/Zam6Llp1eUPVccK2afiuCyfsTFBPqy49YfdadUbQrKHqloJ2SdXtBP3xfQYAAAAAwIhkMjB/H+Umfzuw9SPLslImZNDA9Bplnyz7wAodX/ruwyxdmFsZmWtVmG9GPOjcdRcVAg3zd7rmgi3kjxg8sJRWXQjOz3M3TPTe18IF9yl3dvXAumigRqoAjY65vsd/W4xxCwMAAAAAAAD4R25242qr30QeGiBj7iTdJDANaxUtHTtHUnWSCvnd9LgoUL3uDr0Co8/5kB/QrQI7/ONS3dX36SR5hVQBlsmayOm+P36O12IvLrAPGchdmiBRJ8no8C25uAlyqRDwsXpdWLkM6O5doyb6k5e0akz0XOgcQiqn1mUHAAAAAEzDDw8G5oC9tdMSAAAAAElFTkSuQmCC",Re="/jollof-landing/assets/mobilestyle-b724dae9.png",je="/jollof-landing/assets/jollof-radio-shape-3-813b8cf8.png",Ue="/jollof-landing/assets/IMG_2988-200x300-8e77aec9.png",De={},ze={width:"23",height:"20",viewBox:"0 0 23 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},Ne=e("path",{d:"M13.9777 1.53814L13.9777 1.53816L21.5155 8.04728C21.5155 8.04729 21.5155 8.04731 21.5155 8.04732C21.67 8.18078 21.67 8.42098 21.5155 8.55439C21.5155 8.5544 21.5155 8.5544 21.5155 8.55441L13.9777 15.0642L13.9777 15.0642C13.7596 15.2526 13.4237 15.0934 13.4237 14.8106V11.0455V10.3426L12.7209 10.3527C11.0386 10.3769 9.56026 10.4994 8.3212 10.7796C7.08474 11.0592 6.03517 11.5071 5.26103 12.2202C3.64535 13.7084 3.51655 16.0408 4.50663 19.2071L5.16791 19.0003L4.50663 19.2071C4.50813 19.2119 4.50893 19.2155 4.50937 19.2179C4.50653 19.2218 4.50011 19.2293 4.48751 19.2375C4.4673 19.2507 4.44443 19.257 4.42589 19.2571C4.41193 19.2572 4.39559 19.2544 4.373 19.238L4.37299 19.2379C2.63599 17.9745 1.08934 15.5591 1.08934 13.1972C1.08934 11.6653 1.40904 10.4841 1.95281 9.56392C2.49563 8.64535 3.28816 7.94213 4.30641 7.40661C6.37395 6.31925 9.31326 5.95219 12.7388 5.91298L13.4237 5.90514V5.22017V1.79169C13.4237 1.50864 13.76 1.35015 13.9777 1.53814Z",stroke:"#8C8E8F","stroke-width":"1.38571"},null,-1),Ye=[Ne];function Xe(M,g){return l(),n("svg",ze,Ye)}const Ge=$(De,[["render",Xe]]),W={0:{itemsToShow:2.3,snapAlign:"start"},450:{itemsToShow:2.6,snapAlign:"start"},550:{itemsToShow:3,snapAlign:"start"},700:{itemsToShow:3.9,snapAlign:"start"},1024:{itemsToShow:6.7,snapAlign:"start"}},N={0:{itemsToShow:2.3,snapAlign:"start"},700:{itemsToShow:3.9,snapAlign:"start"},1024:{itemsToShow:6.7,snapAlign:"start"}},J={0:{itemsToShow:2.3,snapAlign:"start"},700:{itemsToShow:3.9,snapAlign:"start"},1024:{itemsToShow:6,snapAlign:"start"}},v=M=>(be("data-v-6c57be9a"),M=M(),ye(),M),qe={key:0,class:"overflow-hidden pt-[50px] pb-10"},He={class:"hero mx-auto relative"},Ze={class:"container mx-auto lg:mx-0"},Pe={class:"hero-text__wrapper text-white lg:absolute lg:right-[480px] sm:right-[0] top-[20px] lg:w-[300px] md:px-0 px-[15px] mt-10 lg:z-50 md:z-20"},Ke=v(()=>e("div",{class:"md:pt-6 pt-[50px]"},[e("h1",{class:"hero-header lg:text-[60px] md:text-[40px] sm:text-[35px] text-[35px] lg:leading-[61px] leading-[1.2em] font-[600] satoshi relative lg:w-[650px] w-auto z-50 mb-[20px] lg:tracking-[2px] tracking-[0.3px] capitalize lg:px-0 md:px-3"}," Explore, create, learn, have fun. "),e("p",{class:"hero-text satoshi lg:w-[450px] md:text-[16px] text-[13px] font-[300] lg:leading-0 leading-[25px] lg:px-0 md:px-3"}," Experience Jollof Radio: Where Podcasters, Listeners, and Advertisers Connect for Great Entertainment and Mutual Benefits. ")],-1)),We={class:"md:mt-[38.48px] mt-[22px] lg:px-0 md:px-3 px-0"},Je=ee('<div class="relative block lg:hidden z-0" data-v-6c57be9a><img src="'+Be+'" alt="" class="absolute right-[10px] md:right-[100px] top-[30px] transform scale-75" data-v-6c57be9a></div><div class="overflow-hidden lg:h-[630px] md:h-[370px] h-[270px]" data-v-6c57be9a><div class="container mx-auto" data-v-6c57be9a><div class="hero-image__wrapper relative md:h-[650px] h-[150px] z-0 transform scale-50 sm:scale-[.5] lg:scale-[.85] md:translate-y-[-120px] md:translate-x-[-100px] lg:translate-y-[-70px] sm:translate-x-[-200px] sm:translate-y-[50px] translate-y-[50px] translate-x-[-100px] md:top-0 top-[-80px]" data-v-6c57be9a><div class="md:block hidden" data-v-6c57be9a><img src="'+Ee+'" alt="" class="absolute top-[720px] left-[100px] w-[50px]" data-v-6c57be9a><img src="'+K+'" alt="" class="absolute top-[740px] left-[145px] w-[35px]" data-v-6c57be9a><img src="'+K+'" alt="" class="absolute top-[780px] left-[130px] w-[35px]" data-v-6c57be9a></div><img src="'+Se+'" alt="" class="absolute hidden md:!block sm:top-[500px] top-[650px] lg:left-[-140px] md:left-[-220px] left-[-260px] transform md:translate-x-0 md:translate-y-0 translate-y-[-325px] translate-x-[170px] md:rotate-[0] rotate-[60deg] w-[700px]" data-v-6c57be9a><img src="'+Ie+'" alt="" class="absolute top-[100px] lg:left-[130px] md:left-[40px] left-[50%] transform md:translate-x-[0] translate-x-[-50%] lg:w-[300px] md:w-[250px] w-[250px]" data-v-6c57be9a><img src="'+Me+'" alt="" class="absolute top-[24px] lg:left-[55px] md:left-[-45px] left-[50%] transform md:translate-x-0 translate-x-[-120%] w-[160px]" data-v-6c57be9a><img src="'+Ve+'" alt="" class="absolute top-[140px] lg:left-[160px] md:left-[65px] left-[50%] transform md:translate-x-[0] translate-x-[-35%] md:w-[490px] w-[300px]" data-v-6c57be9a><img src="'+Fe+'" alt="" class="absolute lg:top-[600px] hidden md:!block lg:left-[-300px] md:top-[600px] md:left-[-380px] top-[720px] left-[-286px] transform md:translate-x-0 md:translate-y-0 translate-y-[-255px] translate-x-[200px] w-[700px]" data-v-6c57be9a></div><div class="opacity-40 md:transform translate-y-[-700px] translate-x-[140px]" data-v-6c57be9a><div class="xl:!block hidden" data-v-6c57be9a><img src="'+Le+'" alt="" class="frame absolute md:top-[252px] top-[1403px] md:right-[-90px] w-[503px] md:w-[500px] right-[-173px]" data-v-6c57be9a><img src="'+Qe+'" alt="" class="absolute md:top-[430px] top-[1589px] md:right-[-65px] right-[-75px] md:w-[480px] w-[400px]" data-v-6c57be9a><img src="'+Te+'" alt="" class="absolute md:top-[440px] top-[1597px] md:right-[160px] right-[89px] md:w-[250px] w-[205px]" data-v-6c57be9a><img src="'+Oe+'" alt="" class="absolute top-[440px] right-[410px] w-[50px]" data-v-6c57be9a></div><div class="design relative h-[200px] hidden" data-v-6c57be9a><img src="'+Re+'" alt="" class="absolute right-[-140px] tranform translate-x-[-50px]" data-v-6c57be9a></div></div></div></div>',2),$e={key:0,class:"container mx-auto px-[15px] mt-7"},et={class:"space-y-2 satoshi"},tt={class:"satoshi flex items-end justify-between text-white"},st=v(()=>e("h4",{class:"md:text-2xl text-[20px] font-medium"},"Top Categories",-1)),lt={class:"flex items-center"},ot={class:"text-white"},at=["onClick"],it={class:"relative aspect-square rounded-md overflow-hidden"},dt=["src"],nt={class:"absolute top-0 item-center sm:w-[196.33px] w-full h-[40px] leading-[40px] bg-black/50"},rt={class:"text-[12px] text-white"},ct={class:"slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2 rounded-md"},pt={class:"relative h-[155px] !w-full overflow-hidden"},xt=ee('<div class="container mx-auto px-[15px] mt-7" data-v-6c57be9a><div class="ad-container relative bg-[#22a38f] w-full h-[350px] rounded-md overflow-hidden" data-v-6c57be9a><img src="'+je+'" class="absolute bottom-0 md:left-0 left-5 md:w-auto w-[90%]" data-v-6c57be9a><div class="ad-text sm:pl-[45px] relative space-y-6 mt-[65px]" data-v-6c57be9a><h1 class="md:text-[45px] text-[35px] leading-[44px] text-white font-black satoshi relative z-50" data-v-6c57be9a> Get a worthwhile discount/get an amazing discount </h1><button class="bg-[#F0CF7B] p-1 px-6 rounded-full cursor-pointer" data-v-6c57be9a> Set up your free ad account </button><p class="text-white" data-v-6c57be9a>You only get billed when someone listens to your ads</p></div><div class="relative w-full" data-v-6c57be9a><img src="'+Ue+'" class="avatar absolute bottom-0 transform translate-x-[-50%] left-[50%]" data-v-6c57be9a></div></div></div>',1),At={key:1,class:"container mx-auto px-[15px] mt-7"},ut={class:"space-y-2 satoshi mb-[30px]"},ht={class:"flex items-end justify-between text-white"},mt=v(()=>e("h4",{class:"md:text-2xl text-[20px] font-medium hover:text-[#F0CF7B]"},"Shuffle Pod 247",-1)),gt={class:"flex items-center space-x-2"},vt={for:"top-week-left",class:"pointer-cursor"},ft={for:"top-week-right",class:"ml-[10px] pointer-cursor"},wt={class:""},_t={class:"slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2 rounded-md"},bt={class:"relative w-full aspect-square xl:h-[200px] overflow-hidden"},yt=["src"],Ct={class:"text-left"},kt=["innerHTML"],Bt=["onClick"],Et={class:"relative flex items-center justify-center h-full"},St={type:"button",class:"playpause-track flex items-center justify-center absolute text-[23px] bg-[#F0CF7B] w-[50px] h-[50px] rounded-full text-[#030F18]"},It=v(()=>e("div",{class:"action absolute bottom-[14px] right-[10px] flex items-center"},null,-1)),Mt={key:1,class:"grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2"},Vt={class:"slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2"},Ft={class:"relative w-full h-[155px] overflow-hidden"},Lt={class:"absolute bottom-1 left-2 bg-blue-deep-100/40 py-1 px-2 text-[8px] rounded-full"},Qt={class:"text-left mt-[5px]"},Tt={key:2,class:"container relative mx-auto px-[15px] mt-7"},Ot={class:"container mx-auto bg-blue-deep-100 rounded-t-[10px] text-white satoshi"},Rt={class:"text-white space-y-2 mx-auto"},jt={class:"flex items-end justify-between"},Ut=v(()=>e("h4",{class:"md:text-2xl text-[20px] font-medium hover:text-[#F0CF7B]"},"RADIO 247",-1)),Dt={class:"flex items-center space-x-2"},zt={class:"space-y-4"},Nt={key:0,class:"grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-4 sm:gap-3 gap-6"},Yt={class:"flex items-center bg-[#12222D] rounded-md w-full aspect-[1/auto] px-2"},Xt=["onClick"],Gt=["src"],qt={class:"space-y-4 md:py-[15px] flex-grow lg:px-[10px] px-[20px] pr-0"},Ht=["onClick"],Zt={class:"flex flex-col font-bold space-y-1"},Pt=["innerHTML"],Kt=["innerHTML"],Wt={class:"flex items-center space-x-6 relative"},Jt=["innerHTML"],$t={class:"flex items-center space-x-4 absolute sm:right-1 right-1 bottom-[3px] transform scale-75"},es=["onClick"],ts=["onClick"],ss=v(()=>e("svg",{xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",width:"28",height:"28",viewBox:"0,0,256,256"},[e("g",{fill:"#ffffff","fill-rule":"nonzero",stroke:"none","stroke-width":"1","stroke-linecap":"butt","stroke-linejoin":"miter","stroke-miterlimit":"10","stroke-dasharray":"","stroke-dashoffset":"0","font-family":"none","font-weight":"none","font-size":"none","text-anchor":"none",style:{"mix-blend-mode":"normal"}},[e("g",{transform:"scale(5.12,5.12)"},[e("path",{d:"M5.91992,6l14.66211,21.375l-14.35156,16.625h3.17969l12.57617,-14.57812l10,14.57813h12.01367l-15.31836,-22.33008l13.51758,-15.66992h-3.16992l-11.75391,13.61719l-9.3418,-13.61719zM9.7168,8h7.16406l23.32227,34h-7.16406z"})])])],-1)),ls=[ss],os={key:1,class:"grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-12 sm:gap-3 gap-6"},as={class:"w-[75px] h-[75px] rounded-md overflow-hidden"},is={class:"space-y-4 flex-grow lg:px-[10px] px-[20px]"},ds={class:"flex flex-col flex-grow items-start space-y-2"},ns={class:"flex items-center space-x-6 relative"},rs={key:3,class:"container mx-auto px-[15px] mt-7"},cs={class:"space-y-2 satoshi"},ps={class:"satoshi flex items-end justify-between text-white"},xs=v(()=>e("h4",{class:"md:text-2xl text-[20px] font-medium"},"New Podcasters",-1)),As={class:"flex items-center"},us={for:"top-week-left",class:"pointer-cursor"},hs={for:"top-week-right",class:"ml-[10px] pointer-cursor"},ms={class:"text-white"},gs={class:"slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2 rounded-md"},vs={class:"relative w-full aspect-square xl:h-[200px] overflow-hidden"},fs=["src"],ws={class:"text-left mt-[5px]"},_s=["innerHTML"],bs={class:"md:text-xs text-[10px] text-[grey]"},ys={class:"screen absolute w-[196.33px] left-0 right-0 top-0 bottom-0 bg-[#0D192160] opacity-0"},Cs=["onClick"],ks=v(()=>e("div",{class:"action absolute bottom-[14px] right-[10px] flex items-center"},null,-1)),Bs=[ks],Es={class:"slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2 rounded-md"},Ss={class:"relative h-[155px] !w-full overflow-hidden"},Is={class:"absolute bottom-1 left-2 bg-blue-deep-100/40 py-1 px-2 text-[8px] rounded-full"},Ms={class:"text-left mt-[5px]"},Vs={key:4,class:"container mx-auto px-[15px] mt-7"},Fs={class:"space-y-2 satoshi mb-[30px]"},Ls={class:"flex items-end justify-between text-white"},Qs=v(()=>e("h4",{class:"md:text-2xl text-[20px] font-medium hover:text-[#F0CF7B]"},"Just Added",-1)),Ts={class:"flex items-center space-x-2"},Os={for:"top-week-left",class:"pointer-cursor"},Rs={for:"top-week-right",class:"ml-[10px] pointer-cursor"},js={class:""},Us={class:"slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2 rounded-md"},Ds={class:"relative w-full aspect-square xl:h-[200px] overflow-hidden"},zs=["src"],Ns={class:"text-left mt-[5px]"},Ys=["innerHTML"],Xs=["onClick"],Gs={class:"relative flex items-center justify-center h-full"},qs={type:"button",class:"playpause-track flex items-center justify-center absolute text-[23px] bg-[#F0CF7B] w-[50px] h-[50px] rounded-full text-[#030F18]"},Hs=v(()=>e("div",{class:"action absolute bottom-[14px] right-[10px] flex items-center"},null,-1)),Zs={key:1,class:"grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2"},Ps={class:"slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2"},Ks={class:"relative w-full h-[155px] overflow-hidden"},Ws={class:"absolute bottom-1 left-2 bg-blue-deep-100/40 py-1 px-2 text-[8px] rounded-full"},Js={class:"text-left mt-[5px]"},$s={class:"container mx-auto px-[15px] mt-7"},el={key:0},tl={class:"flex items-end justify-between text-white"},sl={class:"md:text-2xl text-[20px] font-medium hover:text-[#F0CF7B]"},ll={class:"flex items-center space-x-2"},ol=v(()=>e("div",null,null,-1)),al=["onClick"],il={class:""},dl={class:"slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2 rounded-md"},nl={class:"relative aspect-square xl:h-[200px] overflow-hidden"},rl=["src"],cl={class:"text-left mt-[5px]"},pl=["innerHTML"],xl=["onClick"],Al={class:"relative flex items-center justify-center h-full"},ul={type:"button",class:"playpause-track flex items-center justify-center absolute text-[23px] bg-[#F0CF7B] w-[50px] h-[50px] rounded-full text-[#030F18]"},hl=v(()=>e("div",{class:"action absolute bottom-[14px] right-[10px] flex items-center"},null,-1)),ml={key:1,class:"grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2"},gl={class:"slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2"},vl={class:"relative h-[155px] overflow-hidden"},fl={class:"absolute bottom-1 left-2 bg-blue-deep-100/40 py-1 px-2 text-[8px] rounded-full"},wl={class:"text-left mt-[5px]"},_l=pe({__name:"HomeView",setup(M){xe.useToast();const g=Ce(),V=r(),Y=Ae("$swal");r(),r();const F=r(),X=r(),L=r(),T=r(),te=ue(),G=he();r(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g);const O=r(!1),q=r("");r();const k=r([{id:0,logo:"",title:"",state:"",frequency:"",slug:"",handles:{twitter:""}}]),_=r([]),R=r([{id:0,logo:"",title:"",duration:"",description:""}]);r([{id:0,logo:"",title:"",duration:"",description:""}]);const j=r([{id:0,logo:"",title:"",duration:"",description:""}]),U=r([{id:0,logo:"",title:"",duration:"",description:""}]);r([{id:0,logo:"",title:"",duration:"",description:"",podcast:""}]);const D=r([{id:0,logo:"",name:""}]),Q=r(!0),B=r(!0),H=r(!0),se=r(!1),Z=r();r(),me(async()=>{if(ge.get("services/landing-page/").then(o=>{_.value=o.data,D.value=o.data.top_categories,j.value=_.value.shuffle_pod,k.value=_.value.stations,R.value=_.value.new_podcasters,U.value=_.value.just_added,V.value=o.data.playlist,B.value=!1,H.value=!1,Q.value=!1}).catch(o=>{o.response?Y.fire({icon:"error",title:"Oops...",text:o.response.data.message}):Y.fire({icon:"error",title:"Oops...",text:o.message})}),G.query.station){await ve();const o=k.value.find(a=>a.slug===G.query.station);o&&E(o.id,"radio","","","",!0)}});const le=()=>{var o,a;(o=F.value)==null||o.next(),(a=X.value)==null||a.next()},oe=()=>{var o,a;(o=F.value)==null||o.prev(),(a=X.value)==null||a.prev()},ae=()=>{var o;(o=L.value)==null||o.next()},ie=()=>{var o;(o=L.value)==null||o.prev()},de=()=>{var o;(o=T.value)==null||o.next()},ne=()=>{var o;(o=T.value)==null||o.prev()};setInterval(()=>{localStorage.getItem("isPlaying")&&JSON.parse(localStorage.getItem("isPlaying")??"")==!0?localStorage.getItem("playingId")&&(Z.value=JSON.parse(localStorage.getItem("playingId")??"")):(se.value=!1,Z.value=0)},1e3);const re=o=>{let a={url:""};window.innerWidth>768&&(O.value=!0),a.url="https://share.jollofradio.com/station/"+o,q.value=a.url,window.innerWidth<768&&navigator.share(a)},E=(o,a,A,S,s,i=!1)=>{let p=a==="episode"?[]:k.value;if(g.audioType=a,g.currentTrackIndex=a==="episode"?o:k.value.findIndex(f=>f.id===o),S==="static"){if(a==="episode")for(let f in _.value)f===A&&(p=_.value[f])}else S==="dynamic"&&(p=s);JSON.stringify(g.trackList)!==JSON.stringify(p)&&(g.trackList=p),g.playPauseTrack(i)},ce=(o,a,A,S,s)=>{const i={type:o,topic:a,resource:A,extra:S,name:s};localStorage.setItem("see-all",JSON.stringify(i)),te.push({name:"view.all.type",params:{name:a}})};return(o,a)=>{const A=fe("font-awesome-icon"),S=we("copy");return l(),n("div",qe,[e("div",He,[e("div",Ze,[e("div",Pe,[Ke,e("div",We,[e("button",{class:"main-button Manrope capitalize rounded-full md:text-[15px] text-[12px] flex bg-[#F0CF7B] md:px-[30px] px-[20px] md:!py-[15.5px] !py-[7px]",onClick:a[0]||(a[0]=s=>t(P)("https://app.jollofradio.com"))}," Get started ")])])]),Je]),D.value.length?(l(),n("div",$e,[e("div",et,[e("div",tt,[st,e("div",lt,[e("span",{class:"text-yellow cursor-pointer ml-[10px] text-[20px] hover:text-[#F0CF7B]",onClick:a[1]||(a[1]=s=>Q.value?"":o.$router.push("/categories"))},"See all")])]),e("div",ot,[H.value?(l(),x(t(y),{key:1,breakpoints:t(J)},{default:u(()=>[(l(),n(h,null,m(6,(s,i)=>d(t(b),{key:i},{default:u(()=>[e("div",ct,[e("div",pt,[d(t(c),{class:"block w-full h-[155px]",style:{"border-radius":"0"}})])])]),_:2},1024)),64))]),_:1},8,["breakpoints"])):(l(),x(t(y),{key:0,breakpoints:t(J)},{default:u(()=>[(l(!0),n(h,null,m(D.value.slice(0,12),(s,i)=>(l(),x(t(b),{key:i,class:"episodeSlider"},{default:u(()=>[e("div",{class:"slider-info w-full bg-blue-deep-200 relative md:pr-3 pr-1 pt-2.5 pb-2 rounded-md cursor-pointer",onClick:p=>o.$router.push({name:"view.single.category",params:{name:s.name}})},[e("div",it,[e("img",{src:s.logo||t(I),class:"block h-[196.33px] w-[196.33px] rounded-md",height:"196.33px",width:"196.33px",alt:"Category"},null,8,dt),e("div",nt,[e("span",rt,z(s.name),1)])])],8,at)]),_:2},1024))),128))]),_:1},8,["breakpoints"]))])])])):w("",!0),xt,j.value.length?(l(),n("div",At,[e("div",ut,[e("div",ht,[mt,e("div",gt,[e("div",null,[e("button",{class:"hover:text-yellow",onClick:a[2]||(a[2]=s=>oe())},[e("label",vt,[d(A,{icon:["fas","chevron-left"],class:"cursor-pointer"})])]),e("button",{class:"hover:text-yellow",onClick:a[3]||(a[3]=s=>le())},[e("label",ft,[d(A,{icon:["fas","chevron-right"],class:"cursor-pointer"})])])])])]),e("div",wt,[B.value?(l(),n("div",Mt,[(l(),n(h,null,m(6,(s,i)=>e("div",{key:i,class:"flex flex-col gap-4 w-full items-left relative rounded-md"},[e("div",Vt,[e("div",Ft,[d(t(c),{class:"block w-full h-[155px]",style:{"border-radius":"0"}}),e("span",Lt,[d(t(c),{style:{width:"20px",height:"8px"}})])]),e("div",Qt,[d(t(c),{class:"h-full w-full"}),d(t(c),{class:"h-full w-[50px]",style:{width:"80px",height:"10px"}})])])])),64))])):(l(),x(t(y),{key:0,breakpoints:t(W),ref_key:"episodesCarousel",ref:F,class:""},{default:u(()=>[(l(!0),n(h,null,m(j.value.slice(0,20),(s,i)=>(l(),x(t(b),{key:i,class:"episodeSlider"},{default:u(()=>[e("div",_t,[e("div",bt,[e("img",{src:s.logo||t(I),class:"block aspect-square w-[196.33px] h-[196.33px] rounded-md",height:"196.33px",width:"196.33px",alt:"Episode"},null,8,yt)]),e("div",Ct,[e("span",{innerHTML:t(C)(s.title,13),class:"text-left text-white block md:text-sm text-[14px] mb-[-5px]"},null,8,kt)]),e("div",{class:"screen absolute w-[196.33px] left-0 right-0 top-0 bottom-0 bg-[#0D192160] opacity-0",onClick:p=>E(i,"episode","shuffle_pod","static","")},[e("div",Et,[e("button",St,[!t(g).isPlaying||t(g).currentTrackId!==s.id?(l(),x(A,{key:0,icon:["fas","play"]})):(l(),x(A,{key:1,icon:["fas","pause"]}))]),It])],8,Bt)])]),_:2},1024))),128))]),_:1},8,["breakpoints"]))])])])):w("",!0),k.value.length?(l(),n("div",Tt,[e("div",Ot,[e("div",Rt,[e("div",jt,[Ut,e("div",Dt,[e("span",{class:"text-yellow text-xl font-medium cursor-pointer",onClick:a[4]||(a[4]=s=>Q.value?"":o.$router.push("/station"))},"See all")])]),e("div",zt,[Q.value?(l(),n("div",os,[(l(),n(h,null,m(6,(s,i)=>e("div",{key:i,class:"flex items-center bg-[#0D1921] rounded-md h-[95px] p-2"},[e("div",as,[d(t(c),{class:"h-full w-full"})]),e("div",is,[e("div",ds,[d(t(c),{class:"h-full w-full"}),d(t(c),{class:"h-full w-[50px]",style:{width:"50px"}})]),e("div",ns,[d(t(c),{class:"h-full w-[50px]",style:{width:"50px",height:"8px"}})])])])),64))])):(l(),n("div",Nt,[(l(!0),n(h,null,m(k.value.slice(0,6),(s,i)=>(l(),n("div",{key:i,class:"stationSlider"},[e("div",Yt,[e("div",{class:"md:w-[95px] md:h-full w-[60px] h-[60px] rounded-md overflow-hidden",onClick:p=>E(s.id,"radio","","","")},[e("img",{src:s.logo||t(I),alt:"radio h-full",class:"aspect-square"},null,8,Gt)],8,Xt),e("div",qt,[e("div",{class:"flex flex-grow items-start md:space-x-1 pt-2",onClick:p=>E(s.id,"radio","","","")},[e("div",Zt,[e("span",{innerHTML:t(C)(s.title,80),class:"lg:text-[15px] text-md font-normal work-sans"},null,8,Pt),e("span",{innerHTML:t(C)(s.state,30),class:"text-[10px] font-medium text-left"},null,8,Kt)])],8,Ht),e("div",Wt,[e("span",{innerHTML:t(C)(s.frequency+"FM",30),class:"text-white/20 md:text-[16px] text-[12px]"},null,8,Jt),e("div",$t,[_e((l(),n("button",{class:"",onClick:p=>re(s==null?void 0:s.slug)},[d(Ge)],8,es)),[[S,"https://app.jollofradio.com/home?station="+s.slug]]),s.handles&&s.handles.twitter?(l(),n("button",{key:0,onClick:p=>t(P)(s.handles.twitter)},ls,8,ts)):w("",!0)])])])])]))),128))]))])])])])):w("",!0),R.value.length?(l(),n("div",rs,[e("div",cs,[e("div",ps,[xs,e("div",As,[e("div",null,[e("button",{class:"hover:text-yellow",onClick:a[5]||(a[5]=s=>ie())},[e("label",us,[d(A,{icon:["fas","chevron-left"],class:"cursor-pointer"})])]),e("button",{class:"hover:text-yellow",onClick:a[6]||(a[6]=s=>ae())},[e("label",hs,[d(A,{icon:["fas","chevron-right"],class:"cursor-pointer"})])])])])]),e("div",ms,[B.value?(l(),x(t(y),{key:1,breakpoints:t(N),ref_key:"recommendedCarousel",ref:L},{default:u(()=>[(l(),n(h,null,m(6,(s,i)=>d(t(b),{key:i},{default:u(()=>[e("div",Es,[e("div",Ss,[d(t(c),{class:"block w-full h-[155px]",style:{"border-radius":"0"}}),e("span",Is,[d(t(c),{style:{width:"20px",height:"8px"}})])]),e("div",Ms,[d(t(c),{class:"h-full w-full"}),d(t(c),{class:"h-full w-[50px]",style:{width:"80px",height:"10px"}})])])]),_:2},1024)),64))]),_:1},8,["breakpoints"])):(l(),x(t(y),{key:0,breakpoints:t(N),ref_key:"recommendedCarousel",ref:L},{default:u(()=>[(l(!0),n(h,null,m(R.value.slice(0,12),(s,i)=>(l(),x(t(b),{key:i,class:"episodeSlider"},{default:u(()=>[e("div",gs,[e("div",vs,[e("img",{src:s.logo||t(I),class:"block aspect-square w-[174.56px] h-[174.56px] rounded-md",height:"174.56px",width:"174.56px",alt:"Episode"},null,8,fs)]),e("div",ws,[e("span",{innerHTML:t(C)(s.title,13),class:"text-left text-white block md:text-sm text-[14px] mb-[-5px]"},null,8,_s),e("span",bs,z(s.item_count+" Episode"),1)]),e("div",ys,[e("div",{class:"relative flex items-center justify-center h-full",onClick:p=>o.$router.push({name:"view-podcast",params:{name:s.id}})},Bs,8,Cs)])])]),_:2},1024))),128))]),_:1},8,["breakpoints"]))])])])):w("",!0),U.value.length?(l(),n("div",Vs,[e("div",Fs,[e("div",Ls,[Qs,e("div",Ts,[e("div",null,[e("button",{class:"hover:text-yellow",onClick:a[7]||(a[7]=s=>ne())},[e("label",Os,[d(A,{icon:["fas","chevron-left"],class:"cursor-pointer"})])]),e("button",{class:"hover:text-yellow",onClick:a[8]||(a[8]=s=>de())},[e("label",Rs,[d(A,{icon:["fas","chevron-right"],class:"cursor-pointer"})])])])])]),e("div",js,[B.value?(l(),n("div",Zs,[(l(),n(h,null,m(6,(s,i)=>e("div",{key:i,class:"flex flex-col gap-4 w-full items-left relative rounded-md"},[e("div",Ps,[e("div",Ks,[d(t(c),{class:"block w-full h-[155px]",style:{"border-radius":"0"}}),e("span",Ws,[d(t(c),{style:{width:"20px",height:"8px"}})])]),e("div",Js,[d(t(c),{class:"h-full w-full"}),d(t(c),{class:"h-full w-[50px]",style:{width:"80px",height:"10px"}})])])])),64))])):(l(),x(t(y),{key:0,breakpoints:t(N),ref_key:"justAddedCarousel",ref:T,class:""},{default:u(()=>[(l(!0),n(h,null,m(U.value,(s,i)=>(l(),x(t(b),{key:i,class:"episodeSlider"},{default:u(()=>[e("div",Us,[e("div",Ds,[e("img",{src:s.logo||t(I),class:"block aspect-square w-[196.33px] h-[196.33px] rounded-md object-contain",height:"196.33",width:"196.33",alt:"Episode"},null,8,zs)]),e("div",Ns,[e("span",{innerHTML:t(C)(s.title,13),class:"text-left text-white block md:text-sm text-[14px] mb-[-5px]"},null,8,Ys)]),e("div",{class:"screen absolute w-[196.33px] left-0 right-0 top-0 bottom-0 bg-[#0D192160] opacity-0",onClick:p=>E(i,"episode","just_added","static","")},[e("div",Gs,[e("button",qs,[!t(g).isPlaying||t(g).currentTrackId!==s.id?(l(),x(A,{key:0,icon:["fas","play"]})):(l(),x(A,{key:1,icon:["fas","pause"]}))]),Hs])],8,Xs)])]),_:2},1024))),128))]),_:1},8,["breakpoints"]))])])])):w("",!0),e("div",$s,[(l(!0),n(h,null,m(V.value,(s,i)=>(l(),n("div",{class:"space-y-2 satoshi mb-[30px]",key:i},[B.value?(l(),n("div",ml,[(l(),n(h,null,m(2,(p,f)=>e("div",{key:f,class:"flex flex-col gap-4 w-full items-left relative rounded-md"},[e("div",gl,[e("div",vl,[d(t(c),{class:"block w-full h-[155px]",style:{"border-radius":"0"}}),e("span",fl,[d(t(c),{style:{width:"20px",height:"8px"}})])]),e("div",wl,[d(t(c),{class:"h-full w-full"}),d(t(c),{class:"h-full w-[50px]",style:{width:"80px",height:"10px"}})])])])),64))])):(l(),n("div",el,[e("div",tl,[e("h4",sl,z(i),1),e("div",ll,[ol,e("span",{class:"text-yellow text-xl font-medium cursor-pointer",onClick:p=>B.value?"":ce("episodes",i,V.value[i].episodes,"","Custom Playlist")},"See all",8,al)])]),e("div",il,[d(t(y),{breakpoints:t(W),ref_for:!0,ref_key:"episodesCarousel",ref:F,class:""},{default:u(()=>[(l(!0),n(h,null,m(V.value[i].episodes,(p,f)=>(l(),x(t(b),{key:f,class:"episodeSlider"},{default:u(()=>[e("div",dl,[e("div",nl,[e("img",{src:p.logo||t(I),class:"block w-[196.33px] h-[196.33px] rounded-md object-contain",height:"196.33",width:"196.33",alt:"Episode"},null,8,rl)]),e("div",cl,[e("span",{innerHTML:t(C)(p.title,13),class:"text-left text-white block md:text-sm text-[14px] mb-[-5px]"},null,8,pl)]),e("div",{class:"screen absolute w-[196.33px] left-0 right-0 top-0 bottom-0 bg-[#0D192160] opacity-0",onClick:bl=>E(f,"episode","just_added","dynamic",V.value[i].episodes)},[e("div",Al,[e("button",ul,[!t(g).isPlaying||t(g).currentTrackId!==p.id?(l(),x(A,{key:0,icon:["fas","play"]})):(l(),x(A,{key:1,icon:["fas","pause"]}))]),hl])],8,xl)])]),_:2},1024))),128))]),_:2},1032,["breakpoints"])])]))]))),128))]),w("",!0),O.value?(l(),x(ke,{key:6,route:q.value,onClose:a[9]||(a[9]=s=>O.value=!1)},null,8,["route"])):w("",!0)])}}});const Vl=$(_l,[["__scopeId","data-v-6c57be9a"]]);export{Vl as default};