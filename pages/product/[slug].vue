<template>
    <div>
        <!-- product details section -->
        <!-- < product details  -->
        <section class="product-details bg--white py-50">
            <div class="container">

                <div class="row gy-4 mb-2">
                    <div class="col-xxl-6 col-xl-7 col-lg-7">
                        <div class="row gy-4 flex-wrap-reverse">

                            <!-- Thumbnail images -->
                            <div class="col-xxl-2 col-xl-2 col-lg-3">
                                <div class="product-all--img">
                                    <ClientOnly>
                                        <a v-for="(photo, index) in products.photos" :key="index" :href="photo.url"
                                            :data-image="photo.url" data-zoom-id="productImg">
                                            <img v-if="photo.url" :src="photo.url" />
                                        </a>
                                    </ClientOnly>
                                </div>
                            </div>

                            <!-- Main zoomable image -->
                            <div class="col-xxl-10 col-xl-10 col-lg-9">
                                <div class="product--thumb">
                                    <ClientOnly>
                                        <a :href="products.thumbnail_img" class="MagicZoom" id="productImg"
                                            data-options="zoomWidth:500;zoomHeight:500;zoomPosition:inner;zoomDistance:3;selectorTrigger:hover;lazyZoom:true;rightClick:true;variableZoom:true;"
                                            data-mobile-options="zoomMode:zoom;textClickZoomHint:Double tap to zoom;">
                                            <img v-if="products.thumbnail_img" class="fit--img"
                                                :src="products.thumbnail_img" />
                                        </a>
                                    </ClientOnly>
                                </div>
                            </div>

                        </div>


                    </div>

                    <div class="col-xxl-6 col-xl-5 col-lg-5">
                        <div class="details-wrap">
                            <div class="title--wrap mb-3">
                                <h6 class="title fs--48 fw--500">{{ products.name }}</h6>
                            </div>
                            <ul class="details--list d-flex flex-column gap--8 mb-3"
                                v-html="products.short_description">
                            </ul>
                            <div class="support--number mb-3">
                                <p class="text--base fw--600 fs--20">Call for details : <NuxtLink
                                        to="tel:+8800000000000" class="text--base"> +880 1856-11 13 13</NuxtLink>
                                </p>
                            </div>
                            <ul
                                class="product--status d-flex flex-wrap justify-content-start align-items-center gap--12">
                                <li class="price">
                                    <p class="fs--14">Price: <span class="fw--900">{{ product.discount }}</span>&nbsp
                                        <span class="del--price text--sm">{{ products.unit_price }}</span>
                                    </p>
                                </li>
                                <li class="price">
                                    <p class="fs--14">Status: <span class="fw--900">In Stock</span></p>
                                </li>
                                <li>
                                    <button class="btn btn--base pill" data-bs-toggle="modal"
                                        data-bs-target="#staticcart">Add To Cart</button>

                                    <!-- modal -->
                                    <div class="modal fade" id="staticcart" data-bs-backdrop="static"
                                        data-bs-keyboard="false" tabindex="-1" aria-labelledby="addtocart"
                                        aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="addtocart">Product added
                                                        successfully
                                                        for
                                                        order</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="row product-popup">
                                                        <div class="col-12 col-sm-12 col-md-12 col-lg-4">
                                                            <img v-if="products.thumbnail_img"
                                                                :src="products.thumbnail_img" alt="" width="200"
                                                                height="250">
                                                        </div>
                                                        <div class="col-12 col-sm-12 col-md-12 col-lg-8">
                                                            <h5 class="mb-2">{{ products.name }}</h5>

                                                            <p class="p-0 m-0">Quantity: 1</p>
                                                            <p class="p-0 m-0">Price: Tk{{ products.price }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <NuxtLink class="add-item" to="/" @click.prevent="continueShopping">
                                                        <button class="cartbtn" type="button">Continue Shopping</button>
                                                    </NuxtLink>
                                                    <NuxtLink class="add-item" to=""
                                                        @click.prevent="order(products.id)"><button class="cartbtn"
                                                            type="button">Go to
                                                            Order</button></NuxtLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- modal -->

                                </li>
                                <li>
                                    <NuxtLink to="" @click.prevent="addToCart(products.id)" class="btn btn--success">
                                        Order Now</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row gy-5 mt-4">
                    <div class="col-lg-12">
                        <div class="ticket--description radius--8 card--bg">
                            <div class="tab-pane fade active show" id="buy" role="tabpanel" aria-labelledby="buy-tab">
                                <ul class="nav nav-tabs custom--tabs justify-content-center mb-2" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="Win-tab" data-bs-toggle="tab"
                                            data-bs-target="#specifications" type="button" role="tab"
                                            aria-selected="false" tabindex="-1">Specifications</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="Instruction-tab" data-bs-toggle="tab"
                                            data-bs-target="#feature" type="button" role="tab"
                                            aria-selected="true">Description</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="Purchased-tab" data-bs-toggle="tab"
                                            data-bs-target="#gallery" type="button" role="tab" aria-selected="false"
                                            tabindex="-1">Gallery</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="support-tab" data-bs-toggle="tab"
                                            data-bs-target="#support" type="button" role="tab" aria-selected="false"
                                            tabindex="-1">Support</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="video-tab" data-bs-toggle="tab"
                                            data-bs-target="#video" type="button" role="tab" aria-selected="false"
                                            tabindex="-1">Video</button>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane fade active show" id="specifications" role="tabpanel"
                                        aria-labelledby="Win-tab">
                                        <div class="row justify-content-start">
                                            <div class="col-lg-8">
                                                <table class="table table-striped" v-html="products.description">
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="feature" role="tabpanel"
                                        aria-labelledby="Instruction-tab">
                                        <div class="details-wrap mb-4" v-html="products.short_description"></div>
                                    </div>
                                    <div class="tab-pane fade" id="gallery" role="tabpanel"
                                        aria-labelledby="Purchased-tab">
                                        <div class="gallery--thumb" v-for="photo in products.photos">
                                            <img v-if="photo.url" :src="photo.url" alt="...">
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="support" role="tabpanel"
                                        aria-labelledby="support-tab">
                                        <div class="details-wrap mb-4">

                                            <ul class="details--list d-flex flex-column gap--8 mb-3"
                                                v-html="products.support_description">
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="video" role="tabpanel" aria-labelledby="video-tab">
                                        <div v-html="products.product_video"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </section>
    </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter, useFetch } from '#app'
