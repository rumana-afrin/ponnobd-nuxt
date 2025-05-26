<template>
    <div>
        <!-- Header Start -->
        <div class="header-main-area">
            <div class="header" id="header">
                <div class="container-fluid position-relative">
                    <div class="header-wrapper">
                        <!-- ham menu -->
                        <i class="fa-sharp fa-solid fa-bars-staggered ham__menu" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"></i>
                        <!-- logo -->
                        <div class="header-menu-wrapper align-items-center d-flex">
                            <div class="logo-wrapper">
                                <NuxtLink to="/" class="normal-logo" id="normal-logo">
                                    <img :src="footerData.header_logo" alt="...">
                                </NuxtLink>
                            </div>
                            <div class="menu-list-wrapper d-flex align-items-center position-relative"
                                ref="menuContainer">
                                <button class="search-toggle--btn"><i
                                        class="fa-solid fa-magnifying-glass text--black"></i></button>

                                <ul class="main-menu">
                                    <li class="position-relative" v-for="menu in menus" :key="menu.id">

                                        <NuxtLink :to="handleMenuClick(menu)" class="active menu-item"
                                            :id="`menu-item-${menu.id}`">
                                            {{ menu.name }}
                                        </NuxtLink>

                                        <ul class="sub-menu" v-if="menu.submenus && menu.submenus.length > 0"
                                            :id="`sub-menu-${menu.id}`" v-show="activeMenuId === menu.id">
                                            <li class="sub-menu-item" v-for="submenu in menu.submenus"
                                                :key="submenu.id">
                                                <NuxtLink :to="handleSubmenuClick(submenu.url)"
                                                    :target="submenu.target">
                                                    {{ submenu.name }}
                                                </NuxtLink>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>

                                <form @submit.prevent="searchProducts" class="search--form">
                                    <input v-model="query" class="header--input" placeholder="Search Product" />
                                    <button class="search--btn search-toggle--btn">
                                        <i class="fa-solid fa-magnifying-glass text--black"></i>
                                    </button>
                                </form>
                            </div>

                        </div>
                        <!-- / logo -->
                        <ul class="login-lng d-flex align-items-center gap--24">
                            <li class="position-relative">
                                <button class="cart--btn" @click="toggleCart"><i
                                        class="fa-solid fa-cart-shopping fs--18 text--white"></i></button>
                                <span class="count--item position-absolute">{{ cartTotal }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- Header section End -->

        <!-- Sidebar mobile menu wrap Start-->
        <div class="offcanvas offcanvas-start text-bg-light" tabindex="-1" id="offcanvasExample">
            <div class="offcanvas-header">
                <div class="logo">
                    <div class="align-items-center d-flex">
                        <div class="logo-wrapper">
                            <NuxtLink to="/" class="normal-logo" id="offcanvas-logo-normal">
                            <img :src="footerData.header_logo" alt="">
                        </NuxtLink>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn-close btn-close-black" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="sidebar-menu-list menutxt">

                    <li class="sidebar-menu-list__item" v-for="menu in menus" :key="menu.id">
                        <!-- Menu with submenu -->
                        <div v-if="menu.submenus && menu.submenus.length > 0"
                            class="sidebar-menu-list__link d-flex justify-content-between"
                            :id="`sidebar-submenu-list-${menu.id}`" @click="toggleSubMenu(menu.id)">
                            {{ menu.name }}
                            <span class="icon" :class="{ rotate: activeMenuId === menu.id }">
                                <i class="fa fa-chevron-down"></i>
                            </span>
                        </div>

                        <!-- Menu without submenu -->
                        <NuxtLink v-else :to="handleMenuClick(menu)" class="sidebar-menu-list__link"
                            :id="`sidebar-submenu-list-${menu.id}`">
                            {{ menu.name }}
                        </NuxtLink>

                        <!-- Submenu -->
                        <ul class="sidebar-submenu-list" v-if="menu.submenus && menu.submenus.length > 0"
                            :class="{ active: activeMenuId === menu.id }">
                            <li class="sidebar-submenu-list__item" v-for="submenu in menu.submenus" :key="submenu.id">
                                <NuxtLink :to="handleSubmenuClick(submenu.url)" class="sidebar-submenu-list__link"
                                    :target="submenu.target">
                                    {{ submenu.name }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </li>

                    <!-- <li class="sidebar-menu-list__item" v-for="menu in menus" :key="menu.id">
                        <div v-if="menu.submenus && menu.submenus.length > 0" class="sidebar-menu-list__link d-flex justify-content-between"
                            :id="`sidebar-submenu-list-${menu.id}`" @click="toggleSubMenu(menu.id)">
                            {{ menu.name }}
                            <span class="icon"><i class="fa fa-chevron-down"></i></span>
                        </div>

                        <NuxtLink v-else :to="handleMenuClick(menu)" class="sidebar-menu-list__link"
                            :id="`sidebar-submenu-list-${menu.id}`">
                            {{ menu.name }}
                        </NuxtLink>

                        <ul class="sidebar-submenu-list" v-if="menu.submenus && menu.submenus.length > 0"
                            v-show="activeMenuId === menu.id">
                            <li class="sidebar-submenu-list__item" v-for="submenu in menu.submenus" :key="submenu.id">
                                <NuxtLink :to="handleSubmenuClick(submenu.url)" class="sidebar-submenu-list__link"
                                    :target="submenu.target">
                                    {{ submenu.name }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </li> -->

                </ul>
            </div>
        </div>

        <!-- < add to cart components -->
        <div class="cart-box">
            <button class="close--btn"><i class="fa-solid fa-xmark"></i></button>
            <div class="cart-item--wrap">
                <div class="cart-item-card" v-for="item in cartItems" :key="item.id">
                    <div class="thumb">
                        <img s v-if="item.image" :src="item.image" alt="..." width="100" height="100">
                    </div>
                    <div class="content">
                        <NuxtLink to="">
                            <h6 class="fs--14 title">{{ item.name }}</h6>
                        </NuxtLink>
                        <p class="price text--black">{{ item.price }}</p>
                        <div class="user-cta d-flex jus align-items-center">
                            <div class="quantity_box border--base d-flex justify-content-center align-items-center">
                                <button type="button" class="sub" @click="decreaseQuantity(item.id)"><i
                                        class="fa fa-minus"></i></button>
                                <input class="count-input" type="number" v-model="item.quantity">
                                <button type="button" class="add" @click="incriseQuantity(item.id)"><i
                                        class="fa fa-plus"></i></button>
                            </div>
                        </div>
                        <p class="price text--black">{{ TotalPrice(item.price, item.quantity) }}</p>
                        <button class="trash-btn" @click="removeItem(item.id)">Remove</button>
                    </div>
                </div>
            </div>
            <div
                class="cart--footer d-flex flex-column gap--20 justify-content-center align-items-center w--100 position-absolute">
                <div class="d-flex justify-content-between align-items-center w--100">
                    <h6 class="mb-0">Subtotal:</h6>
                    <h6 class="mb-0">Tk {{ subTotal.toFixed(2) }}</h6>
                </div>
                <div class="d-flex flex-column justify-content-center align-items-center gap--12 w--100">
                    <button class="btn btn--base w-100 btn--lg w--100" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        Proceed To Checkout (19)</button>
                </div>
            </div>
        </div>

        <!--product order modal wrap -->
        <div class="modal modal--base fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="title fs--24 fw--600">Enter your information</h6>
                        <button type="button" class="btn--close" data-bs-dismiss="modal" aria-label="Close"><i
                                class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="modal-body">
                        <div class="row justify-content-center gy-4">
                            <div class="col-lg-12">
                                <form>


                                    <div class="input--wrap mb-3 d-flex justify-content-between align-items-center">
                                        <h6 class="mb-0">Name</h6>
                                        <div class="input-group  w--80">
                                            <span class="input-group-text" id="basic-addon1"><i
                                                    class="fa-solid fa-user"></i></span>
                                            <input type="text" class="form-control form--control border-left--none"
                                                v-model="name" placeholder="Name">
                                        </div>
                                    </div>
                                    <div class="input--wrap mb-3 d-flex justify-content-between align-items-center">
                                        <h6 class="mb-0">Phone</h6>
                                        <div class="input-group w--80">
                                            <span class="input-group-text" id="basic-addon1"><i
                                                    class="fa-solid fa-phone"></i></span>
                                            <input type="number" class="form-control form--control border-left--none"
                                                v-model="phone" placeholder="+880 000 00 00 000">
                                        </div>
                                    </div>

                                    <div class="input--wrap mb-3 d-flex justify-content-between align-items-center">
                                        <h6 class="mb-0">Address</h6>
                                        <div class="input-group w--80">
                                            <span class="input-group-text" id="basic-addon1"><i
                                                    class="fa-solid fa-location-dot"></i></span>
                                            <input type="text" class="form-control form--control border-left--none"
                                                v-model="address">
                                        </div>
                                    </div>

                                    <!-- shipping methods -->
                                    <div class="mb-3">
                                        <h6>Shipping Method</h6>
                                        <ul class="list-group">
                                            <li class="list-group-item">
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="form--radio">
                                                        <input class="form-radio-input filter-by-category"
                                                            name="categories" v-model="delivery" type="radio"
                                                            value="Inside Dhaka" id="5">
                                                        <label class="form-check-label" for="5">
                                                            Inside Dhaka
                                                        </label>
                                                    </div>
                                                    <div class="price">
                                                        <p class="fw--700" style="color: hsl(var(--base));">As per
                                                            Pathao or
                                                            Uber rent.</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item">
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="form--radio">
                                                        <input class="form-radio-input filter-by-category"
                                                            name="categories" type="radio" value="Outside Dhaka" id="6"
                                                            v-model="delivery">
                                                        <label class="form-check-label" for="6">
                                                            Outside Dhaka
                                                        </label>
                                                    </div>
                                                    <div class="price">
                                                        <p class="fw--700" style="color: hsl(var(--base));">By Courier
                                                            (But
                                                            10 % advance needed)</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <!-- shipping methods -->
                                    <!-- cart product list -->
                                    <div class="product-list--wrap d-flex flex-column gap--16 mb-3"
                                        v-for="item in cartItems" :key="item.id">
                                        <div
                                            class="order-product--card d-flex justify-content-between align-items-center gap--16">
                                            <div class="thumb--wrap position-relative flex-shrink-0">
                                                <img class="fit--img" v-if="item.image" :src="item.image" alt="...">
                                                <div
                                                    class="count position-absolute d-flex justify-content-center align-items-center">
                                                    <p class="text--white fw--600 text--sm">{{ item.quantity }}</p>
                                                </div>
                                            </div>
                                            <div class="content--wrap">
                                                <div class="title">
                                                    <h6 class="fs--14 mb-0">{{ item.name }}</h6>
                                                </div>
                                            </div>
                                            <!-- <div>
                                                <button class="fs--24"><i class="fa-solid fa-xmark"></i></button>
                                            </div> -->
                                        </div>
                                    </div>
                                    <!-- cart product list -->


                                    <div
                                        class="note d-flex flex-column justify-content-start align-items-start mb-3 w--100">
                                        <h6 class="">Order Note</h6>
                                        <div class="w--100 d-flex justify-content-between">
                                            <input type="text" class="form--control w--100" placeholder="Coupon Code"
                                                v-model="note">
                                        </div>
                                    </div>
                                    <!-- Note -->

                                    <!-- total price -->
                                    <div class="mb-3">
                                        <h6>Price</h6>
                                        <ul class="list-group">
                                            <li class="list-group-item">
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="text">
                                                        <p class="text--black">Subtotal</p>
                                                    </div>
                                                    <div class="price">
                                                        <p class="fs--18 fw--700 text--black">Tk {{ subTotal.toFixed(2)
                                                            }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <!-- total price -->


                                    <div class="d-flex justify-content-center mb-3">
                                        <a class="btn btn--base btn--lg mt-3 text-center w-100"
                                            @click="orderSummary">Click
                                            to
                                            confirm your order</a>
                                    </div>

                                    <div class="warnint--text">
                                        <h6 class="text--warning text-center fw--700">By clicking on the button above,
                                            your
                                            order will be confirmed immediately!</h6>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- modal wrap -->
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useSetting } from '@/composables/useSetting';

const router = useRouter();
const route = useRoute();
// Form Fields
const name = ref('');
const phone = ref('');
const address = ref('');
const note = ref('');
const delivery = ref('');

const cart = useCartStore();
const cartItems = computed(() => cart.items);

const subTotal = computed(() =>
    cartItems.value.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0)
);

// Calculate total price of a line item
const TotalPrice = (price, quantity) => {
    return price * quantity;
};

// Remove item from cart
const removeItem = (itemId) => {
    cart.removeItem(itemId);
};

// Increase quantity of a cart item
const incriseQuantity = (itemId) => {
    const item = cart.items.find(item => item.id === itemId);
    if (item) {
        item.quantity++;
        cart.updateTotalQuantity(itemId, item.quantity);
    }
};

// Decrease quantity of a cart item
const decreaseQuantity = (itemId) => {
    const item = cart.items.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity--;
        cart.updateTotalQuantity(itemId, item.quantity);
    }
};
const modals = () => {
    const modalEl = document.getElementById('exampleModal');
    if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
    }
};

