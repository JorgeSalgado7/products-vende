<template>

  <div class="products-view p-4">

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

				<h2 style="margin: 0;">Productos</h2>

				<Button label="Crear Producto" icon="pi pi-plus" class="p-mb-3" style="margin: 30px 0;" @click="openNewProduct" />

				<DataTable
					:value="products"
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
					<Column field="description" header="Descripción" />
					<Column field="price" header="Precio" />
					<Column field="categoryId" header="Categoría ID" />
					<Column field="companyId" header="Compañia ID" />
					<Column header="Acciones" style="width: 10rem">
						<template #body="slotProps">
							<Button
								icon="pi pi-pencil"
								class="p-button-rounded p-button-text p-button-info p-mr-2"
								@click="editProduct(slotProps.data)"
								aria-label="Editar producto"
							/>
							<Button
								icon="pi pi-trash"
								class="p-button-rounded p-button-text p-button-danger"
								@click="deleteProduct(slotProps.data.id)"
								aria-label="Eliminar producto"
							/>
						</template>
					</Column>
				</DataTable>

			</template>

		</Card>

    <!-- Modal Crear/Editar -->
    <Dialog
      v-model:visible="productDialog"
      :header="editMode ? 'Editar Producto' : 'Crear Producto'"
      modal
      :closable="!saving"
      :dismissable-mask="!saving"
      style="width: 450px"
    >
      <form @submit.prevent="saveProduct" class="product-form">

        <div class="p-field" :class="{ 'p-invalid': nameError && editMode }">
          <label for="name">
						Nombre 
						<span class="required-star">*</span>
					</label>
          <InputText id="name" v-model="product.name" :disabled="saving" />
          <small v-if="nameError && editMode" class="p-error">El nombre es obligatorio</small>
        </div>

        <div class="p-field" :class="{ 'p-invalid': descriptionError && editMode}">
          <label for="description">
						Descripción
						<span class="required-star">*</span>
					</label>
          <InputText id="description" v-model="product.description" :disabled="saving" />
					<small v-if="descriptionError && editMode" class="p-error">La descrićión es obligatoria</small>
        </div>

        <div class="p-field" :class="{ 'p-invalid': priceError && editMode}">
          <label for="price">
						Precio
						<span class="required-star">*</span>
					</label>
          <InputNumber
            id="price"
            v-model="product.price"
            :disabled="saving"
            class="w-full"
						:min="0"
						mode="currency"
						currency="MXN"
          />
					<small v-if="priceError && editMode" class="p-error">El precio es obligatorio</small>
        </div>

        <div class="p-field" :class="{ 'p-invalid': categoryIdError && editMode }">
          <label for="categoryId">
						Categoría 
						<span class="required-star">*</span>
					</label>
          <Dropdown
            id="categoryId"
            v-model="product.categoryId"
            :options="categories"
            optionLabel="name"
            optionValue="id"
            :disabled="saving"
            placeholder="Seleccione una categoría"
            class="w-full"
          />
          <small v-if="categoryIdError && editMode" class="p-error">Debe seleccionar una categoría</small>
        </div>

				<div class="p-field" :class="{ 'p-invalid': companyError  && editMode }">
					<label for="companyId">
						Empresa
						<span class="required-star">*</span>
					</label>
					<InputNumber
						id="companyId"
						v-model="product.companyId"
						:disabled="saving"
						class="w-full"
					/>
					<small v-if="companyError  && editMode" class="p-error">El Id de la compañía es obligatorio</small>
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
            :disabled="nameError || categoryIdError || descriptionError || priceError || companyError || saving"
          />
        </div>

      </form>

    </Dialog>

    <!-- Loading Modal -->
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
	import { ref, reactive, onMounted, computed } from 'vue'
	import Button from 'primevue/button'
	import DataTable from 'primevue/datatable'
	import Column from 'primevue/column'
	import Dialog from 'primevue/dialog'
	import InputText from 'primevue/inputtext'
	import Dropdown from 'primevue/dropdown'
	import InputNumber from 'primevue/inputnumber'
	import ProgressSpinner from 'primevue/progressspinner'
	import Message from 'primevue/message'
	import Card from 'primevue/card'

	import type { Product } from '@/domain/models/product.model'
	import type { ProductInput } from '@/domain/dto/product.dto'
	import type { Category } from '@/domain/models/category.model'

	import * as productService from '@/services/product.service'
	import * as categoryService from '@/services/category.service'

	const products = ref<Product[]>([])
	const categories = ref<Category[]>([])
	const loading = ref(false)
	const saving = ref(false)

	const productDialog = ref(false)
	const editMode = ref(false)

	const product = reactive<ProductInput>({
		name: '',
		description: '',
		price: null,
		categoryId: 0,
		companyId: null
	})

	// Toasts
	const toastSeverity = ref<'success' | 'info' | 'warn' | 'error'>('info')
	const toastDetail = ref('')

	function showToast(severity: typeof toastSeverity.value, detail: string) {
		toastSeverity.value = severity
		toastDetail.value = detail
	}

	// Validaciones
	const nameError = computed(() => product.name.trim().length === 0)
	const categoryIdError = computed(() => !product.categoryId)
	const descriptionError = computed(() => product.description.trim().length === 0)
	const priceError = computed(() => !product.price || product.price <= 0)
	const companyError = computed(() => !product.companyId)



	function openNewProduct() {
		resetProduct()
		editMode.value = false
		productDialog.value = true
	}

	function editProduct(p: Product) {
		product.name = p.name
		product.description = p.description
		product.price = p.price
		product.categoryId = p.categoryId
		product.companyId = p.companyId
		productDialog.value = true
		editMode.value = true
	}

	function hideDialog() {
		if (!saving.value) {
			productDialog.value = false
		}
	}

	function resetProduct() {
		product.name = ''
		product.description = ''
		product.price = null
		product.categoryId = 0
		product.companyId = null
	}

	async function saveProduct() {
		if (nameError.value || categoryIdError.value) return

		productDialog.value = false
		saving.value = true

		try {
			if (editMode.value) {
				const existing = products.value.find(p => p.name === product.name)
				if (!existing) {
					showToast('error', 'Producto no encontrado para editar')
					return
				}

				const response = await productService.updateProduct(existing.id, { ...product })
				if (!response.notification.error) {
					showToast('success', 'Producto actualizado')
					await fetchProducts()
				} else {
					showToast('error', response.notification.message || 'Error al actualizar')
				}
			} else {
				const response = await productService.createProduct({ ...product })
				if (!response.notification.error) {
					showToast('success', 'Producto creado')
					await fetchProducts()
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

	async function deleteProduct(id: number) {
		saving.value = true
		try {
			const response = await productService.deleteProduct(id)
			if (!response.notification.error) {
				showToast('success', 'Producto eliminado')
				await fetchProducts()
			} else {
				showToast('error', response.notification.message || 'Error al eliminar')
			}
		} catch {
			showToast('error', 'Error inesperado al eliminar')
		} finally {
			saving.value = false
		}
	}

	async function fetchProducts() {
		loading.value = true
		try {
			const res = await productService.getProducts()
			if (!res.notification.error && res.data) {
				products.value = res.data
			} else {
				showToast('error', res.notification.message || 'Error al cargar productos')
			}
		} catch {
			showToast('error', 'Error inesperado al cargar productos')
		} finally {
			loading.value = false
		}
	}

	async function fetchCategories() {
		try {
			const res = await categoryService.getCategories()
			if (!res.notification.error && res.data) {
				categories.value = res.data
			}
		} catch {
			showToast('error', 'Error cargando categorías')
		}
	}

	onMounted(async () => {
		await fetchProducts()
		await fetchCategories()
	})

</script>

<style scoped>

	.products-view {
		padding: 1rem;
	}

	.product-form .p-field {
		margin-bottom: 1rem;
		display: flex;
		flex-direction: column;
	}
	.product-form .p-field input,
	.product-form .p-field span,
	.product-form .p-field #categoryId  {
		margin: 10px 0;
	}

	.p-dialog-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
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
