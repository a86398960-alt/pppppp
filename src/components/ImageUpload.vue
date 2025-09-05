<template>
  <div class="image-upload">
    <div
      class="upload-area"
      :class="{ 'drag-over': isDragOver, 'has-image': imageUrl }"
      @drop="handleDrop"
      @dragover.prevent="isDragOver = true"
      @dragleave="isDragOver = false"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="handleFileSelect"
        class="hidden"
      />
      
      <div v-if="!imageUrl" class="upload-placeholder">
        <svg class="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p class="upload-text">
          Drag & Drop Bild hier oder klicken zum Auswählen
        </p>
        <p class="upload-hint">PNG, JPG, GIF bis zu 10MB</p>
      </div>
      
      <div v-else class="image-preview">
        <img :src="imageUrl" :alt="fileName" class="preview-image" />
        <div class="image-overlay">
          <button @click.stop="removeImage" class="remove-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="isUploading" class="upload-progress">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
      </div>
      <p class="progress-text">Uploading... {{ uploadProgress }}%</p>
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: 'Drag & Drop Bild hier oder klicken zum Auswählen'
  }
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const isDragOver = ref(false)
const isUploading = ref(false)
const uploadProgress = ref(0)
const error = ref('')
const imageUrl = ref(props.modelValue || '')
const fileName = ref('')

watch(() => props.modelValue, (newValue) => {
  imageUrl.value = newValue || ''
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    processFile(file)
  }
}

const handleDrop = (event) => {
  event.preventDefault()
  isDragOver.value = false
  
  const files = event.dataTransfer.files
  if (files.length > 0) {
    processFile(files[0])
  }
}

const processFile = (file) => {
  error.value = ''
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    error.value = 'Bitte wählen Sie eine Bilddatei aus.'
    return
  }
  
  // Validate file size (10MB)
  if (file.size > 10 * 1024 * 1024) {
    error.value = 'Die Datei ist zu groß. Maximum 10MB erlaubt.'
    return
  }
  
  fileName.value = file.name
  
  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    imageUrl.value = e.target.result
    emit('update:modelValue', e.target.result)
  }
  reader.readAsDataURL(file)
  
  // Simulate upload progress
  simulateUpload()
}

const simulateUpload = () => {
  isUploading.value = true
  uploadProgress.value = 0
  
  const interval = setInterval(() => {
    uploadProgress.value += 10
    if (uploadProgress.value >= 100) {
      clearInterval(interval)
      isUploading.value = false
      uploadProgress.value = 0
    }
  }, 100)
}

const removeImage = () => {
  imageUrl.value = ''
  fileName.value = ''
  error.value = ''
  emit('update:modelValue', '')
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<style scoped>
.image-upload {
  width: 100%;
}

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f9fafb;
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-area:hover {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.upload-area.drag-over {
  border-color: #3b82f6;
  background-color: #dbeafe;
  transform: scale(1.02);
}

.upload-area.has-image {
  padding: 0;
  border: none;
  background: transparent;
}

.hidden {
  display: none;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon {
  width: 3rem;
  height: 3rem;
  color: #6b7280;
}

.upload-text {
  font-size: 1.1rem;
  font-weight: 500;
  color: #374151;
  margin: 0;
}

.upload-hint {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.image-preview {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-preview:hover .image-overlay {
  opacity: 1;
}

.remove-btn {
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-btn:hover {
  background: #dc2626;
}

.remove-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.upload-progress {
  margin-top: 1rem;
}

.progress-bar {
  width: 100%;
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 0.25rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #3b82f6;
  transition: width 0.3s ease;
}

.progress-text {
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
}

.error-message {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.375rem;
  color: #dc2626;
  font-size: 0.875rem;
}
</style>