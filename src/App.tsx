import Login from './pages/auth/Login.tsx'
import Register from './pages/auth/Register.tsx'
import EmailVerification from './pages/auth/success/EmailVerification.tsx'
import Loading from './pages/loading/Loading.tsx'
import ForgotPassword from './pages/auth/forgot/ForgotPassword.tsx'
import ResetPassword from './pages/auth/forgot/ResetPassword.tsx'
import SpecialistDashboard from './pages/dashboard/SpecialistDashboard.tsx'
import SpecialistPortfolio from './pages/dashboard/SpecialistPortfolio.tsx'
import SpecialistOpenProjects from './pages/dashboard/SpecialistOpenProjects.tsx'
import SpecialistProject from './pages/dashboard/SpecialistProject.tsx'
import SpecialistActiveProject from './pages/dashboard/SpecialistActiveProject.tsx'
import SpecialistProjectChat from './pages/dashboard/SpecialistProjectChat.tsx'
import SpecialistProfile from './pages/dashboard/SpecialistProfile.tsx'
import SpecialistInviteProject from './pages/dashboard/SpecialistInviteProject.tsx'
import SpecialistPortfolioProject from './pages/dashboard/SpecialistPortfolioProject.tsx'
import CustomerDashboard from './pages/dashboard/CustomerDashboard.tsx'
import CustomerProject from './pages/dashboard/CustomerProject.tsx'
import CustomerProjectPortfolio from './pages/dashboard/CustomerProjectPortfolio.tsx'
import CustomerProjectPortfolioProject from './pages/dashboard/CustomerProjectPortfolioProject.tsx'
import CustomerProfile from './pages/dashboard/CustomerProfile.tsx'
import CustomerNewProject from './pages/dashboard/CustomerNewProject.tsx'
import ValidatorQueue from './pages/dashboard/ValidatorQueue.tsx'
import ValidatorProfile from './pages/dashboard/ValidatorProfile.tsx'

function App() {
  const path = window.location.pathname.toLowerCase()
  if (path === '/register') {
    return <Register />
  }
  if (path === '/register/success') {
    return <EmailVerification />
  }
  if (path === '/loading') {
    return <Loading />
  }
  if (path === '/forgot') {
    return <ForgotPassword />
  }
  if (path === '/forgot/reset') {
    return <ResetPassword />
  }
  if (path === '/dashboard/specialist') {
    return <SpecialistDashboard />
  }
  if (path === '/dashboard/customer' || path === '/dashboard/custom') {
    return <CustomerDashboard />
  }
  if (path === '/dashboard/specialist/portfolio') {
    return <SpecialistPortfolio />
  }
  if (path === '/dashboard/specialist/open-projects') {
    return <SpecialistOpenProjects />
  }
  if (path === '/dashboard/specialist/project') {
    return <SpecialistActiveProject />
  }
  if (path === '/dashboard/specialist/project/chat') {
    return <SpecialistProjectChat />
  }
  if (path === '/dashboard/specialist/profile') {
    return <SpecialistProfile />
  }
  if (path === '/queue/validator' || path === '/dashboard/validator') {
    return <ValidatorQueue />
  }
  if (path === '/queue/validator/profile' || path === '/dashboard/validator/profile') {
    return <ValidatorProfile />
  }
  if (path === '/dashboard/customer/new-project' || path === '/dashboard/custom/new-project') {
    return <CustomerNewProject />
  }
  if (path === '/dashboard/customer/profile' || path === '/dashboard/custom/profile') {
    return <CustomerProfile />
  }
  if (path === '/dashboard/customer/project' || path === '/dashboard/custom/project') {
    return <CustomerProject />
  }
  if (
    path === '/dashboard/customer/project/portfolio' ||
    path === '/dashboard/custom/project/portfolio'
  ) {
    return <CustomerProjectPortfolio />
  }
  if (
    path === '/dashboard/customer/project/portfolio/project' ||
    path === '/dashboard/custom/project/portfolio/project'
  ) {
    return <CustomerProjectPortfolioProject />
  }
  if (path === '/dashboard/specialist/open-projects/project') {
    return <SpecialistProject />
  }
  if (path === '/dashboard/specialist/invites/project') {
    return <SpecialistInviteProject />
  }
  if (path === '/dashboard/specialist/portfolio/project') {
    return <SpecialistPortfolioProject />
  }
  return <Login />
}

export default App
