<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import PersonSVG from "../assets/icons/Person.vue";
import { useAuthStore } from "../store/auth";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const { error } = storeToRefs(authStore);

const auth = ref({
  email: "",
  password: "",
});

const isLoading = ref(false);
const showPassword = ref(false);

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

// login
const login = async () => {
  if (!auth.value.email || !auth.value.password) {
    alert("Email dan password is required");
    return;
  }

  try {
    isLoading.value = true;

    let res;
    if (isRegister.value) {
      res = await authStore.register(auth.value);
    } else {
      res = await authStore.login(auth.value);
    }

    if (res) {
      router.push("/home");
    }
  } catch {
    console.error("Error during login", error);
  } finally {
    isLoading.value = false;
  }
};

// register
const isRegister = ref(route.query.regist === "true");

watch(
  () => route.query.regist,
  (newValue) => {
    isRegister.value = newValue === "true";
  }
);
const toogleRegister = () => {
  router.replace({
    path: route.path,
    query: { regist: isRegister.value ? "false" : "true" },
  });
};
</script>
  <template>
  <div class="relative flex items-center -pt-20">
    <div class="w-full md:w-1/2 bg-gray-100">
      <div class="min-h-screen flex items-center justify-center">
        <div class="max-w-sm px-4 py-8 w-96 h-60">
          <form @submit.prevent="login()">
            <div class="space-y-4 p-5 rounded-xl shadow-2xl bg-white">
              <div>
                <div class="font-bold text-center text-xl mb-5">
                  {{ isRegister ? "Register" : "Sign In" }}
                </div>
                <label class="block text-sm font-medium mb-1" for="email"
                  >Email</label
                >
                <input
                  type="email"
                  class="bg-gray-200 border-0 rounded-lg p-2.5 text-sm w-full"
                  v-model="auth.email"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1" for="password"
                  >Password</label
                >
                <div class="relative">
                  <input
                    autoComplete="off"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="auth.password"
                    class="bg-gray-200 border-0 rounded-lg p-2.5 text-sm w-full"
                  />
                  <button
                    type="button"
                    @click.stop="toggleShowPassword($event)"
                    class="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <svg
                      v-if="!showPassword"
                      class="w-5 h-5 hover:text-gray-200 text-gray-100"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <path
                          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </g>
                    </svg>
                    <svg
                      v-else
                      class="w-5 h-5 hover:text-gray-200 text-gray-100"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex items-center mt-6">
                <button
                  type="submit"
                  :disabled="isLoading"
                  v-if="!isLoading"
                  class="bg-gray-800 hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-white transition"
                >
                  {{ isRegister ? "Register" : "Sign In" }}
                </button>
                <button
                  v-if="isLoading"
                  disabled
                  class="bg-gray-800 font-medium rounded-lg text-sm px-5 py-2 text-white transition"
                >
                  <span class="loader"></span>
                </button>
              </div>
              <div class="flex items-center text-md">
                <hr />
                <span>{{
                  isRegister
                    ? "Already have an account?"
                    : "Don't have an account?"
                }}</span>
                <button
                  @click.prevent="toogleRegister"
                  class="rounded-lg text-blue-700 underline hover:no-underline transition ml-1"
                >
                  {{ isRegister ? "Login" : "Register" }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2">
      <div class="w-full h-full bg-gray-600 flex items-center justify-center">
        <div>
          <PersonSVG class="w-full fill-white" />
        </div>
      </div>
    </div>
  </div>
</template>