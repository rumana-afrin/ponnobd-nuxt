<template>
    <section class="breadcrumb" data-ll-status="entered">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="bread d-flex justify-content-center align-items-center">
                        <h2>Contuct Us</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="officeaddress">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <div class="row">
                        <div class="col-md-4" v-for="(text, index) in location_title" :key="index">
                            <div class="offaddwrp MIRPUR">
                                <h3>
                                    {{ text }}
                                </h3>
                                <div class="offadd">
                                    <p class="text-start"><i class="bi bi-geo-alt"></i>{{ location_description[index] }}
                                    </p>
                                    <a href="">{{ location_phone[index] }}</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-md-4">
                    <h3>{{ headoffice_title }}</h3>
                    <p class="d-flex align-items-center"><i class="bi bi-geo-alt-fill"></i>{{ headoffice_address }}
                    </p>
                    <p class="d-flex align-items-center"><i class="bi bi-envelope-fill"></i>{{ headoffice_email }}
                    </p>
                    <p class="d-flex align-items-center"><i class="bi bi-telephone-fill"></i>{{ headoffice_phone }}
                    </p>
                </div>
            </div>
        </div>
    </section>
    <section class="contactarea">
        <div class="container">
            <div class="row">
                <div class="col-md-6 p-5">
                    <h1>Let’s Talk</h1>
                    <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <form wire:submit.prevent='submit()'>
                        <div class="form-group mb-4">
                            <label for="name">Your Name</label>
                            <input type="text" class="form-control" id="name">
                        </div>
                        <div class="form-group mb-4">
                            <label for="email">Your Name</label>
                            <input type="email" class="form-control" id="name">
                        </div>
                        <div class="form-group mb-4">
                            <label for="pwd">Your message</label>
                            <textarea class="form-control" cols="30" rows="10"></textarea>
                        </div>
                        <button type="submit" class="btn btn-success submit">Submit</button>
                    </form>
                </div>
                <div class="col-md-6 p-5">
                    <div class="mapwrp mobile-map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7301.327066509591!2d90.373524!3d23.794993!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1211ac727e1%3A0x7a72f37f3a503427!2sPonnobd%20Electronics!5e0!3m2!1sen!2sbd!4v1692596405034!5m2!1sen!2sbd"
                                width="600" height="470" style="border:0;" allowfullscreen loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useSetting } from '@/composables/useSetting';
const {
       headoffice_title,
            headoffice_address,
            headoffice_email,
            headoffice_phone,
            location_title,
            location_description,
            location_phone
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
}));
</script>
<style>
.mapwrp iframe {
    background: #fffbf3;
    width: 100%;
    margin-top: 94px
}
.breadcrumb{
    padding: 54px 0px !important;
}
</style>
