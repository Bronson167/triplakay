// import Hero from '../components/Hero'
import TrustedBy from '../components/TrustedBy'
import Services from '../components/Services'
import OurWork from '../components/OurWork'
import Teams from '../components/Teams'
import ContactUs from '../components/Contact'
import Hero from '../components/Hero'
import { Helmet } from "react-helmet-async";



const Home = () => {
  return (
    <>
    
<Helmet>
  <title>TripLakay – Découvrez le Cap-Haïtien autrement</title>

  <meta
    name="description"
    content="TripLakay est votre guide touristique du Cap-Haïtien. Découvrez les sites historiques, les plages paradisiaques, les restaurants, les hôtels et les meilleures activités pour explorer le nord d’Haïti en toute simplicité."
  />

  <meta
    name="keywords"
    content="TripLakay, Cap-Haïtien, tourisme Haïti, visiter Cap-Haïtien, Citadelle Laferrière, Palais Sans-Souci, Labadie, plages Haïti, restaurants Cap-Haïtien, guide touristique, voyage Haïti, tourisme nord Haïti"
  />

  <meta name="author" content="TripLakay" />
  <meta name="robots" content="index, follow" />

  {/* Open Graph */}
  <meta
    property="og:title"
    content="TripLakay – Votre guide touristique du Cap-Haïtien"
  />

  <meta
    property="og:description"
    content="Explorez les plus beaux sites historiques, plages, restaurants, hôtels et expériences culturelles du Cap-Haïtien avec TripLakay."
  />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://triplakay.com" />
  <meta property="og:image" content="/preview.jpg" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />

  <meta
    name="twitter:title"
    content="TripLakay – Découvrez le Cap-Haïtien autrement"
  />

  <meta
    name="twitter:description"
    content="Le guide incontournable pour explorer les trésors historiques, culturels et naturels du Cap-Haïtien."
  />

  <meta name="twitter:image" content="/preview.jpg" />
</Helmet>
      <Hero />
      {/* <TrustedBy /> */}
      <Services />
      <OurWork />
      {/* <Teams /> */}
      <ContactUs />
    </>
  )
}

export default Home
