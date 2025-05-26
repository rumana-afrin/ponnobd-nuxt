// composables/useSetting.js
import { computed } from 'vue';
import { useAsyncData } from 'nuxt/app';

export const useSetting = () => {
  const { data, pending, error } = useAsyncData('footer-setting', () =>
    $fetch('http://127.0.0.1:8000/api/footer'),
  {
    server: true, // enable SSR prefetch
    // lazy: true   // don't delay the fetch, fetch immediately
     //lazy: false, // delay the fetch, fetch immediately
    initialCache: true
  }
  );
  const processedLinks = computed(() => {
    return (data.value?.slug_from_url || []).map(link =>
      link.replace(/^\/?page\//, '').replace(/^\/?\//, '')
    );
  });

  return {
    data,
    pending,
    error,
    processedLinks,
    title: computed(() => data.value?.about_title || ''),
    description: computed(() => data.value?.about_description || ''),
    ceoSpeechTitle: computed(() => data.value?.ceo_speech_title || ''),
    ceoDescription: computed(() => data.value?.ceo_description || ''),
    serviceTitle: computed(() => data.value?.service_title || ''),
    serviceDescription: computed(() => data.value?.service_description || ''),
    location_title: computed(() => data.value?.location_title || ''),
    location_description: computed(() => data.value?.location_description || ''),
    location_phone: computed(() => data.value?.location_phone || ''),
    headoffice_address: computed(() => data.value?.headoffice_address || ''),
    headoffice_title: computed(() => data.value?.headoffice_title || ''),
    headoffice_email: computed(() => data.value?.headoffice_email || ''),
    headoffice_phone: computed(() => data.value?.headoffice_phone || ''),
  };
};
