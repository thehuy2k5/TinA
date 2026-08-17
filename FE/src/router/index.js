import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomePage from '../views/HomePage.vue'
import LatestPage from '../views/LatestPage.vue'
import FeaturedPage from '../views/FeaturedPage.vue'
import AudioPage from '../views/AudioPage.vue'
import AnalysisPage from '../views/AnalysisPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import TabsPage from '../views/TabsPage.vue'
import ArticleDetailPage from '../views/ArticleDetailPage.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/article/:id', name: 'ArticleDetail', component: ArticleDetailPage },
  {
    path: '/',
    component: TabsPage,
    children: [
      { path: 'home', name: 'Home', component: HomePage },
      { path: 'latest', name: 'Latest', component: LatestPage },
      { path: 'featured', name: 'Featured', component: FeaturedPage },
      { path: 'audio', name: 'Audio', component: AudioPage },
      { path: 'analysis', name: 'Analysis', component: AnalysisPage },
      { path: 'profile', name: 'Profile', component: ProfilePage },
    ],
  },
]

export default createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })
