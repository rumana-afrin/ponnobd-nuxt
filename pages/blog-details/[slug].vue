<template>
    <section class="breadcrumb" data-ll-status="entered">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="bread d-flex justify-content-center align-items-center">
                        <h2>Blog</h2>
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
                            <div class="imge" v-if="blog">
                                <h1>{{ blog.title }}</h1>
                                <img v-if="blog.thumbnail" :src="blog.thumbnail" alt="">
                                <p class="mt-5" v-html="blog.description"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRoute, useFetch } from '#app'
const route = useRoute();
const slug = route.params.slug

const blog = ref({});
const { data: product } = await useFetch(`http://127.0.0.1:8000/api/blog-details/${slug}`);

if (product.value) {
    blog.value = product.value.blog;
};
//meta data
// Optionally clean the description (like your `pureContent()` function)
const cleanDescription = blog.value?.meta_description?.replace(/<[^>]+>/g, '') || '';
useHead(() => ({
  title: blog.value?.meta_title,
  meta: [
    { property: 'title', content: blog.value?.meta_title },
    { name: 'keywords', content: blog.value?.meta_keywords },
    { property: 'og:title', content: blog.value?.meta_title },
    { property: 'og:description', content: cleanDescription },
    { name: 'description', content: cleanDescription },
    { property: 'og:image', content: blog.value?.thumbnail || '' },
    { property: 'og:image:secure_url', content: blog.value?.thumbnail || '' },
    { name: 'twitter:title', content: blog.value?.meta_title },
    { name: 'twitter:description', content: cleanDescription },
    { name: 'twitter:image', content: blog.value?.thumbnail || '' }
  ]
}));
</script>
<style></style>