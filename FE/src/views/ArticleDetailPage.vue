<template>
  <ion-page class="article-page">
    <AppHeader />
    <nav class="article-nav" aria-label="Điều hướng bài viết">
      <button type="button" aria-label="Quay lại" @click="goBack">
        <img :src="backIcon" alt="" />
      </button>
      <strong>Chi tiết tin</strong><span></span><img class="more-icon" :src="moreIcon" alt="" />
    </nav>
    <BreakingNewsBar text="Thông tin đối ngoại chính thức · Cập nhật 14/08/2026" />

    <ion-content class="article-content" :scroll-events="true" @ionScroll="updateProgress">
      <article ref="articleBody" class="article-body">
        <header class="article-header">
          <div class="category-row"><span>GIÁO DỤC</span><small>5 phút đọc</small></div>
          <h1>Phụ huynh thức xuyên đêm chờ nộp hồ sơ vào lớp 10</h1>
          <p class="standfirst">
            Nhiều phụ huynh có mặt từ tối hôm trước, mang theo đồ ăn và ghế nhỏ để chờ đến lượt nộp
            hồ sơ cho con.
          </p>
          <div class="author">
            <b>TA</b
            ><span
              ><strong>Phòng Tin tức</strong
              ><small>07:30 · 15/08/2026 · Cập nhật 08:10</small></span
            >
          </div>
          <div ref="articlePlayer" class="article-player" :class="{ playing: articlePlaying }">
            <button
              type="button"
              :aria-label="articlePlaying ? 'Tạm dừng' : 'Nghe bài viết'"
              @click="toggleArticleAudio"
            >
              <img :src="articlePlaying ? pauseAsset : articlePlay" alt="" />
            </button>
            <div>
              <p><strong>Nghe bài viết</strong><small>04:32</small></p>
              <span class="audio-track"><i></i></span><small>Giọng đọc TIN A · 1x</small>
            </div>
          </div>
        </header>

        <section class="story" aria-labelledby="story-heading">
          <h2 id="story-heading">NỘI DUNG BÀI VIẾT</h2>
          <figure>
            <div class="editorial-visual school">
              <span>TRƯỜNG THPT · KHU VỰC TUYỂN SINH</span><i v-for="n in 8" :key="n"></i>
            </div>
            <figcaption>
              Phụ huynh xếp hàng chờ nộp hồ sơ tại điểm tuyển sinh. Ảnh minh họa · Trung tâm Truyền
              thông TIN A.
            </figcaption>
          </figure>
          <div class="story-copy">
            <p class="lead">
              Từ 15h hôm trước, nhiều phụ huynh đã có mặt tại khu vực tuyển sinh, mang theo ghế nhỏ,
              nước uống và giấy tờ cần thiết. Ai cũng mong hoàn tất thủ tục sớm để bảo đảm quyền lợi
              cho con.
            </p>
            <p>
              Khoảng 5 giờ sáng, lượng người chờ tăng nhanh. Nhà trường tổ chức lối xếp hàng và kiểm
              tra hồ sơ theo từng nhóm, đồng thời phát số thứ tự để hạn chế tình trạng chen lấn.
            </p>
            <blockquote>
              “Nhà trường tiếp nhận hồ sơ theo thứ tự, công khai quy trình và ưu tiên hỗ trợ những
              trường hợp cần hướng dẫn gấp.”<cite>Đại diện điểm tuyển sinh</cite>
            </blockquote>
            <h3>Quy trình được tổ chức lại trong buổi sáng</h3>
            <p>
              Khu vực tiếp nhận được chia thành các bàn kiểm tra, đối chiếu và xác nhận. Phụ huynh
              có thể theo dõi số thứ tự trên bảng hướng dẫn, sau đó di chuyển lần lượt qua từng
              bước.
            </p>
            <p>
              Ban tổ chức khuyến nghị người dân chuẩn bị bản chính và bản sao theo danh mục, kiểm
              tra thông tin trước khi nộp, đồng thời theo dõi các thông báo chính thức để tránh phải
              chờ lâu.
            </p>
          </div>
          <figure>
            <div class="editorial-visual queue">
              <span v-for="color in people" :key="color" :style="{ background: color }"></span>
            </div>
            <figcaption>
              Phụ huynh chờ đến lượt kiểm tra hồ sơ tại khu vực tiếp nhận. Không gian được bố trí
              theo từng luồng di chuyển.
            </figcaption>
          </figure>

          <aside class="facts">
            <h3><img :src="verifiedIcon" alt="" /> THÔNG TIN CẦN BIẾT</h3>
            <dl>
              <div>
                <dt>Thời gian tiếp nhận</dt>
                <dd>07:30–17:00 · 15–20/08/2026</dd>
              </div>
              <div>
                <dt>Hồ sơ cần mang</dt>
                <dd>Bản chính, bản sao và giấy tờ xác nhận</dd>
              </div>
              <div>
                <dt>Kênh cập nhật</dt>
                <dd>Thông báo chính thức của đơn vị tuyển sinh</dd>
              </div>
            </dl>
          </aside>
          <aside class="source">
            <strong><img :src="sourceVerifiedIcon" alt="" /> Nguồn: Phòng Tin tức</strong>
            <p>Phát hành 07:30 · Cập nhật lần cuối 08:10, 15/08/2026</p>
            <p>Nội dung thuộc hệ thống thông tin đối ngoại TIN A.</p>
          </aside>
        </section>

        <section class="comments" aria-labelledby="comments-heading">
          <header>
            <h2 id="comments-heading">BÌNH LUẬN</h2>
            <small>18 bình luận</small>
          </header>
          <div class="comment-tabs">
            <button class="active">Top 5</button><button>Tất cả (18)</button>
          </div>
          <label class="composer"
            ><img :src="currentUserAvatar" alt="" /><input placeholder="Viết bình luận..." /><img
              :src="sendIcon"
              alt="Gửi bình luận"
          /></label>
          <article v-for="comment in comments" :key="comment.name" class="comment">
            <img :src="commentAvatar" alt="" />
            <div>
              <header>
                <strong>{{ comment.name }}</strong
                ><small>{{ comment.time }}</small>
              </header>
              <p>{{ comment.text }}</p>
              <button>Thích · Trả lời</button>
            </div>
          </article>
          <button class="all-comments" type="button">Xem tất cả 18 bình luận</button>
        </section>
      </article>
    </ion-content>

    <footer class="reading-toolbar">
      <div class="reading-progress"><span :style="{ width: `${readingProgress}%` }"></span></div>
      <button
        v-for="action in actions"
        :key="action.label"
        type="button"
        @click="handleAction(action.label)"
      >
        <img :src="action.icon" alt="" /><span>{{ action.label }}</span>
      </button>
    </footer>
  </ion-page>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useRouter } from 'vue-router'
