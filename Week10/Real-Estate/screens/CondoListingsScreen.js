import List from "../components/List/List";
import { LISTINGS } from "../data/dummy_data";

export default function CondoListingsScreen() {

  const type = "Condo";
  const displayedListings= LISTINGS.filter((listingItem) => {
    return listingItem.type === type;
  })
  return (
    <List items = {displayedListings} />
  );
}