import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER API az URL-ből
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  // SORT API az URL-ből
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //Query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    //Devtools ezt látod, ez alalpján a kulcs alapján dönti el mit kell keresnie. (Ha másik oldalról ovassunk ezzel a kulccsal adatot akkor a Cache-ből veszi ki ha már ott van.)
    //Kicsit olyan mint egy Dependency Array a useQuery-nek (Mint a UseEffectnek is van), ha valamelyik változik akkor újra lefut. Ezért kell hozzátenni a fillter Value-t is hogy ha változik a filter akkor lefusson automatikusan újra a queryFn- függvény.
    queryKey: ["bookings", filter, sortBy, page],
    //A funkció ami a Fetchelésért felelős, fontos hogy Promise-al kell visszatérnie. (Legegyszerűbb ha Catch-et közvetlenül adjuk át neki, itt viszont callback funkcióba fogjuk.)
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, bookings, count };
}
