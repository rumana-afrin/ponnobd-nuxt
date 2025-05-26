<template>
    <div>
        <!-- < add to cart components -->

        <!-- all product -->
        <section class="achive--section py-10">
            <div class="container">

                <div class="row gy-4">
                    <div class="col-xl-3 d-none d-xl-block">
                        <div class="filter--wrap d-flex flex-column gap--12">
                            <div class="range-slider" data-group-type="status">
                                <div class="label">
                                    <span>Price Range</span>
                                </div>
                                <div class="range-slider-box">
                                    <div class="slider-box mb-4 pb-2">
                                        <div class="sliderr">
                                            <div class="progresss" :style="{
                                                left: (minPrice / maxSlider) * 100 + '%',
                                                right: 100 - (maxPrice / maxSlider) * 100 + '%',
                                            }"></div>
                                        </div>
                                        <div class="range-input">
                                            <input type="range" class="range-min" :min="minSlider" :max="maxSlider"
                                                v-model="minPrice" @input="handleMin" />
                                            <input type="range" class="range-max" :min="minSlider" :max="maxSlider"
                                                v-model="maxPrice" @input="handleMax" />
                                        </div>
                                    </div>
                                    <div class="price-input d-flex justify-content-between align-items-center gap--24">
                                        <input class="form--control input-min" type="number" v-model="minPrice"
                                            :min="minSlider" :max="maxPrice" />
                                        <input class="form--control input-max" type="number" v-model="maxPrice"
                                            :min="minPrice" :max="maxSlider" />
                                    </div>
                                </div>
                            </div>

                            <div class="filter-group show" data-group-type="status">
                                <div class="label">
                                    <span>Availability</span>
                                </div>
                                <div class="items">
                                    <label class="filter">
                                        <input type="radio" name="in_stock" value="in_stock" v-model="availability">
                                        <span>In Stock</span>
                                    </label>
                                    <label class="filter">
                                        <input type="radio" name="out_stock" value="out_stock" v-model="availability">
                                        <span>Out Stock</span>
                                    </label>
                                </div>
                            </div>
                            <div class="filter-group show" data-group-type="status">
                                <div class="label">
                                    <span>Brand</span>
                                </div>
                                <div class="items">
                                    <label class="filter" v-for="(brandName, index) in brandNames" :key="index">
                                        <input type="checkbox" :value="brandName">
                                        <span>{{ brandName }}</span>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-xl-9 col-lg-12">
                        <div class="row mb-4">
                            <div class="col-lg-12">
                                <div class="base--card bg--white">
                                    <div class="row justify-content-between align-items-center">
                                        <div class="col-lg-3 col-md-4">
                                            <div class="title--wrap d-none d-xl-block">
                                                <!-- <h6 class="mb-0">{{ category.name }}</h6> -->
                                            </div>
                                        </div>
                                        <div class="col-lg-7 col-md-8">
                                            <div class="short--filter d-flex flex-wrap gap--16 justify-content-end">
                                                <div class="d-flex align-items-center gap--8 flex-shrink-0">
                                                    <p class="flex-shrink-0">Show:</p>
                                                    <select class="form-select form--select" v-model="selectedLimit">
                                                        <option v-for="option in limitOptions" :key="option"
                                                            :value="option">
                                                            {{ option }}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div class="d-flex align-items-center gap--8 flex-shrink-0">
                                                    <p class="flex-shrink-0">Sort by:</p>
                                                    <select class="form-select form--select" v-model="sort"
                                                        @change="fetchProducts">
                                                        <option v-for="option in sortProduct" :key="option"
                                                            :value="option">
                                                            {{ option }}</option>

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Loader -->
                        <div v-if="loading" class="row">
                            <div class="d-flex justify-content-center p-5">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>

                        <div class="row gy-4">

                            <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6" v-for="product in products"
                                :key="product.id">
                                <div class="product--card radius--8">
                                    <div class="tag--wrap">
                                        <p class="text">Save: {{ Math.round(((product.unit_price - product.discount) /
                                            product.unit_price) * 100) }}%</p>
                                    </div>
                                    <NuxtLink :to="{ name: 'product-slug', params: { slug: product.slug } }"
                                        class="thumb--wrap d-block">
                                        <img class="fit--img" v-if="product.thumbnail_img" :src="product.thumbnail_img"
                                            alt="...">

                                    </NuxtLink>
                                    <div class="content--wrap">
                                        <NuxtLink :to="{ name: 'product-slug', params: { slug: product.slug } }"
                                            class="d-block">
                                            <h6 class="title fs--14 fw--500 mb-2">{{ product.name }}</h6>
                                        </NuxtLink>
                                    </div>
                                    <div
                                        class="price--wrap d-flex justify-content-center align-items-center flex-wrap gap--8 mb-3">
                                        <h6 class="price fs--14 fw--700 text--danger mb-0">{{ product.discount }} Tk
                                        </h6>
                                        <h6 class="old--price fs--14 fw--700  mb-0">{{ product.unit_price }} Tk</h6>
                                    </div>
                                    <div class="btn--wrap">
                                        <NuxtLink :to="{ name: 'product-slug', params: { slug: product.slug } }"
                                            class="btn btn--base w--100">Buy Now</NuxtLink>
                                    </div>
                                </div>
                            </div>
                            <!-- pagination -->
                            <div>
                                <nav v-if="pagination.last_page > 1">
                                    <ul class="pagination">
                                        <li :class="`page-item ${!pagination.prev_page_url ? 'disabled' : ''}`">
                                            <a href="#" class="page-link"
                                                @click.prevent="paginationPage(pagination.current_page - 1)">‹</a>
                                        </li>
                                        <li v-for="(page, index) in visiblePages" :key="index"
                                            :class="`page-item ${pagination.current_page === page ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`">
                                            <a v-if="page !== '...'" href="#" class="page-link"
                                                @click.prevent="paginationPage(page)">{{ page }}</a>
                                            <span v-else class="page-link">...</span>
                                        </li>
                                        <li :class="`page-item ${!pagination.next_page_url ? 'disabled' : ''}`">
                                            <a href="#" class="page-link"
                                                @click.prevent="paginationPage(pagination.current_page + 1)">›</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <!-- pagination -->
                        </div>
                    </div>
                </div>

            </div>


        </section>
        <!-- add to cart components /> -->
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, watch, watchEffect } from 'vue'
const route = useRoute()
const router = useRouter()
// States
const loading = ref(false)
const query = ref(route.query.search || '')
const categorySlug = ref(route.params.slug || '')
const selectedLimit = ref(12)
const sort = ref('popularity')
const minPrice = ref(0)
const maxPrice = ref(450000)
const page = ref(1)

