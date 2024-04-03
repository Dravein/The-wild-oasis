import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    //Devtools ezt látod, ez alalpján a kulcs alapján dönti el mit kell keresnie. (Ha másik oldalról ovassunk ezzel a kulccsal adatot akkor a Cache-ből veszi ki ha már ott van.)
    queryKey: ["cabins"],
    //A funkció ami a Fetchelésért felelős, fontos hogy Promise-al kell visszatérnie. (Legegyszerűbb ha Catch-et közvetlenül adjuk át neki, itt viszont callback funkcióba fogjuk.)
    queryFn: getCabins,
  });
  // //Miből áll a visszakapott objektum
  // console.log(x);

  return { isLoading, error, cabins };
}