import { IonContent, IonPage } from '@ionic/vue'
import AppHeader from '../components/AppHeader.vue'
import BreakingNewsBar from '../components/BreakingNewsBar.vue'
import backIcon from '../assets/figma/article-back.svg'
import moreIcon from '../assets/figma/article-more.svg'
import articlePlay from '../assets/figma/article-play.svg'
import pauseAsset from '../assets/figma/audio-pause.svg'
import verifiedIcon from '../assets/figma/article-verified.svg'
import sourceVerifiedIcon from '../assets/figma/article-source-verified.svg'
import currentUserAvatar from '../assets/figma/article-current-user.svg'
import sendIcon from '../assets/figma/article-send.svg'
import commentAvatar from '../assets/figma/article-avatar.svg'
import listenIcon from '../assets/figma/article-listen.svg'
import shareIcon from '../assets/figma/article-share.svg'
import saveIcon from '../assets/figma/article-save.svg'
import textIcon from '../assets/figma/article-text.svg'

const router = useRouter()
const articleBody = ref(null)
const articlePlayer = ref(null)
const articlePlaying = ref(false)
const readingProgress = ref(36)
const people = [
  '#30424f',
  '#54616b',
  '#7a523d',
  '#3d596b',
  '#614052',
  '#756e61',
  '#30424f',
  '#54616b',
  '#7a523d',
]
const comments = [
  {
    name: 'Nguyễn Minh Anh',
    time: '12 phút trước',
    text: 'Nội dung trình bày rõ ràng, phần thông tin cần biết rất hữu ích.',
  },
  {
    name: 'Trần Quốc Huy',
    time: '25 phút trước',
    text: 'Mong đơn vị cập nhật thêm hướng dẫn hồ sơ theo từng trường hợp.',
  },
  {
    name: 'Lê Thu Hà',
    time: '42 phút trước',
    text: 'Phần nghe bài viết thuận tiện khi đang di chuyển.',
  },
  {
    name: 'Phạm Đức Long',
    time: '1 giờ trước',
    text: 'Thông tin thời gian tiếp nhận đã giúp tôi chủ động hơn.',
  },
  {
    name: 'Hoàng Ngọc Mai',
    time: '2 giờ trước',
    text: 'Giao diện dễ đọc, các nguồn tin được thể hiện rõ ràng.',
  },
]
const actions = [
  { label: 'Nghe tin', icon: listenIcon },
  { label: 'Chia sẻ', icon: shareIcon },
  { label: 'Lưu', icon: saveIcon },
  { label: 'Cỡ chữ', icon: textIcon },
]
let revealObserver
let animationContext
function goBack() {
  window.history.length > 1 ? router.back() : router.push('/latest')
}
async function updateProgress(event) {
  const el = await event.target.getScrollElement()
  const max = Math.max(el.scrollHeight - el.clientHeight, 1)
  readingProgress.value = Math.min(100, Math.max(0, Math.round((el.scrollTop / max) * 100)))
}
function handleAction(label) {
  if (label === 'Nghe tin') articlePlaying.value = !articlePlaying.value
}
function toggleArticleAudio() {
  articlePlaying.value = !articlePlaying.value
  if (!articlePlayer.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const button = articlePlayer.value.querySelector('button')
  gsap.killTweensOf(button)
  gsap.fromTo(button, { scale: 0.9 }, { scale: 1, duration: 0.38, ease: 'back.out(2)' })
}

onMounted(async () => {
  await nextTick()
  if (!articleBody.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  animationContext = gsap.context(() => {
    gsap.from('.article-header > *', {
      y: 18,
      autoAlpha: 0,
      duration: 0.52,
      stagger: 0.075,
      ease: 'power3.out',
    })

    const revealTargets = gsap.utils.toArray([
      '.story > h2',
      '.story > figure',
      '.story-copy > *',
      '.facts',
      '.source',
      '.comments > header',
      '.comment-tabs',
      '.composer',
      '.comment',
      '.all-comments',
    ])
    gsap.set(revealTargets, { y: 22, autoAlpha: 0 })

    revealObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target)
        if (!visible.length) return
        gsap.to(visible, {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: 'power3.out',
          clearProps: 'transform',
        })
        visible.forEach((target) => revealObserver.unobserve(target))
      },
      { threshold: 0.06, rootMargin: '0px 0px -24px' },
    )
    revealTargets.forEach((target) => revealObserver.observe(target))
  }, articleBody.value)
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  animationContext?.revert()
  if (articlePlayer.value) gsap.killTweensOf(articlePlayer.value.querySelectorAll('*'))
})
</script>

