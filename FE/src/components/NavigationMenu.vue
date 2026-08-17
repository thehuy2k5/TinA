<template>
  <teleport to="body">
    <transition name="menu-fade">
      <div v-if="open" class="menu-layer" role="presentation" @click.self="$emit('close')">
        <transition name="menu-sheet" appear>
          <section
            v-if="open"
            ref="menuPanel"
            class="menu-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="navigation-menu-title"
            @keydown.esc="$emit('close')"
          >
            <div class="menu-handle" aria-hidden="true" />
            <header class="menu-header">
              <div>
                <span>Khám phá</span>
                <h2 id="navigation-menu-title">Danh mục tin tức</h2>
              </div>
              <button
                ref="closeButton"
                type="button"
                class="close-button"
                aria-label="Đóng menu"
                @click="$emit('close')"
              >
                <ion-icon :icon="closeOutline" />
              </button>
            </header>

            <div class="menu-content">
              <section class="menu-section primary-section">
                <div class="section-title">
                  <ion-icon :icon="gridOutline" />
                  <h3>Chuyên mục</h3>
                </div>
                <div class="category-grid">
                  <button
                    v-for="item in categories"
                    :key="item"
                    type="button"
                    @click="selectItem(item)"
                  >
                    <span>{{ item }}</span>
                    <ion-icon :icon="chevronForwardOutline" />
                  </button>
                </div>
              </section>

              <section class="menu-section">
                <div class="section-title">
                  <ion-icon :icon="compassOutline" />
                  <h3>Chủ đề</h3>
                </div>
                <div class="topic-list">
                  <button
                    v-for="item in topics"
                    :key="item"
                    type="button"
                    @click="selectItem(item)"
                  >
                    {{ item }}
                  </button>
                </div>
              </section>

              <div class="compact-grid">
                <section class="menu-section compact-section">
                  <div class="section-title">
                    <ion-icon :icon="newspaperOutline" />
                    <h3>Bản tin đặc biệt</h3>
                  </div>
                  <button
                    v-for="item in specialNews"
                    :key="item"
                    type="button"
                    class="text-link"
                    @click="selectItem(item)"
                  >
                    {{ item }}
                  </button>
                </section>

                <section class="menu-section compact-section">
                  <div class="section-title">
                    <ion-icon :icon="languageOutline" />
                    <h3>Ngôn ngữ</h3>
                  </div>
                  <button
                    type="button"
                    class="language-button"
                    :class="{ active: selectedLanguage === 'vi' }"
                    :aria-pressed="selectedLanguage === 'vi'"
                    @click="selectedLanguage = 'vi'"
                  >
                    Tiếng Việt
                  </button>
                  <button
                    type="button"
                    class="language-button"
                    :class="{ active: selectedLanguage === 'en' }"
                    :aria-pressed="selectedLanguage === 'en'"
                    @click="selectedLanguage = 'en'"
                  >
                    English
                  </button>
                </section>
              </div>
            </div>
          </section>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { IonIcon } from '@ionic/vue'
import {
  chevronForwardOutline,
  closeOutline,
  compassOutline,
  gridOutline,
  languageOutline,
  newspaperOutline,
} from 'ionicons/icons'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'select'])
const closeButton = ref(null)
const selectedLanguage = ref('vi')

const categories = [
  'Chính trị',
  'An ninh - Quân sự',
  'Khoa học công nghệ',
  'Kinh tế',
  'Văn hóa - Xã hội',
]
const topics = [
  'Việt Nam',
  'Biển Đông',
  'Đông Nam Á - Nam Á',
  'Đông Bắc Á',
  'Châu Âu',
  'Châu Mỹ',
  'Trung Đông - Châu Phi',
  'Các diễn đàn, tổ chức quốc tế',
  'Xung đột Thái Lan - Campuchia',
  'Xung đột Nga - Ukraine',
  'Xung đột Israel - Palestine',
]
const specialNews = ['Bản tin hằng ngày', 'Bản tin hằng tuần']

