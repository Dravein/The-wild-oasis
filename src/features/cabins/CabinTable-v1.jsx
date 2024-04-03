import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
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

  if (isLoading) return <Spinner />;

  //CSS segítségével több HTML elemmel építi fel a táblát, nem a html table elemmel.
  return (
    <Table>
      <TableHeader>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

export default CabinTable;