// Cart Total Items
const cartTotal = computed(() => cart.totalItems());

const orderSummary = async () => {
    const orderData = {
        orders: cartItems.value.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            delivery: delivery.value,
        })),
        name: name.value,
        address: address.value,
        phone: phone.value,
        subTotal: subTotal.value,
        note: note.value,
        delivery: delivery.value,
    };

    // console.log(orderData);

    try {
        const response = await $fetch('http://127.0.0.1:8000/api/order', {
            method: 'POST',
            body: orderData,
        });

        if (response.status === 'success') {
            // cart.emptyCart();
            const orderId = response.order_id;
            modals();
            cart.emptyCart()
            setTimeout(() => {
                router.push(`/order-summary-${orderId}`);
            }, 300);
        } else {
            alert('Order failed!');
        }
    } catch (error) {
        console.error('Error:', error.data || error.message);
        alert('An error occurred while placing the order.');
    };


};
//menu
const menus = ref([]);
const activeMenuId = ref(null);

const toggleSubMenu = (menuId) => {
    activeMenuId.value = activeMenuId.value === menuId ? null : menuId;
};

const { data: menuData, pending, error } = await useFetch('http://127.0.0.1:8000/api/top-menu');
if (menuData.value) {
    menus.value = menuData.value.menu_name;
    // console.log('menu', menus.value);
};

