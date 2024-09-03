<script setup>

// import { ref } from 'vue'
// import { useFetch } from '#app';
import { useDayjs } from '#dayjs' // not need if you are using auto import
const dayjs = useDayjs()

// Add / remove properties element
const properties = ref([{ key: '', value: '' }])

function addProperty() {
  properties.value.push({ key: '', value: '' })
}

function removeProperty(index) {
  properties.value.splice(index, 1)
}

// Use the `useFetch` function to fetch data from the API
const { data: devices, error } = await useFetch('http://localhost:8080/rest/status');

// Format date
const formattedData = computed(() => {
  return devices.value?.map(device => ({
    ...device,
    lastSeen: dayjs(device.lastSeen).format('DD.MM.YYYY HH:mm')
  })) || [];
}); 

// Protocol dropdown select 
const selected = ref([devices[1]]);

// Default sort
const sort = ref({
    column: 'deviceId',
    direction: 'desc'
})

// Error handling
if (error.value) {
    console.error('An error occurred while fetching data:', error.value);
}

// Log formatted data for debugging
watch(formattedData, (newData) => {
    console.log('Formatted Data:', newData);
});

</script>
<template>
    <div class="mx-auto mb-5 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <!-- Check for error -->
        <div v-if="error">
            <p>Error: {{ error.message }}</p>
        </div>
        <div v-else-if="devices">
            <!-- Protocol dropdown select -->
            <div class="select-command-container mb-4 flex">
                <USelect size="sm" class="" placeholder="Select command..." :options="['Send HTTP', 'Send MQTT']" />
            </div>
            <!-- Table with devices -->
            <UTable :sort="sort" v-model="selected" :rows="formattedData" />           
            <!-- Form with additional data -->
            <div class="mx-auto mt-5 mb-5 max-w-7xl">
                <div class="form-container">
                    <div class="topic-container flex mb-4">
                        <label class="text-sm font-medium text-gray-700 dark:text-gray-200" for="topic">Topic:
                            <UInput name="topic" />
                        </label>
                    </div>
                    <div class="retain-container mb-4">
                        <label for="retain">
                            <UCheckbox name="retain" label="Retain" />
                        </label>
                    </div>
                    <div class="properties-element mb-4">
                        <p>Properties:</p>
                        <div class="properties-container w-full">
                            <div v-for="(property, index) in properties" :key="index" class="property-container md:flex mb-4">
                                <div>
                                    <UInput 
                                        v-model="property.key"
                                        :name="'propertyKey' + index" 
                                        placeholder="Property Key" 
                                        class="mr-4" 
                                    />
                                </div>
                                <div class="mt-4 md:mt-0">
                                    <UInput 
                                        v-model="property.value"
                                        :name="'propertyValue' + index" 
                                        placeholder="Property Value" 
                                    />
                                </div>
                                <div class="flex mt-5 sm:mt-0">
                                    <UButton @click="addProperty" class="sm:ml-4" icon="i-heroicons-plus" label="Add" />
                                    <UButton @click="removeProperty(index)" class="ml-3" icon="i-heroicons-minus-small" color="red" label="Remove" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>