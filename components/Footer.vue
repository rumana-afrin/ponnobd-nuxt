<template>
    <!-- Footer Start Here -->
    <div class="footer-area">
        <!-- <FooterSkeleton v-if="pending" /> -->
        <!-- <div class="footer-skeleton">
            <div class="skeleton-logo shimmer"></div>
            <ul class="skeleton-menu">
                <li v-for="i in 3" :key="i" class="skeleton-link shimmer"></li>
            </ul>
        </div> -->
        <div class="footer-top">
            <div class="thumb--wrap footer-logo bg--img">
                <img :src="footerData.header_logo">
            </div>
            <div class="container-fluid">
                <div class="row gy-4 justify-content-center py-3">
                    <div class="col-xl-2 col-sm-6">

                        <div class="footer-item">
                            <h5 class="footer-item--title">{{ footerData.menu_title_one }}</h5>
                            <ul class="footer--menu">
                                <li class="menu--item">
                                    <NuxtLink to="/" class="menu--link">{{ footerData?.footer_menu_one?.[0] || 'Home'
                                        }}</NuxtLink>
                                </li>
                                <li class="menu--item">
                                    <NuxtLink to="/about-us" class="menu--link">{{ footerData?.footer_menu_one?.[1]
                                        || 'About Us' }}</NuxtLink>
                                </li>
                                <li class="menu--item">
                                    <NuxtLink to="/blog" class="menu--link">{{ footerData?.footer_menu_one?.[2] ||
                                        'Blog' }}</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-2 col-sm-6">
                        <div class="footer-item">
                            <h5 class="footer-item--title">{{ footerData.menu_title_two }}</h5>
                            <ul class="footer--menu">
                                <li class="menu--item" v-for="(text, index) in footerData.footer_menu_two" :key="index">
                                    <NuxtLink :to="generateLink(index)" class="menu--link">{{ text }}</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-xl-2 col-sm-6" v-for="(data, index) in footerData.showroom_title" :key="index">
                        <div class="footer-item">
                            <h5 class="footer-item--title text-start text-sm-end">{{ data }}</h5>
                            <div class="footer-contact-info mb-3 d-flex justify-content-end flex-column gap-1">
                                <div class="d-flex justify-content-end align-items-center">
                                    <p class="fw--400 text-start text-sm-end">{{
                                        footerData.footer_showroom_description[index] }}</p>
                                </div>
                                <div class="d-flex align-items-center flex-wrap gap-2">
                                    <p class="text-start text-sm-end">
                                        <a :href="'tel:' + footerData.footer_showroom_phone_one[index]">
                                            {{ footerData.footer_showroom_phone_one[index] }}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row d-fle justify-content-end p-0 m-0">
                        <div class="col-xl-2 col-sm-6">
                            <div class="footer-item">
                                <div class="footer-contact-info mb-3 d-flex justify-content-end flex-column gap-1">
                                    <div class="d-flex justify-content-end align-items-center">
                                        <p class="text--black fs--18 fw--600 text-start text-sm-end">{{
                                            footerData.app_name }}</p>
                                    </div>
                                    <div class="d-flex align-items-center flex-wrap gap-2">
                                        <p class="text-start text-sm-end">Please give a feadback</p>
                                    </div>
                                </div>
                                <ul class="social-list flex-wrap justify-content-start justify-content-sm-end">
                                    <li class="social-list--item"><a :href="footerData.fb_link"
                                            class="social-list__link icon-wrapper">
                                            <div class="icon"><i class="fab fa-facebook-f"></i></div>
                                        </a> </li>
                                    <li class="social-list--item"><a :href="footerData.yt_link"
                                            class="social-list__link icon-wrapper active">
                                            <div class="icon"><i class="fa-brands fa-x-twitter"></i></div>
                                        </a></li>
                                    <li class="social-list--item"><a :href="footerData.linkedin_link"
                                            class="social-list__link icon-wrapper">
                                            <div class="icon"><i class="fab fa-linkedin-in"></i></div>
                                        </a></li>
                                    <li class="social-list--item"><a :href="footerData.insta_link"
                                            class="social-list__link icon-wrapper">
                                            <div class="icon"><i class="fab fa-instagram"></i></div>
                                        </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- bottom Footer -->
            <div class="bottom-footer pt-4 pb-3">
                <div class="container">
                    <div class="row text-center gy-2">
                        <div class="col-lg-12">
                            <div class="bottom-footer-text">
                                <div style="text-align: center;"><span
                                        style="font-family: var(--bs-body-font-family); font-size: var(--bs-body-font-size); text-align: var(--bs-body-text-align); background-color: var(--bs-card-bg);"><strong>Designed
                                            &amp; Developed&nbsp;</strong>by&nbsp;<span style="color: #0000ff;"><a
                                                href="https://pentanikit.com/" target="_blank" rel="noopener">Pentanik
                                                IT</a>.</span></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer Top End-->
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSetting } from '@/composables/useSetting';
const router = useRouter();

const {
    data: footerItem,
    processedLinks,
    pending,
    error
} = useSetting();

const footerData = computed(() => footerItem.value || {});

// console.log(footerData.value);

const generateLink = (index) => {
  const slug = processedLinks.value[index];

  // Redirect to the correct route if it's "contact-us"
  if (slug === "contact-us") {
    return '/contact-us';
  }

  // Otherwise return the dynamic route
  return `/footer-menu/${slug}`;
};

</script>

<style>
.footer-logo {
    width: 100%;
    height: 97px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
.footer-logo img {
    width: 233px;
    height: 83px;
    display: flex;
    justify-content: center;
    padding: 10px;
    padding-top: 20px;
}
</style>