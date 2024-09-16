<template>
    <div class="mx-auto mb-5 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <!-- Check for error -->
        <div v-if="error">
            <p>Error: {{ error.message }}</p>
        </div>
        <div v-else-if="devices">
            <!-- Protocol dropdown select -->
            <div class="select-command-container mb-4 flex">
                <USelect size="sm" class="" placeholder="Select command..." :options="selectProtocol"  v-model="selectedOption" />
            </div>
            <!-- Table with devices -->
            <UTable :sort="sort" v-model="devicesList" :rows="formattedData" />           
            <!-- Form with additional data -->
            <div class="mx-auto mt-5 mb-5 max-w-7xl">
                <div class="form-container">
                    <div v-if="devicesList.length > 0">
                        <div v-if="selectedOption === 'http'">
                            <div class="url-container flex mb-4">
                                <label class="text-sm font-medium text-gray-700 dark:text-gray-200" for="topic">URL:
                                    <UInput name="url" />
                                </label>
                            </div>
                        </div>

                        <div v-if="selectedOption === 'mqtt'">                        
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
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script setup>

// import { ref } from 'vue'
import { onMounted } from 'vue';
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

// Define select options for protocol dropdown
const selectProtocol = [
  { label: 'Send HTTP', value: 'http' },
  { label: 'Send MQTT', value: 'mqtt' }
]
// Create a reactive state for protocol dropdown
const selectedOption = ref('')

// Table with devices list
const devicesList = ref([devices[1]])

// Format date
const formattedData = computed(() => {
  return devices.value?.map(device => ({
    ...device,
    lastSeen: dayjs(device.lastSeen).format('DD.MM.YYYY HH:mm:ss')
  })) || [];
});

// Default sort
const sort = ref({
    column: 'deviceId',
    direction: 'desc'
})

onMounted(() => {
    // Ensure $nuxtSocket is available after the component is mounted
  const socket = useNuxtApp().$nuxtSocket({  name: 'iotControl' });
  console.log(socket);
  if (socket) {
    console.log('socket is available');
        // Now you can use your socket
        socket.on('newMessage', (msg) => {
        //message.value = msg;  // Update the message when a new one arrives
        console.log('Recevied message: ' + msg);
     });
  } else {
    console.error('$nuxtSocket is undefined!');
  }
});


// Error handling
if (error.value) {
    console.error('An error occurred while fetching data:', error.value);
}

// Log formatted data for debugging
watch(formattedData, (newData) => {
    console.log('Formatted Data:', newData);
});



</script>