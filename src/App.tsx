import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Layout from '@/layouts/Layout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import President from '@/pages/President'
import Media from '@/pages/Media'
import Legislation from '@/pages/Legislation'
import Tenders from '@/pages/Tenders'
import TenderDetail from '@/pages/TenderDetail'
import Advocacy from '@/pages/Advocacy'
import Enterprises from '@/pages/Enterprises'
import AdminLayout from '@/layouts/AdminLayout'
import AdminDashboard from '@/pages/admin/Dashboard'
import AdminPresident from '@/pages/admin/President'
import AdminStaff from '@/pages/admin/Staff'
import AdminMedia from '@/pages/admin/Media'
import AdminLegislation from '@/pages/admin/Legislation'
import AdminTenders from '@/pages/admin/Tenders'
import AdminAdvocacy from '@/pages/admin/Advocacy'
import AdminLectures from '@/pages/admin/Lectures'
import AdminEnterprises from '@/pages/admin/Enterprises'
import AdminProposals from '@/pages/admin/Proposals'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/president" element={<President />} />
          <Route path="/media" element={<Media />} />
          <Route path="/legislation" element={<Legislation />} />
          <Route path="/tenders" element={<Tenders />} />
          <Route path="/tenders/:id" element={<TenderDetail />} />
          <Route path="/advocacy" element={<Advocacy />} />
          <Route path="/enterprises" element={<Enterprises />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="president" element={<AdminPresident />} />
          <Route path="staff" element={<AdminStaff />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="legislation" element={<AdminLegislation />} />
          <Route path="tenders" element={<AdminTenders />} />
          <Route path="advocacy" element={<AdminAdvocacy />} />
          <Route path="lectures" element={<AdminLectures />} />
          <Route path="enterprises" element={<AdminEnterprises />} />
          <Route path="proposals" element={<AdminProposals />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  )
}
