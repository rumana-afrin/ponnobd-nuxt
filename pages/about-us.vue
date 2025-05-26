<template>
    <section class="breadcrumb" data-ll-status="entered">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="bread d-flex justify-content-center align-items-center">
                        <h2>About Us</h2>
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
                            <h4>{{ ceoSpeechTitle }}</h4>
                            <p class="pb-5 about-content" v-html="ceoDescription"></p>
                        </div>
                    </div>
                    <div class="contentpage">
                        <div class="ceospace">
                            <h4>{{ title }}</h4>
                            <p class="pb-5 about-content" v-html="description"></p>
                        </div>
                        <div class="ceospace">
                            <h4>{{ serviceTitle[0] }}</h4>
                            <p class="pb-5 about-content" v-html="serviceDescription[0]"></p>
                        </div>
                        <div class="ceospace">
                            <h4>{{ serviceTitle[1] }}</h4>
                            <p class="pb-5 about-content" v-html="serviceDescription[1]"></p>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </section>
</template>
<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSetting } from '@/composables/useSetting';
const {
    ceoSpeechTitle,
    ceoDescription,
    description,
    serviceDescription,
    serviceTitle,
    title
} = useSetting();

//meta data
const { data: metainfo } = await useAsyncData('about-meta', () =>
  $fetch('http://127.0.0.1:8000/api/about-meta')
);
useHead(() => ({
  title: metainfo.value?.site_meta_title || 'About Us',
  meta: [
    {
      property: 'title',
      content: `About Us - ${metainfo.value?.site_meta_title}`
    },
    {
      name: 'keywords',
      content: metainfo.value?.site_meta_keywords
    },
    {
      property: 'og:title',
      content: metainfo.value?.site_meta_title
    },
    {
      property: 'og:description',
      content: metainfo.value?.site_meta_description
    },
    {
      name: 'description',
      content: metainfo.value?.site_meta_description
    },
    {
      property: 'og:image',
      content: metainfo.value?.site_meta_image
    },
    {
      property: 'og:image:secure_url',
      content: metainfo.value?.site_meta_image
    },
    {
      property: 'og:image:alt',
      content: metainfo.value?.site_meta_title
    },
    {
      name: 'twitter:title',
      content: metainfo.value?.site_meta_title
    },
    {
      name: 'twitter:description',
      content: metainfo.value?.site_meta_description
    },
    {
      name: 'twitter:image',
      content: metainfo.value?.site_meta_image
    }
  ]
}))
</script>

<style></style>