const products = ref([])
const pagination = ref({})
const brandNames = ref([])
const attributes = ref([])
const attributeModels = ref([])
const catName = ref('')
const category = ref('')

// For UI
const sortProduct = ref(['popularity', 'latest', 'low to high', 'high to low'])
const limitOptions = ref([12, 22, 33])

const fetchProducts = async () => {
    console.log("Fetching started")
    loading.value = true
    try {
        const response = await $fetch('http://127.0.0.1:8000/api/search-product', {
            method: 'GET',
            query: {
                query: query.value,
                limit: selectedLimit.value,
                sort: sort.value,
                min_price: minPrice.value,
                max_price: maxPrice.value,
                page: page.value
            }
        })

        if (response) {
            products.value = response.products?.data || []
            pagination.value = response.products || {}
            brandNames.value = [...new Set(products.value.map(p => p.brand?.name).filter(Boolean))]
            attributes.value = response.attributes || []
            attributeModels.value = response.attributeModels || []
        }
    } catch (err) {
        console.error("Fetch failed", err)
    } finally {
        loading.value = false
        console.log("Fetching finished")
    }
}



const fetchCategoryProducts = async () => {
    loading.value = true;
    try {
        const response = await $fetch(`http://127.0.0.1:8000/api/${categorySlug.value}`, {
            method: 'GET',
            params: {
                limit: selectedLimit.value,
                sort: sort.value,
                min_price: minPrice.value,
                max_price: maxPrice.value,
                page: page.value
            }
        })

        if (response) {
            products.value = response.products?.data ?? []
            pagination.value = response.products || {}
            category.value = response.category
            catName.value = response.category_name
            attributes.value = response.attributes
            attributeModels.value = response.attributeModels
            brandNames.value = [...new Set(products.value.map(p => p.brand?.name).filter(Boolean))]
        }
    } catch (err) {
        console.error("Fetch failed", err)
    } finally {
        loading.value = false
        console.log("Fetching finished")
    }
}

