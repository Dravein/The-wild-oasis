import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    //Devtools ezt látod, ez alalpján a kulcs alapján dönti el mit kell keresnie. (Ha másik oldalról ovassunk ezzel a kulccsal adatot akkor a Cache-ből veszi ki ha már ott van.)
    queryKey: ["booking", bookingId],
    //A funkció ami a Fetchelésért felelős, fontos hogy Promise-al kell visszatérnie. (Legegyszerűbb ha Catch-et közvetlenül adjuk át neki, itt viszont callback funkcióba fogjuk.)
    queryFn: () => getBooking(bookingId),
    //Alapból ha nem talál adatot akkor a React Query még rápróbál fethelni 3-szor, ezzel kikapcsolhatjuk ezt. retry: false
    retry: false,
  });
  // //Miből áll a visszakapott objektum
  // console.log(x);

  return { isLoading, error, booking };
}