const getSlugFromUrl = (url) => {
    if (!url || typeof url !== 'string') return '';
    const fixedUrl = url.replace(/([^:]\/)\/+/g, '$1');
    const parts = fixedUrl.split('/');
    return parts.filter(Boolean).pop() || '';
};;

const handleMenuClick = (menu) => {
    const slug = getSlugFromUrl(menu.url);

    // If no submenus or submenus are empty
    if (!menu.submenus || menu.submenus.length === 0) {
        if (slug === 'about-us') {
            return '/about-us';
        } else if (slug === 'contact-us') {
            return '/contact-us';
        } else if (slug === 'blog') {
            return '/blog';
        } else {
            return { name: 'category-slug', params: { slug } };
        }
    } else {
        // Has submenu, don't navigate or return category if needed
        return { name: 'category-slug', params: { slug } };
    }

    // Default fallback
    return '/';
};


const handleSubmenuClick = (url) => {
    const slug = getSlugFromUrl(url);
    if (!slug) return '/'; // fallback route
    return { name: 'category-slug', params: { slug } };
};


//search
const query = ref('')
const searchProducts = () => {
    // Check if you're already on a category page
    if (route.name === 'category-slug') {
        router.push({
            name: 'category-slug',
            params: { slug: route.params.slug },
            query: { search: query.value.trim() }
        })
    } else {
        // Default to a fallback category if none selected
        router.push({
            name: 'category-slug',
            params: { slug: 'all' }, // optional default/fallback
            query: { search: query.value.trim() }
        })
    }
}
//logo
const {
    data: footerItem,
    processedLinks,
} = useSetting();

const footerData = computed(() => footerItem.value || {});
const favicon = computed(() => footerItem.value?.site_icon || '/favicon.jpg');
useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: favicon.value, 
    }
  ]
});

</script>
<style scoped>
.sidebar-menu-list__link .icon {
    font-size: 13px !important;
}

.menutxt {
    font-size: 15px;
}

.sidebar-submenu-list {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 0.8s ease, opacity 0.8s ease !important;
}

.sidebar-submenu-list.active {
    max-height: 500px;
    opacity: 1;
}

.icon {
    transition: transform 0.8s ease !important;
}

.icon.rotate {
    transform: rotate(180deg);
}
</style>
0