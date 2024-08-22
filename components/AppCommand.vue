<script setup>
  // Use the `useFetch` function to fetch data from the API
  const { data: devices, error } = await useFetch('http://localhost:8080/rest/status');
  
  // You can handle errors if needed
  if (error.value) {
    console.error('An error occurred while fetching data:', error.value);
  }
  </script>
  
  <template>

    <div class="mx-auto mb-5 px-4 sm:px-6 lg:px-8 max-w-7xl">

        <!-- Check for error -->
        <div v-if="error">
        <p>Error: {{ error.message }}</p>
        </div>

        <div v-if="devices">

            <div class="select-command-container mb-4">
                <select class="select-command-element form-select">
                    <option value="--">Select command</option>
                    <option value="1">Send HTTP</option>
                    <option value="2">Send MQTT</option>
                </select>
            </div>

            <table class="command-list-table border-collapse border border-slate-400 w-full">
                <thead>
                    <tr>
                        <th class="border border-slate-300">&nbsp;</th>
                        <th class="border border-slate-300">Device ID</th>
                        <th class="border border-slate-300">MAC</th>
                        <th class="border border-slate-300">Last Seen</th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="device in devices">
                    <td><input type="checkbox" value="" /></td>
                    <td>{{ device.deviceId }}</td>
                    <td>{{ device.mac }}</td>
                    <td>{{ device.lastSeen }}</td>
                </tr>
            </tbody>
            </table>
        
            <div class="mx-auto mt-5 mb-5 max-w-7xl">

                <div class="form-container">
                    <div class="topic-container mb-4">
                        <label for="topic">Topic:
                            <input type="text" name="topic" class="w-full max-w-xs rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </label>
                    </div>
                    <div class="retain-container mb-4">
                        <label for="retain">Retain:
                            <input type="checkbox" class="" name="retain" value="" />
                        </label>
                    </div>
                    <div class="properties-element mb-4">
                        <p>Properties:</p>
                        <div class="properties-container w-full flex flex-justify-center">
                            <div class="property-container flex flex-ju w-1/2">
                                <input type="text" name="property-key" class="w-full max-w-xs rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> : 
                                <input type="text" name="property-value" class="w-full max-w-xs rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            <div class="property-add-container ml-2">
                                <button class="">Add</button>
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