// Reactively refetch based on search or slug
watchEffect(async () => {
    page.value = 1 // reset page

    if (route.query.search) {
        query.value = route.query.search
        await fetchProducts()
    } else if (route.params.slug) {
        categorySlug.value = route.params.slug
        await fetchCategoryProducts()
    }
})

// Watch filter changes
watch(
    [selectedLimit, sort, minPrice, maxPrice],
    async () => {
        if (query.value) {
            await fetchProducts()
        } else if (categorySlug.value) {
            await fetchCategoryProducts()
        }
    }
)

// Pagination logic
const paginationPage = async (p) => {
    if (p < 1 || p > (pagination.value.last_page || 1)) return
    page.value = p
    if (query.value) {
        await fetchProducts()
    } else {
        await fetchCategoryProducts()
    }
}

// Visible page numbers
const visiblePages = computed(() => {
    const total = pagination.value.last_page || 1
    const current = pagination.value.current_page || 1
    const numberOfPage = 2
    const pages = []

    const range = {
        start: Math.max(2, current - numberOfPage),
        end: Math.min(total - 1, current + numberOfPage)
    }

    let hasLeftEllipsis = range.start > 2
    let hasRightEllipsis = range.end < total - 1

    pages.push(1)

    if (hasLeftEllipsis) pages.push('...')
    for (let i = range.start; i <= range.end; i++) pages.push(i)
    if (hasRightEllipsis) pages.push('...')
    if (total > 1) pages.push(total)

    return pages
})

// Scroll to top on data change
watch(products, () => {
    window.scrollTo(0, 0)
});

//meta data
const { data: metainfo } = await useAsyncData('categoryMeta', async () => {
    const res = await $fetch(`http://127.0.0.1:8000/api/category-meta/${categorySlug.value}`)
    return res.data;
});
const { data: metaSiteInfo } = await useAsyncData('home-meta', async () => {
    const res = await $fetch('http://127.0.0.1:8000/api/home-meta')
    return res
});
const cleanDescription = metainfo.value?.meta_description?.replace(/<[^>]+>/g, '') || metaSiteInfo.value?.site_meta_description || ''

useHead(() => ({
    title: metainfo.value?.meta_title || metaSiteInfo.value?.site_meta_title,
    meta: [
        { name: 'description', content: cleanDescription },
        { name: 'keywords', content: metainfo.value?.meta_keywords || metaSiteInfo.value?.site_meta_keywords },

        { property: 'og:title', content: metainfo.value?.meta_title || metaSiteInfo.value?.site_meta_title },
        { property: 'og:description', content: cleanDescription },
        { property: 'og:image', content: metainfo.value?.meta_img || metaSiteInfo.value?.site_meta_image },
        { property: 'og:image:secure_url', content: metainfo.value?.meta_img || metaSiteInfo.value?.site_meta_image },
        { property: 'og:image:alt', content: metainfo.value?.meta_title || metaSiteInfo.value?.site_meta_title },

        { name: 'twitter:title', content: metainfo.value?.meta_title || metaSiteInfo.value?.site_meta_title },
        { name: 'twitter:description', content: cleanDescription },
        { name: 'twitter:image', content: metainfo.value?.meta_img || metaSiteInfo.value?.site_meta_image }
    ]
}));
</script>
