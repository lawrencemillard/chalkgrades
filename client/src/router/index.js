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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: StartLayer,
      children: [
        {
          path: '',
          name: 'home',
          component: StartHomeView
        },
        {
          path: 'login',
          name: 'login',
          component: StartLoginView
        },
        {
          path: 'signup',
          name: 'signup',
          component: StartSignupView
        }
      ]
    },
    {
      path: '/dashboard',
      component: UserLayer,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: UserDashboardView
        },
        {
          path: 'join',
          name: 'join',
          component: UserJoinView
        },
        {
          path: 'create',
          name: 'user-create',
          component: UserCreateView
        }
      ]
    },
    {
      path: '/work/:work_admin_username/:urn',
      component: WorkLayer,
      children: [
        {
          path: 'members',
          name: 'members',
          component: WorkMembersView
        },
        {
          path: 'exams',
          name: 'exams',
          component: WorkExamsView
        },
        {
          path: 'settings',
          name: 'work-settings',
          component: WorkSettingsView
        },
        {
          path: 'create',
          name: 'work-create',
          component: WorkCreateView
        }
      ]
    },
    {
      path: '/manage/:work_admin_username/:urn/:exam_id',
      component: ManageLayer,
      children: [
        {
          path: 'questions',
          name: 'questions',
          component: ManageQuestionsView
        },
        {
          path: 'sessions',
          name: 'sessions',
          component: ManageSessionsView
        },
        {
          path: 'settings',
          name: 'exam-settings',
          component: ManageSettingsView
        },
        {
          path: 'start',
          name: 'start',
          component: ManageStartView
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  document.title = to.meta?.title ?? 'chalk - ...'
})

export default router
