export default [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/main/index.js')
  },
  {
    path: '/saidbone',
    name: 'saidbone',
    component: () => import('@/views/saidbone/index.js')
  },
  {
    path: '/sudoku',
    name: 'sudoku',
    component: () => import('@/views/sudoku/index.js')
  }
]
