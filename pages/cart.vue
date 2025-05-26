<template>
    <div>

        <!-- Breadcrumb Start Here -->
        <div class="breadcrumb">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="breadcrumb--wrapper">
                            <h2 class="breadcrumb--title fw--400">Cart </h2>
                            <ul class="breadcrumb--list">
                                <li class="breadcrumb--item"><a href="index.html" class="breadcrumb--link">Home</a></li>
                                <li class="breadcrumb--item"> / </li>
                                <li class="breadcrumb--item"> <span class="breadcrumb--item--text"> All Cart </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Breadcrumb End Here -->
        <section class="all-cart--list py-10">
            <div class="container">
                <div class="row border-bottom--solid1 d-none d-md-flex">
                    <div class="col-lg-6 col-md-4">
                        <h6>Product</h6>
                    </div>
                    <div class="col-lg-2 col-md-2">
                        <h6>Price</h6>
                    </div>
                    <div class="col-lg-2 col-md-3">
                        <h6>Quantity</h6>
                    </div>
                    <div class="col-lg-2 col-md-3">
                        <h6>Total</h6>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-lg-12">
                        <div class="product-list border-bottom--solid1">
                            <div class="row gy-3 align-items-center mt-3" v-for="item in cartItems" :key="item.id">
                                <div class="col-lg-6 col-md-4">
                                    <div class="content--wrap d-flex align-items-baseline gap--20">
                                        <div class="thumb--wrap">
                                            <img v-if="item.image" :src="item.image" alt="..." width="100" height="100">
                                        </div>
                                        <div class="title--wrap">
                                            <h6 class="h6 fw--400">{{ item.name }}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 d-none d-md-block">
                                    <div class="price--wrap flex-shrink-0">
                                        <h6 class="h6 price fw--400">{{ item.price }}</h6>
                                    </div>
                                </div>
                               <div class="col-lg-2 col-md-3 d-flex justify-content-lg-start justify-content-end">
                                <div class="quantity_box border--base d-flex justify-content-center align-items-center">
                                    <button type="button" class="sub" @click="decreaseQuantity(item.id)"><i
                                            class="fa fa-minus"></i></button>
                                    <input class="count-input" type="number" v-model="item.quantity">
                                    <button type="button" class="add" @click="incriseQuantity(item.id)"><i
                                            class="fa fa-plus"></i></button>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-3 d-flex justify-content-lg-start justify-content-end">
                                <div
                                    class="total-price--wrap flex-shrink-0 d-flex justify-content-center align-items-center">
                                    <h6 class="h6 price fw--400 m-0">{{ TotalPrice(item.price, item.quantity) }}</h6>
                                </div>
                                <div
                                    class="total-price--wrap flex-shrink-0 d-flex justify-content-center align-items-center">

                                    <a href="javascript:void(0)" class="removeElement ps-4"
                                        @click="removeItem(item.id)">
                                        <h6 class="h6 price fw--400 m-0">Remove</h6>
                                    </a>
                                </div>
                            </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-end">
                    <div class="col-lg-4 col-md-8">
                        <div
                            class="cart--footer2 d-flex flex-column gap--20 justify-content-center align-items-center w--100 position-relative">
                            <div class="d-flex justify-content-between align-items-center w--100">
                                <h6 class="mb-0">Subtotal:</h6>
                                <h6 class="mb-0">Tk {{ subTotal.toFixed(2) }}</h6>
                            </div>
                            <div class="d-flex flex-column justify-content-center align-items-center gap--12 w--100">
                                <button class="btn btn--base w-100 btn--lg w--100" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">
                                    Proceed To Checkout</button>
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
</script>

<style scoped></style>