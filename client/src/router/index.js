import { createRouter, createWebHistory } from 'vue-router'

import UserLayer from '@/layers/UserLayer.vue'
import StartLayer from '@/layers/StartLayer.vue'
import WorkLayer from '@/layers/WorkLayer.vue'
import ManageLayer from '@/layers/ManageLayer.vue'

import StartHomeView from '@/views/start/StartHomeView.vue'
import StartLoginView from '@/views/start/StartLoginView.vue'
import StartSignupView from '@/views/start/StartSignupView.vue'

import UserDashboardView from '@/views/user/UserDashboardView.vue'
import UserCreateView from '@/views/user/UserCreateView.vue'
import UserJoinView from '@/views/user/UserJoinView.vue'

import WorkMembersView from '@/views/work/WorkMembersView.vue'
import WorkExamsView from '@/views/work/WorkExamsView.vue'
import WorkSettingsView from '@/views/work/WorkSettingsView.vue'
import WorkCreateView from '@/views/work/WorkCreateView.vue'

import ManageStartView from '@/views/manage/ManageStartView.vue'
import ManageSessionsView from '@/views/manage/ManageSessionsView.vue'
import ManageQuestionsView from '@/views/manage/ManageQuestionsView.vue'
import ManageSettingsView from '@/views/manage/ManageSettingsView.vue'

import ExamWriteView from '@/views/exam/ExamWriteView.vue'
import ExamAccessView from '@/views/exam/ExamAccessView.vue'

const createRoute = (path, name, component, children = []) => ({
  path,
  name,
  component,
  children
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    createRoute('/', StartLayer, null, [
      createRoute('', 'home', StartHomeView),
      createRoute('login', 'login', StartLoginView),
      createRoute('signup', 'signup', StartSignupView)
    ]),
    createRoute('/dashboard', UserLayer, null, [
      createRoute('', 'dashboard', UserDashboardView),
      createRoute('join', 'join', UserJoinView),
      createRoute('create', 'user-create', UserCreateView)
    ]),
    createRoute('/work/:work_admin_username/:urn', WorkLayer, null, [
      createRoute('members', 'members', WorkMembersView),
      createRoute('exams', 'exams', WorkExamsView),
      createRoute('settings', 'work-settings', WorkSettingsView),
      createRoute('create', 'work-create', WorkCreateView)
    ]),
    createRoute('/manage/:work_admin_username/:urn/:exam_id', ManageLayer, null, [
      createRoute('questions', 'questions', ManageQuestionsView),
      createRoute('sessions', 'sessions', ManageSessionsView),
      createRoute('settings', 'exam-settings', ManageSettingsView),
      createRoute('start', 'start', ManageStartView)
    ])
  ]
})

router.beforeEach((to) => {
  document.title = to.meta?.title ?? 'chalk - ...'
})

export default router
