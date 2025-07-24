<template>

  <div class="mpv-layout">

    <Menubar :model="items" class="mpv-layout__menubar" />

    <main class="mpv-layout__content">
			
      <RouterView />

    </main>

  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'

const router = useRouter()

const items = ref([
  {
    label: 'Categorías',
    icon: 'pi pi-fw pi-list',
    command: () => router.push('/categories'),
  },
  {
    label: 'Productos',
    icon: 'pi pi-fw pi-box',
    command: () => router.push('/products'),
  },
])
</script>

<style scoped>
.mpv-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.mpv-layout__content {
  flex: 1;
  padding: 30px 15px;
  background-color: var(--surface-ground);
}

@media (min-width: 768px) {
	
	.mpv-layout__content {
		padding: 60px 30px;
	}

}

</style>
