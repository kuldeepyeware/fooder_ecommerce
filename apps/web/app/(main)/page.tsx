import Banner from "../../components/Home/Banner";
import BrowseRange from "../../components/Home/BrowseRange";
import OurProduct from "../../components/Home/OurProduct";

export default async function Page() {
  return (
    <main>
      <Banner />

      <BrowseRange />
      <OurProduct />
    </main>
  );
}
