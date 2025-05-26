<template>
    <div>
        <!-- all product -->
        <div class="d-flex justify-content-center p-5" v-if="pending">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <!-- < Hero Section -->
        <section v-else class="hero bg--white">
            <div class="container position-relative px-0">
                <div class="hero--content w--100">
                    <div class="row gy-2">
                        <div class="col-md-6" v-if="galleries.length > 0">
                            <div class="hero-right--thumb radius--8 overflow--hidden">
                                <img class="fit--img" v-if="galleries[0]?.file_url" :src="galleries[0]?.file_url"
                                    alt="Gallery Image" loading="lazy">
                            </div>
                        </div>
                        <div class="col-md-6" v-if="galleries.length > 1">
                            <div class="hero-left--thumb mb-3 radius--8 overflow--hidden">
                                <img class="fit--img" v-if="galleries[1]?.file_url" :src="galleries[1]?.file_url"
                                    alt="Gallery Image" loading="lazy">
                            </div>
                            <div class="row">
                                <div v-for="(image, index) in galleries.slice(2, 4)" :key="index"
                                    class="col-md-6 col-6">
                                    <div class="hero-img3 radius--8 overflow--hidden">
                                        <img class="fit--img" v-if="image?.file_url" :src="image?.file_url"
                                            alt="Gallery Image" loading="lazy">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="category-listing" bis_skin_checked="1" v-for="(category, index) in categories"
                            :key="index">
                            <NuxtLink to="">
                                <img v-if="category.file_url" :src="category.file_url" :alt="category.name">
                                <span class="ciname">{{ category.name }}</span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--  Hero Section />-->
        <div class="d-flex justify-content-center p-5" v-if="pending">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <!-- all product -->
        <section v-else class="browse--section py-10">
            <div class="container mt-2" v-for="section in productsBySection" :key="section.id">
                <div class="row gy-5 justify-content-center">
                    <div class="col-xl-7 col-lg-12 col-md-8">
                        <div
                            class="section-content-4 d-flex justify-content-center flex-column align-items-center mb-3 mt-3">
                            <h6 class="title text-center fs--32 fw--600 splite-text mb-2" data-splitting
                                data-wow-delay="0.2s">
                                {{ section.section_name }}</h6>
                            <p class="text--black text-center fw--600">Pentanik offers Eco friendly Air Conditioners
                                (AC)
                                that provide cool, clean and suitable air for your family</p>
                        </div>
                    </div>
                </div>
                <div class="row gy-4 justify-content-center">
                    <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6" v-for="product in section.products"
                        :key="product.id">
                        <div class="product--card radius--8">
                            <div class="tag--wrap">
                                <p class="text">Save: {{ Math.round(((product.unit_price - product.discount) /
                                    product.unit_price) * 100) }}%</p>
                            </div>

                            <NuxtLink :to="{ name: 'product-slug', params: { slug: product.slug } }"
                                class="thumb--wrap d-block">
                                <img class="productthumb fit--img" v-if="product.thumbnail_img"
                                    :src="product.thumbnail_img" alt="...">
                            </NuxtLink>

                            <div class="content--wrap">
                                <NuxtLink :to="{ name: 'product-slug', params: { slug: product.slug } }"
                                    class="d-block">
                                    <h6 class="title fs--14 fw--500 mb-2">{{ product.name }}</h6>
                                </NuxtLink>
                            </div>
                            <div
                                class="price--wrap d-flex justify-content-center align-items-center flex-wrap gap--8 mb-3">
                                <h6 class="price fs--14 fw--700 text--danger mb-0">{{ product.discount }} Tk</h6>
                                <h6 class="old--price fs--14 fw--700  mb-0">{{ product.unit_price }} Tk</h6>
                            </div>
                            <div class="btn--wrap">
                                <NuxtLink :to="{ name: 'product-slug', params: { slug: product.slug } }"
                                    class="btn btn--base w--100">Buy Now</NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        <!-- footer top section -->
        <section class="footertop">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="contentwrp" v-html="footerContent"></div>
                    </div>
                </div>
            </div>
        </section>
        <!-- footer top section -->

    </div>

</template>

<script setup>
const productsBySection = ref([]);
const galleries = ref([]);
const footerContent = ref(null);
const categories = ref([]);
const { data, pending, error } = await useAsyncData(() =>
    $fetch('http://127.0.0.1:8000/api/landing-page')
)
console.log(data.value);

  if (data.value) {
  productsBySection.value = data.value.sections.map(section => ({
      section_name: section.section_name,
      products: section.products,
  }));

  galleries.value = data.value.galleries;
  footerContent.value = data.value.footer_content;

  categories.value = data.value.cat_icon.map((icon, index) => ({
      file_url: icon.file_url,
      name: data.value.description[index] || "Category",
  }));

  useHead({
      title: data.value.meta.site_meta_title,
      meta: [
          { name: 'description', content: data.value.meta.site_meta_description },
          { name: 'keywords', content: data.value.meta.site_meta_keywords },
          { property: 'og:title', content: data.value.meta.site_meta_title },


          
          { property: 'og:description', content: data.value.meta.site_meta_description },
          { property: 'og:image', content: data.value.meta.site_meta_image },
          { property: 'og:image:secure_url', content: data.value.meta.site_meta_image },
          { property: 'og:image:alt', content: data.value.meta.site_meta_title },
          { name: 'twitter:title', content: data.value.meta.site_meta_title },
          { name: 'twitter:description', content: data.value.meta.site_meta_description },
          { name: 'twitter:image', content: data.value.meta.site_meta_image }
      ]
  });
} else {
  console.error("Landing page data is missing or failed to load");
}

</script>
