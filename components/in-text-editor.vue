<template>
  <div v-if="editor" class="toolbar align-center flex-warp flex border bg-white text-black">
    <div class="align-dropdown relative inline-block">
      <button class="dropbtn">Heading ▼</button>
      <div class="dropdown-content border-outline absolute left-0 right-0 z-[1] hidden rounded">
        <a
          v-for="index in 6"
          :key="index"
          class="block px-[12px] py-[6px] text-center"
          :class="{ active: editor.isActive('heading', { level: index }) }"
          :style="{ fontSize: 20 - index + 'px' }"
          role="button"
          @click="onHeadingClick(index)"
        >
          H{{ index }}
        </a>
      </div>
    </div>

    <button
      v-for="{ slug, option, active, icon } in textActions"
      :key="slug"
      class="flex h-[32px] w-[32px] items-center text-center text-black"
      :class="{ active: editor.isActive(active) }"
      @click="onActionClick(slug, option)"
    >
      <i :class="icon"></i>
    </button>

    <input class="align-center flex h-[32px] w-[32px] text-center" type="file" @change="addImage" />
    <i class="ri-image"></i>
  </div>

  <editor-content class="rounded bg-white text-black" :editor="editor" />
</template>

<script lang="ts" setup>
import { ref, watch, onUpdated } from 'vue'
// import { ref, computed, watch, onUpdated } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import CharacterCount from '@tiptap/extension-character-count'
import Image from '@tiptap/extension-image'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  maxLimit: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const editor: any = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Underline,
    Subscript,
    Superscript,
    CharacterCount.configure({
      limit: props.maxLimit
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),
    Image.configure({
      inline: true
    })
  ]
})

const textActions = ref([
  { slug: 'bold', icon: 'icon-bold', active: 'bold' },
  { slug: 'italic', icon: 'ri-italic', active: 'italic' },
  { slug: 'underline', icon: 'ri-underline', active: 'underline' },
  { slug: 'strike', icon: 'ri-strikethrough', active: 'strike' },
  {
    slug: 'align',
    option: 'left',
    icon: 'ri-align-left',
    active: { textAlign: 'left' }
  },
  {
    slug: 'align',
    option: 'center',
    icon: 'ri-align-center',
    active: { textAlign: 'center' }
  },
  {
    slug: 'align',
    option: 'right',
    icon: 'ri-align-right',
    active: { textAlign: 'right' }
  },
  {
    slug: 'align',
    option: 'justify',
    icon: 'ri-align-justify',
    active: { textAlign: 'justify' }
  },
  { slug: 'bulletList', icon: 'ri-list-unordered', active: 'bulletList' },
  { slug: 'orderedList', icon: 'ri-list-ordered', active: 'orderedList' },
  { slug: 'subscript', icon: 'ri-subscript-2', active: 'subscript' },
  {
    slug: 'superscript',
    icon: 'ri-superscript-2',
    active: 'superscript'
  },
  { slug: 'undo', icon: 'ri-arrow-go-back-line', active: 'undo' },
  { slug: 'redo', icon: 'ri-arrow-go-forward-line', active: 'redo' },
  { slug: 'clear', icon: 'ri-format-clear', active: 'clear' },
  { slug: 'code', icon: 'ri-code-view', active: 'code' }
])

// const charactersCount = computed(() => {
//   return editor.value.storage.characterCount.characters()
// })

// const wordsCount = computed(() => {
//       return editor.value.storage.characterCount.words();
//     })

// const limitWarning = computed(() => {
//       const isCloseToMax = Number(charactersCount) >= (props.maxLimit - 20);
//       const isMax = Number(charactersCount) === props.maxLimit;

//       if (isCloseToMax && !isMax) return 'warning';
//       if (isMax) return 'danger';

//       return '';
//     } )

watch(
  () => props.modelValue,
  (newValue) => {
    if (editor.value.getHTML() === newValue) return
    editor.value.commandssetContent(props.modelValue, false)
  }
)

const onActionClick = (slug: any, option: any) => {
  const vm = editor.value.chain().focus()
  const actionTriggers = {
    bold: () => vm.toggleBold().run(),
    italic: () => vm.toggleItalic().run(),
    underline: () => vm.toggleUnderline().run(),
    strike: () => vm.toggleStrike().run(),
    bulletList: () => vm.toggleBulletList().run(),
    orderedList: () => vm.toggleOrderedList().run(),
    align: () => vm.setTextAlign(option).run(),
    subscript: () => vm.toggleSubscript().run(),
    superscript: () => vm.toggleSuperscript().run(),
    undo: () => vm.undo().run(),
    redo: () => vm.redo().run(),
    clear: () => {
      vm.clearNodes().run()
      vm.unsetAllMarks().run()
    },
    code: () => vm.toggleCodeBlock().run()
  }

  actionTriggers[slug as keyof typeof actionTriggers]()
}

const onHeadingClick = (index: number) => {
  const vm = editor.value.chain().focus()
  vm.toggleHeading({ level: index }).run()
}

const addImage = ($event: any) => {
  console.log($event)
}

onUpdated(() => {
  emit('update:modelValue', editor.value.getHTML())
})
</script>
