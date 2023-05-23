<template>
  <ClientOnly placeholder="Loading...">
    <quillEditor theme="snow" :toolbar="toolbarOptions" />
  </ClientOnly>
</template>

<script lang="ts" setup>
// import { ref, watch, onUpdated } from 'vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

let quillEditor: any

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image'],
  //   [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  //   [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'] // remove formatting button
]

if (process.client) {
  const { QuillEditor } = await import('@vueup/vue-quill')

  quillEditor = QuillEditor
}
</script>