const router = useRouter();
const route = useRoute();
const cart = useCartStore();
onMounted(() => {
    cart.loadFromStorage();
});


const slug = route.params.slug
const products = ref({})

// Fetch product and trigger MagicZoom when ready
// const { data: product } = await useFetch(`http://127.0.0.1:8000/api/product/${slug}`);

const { data: product } = await useAsyncData(() =>
    $fetch(`http://127.0.0.1:8000/api/product/${slug}`)
);

if (product.value) {
    products.value = product.value
};

// Define the MagicZoom initializer

onMounted(async () => {
    await nextTick()
    setTimeout(() => {
        try {
            if (window.MagicZoom) {
                window.MagicZoom.refresh()
            } else {
                console.warn('MagicZoom not found')
            }
        } catch (error) {
            console.error("MagicZoom refresh failed:", error)
        }
    }, 500)
})

// Optional: watch for dynamic product changes
watch(() => products.value, async () => {
    await nextTick()
    setTimeout(() => {
        if (window.MagicZoom) {
            window.MagicZoom.refresh()
        }
    }, 500)
})
// Define the MagicZoom initializer

const modals = () => {
    const modalEl = document.getElementById('staticcart');
    if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
    }
};

const continueShopping = () => {
    modals();
    setTimeout(() => {
        router.push('/');
    }, 300);
};
const caratData = ref({})
const addToCart = async (productId) => {
    try {
        const productData = await $fetch(`http://127.0.0.1:8000/api/cart/${productId}`);

        if (productData) {
            caratData.value = productData;
        }


        const product = {
            id: caratData.value.id,
            name: caratData.value.name,
            price: caratData.value.unit_price,
            quantity: 1,
            image: caratData.value.thumbnail_img,
        };
        // console.log(product);

        cart.addItem(product);
        modals();
        setTimeout(() => {
            router.push('/cart');
        }, 300);

    } catch (error) {
        console.error('Add to cart failed:', error);
    }
};

const order = (productId) => {
    addToCart(productId);
};


</script>


<style scoped>
.cartbtn {
    width: 100%;
    padding: 6px;
    border-radius: 2px;
    background-color: rgb(49 56 47);
    color: white;
    font-family: var(--font);
    font-size: 16px;
    font-weight: 500;
}
</style>
