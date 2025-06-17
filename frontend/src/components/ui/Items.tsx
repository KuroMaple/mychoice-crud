import { useEffect, useState } from "react"
import { fetchItems, type Item } from "../../util/api/item"
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import CardItem from './CardItem'

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={6}>
      <Heading size="lg">Items</Heading>
      {items.length === 0 ? (
        <Text>No items found.</Text>
      ) : (
        items.map((item) => (
          <CardItem
            key={item.id}
            name={item.name}
            group={item.group}
            created_at={item.created_at}
            updated_at={item.updated_at}
          />
        ))
      )}
    </Box>
  );
}
