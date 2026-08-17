import { reactive, ref } from 'vue'
import {
  articles as mockArticles,
  audioEpisodes as mockAudio,
  categories as mockCategories,
  currentUser as mockUser,
} from '../data/mockData'
import { apiRequest, hasApiConfiguration, unwrapCollection, unwrapItem } from './apiClient'

const endpoint = {
  articles: import.meta.env.VITE_API_ARTICLES_PATH || '/articles',
  audio: import.meta.env.VITE_API_AUDIO_PATH || '/audio',
  categories: import.meta.env.VITE_API_CATEGORIES_PATH || '/categories',
  currentUser: import.meta.env.VITE_API_CURRENT_USER_PATH || '/users/me',
}

export const articles = reactive([...mockArticles])
export const audioEpisodes = reactive([...mockAudio])
export const categories = reactive([...mockCategories])
export const currentUser = reactive({ ...mockUser })
export const contentLoading = ref(false)
export const contentError = ref('')

const replace = (target, items) => target.splice(0, target.length, ...items)

export async function refreshContent() {
  if (!hasApiConfiguration) return
  contentLoading.value = true
  contentError.value = ''
  try {
    const [articleData, audioData, categoryData, userData] = await Promise.all([
      apiRequest(endpoint.articles),
      apiRequest(endpoint.audio),
      apiRequest(endpoint.categories),
      apiRequest(endpoint.currentUser),
    ])
    replace(articles, unwrapCollection(articleData))
    replace(audioEpisodes, unwrapCollection(audioData))
    replace(categories, unwrapCollection(categoryData))
    Object.assign(currentUser, unwrapItem(userData))
  } catch (error) {
    contentError.value = error instanceof Error ? error.message : 'Không thể tải dữ liệu từ API'
  } finally {
    contentLoading.value = false
  }
}

export const contentService = {
  getArticles: () => apiRequest(endpoint.articles),
  getAudioEpisodes: () => apiRequest(endpoint.audio),
  getCategories: () => apiRequest(endpoint.categories),
  getCurrentUser: () => apiRequest(endpoint.currentUser),
  refresh: refreshContent,
}

refreshContent()
