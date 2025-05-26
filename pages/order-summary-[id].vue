<template>
    <!-- Breadcrumb Start Here -->
    <div class="breadcrumb">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb--wrapper">
                        <h2 class="breadcrumb--title fw--400"> Order #85946 </h2>
                        <ul class="breadcrumb--list">
                            <li class="breadcrumb--item"><a href="index.html" class="breadcrumb--link">Home</a></li>
                            <li class="breadcrumb--icon"></li>
                            <li class="breadcrumb--item"> <span class="breadcrumb--item--text"> Order #85946 </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb End Here -->
    <section class="order-summary py-10">
        <div class="container">
            <div class="row gy-3">
                <div class="col-lg-7">
                    <div class="row gy-3">
                        <div class="col-lg-12">
                            <div class="base--card">
                                <div
                                    class="summary-content--wrap d-flex flex-column align-items-start justify-content-start">
                                    <h6 class="fs--22 mb-2"><i class="fa-regular fa-circle-check"></i> Confirmed</h6>
                                    <div class="ms-4 mb-4">
                                        <p>Order at - {{ updated_at }}</p>
                                        <p>We've received your order</p>
                                    </div>
                                    <ul class="ms-4 d-flex flex-column justify-content-start gap--12">
                                        <li>
                                            <h6 class="fs--18 mb-0">Submitted</h6>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="base--card">
                                <h6>Order Details</h6>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <ul class="d-flex flex-column gap--12">
                                            <li>
                                                <p>Shipping Address</p>
                                                <div class="p-0 m-0" v-for="(value, key) in billing" :key="key">
                                                    <p class="text--black fw--700 p-0 m-0">{{ key.replace('_', ' ') }}:
                                                        {{ value
                                                        }}
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-lg-6">
                                        <ul class="d-flex flex-column gap--12">
                                            <li>
                                                <p>Payment</p>
                                                <p class="text--black fw--700">Cash On Delivery -Tk {{ totals }}</p>
                                            </li>
                                            <li>
                                                <p>Billing Address</p>
                                                <div class="p-0 m-0" v-for="(value, key) in billing" :key="key">
                                                    <p class="text--black fw--700 p-0 m-0">{{ key.replace('_', ' ') }}:
                                                        {{ value
                                                        }}
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="row gy-3">
                        <div class="col-lg-12">
                            <div class="base--card">
                                <h6  v-if="totals">Tk {{ totals }} BDT</h6>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="base--card">
                                <h6>Order summary</h6>
                                <div class="product-list--wrap d-flex flex-column gap--12 mb-5">
                                    <div class="order-product--card d-flex justify-content-between align-items-center gap--16 border-top--none"
                                        v-for="item in details" :key="item.index">
                                        <div class="thumb--wrap position-relative flex-shrink-0">
                                            <img class="fit--img" :src="item.product.thumbnail_url" alt="..." />
                                            <div
                                                class="count position-absolute d-flex justify-content-center align-items-center">
                                                <p class="text--white fw--600 text--sm">99</p>
                                            </div>
                                        </div>
                                        <div class="content--wrap">
                                            <div class="title">
                                                <h6 class="fs--14 mb-0">{{ item.product.name }}</h6>
                                            </div>
                                        </div>
                                        <div class="flex-shrink-0">
                                            <p>Tk {{ item.product.unit_price }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="price--erap">
                                    <ul class="d-flex flex-column justify-content-between gap--16">
                                        <li class="d-flex justify-content-between align-items-center">
                                            <h6 class="mb-0">Total</h6>
                                            <p>Tk {{ totals }}</p>
                                        </li>
                                    </ul>
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
import { ref } from 'vue'
const route = useRoute();
const orderId = route.params.id;

const updated_at = ref('');

const totals = ref('');
const details = ref([]);

const billing = ref({});

function formatDate(dateString) {
 const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
}
const { data: orderData } = await useFetch(`http://127.0.0.1:8000/api/order-summary/${orderId}`);
// console.log(orderData.value);
if (orderData.value.orderDetails) {
    const od = orderData.value.orderDetails
    updated_at.value = formatDate(od.updated_at)
    totals.value = od.total
    details.value = od.detail
    billing.value = JSON.parse(od.billing)


    console.log(totals.value);


};

</script>

<style></style>