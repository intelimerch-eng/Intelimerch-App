import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Auth Pages
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import ForgotPassword from './pages/auth/ForgotPassword'
import VerifyAccount from './pages/auth/VerifyAccount'

// Dashboard Pages (Creator)
import DashboardLayout from './components/DashboardLayout'
import Overview from './pages/dashboard/Overview'
import Campaigns from './pages/dashboard/Campaigns'
import NewCampaign from './pages/dashboard/NewCampaign'
import Products from './pages/dashboard/Products'
import AddProduct from './pages/dashboard/AddProduct'
import PerksLibrary from './pages/dashboard/PerksLibrary'
import UploadPerk from './pages/dashboard/UploadPerk'
import TagGroups from './pages/dashboard/TagGroups'
import Analytics from './pages/dashboard/Analytics'
import Profile from './pages/dashboard/Profile'
import Notifications from './pages/dashboard/Notifications'

// Fan Pages (Mobile)
import ActivateMerch from './pages/fan/ActivateMerch'
import Activated from './pages/fan/Activated'
import AlreadyClaimed from './pages/fan/AlreadyClaimed'
import PerksLanding from './pages/fan/PerksLanding'
import VideoPerk from './pages/fan/VideoPerk'
import DiscountPerk from './pages/fan/DiscountPerk'
import AudioPerk from './pages/fan/AudioPerk'
import ImagePerk from './pages/fan/ImagePerk'
import DocumentPerk from './pages/fan/DocumentPerk'
import LinkPerk from './pages/fan/LinkPerk'

// New Dashboard Pages
import CampaignAnalytics from './pages/dashboard/CampaignAnalytics'

// Admin Pages
import AdminLayout from './components/AdminLayout'
import AdminOverview from './pages/admin/AdminOverview'
import CreatorsManagement from './pages/admin/CreatorsManagement'
import AdminCampaigns from './pages/admin/AdminCampaigns'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminTags from './pages/admin/AdminTags'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />

        {/* Auth */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify" element={<VerifyAccount />} />

        {/* Creator Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="campaigns/new" element={<NewCampaign />} />
          <Route path="campaigns/:campaignId/analytics" element={<CampaignAnalytics />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="perks" element={<PerksLibrary />} />
          <Route path="perks/upload" element={<UploadPerk />} />
          <Route path="tag-groups" element={<TagGroups />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* Fan (mobile) */}
        <Route path="/fan/activate" element={<ActivateMerch />} />
        <Route path="/fan/activated" element={<Activated />} />
        <Route path="/fan/claimed" element={<AlreadyClaimed />} />
        <Route path="/fan/perks" element={<PerksLanding />} />
        <Route path="/fan/perks/video" element={<VideoPerk />} />
        <Route path="/fan/perks/discount" element={<DiscountPerk />} />
        <Route path="/fan/perks/audio" element={<AudioPerk />} />
        <Route path="/fan/perks/image" element={<ImagePerk />} />
        <Route path="/fan/perks/document" element={<DocumentPerk />} />
        <Route path="/fan/perks/link" element={<LinkPerk />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="creators" element={<CreatorsManagement />} />
          <Route path="campaigns" element={<AdminCampaigns />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="tags" element={<AdminTags />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
