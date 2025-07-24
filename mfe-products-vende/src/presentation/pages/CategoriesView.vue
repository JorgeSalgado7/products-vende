<template>

  <div class="categories-view p-4">

    <Message
      v-if="toastDetail"
      :severity="toastSeverity"
      closable
      @close="toastDetail = ''"
      class="p-mt-3"
    >
      {{ toastDetail }}
    </Message>


    <Card>

			<template #content>

				<h2 style="margin: 0;">Categorías</h2>

				<Button label="Crear Categoría" icon="pi pi-plus" class="p-mb-3" style="margin: 30px 0;" @click="openNewCategory" />

				<DataTable
					:value="categories"
					dataKey="id"
					paginator
					:rows="10"
					:loading="loading"
					responsiveLayout="scroll"
					stripedRows
					class="p-mb-4"
				>
					<Column field="id" header="ID" style="width: 5rem" />
					<Column field="name" header="Nombre" />
					<Column field="parentCategoryId" header="ID Categoría Padre" style="width: 8rem" />
					<Column header="Acciones" style="width: 10rem">
						<template #body="slotProps">
							<Button
								icon="pi pi-pencil"
								class="p-button-rounded p-button-text p-button-info p-mr-2"
								@click="editCategory(slotProps.data)"
								aria-label="Editar categoría"
							/>
							<Button
								icon="pi pi-trash"
								class="p-button-rounded p-button-text p-button-danger"
								@click="deleteCategory(slotProps.data.id)"
								aria-label="Eliminar categoría"
							/>
						</template>
					</Column>
				</DataTable>

			</template>

		</Card>

    <Dialog v-model:visible="categoryDialog"
      :header="editMode ? 'Editar Categoría' : 'Crear Categoría'"
      modal
      :closable="!saving"
      :dismissable-mask="!saving"
      style="width: 400px"
    >

      <form @submit.prevent="saveCategory" class="category-form">

        <div class="p-field" :class="{ 'p-invalid': nameError && editMode }">

          <label for="name" style="width: 100%;">
            Nombre <span class="required-star">*</span>
          </label>

          <InputText
            id="name"
            v-model="category.name"
            :disabled="saving"
            autofocus
            :class="{ 'p-invalid': nameError && editMode }"
          />

          <small v-if="nameError && editMode" class="p-error">El nombre es obligatorio</small>
        </div>

        <div class="p-field">

          <label for="parentCategoryId">Categoría Padre (opcional)</label>

          <Dropdown
            id="parentCategoryId"
            :options="parentCategoryOptions"
            optionLabel="name"
            optionValue="id"
            v-model="category.parentCategoryId"
            :disabled="saving"
            placeholder="Seleccione una categoría"
            showClear
            class="w-full"
          />

        </div>

        <div class="p-dialog-footer">

          <Button 
            label="Cancelar" 
            icon="pi pi-times" 
            @click="hideDialog" 
            severity="danger" 
            variant="outlined"
          />

          <Button
            label="Guardar"
            icon="pi pi-check"
            type="submit"
            :loading="saving"
            :disabled="nameError || saving"
          />

        </div>

      </form>

    </Dialog>

    <Dialog
      header="Guardando..."
      modal
      :closable="false"
      :dismissable-mask="false"
      style="width: 250px"
      v-if="saving"
    >
      <ProgressSpinner />
    </Dialog>

  </div>

</template>

<script setup lang="ts">

  import { ref, reactive, computed, onMounted } from 'vue'
  import Button from 'primevue/button'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Dialog from 'primevue/dialog'
  import InputText from 'primevue/inputtext'
  import Dropdown from 'primevue/dropdown'
  import ProgressSpinner from 'primevue/progressspinner'
  import Message from 'primevue/message'
	import Card from 'primevue/card'

  import type { Category } from '@/domain/models/category.model.js'
  import * as categoryService from '@/services/category.service'

  const categories = ref<Category[]>([])
  const loading = ref(false)
  const saving = ref(false)

  const categoryDialog = ref(false)
  const editMode = ref(false)
  const category = reactive<Category>({
    id: 0,
    name: '',
    parentCategoryId: null,
  })

  const toastSeverity = ref<'success' | 'info' | 'warn' | 'error'>('info')
  const toastDetail = ref('')

  function showToast(severity: 'success' | 'info' | 'warn' | 'error', detail: string) {
    toastSeverity.value = severity
    toastDetail.value = detail
  }

  const parentCategoryOptions = computed(() => {
    return categories.value.filter(cat => cat.id !== category.id)
  })

  const nameError = computed(() => {
    return category.name.trim().length === 0
  })

  async function fetchCategories() {
    loading.value = true
    try {
      const response = await categoryService.getCategories()
      if (!response.notification.error && response.data) {
        categories.value = response.data
      } else {
        showToast('error', response.notification.message || 'Error al cargar categorías')
      }
    } catch {
      showToast('error', 'Error inesperado al cargar categorías')
    } finally {
      loading.value = false
    }
  }

  function openNewCategory() {
    resetCategory()
    editMode.value = false
    categoryDialog.value = true
  }

  function editCategory(cat: Category) {
    category.id = cat.id
    category.name = cat.name
    category.parentCategoryId = cat.parentCategoryId ?? null
    editMode.value = true
    categoryDialog.value = true
  }

  function hideDialog() {
    if (!saving.value) {
      categoryDialog.value = false
    }
  }

  async function saveCategory() {
    if (nameError.value) return

    categoryDialog.value = false
    saving.value = true

    try {
      if (editMode.value) {
        const response = await categoryService.updateCategory(category.id, {
          name: category.name,
          parentCategoryId: category.parentCategoryId,
        })
        if (!response.notification.error) {
          showToast('success', 'Categoría actualizada')
          await fetchCategories()
        } else {
          showToast('error', response.notification.message || 'Error al actualizar')
        }
      } else {
        const response = await categoryService.createCategory({
          name: category.name,
          parentCategoryId: category.parentCategoryId,
        })
        if (!response.notification.error) {
          showToast('success', 'Categoría creada')
          await fetchCategories()
        } else {
          showToast('error', response.notification.message || 'Error al crear')
        }
      }
    } catch {
      showToast('error', 'Error inesperado al guardar')
    } finally {
      saving.value = false
    }
  }

  async function deleteCategory(id: number) {
    saving.value = true
    try {
      const response = await categoryService.deleteCategory(id)
      if (!response.notification.error) {
        showToast('success', 'Categoría eliminada')
        await fetchCategories()
      } else {
        showToast('error', response.notification.message || 'Error al eliminar')
      }
    } catch {
      showToast('error', 'Error inesperado al eliminar')
    } finally {
      saving.value = false
    }
  }

  function resetCategory() {
    category.id = 0
    category.name = ''
    category.parentCategoryId = null
  }

  onMounted(fetchCategories)

</script>

<style scoped>

  .categories-view {
    padding: 1rem;
  }

  .category-form .p-field {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
  }

  .category-form .p-field input,
  .category-form .p-field #parentCategoryId {
    margin: 10px 0;
  }

  .p-dialog-footer{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .p-invalid label {
    color: var(--red-600) !important;
  }

  .p-invalid input,
  .p-invalid .p-dropdown {
    border-color: var(--red-600) !important;
    box-shadow: none !important;
  }

  .required-star {
    color: var(--red-600);
  }

</style>
