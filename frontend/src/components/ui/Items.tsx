import { useEffect, useState } from "react"
import { fetchItems, type Item } from "../../util/api/item"
import { Text, Spinner, Stack, Heading } from "@chakra-ui/react";
import CardItem from './CardItem'

const dateFormatter = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',      // "Tue"
    year: 'numeric',       // "2025"
    month: 'short',        // "Jun"
    day: 'numeric',        // "17"
    hour: '2-digit',       // "05 PM"
    minute: '2-digit',
    hour12: true
  });
} 

interface ItemsPageProps {
  reloadFlag: boolean;
  onItemUpdated: () => void; // Optional callback for item updates
}

const ItemsPage: React.FC<ItemsPageProps> = ({ reloadFlag, onItemUpdated }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems()
      .then(setItems)
      .finally(() => setLoading(false));
  }, [reloadFlag]);

  if (loading) return <Spinner size="xl" />;

  return (
  <>
    <Heading size="5xl" mt={10} mb={4}>
      Items List
    </Heading>
    <Stack p={6} direction={"row"} wrap={"wrap"} justifyContent="center" gap={10}>
      {items.length === 0 ? (
        <Text>No items found.</Text>
      ) : (
        items.map((item) => (
          <CardItem
            key={item.id}
            id={item.id}
            name={item.name}
            group={item.group}
            created_at={dateFormatter(item.created_at)}
            updated_at={dateFormatter(item.updated_at)}
            onItemUpdated={onItemUpdated} // Pass the callback to CardItem
          />
        ))
      )}
    </Stack>
  </>
  );
}

export default ItemsPage;
// This component fetches items from the API and displays them in a grid of cards.
