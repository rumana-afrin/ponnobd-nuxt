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
                           
                            <div v-for="category in blogdatas" :key="category.id">
                                <h2 class="mt-3 p-3" v-if="category.posts && category.posts.length > 0">{{ category.name
                                }}</h2>
                                <div v-for="blogdata in category.posts" :key="blogdata.id" class="single-blog-post">
                                    <div class="blog-image p-3">
                                        <img v-if="blogdata.thumbnail" :src="blogdata.thumbnail" alt="">
                                    </div>
                                    <p class="p-3 mt-3 about-content"
                                        v-html="blogdata.showFullDescription ? blogdata.description : shortDes(blogdata.description)">
                                    </p>
                                    <NuxtLink :to="{ name: 'blog-details-slug', params: { slug: blogdata.slug } }"
                                        class="pb-4 ps-3 fw-semibold">See Details</NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
const blogdatas = ref([]);
const { data: blog, pending, error } = await useAsyncData('gallary', () =>
    $fetch('http://127.0.0.1:8000/api/blog')
);
if (blog.value) {
    blogdatas.value = blog.value.blog;
    console.log(blogdatas.value);
    
}

 const shortDes = (description) => {
            const maxLength = 500;  // Set max length of description
            if (description.length > maxLength) {
                return description.slice(0, maxLength) + '...'; // Add ellipsis if too long
            }
            return description;
        };

// meta data
const { data: metainfo } = await useAsyncData('home-meta', () =>
  $fetch('http://127.0.0.1:8000/api/home-meta')
)

useHead(() => ({
  title: metainfo.value?.site_meta_title,
  meta: [
    { property: 'title', content: metainfo.value?.site_meta_title },
    { name: 'keywords', content: metainfo.value?.site_meta_keywords },
    { property: 'og:title', content: metainfo.value?.site_meta_title },
    { property: 'og:description', content: metainfo.value?.site_meta_description },
    { name: 'description', content: metainfo.value?.site_meta_description },
    { property: 'og:image', content: metainfo.value?.site_meta_image },
    { property: 'og:image:secure_url', content: metainfo.value?.site_meta_image },
    { name: 'twitter:title', content: metainfo.value?.site_meta_title },
    { name: 'twitter:description', content: metainfo.value?.site_meta_description },
    { name: 'twitter:image', content: metainfo.value?.site_meta_image }
  ]
}))
</script>
<style>
.short-description {
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>