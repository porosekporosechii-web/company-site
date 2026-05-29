import { Banner } from '@/components/Banner';
import { Services } from '@/components/Services';
import { Gallery } from '@/components/Gallery';
import { Feedback } from '@/components/Feedback';
import { CompanyInfo } from '@/components/CompanyInfo';
import { Partners } from '@/components/Partners';
import { Contacts } from '@/components/Contacts';

export default function HomePage() {
  return (
    <main>
      <Banner />
      <Services />
      <Gallery />
      <Feedback />
      <CompanyInfo />
      <Partners />
      <Contacts />
    </main>
  );
}
