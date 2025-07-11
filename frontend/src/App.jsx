import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import CallPage from './pages/CallPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import { Toaster } from 'react-hot-toast';
import PageLoader from './components/PageLoader.jsx'
import useAuthUser from './hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'
import { useThemeStore } from './store/useThemeStore.js'


const App = () => {
  //query client used to get auth token from the backend server into the frontend vite + react
  
  const { isLoading, authUser} = useAuthUser();
  const {theme, setTheme} = useThemeStore();

  const isAuthenicated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;


  if (isLoading) return <PageLoader />

  return (
    <div className=' h-screen' data-theme={theme}>
      <Routes>
        <Route path='/' element={isAuthenicated && isOnboarded ? (
          <Layout showSideBar={true}>
            <HomePage />
          </Layout>
        )  : (
          <Navigate to={!isAuthenicated ? '/login' : '/onboarding'} />
        )} />
        <Route path='/signup' element={
          !isAuthenicated ?  <SignUpPage /> : <Navigate to={isOnboarded ? '/' : '/onboarding'} />
          } />
        <Route path='/login' element={
          !isAuthenicated ? <LoginPage /> : <Navigate to={isOnboarded ? '/' : '/onboarding'} />
          } />
        <Route path='/call/:id' element={
          isAuthenicated && isOnboarded ? (
            <CallPage />
          ) : (
          <Navigate to={!isAuthenicated ? '/login' : '/onboarding'} />)} />
        <Route path='/chat/:id' element={
          isAuthenicated && isOnboarded ? (
            <Layout showSideBar={false}>
              <ChatPage />
            </Layout>
          ) : (
          <Navigate to={!isAuthenicated ? '/login' : '/onboarding'} />
          )
          } />
        <Route path='/notifications' element={
          isAuthenicated && isOnboarded ? (
            <Layout showSideBar={true}>
              <NotificationsPage />
            </Layout>
          )  : (
            <Navigate to={!isAuthenicated ? '/login' : '/onboarding'} />
          )} />
        <Route path='/onboarding' element={
          isAuthenicated ? (
            !isOnboarded ? (
              <OnboardingPage />
            ) : (
              <Navigate to='/' />
            )
          ) : (
            <Navigate to='/login' />
          )}/>
      </Routes>
      <Toaster />
    </div>
    
  )
}

export default App