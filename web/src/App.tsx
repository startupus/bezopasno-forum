import { AudienceSection } from './components/AudienceSection'
import { FloatingCTA } from './components/FloatingCTA'
import { Footer } from './components/Footer'
import { GallerySection } from './components/GallerySection'
import { HeroSection } from './components/HeroSection'
import { OrganizersSection } from './components/OrganizersSection'
import { PartnerPackagesSection } from './components/PartnerPackagesSection'
import { PartnersSection } from './components/PartnersSection'
import { PastEventsGallery } from './components/PastEventsGallery'
import { ProgramSection } from './components/ProgramSection'
import { RegistrationSection } from './components/RegistrationSection'
import { ValueSection } from './components/ValueSection'

const App = () => (
  <div className="bg-brand.dark text-white">
    <HeroSection />
    <AudienceSection />
    <GallerySection />
    <OrganizersSection />
    <ProgramSection />
    <PastEventsGallery />
    <ValueSection />
    <PartnersSection />
    <PartnerPackagesSection />
    <RegistrationSection />
    <Footer />
    <FloatingCTA />
      </div>
  )

export default App