<style scoped>
.article-page {
  --ion-background-color: #fff;
  font-family: 'Roboto Condensed', Arial, sans-serif;
}
.article-nav {
  height: 48px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px 8px 12px;
  border-bottom: 1px solid #d1d9e3;
  background: #fff;
}
.article-nav button {
  width: 40px;
  height: 32px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #212529;
  font-size: 20px;
}
.article-nav strong {
  font-size: 17px;
}
.article-nav span {
  flex: 1;
}
.article-content {
  --background: #fff;
  --padding-bottom: 92px;
}
.article-body {
  width: min(100%, 390px);
  margin: 0 auto;
  padding: 20px 16px 28px;
}
.article-header {
  display: grid;
  gap: 12px;
}
.category-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.category-row span {
  padding: 4px 8px;
  border: 1px solid #165fa0;
  border-radius: 4px;
  background: #f0f7fe;
  color: #165fa0;
  font-size: 11px;
  font-weight: 700;
}
.category-row small {
  color: #878a99;
  font-size: 12px;
}
.article-header h1 {
  margin: 0;
  color: #212529;
  font-size: 28px;
  line-height: 33px;
}
.standfirst {
  margin: 0;
  color: #212529;
  font-size: 16px;
  line-height: 23px;
}
.author {
  height: 48px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.author > b {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #165fa0;
  color: #fff;
  font-size: 12px;
}
.author span {
  display: flex;
  flex-direction: column;
}
.author strong {
  color: #165fa0;
  font-size: 13px;
}
.author small {
  color: #878a99;
  font-size: 11px;
}
.article-player {
  height: 78px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid #d1d9e3;
  border-radius: 8px;
  background: #f7f8fa;
  box-shadow: 0 2px 5px rgba(10, 46, 71, 0.06);
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}
.article-player.playing {
  border-color: rgba(22, 95, 160, 0.52);
  background: #f2f8fc;
  box-shadow: 0 6px 18px rgba(10, 46, 71, 0.1);
}
.article-player > button {
  width: 44px;
  height: 44px;
  display: grid;
  flex: 0 0 44px;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: #165fa0;
  color: white;
}
.article-player > div {
  min-width: 0;
  flex: 1;
}
.article-player p {
  display: flex;
  justify-content: space-between;
  margin: 0 0 5px;
}
.article-player strong {
  font-size: 14px;
}
.article-player small {
  color: #878a99;
  font-size: 11px;
}
.audio-track {
  height: 4px;
  display: block;
  margin-bottom: 5px;
  overflow: hidden;
  border-radius: 2px;
  background: #d1d9e3;
}
.audio-track i {
  width: 24%;
  height: 100%;
  display: block;
  border-radius: 2px;
  background: #165fa0;
  transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.article-player.playing .audio-track i {
  width: 42%;
}
.story,
.comments {
  margin-top: 20px;
}
.story > h2,
.comments > header h2 {
  margin: 0;
  padding-left: 12px;
  border-left: 4px solid #165fa0;
  color: #212529;
  font-size: 18px;
  line-height: 22px;
}
.story figure {
  margin: 20px 0;
}
.editorial-visual {
  height: 232px;
  position: relative;
  overflow: hidden;
  border: 1px solid #d1d9e3;
  border-radius: 8px;
}
.school {
  background: linear-gradient(#e5f0f7 45%, #b8c7d4 45%);
}
.school > span {
  position: absolute;
  z-index: 2;
  top: 55px;
  left: 32px;
  width: 292px;
  padding: 17px 10px;
  border-radius: 3px;
  background: #093052;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
}
.school i {
  position: relative;
  top: 111px;
  width: 3px;
  height: 74px;
  display: inline-block;
  margin-left: 33px;
  background: rgba(255, 255, 255, 0.75);
}
.school::after {
  content: '';
  position: absolute;
  left: 18px;
  right: 12px;
  bottom: 17px;
  height: 50px;
  background: repeating-radial-gradient(circle at 12px 10px, #314b5d 0 7px, transparent 8px 38px);
}
.story figcaption {
  margin-top: 8px;
  color: #627586;
  font-size: 11px;
  line-height: 16px;
}
.story-copy p {
  margin: 0 0 16px;
  color: #212529;
  font-size: 15px;
  line-height: 22px;
}
.story-copy .lead {
  font-weight: 600;
}
.story-copy blockquote {
  margin: 0 0 16px;
  padding: 16px;
  border-left: 4px solid #165fa0;
  background: #f2f7fa;
  color: #173b56;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
}
.story-copy cite {
  display: block;
  margin-top: 8px;
  color: #627586;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
}
.story-copy h3 {
  margin: 0 0 16px;
  font-size: 20px;
  line-height: 27px;
}
.queue {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 0 12px 40px;
  background: linear-gradient(#d8e4ec 55%, #c5b9a8 55%);
}
.queue span {
  width: 26px;
  height: 74px;
  border-radius: 13px 13px 5px 5px;
}
.facts {
  padding: 16px;
  border: 1px solid #cfe0ed;
  border-radius: 8px;
  background: #eef7fd;
}
.facts h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px;
  color: #173b56;
  font-size: 15px;
}
.facts dl {
  margin: 0;
}
.facts dl div {
  position: relative;
  padding: 0 0 10px 17px;
}
.facts dl div::before {
  content: '';
  position: absolute;
  top: 6px;
  left: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #165fa0;
}
.facts dt {
  font-size: 13px;
  font-weight: 700;
}
.facts dd {
  margin: 2px 0 0;
  color: #627586;
  font-size: 12px;
}
.source {
  margin-top: 20px;
  padding: 14px;
  border: 1px solid #d1d9e3;
  border-radius: 7px;
  background: #f7f9fb;
}
.source strong {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #172a3a;
  font-size: 13px;
}
.source p {
  margin: 10px 0 0;
  color: #627586;
  font-size: 12px;
}
.comments > header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.comments > header small {
  color: #878a99;
  font-size: 12px;
}
.comment-tabs {
  height: 42px;
  display: flex;
  margin: 14px 0;
  padding: 3px;
  border-radius: 7px;
  background: #f7f8fa;
}
.comment-tabs button {
  flex: 1;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: #878a99;
}
.comment-tabs .active {
  background: #fff;
  color: #165fa0;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(10, 46, 71, 0.08);
}
.composer {
  height: 52px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px 8px 12px;
  border: 1px solid #d1d9e3;
  border-radius: 7px;
}
.composer span,
.comment > span {
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #165fa0;
  color: #fff;
  font-weight: 700;
}
.composer span {
  width: 30px;
  height: 30px;
  font-size: 10px;
}
.composer input {
  min-width: 0;
  flex: 1;
  border: 0;
  outline: 0;
  font-size: 14px;
}
.composer ion-icon {
  color: #165fa0;
  font-size: 22px;
}
.comment {
  min-height: 98px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 0;
  border-bottom: 1px solid #d1d9e3;
}
.comment > span {
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  font-size: 10px;
  background: #d9e6ef;
  color: #165fa0;
}
.comment > div {
  min-width: 0;
  flex: 1;
}
.comment header {
  display: flex;
  justify-content: space-between;
}
.comment header strong {
  font-size: 13px;
}
.comment header small {
  color: #878a99;
  font-size: 11px;
}
.comment p {
  margin: 4px 0;
  font-size: 14px;
  line-height: 20px;
}
.comment button {
  border: 0;
  padding: 0;
  background: transparent;
  color: #165fa0;
  font-size: 11px;
}
.all-comments {
  width: 100%;
  height: 44px;
  margin-top: 14px;
  border: 1px solid #165fa0;
  border-radius: 6px;
  background: #fff;
  color: #165fa0;
  font-size: 14px;
  font-weight: 700;
}
.reading-toolbar {
  position: fixed;
  z-index: 25;
  bottom: 0;
  left: 50%;
  width: min(100%, 390px);
  height: calc(76px + env(safe-area-inset-bottom));
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 3px 14px env(safe-area-inset-bottom);
  border-top: 1px solid #d8e4ec;
  background: #fff;
  box-shadow: 0 -3px 8px rgba(10, 46, 71, 0.1);
  transform: translateX(-50%);
}
.reading-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: #e8f0f5;
}
.reading-progress span {
  display: block;
  height: 100%;
  background: #1267a5;
  transition: width 120ms linear;
}
.reading-toolbar button {
  width: 76px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 0;
  background: transparent;
  color: #314b5d;
}
.reading-toolbar img {
  width: 22px;
  height: 22px;
}
.reading-toolbar span {
  font-size: 12px;
}
.article-body {
  min-height: 2809px;
}
.article-nav button img,
.article-nav .more-icon {
  width: 20px;
  height: 20px;
}
.article-player > button img {
  width: 18px;
  height: 18px;
}
.facts h3 img {
  width: 22px;
  height: 22px;
}
.source strong img {
  width: 18px;
  height: 18px;
}
.composer > img:first-child {
  width: 30px;
  height: 30px;
}
.composer > img:last-child {
  width: 22px;
  height: 22px;
}
.comment > img {
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
}
@media (prefers-reduced-motion: reduce) {
  .article-player,
  .audio-track i {
    transition: none;
  }
}
</style>
