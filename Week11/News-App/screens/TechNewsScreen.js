import List from "../components/List/List";
import { NEWS } from "../data/dummy_data";

export default function TechNewsScreen() {

  const category = "Tech";
  const displayedNews = NEWS.filter((newsItem) => {
    return newsItem.category === category;
  });

  return (
    <List items={displayedNews} />
  );
}
