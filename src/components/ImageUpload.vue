<template>
  <div class="form-group">
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
    </label>
    
    <div
      ref="dropZone"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragenter="handleDragEnter"
      @dragleave="handleDragLeave"
      :class="[
        'border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer',
        isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      ]"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="handleFileSelect"
        class="hidden"
      />
      
      <div v-if="!imageUrl" class="space-y-2">
        <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        <div class="text-sm text-gray-600">
          <p class="font-medium">Bild per Drag & Drop hinzufügen</p>
          <p>oder klicken zum Auswählen</p>
        </div>
        <p class="text-xs text-gray-500">PNG, JPG, GIF bis zu 10MB</p>
      </div>
      
      <div v-else class="relative">
        <img :src="imageUrl" alt="Preview" class="max-h-32 mx-auto rounded-lg" />
        <button
          @click.stop="removeImage"
          class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
    
    <div v-if="uploading" class="mt-2">
      <div class="bg-gray-200 rounded-full h-2">
        <div 
          class="bg-blue-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: uploadProgress + '%' }"
        ></div>
      </div>
      <p class="text-sm text-gray-600 mt-1">Uploading... {{ uploadProgress }}%</p>
    </div>
    
    <div v-if="error" class="mt-2 text-red-600 text-sm">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  label: string
  modelValue: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const dropZone = ref<HTMLElement>()
const fileInput = ref<HTMLInputElement>()
const isDragOver = ref(false)
const uploading = ref(false)
const uploadProgress = ref(0)
const error = ref('')
const imageUrl = ref(props.modelValue)

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  imageUrl.value = newValue
})

// Watch for internal changes to imageUrl
watch(imageUrl, (newValue) => {
  emit('update:modelValue', newValue)
})

function handleDragOver(e: DragEvent) {
  e.preventDefault()
}

function handleDragEnter(e: DragEvent) {
  e.preventDefault()
  isDragOver.value = true
}

function handleDragLeave(e: DragEvent) {
  e.preventDefault()
  // Only set to false if we're leaving the drop zone itself
  if (!dropZone.value?.contains(e.relatedTarget as Node)) {
    isDragOver.value = false
  }
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  isDragOver.value = false
  
  const files = e.dataTransfer?.files
  if (files && files.length > 0) {
    handleFile(files[0])
  }
}

function triggerFileInput() {
  fileInput.value?.click()
}

function handleFileSelect(e: Event) {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    handleFile(files[0])
  }
}

function handleFile(file: File) {
  error.value = ''
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    error.value = 'Bitte wählen Sie eine Bilddatei aus'
    return
  }
  
  // Validate file size (10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    error.value = 'Datei ist zu groß. Maximum 10MB erlaubt.'
    return
  }
  
  // Convert to base64 for preview and storage
  const reader = new FileReader()
  reader.onload = (e) => {
    imageUrl.value = e.target?.result as string
  }
  
  reader.onerror = () => {
    error.value = 'Fehler beim Lesen der Datei'
  }
  
  // Simulate upload progress
  uploading.value = true
  uploadProgress.value = 0
  
  const interval = setInterval(() => {
    uploadProgress.value += 10
    if (uploadProgress.value >= 100) {
      clearInterval(interval)
      uploading.value = false
      uploadProgress.value = 0
    }
  }, 100)
  
  reader.readAsDataURL(file)
}

function removeImage() {
  imageUrl.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>