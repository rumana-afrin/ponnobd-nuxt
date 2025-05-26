<template>
  <section class="breadcrumb" data-ll-status="entered">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="bread d-flex justify-content-center align-items-center">
            <h2>{{ content.name }}</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="aboutpage">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="contentpage">
            <div class="ceospace">
              <p class="pb-5 mt-3 about-content" v-html="content.content"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from '#app'
const route = useRoute();
const slug = route.params.slug;

const { data: content, pending, error } = await useAsyncData(
  // use slug as a unique key
  `footerpage-${slug}`,
  () => $fetch(`http://127.0.0.1:8000/api/footer-menu-page/${slug}`)
);


//meta data
const { data: metainfo } = await useAsyncData('home-meta', async () => {
  const res = await $fetch('http://127.0.0.1:8000/api/home-meta')
  return res
});
useHead({
  title: metainfo.value.site_meta_title,
  meta: [
    { name: 'description', content: metainfo.value.site_meta_description },
    { name: 'keywords', content: metainfo.value.site_meta_keywords },

    { property: 'og:title', content: metainfo.value.site_meta_title },
    { property: 'og:description', content: metainfo.value.site_meta_description },
    { property: 'og:image', content: metainfo.value.site_meta_image },
    { property: 'og:image:secure_url', content: metainfo.value.site_meta_image },
    { property: 'og:image:alt', content: metainfo.value.site_meta_title },

    { name: 'twitter:title', content: metainfo.value.site_meta_title },
    { name: 'twitter:description', content: metainfo.value.site_meta_description },
    { name: 'twitter:image', content: metainfo.value.site_meta_image }
  ]
})
</script>
<style>
</style>