watch(
  () => props.open,
  async (isOpen) => {
    document.body.classList.toggle('navigation-menu-open', isOpen)
    if (isOpen) {
      await nextTick()
      closeButton.value?.focus?.()
    }
  },
)

onBeforeUnmount(() => {
  document.body.classList.remove('navigation-menu-open')
})

function selectItem(item) {
  emit('select', item)
  emit('close')
}
</script>

<style scoped>
.menu-layer {
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: max(10px, env(safe-area-inset-top)) 10px max(10px, env(safe-area-inset-bottom));
  background: rgba(8, 28, 47, 0.52);
  backdrop-filter: blur(3px);
}

.menu-panel {
  width: min(100%, 430px);
  max-height: calc(
    100dvh - max(20px, env(safe-area-inset-top)) - max(20px, env(safe-area-inset-bottom))
  );
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  background: #f7f9fc;
  box-shadow: 0 24px 64px rgba(7, 35, 59, 0.3);
}

.menu-handle {
  width: 36px;
  height: 4px;
  margin: 9px auto 2px;
  border-radius: 99px;
  background: #ccd5df;
}

.menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 18px 14px;
}

.menu-header span {
  display: block;
  margin-bottom: 2px;
  color: var(--tina-red);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.menu-header h2 {
  margin: 0;
  color: var(--tina-blue-dark);
  font-size: 23px;
  line-height: 28px;
}

.close-button {
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 14px;
  background: #e7eef6;
  color: var(--tina-blue-dark);
  font-size: 24px;
}

.menu-content {
  max-height: calc(100dvh - 105px);
  overflow-y: auto;
  padding: 0 12px 20px;
  overscroll-behavior: contain;
}

.menu-section {
  margin-bottom: 10px;
  padding: 15px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 5px 18px rgba(22, 58, 89, 0.05);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: var(--tina-blue);
}

.section-title ion-icon {
  font-size: 19px;
}

.section-title h3 {
  margin: 0;
  font-size: 16px;
  line-height: 20px;
  text-transform: uppercase;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.category-grid button {
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 8px 10px 8px 12px;
  border: 0;
  border-radius: 13px;
  background: var(--tina-blue-light);
  color: #164b77;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
}

.category-grid button ion-icon {
  flex: 0 0 auto;
  color: #6d8fad;
  font-size: 16px;
}

.topic-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.topic-list button {
  min-height: 38px;
  padding: 8px 12px;
  border: 1px solid #dbe5ef;
  border-radius: 999px;
  background: #f8fafc;
  color: #334b60;
  font-size: 13px;
}

.compact-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
  gap: 10px;
}

.compact-section {
  margin-bottom: 0;
}

.text-link,
.language-button {
  width: 100%;
  min-height: 42px;
  border: 0;
  border-radius: 11px;
  background: transparent;
  color: #334b60;
  text-align: left;
  font-size: 14px;
}

.text-link + .text-link {
  border-top: 1px solid #edf1f5;
  border-radius: 0 0 11px 11px;
}

.language-button {
  min-height: 38px;
  padding: 0 10px;
}

.language-button.active {
  background: var(--tina-blue);
  color: #fff;
  font-weight: 700;
}

button:focus-visible {
  outline: 3px solid rgba(22, 95, 160, 0.26);
  outline-offset: 2px;
}

button:active {
  transform: scale(0.98);
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 180ms ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

.menu-sheet-enter-active,
.menu-sheet-leave-active {
  transition:
    transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 180ms ease;
}

.menu-sheet-enter-from,
.menu-sheet-leave-to {
  opacity: 0;
  transform: translateY(-18px) scale(0.98);
}

@media (max-width: 370px) {
  .menu-panel {
    border-radius: 20px;
  }

  .menu-header {
    padding-inline: 14px;
  }

  .menu-section {
    padding: 13px;
  }

  .category-grid,
  .compact-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu-fade-enter-active,
  .menu-fade-leave-active,
  .menu-sheet-enter-active,
  .menu-sheet-leave-active {
    transition: none;
  }
}
</style>
