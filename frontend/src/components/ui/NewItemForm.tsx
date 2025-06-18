import { useState } from 'react';
import { Box, Button, Heading, Input, Stack } from '@chakra-ui/react';
import { Toaster, toaster } from '@/components/ui/toaster'
import { createItem } from '@/util/api/item'
import MySelect from './MySelect'

const NewItemForm = ({ onItemCreated }: { onItemCreated: () => void }) => {
  const [name, setName] = useState("");
  const [group, setGroup] = useState<"Primary" | "Secondary">("Primary");
  const [loading, setLoading] = useState(false);

  const createToast = (title: string, description: string) => {
    toaster.create({
      title,
      description,
      duration: 5000,
    })
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      createToast("Error", "Item name cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      await createItem({ name, group });
      createToast("Success", "Item created successfully.");
      setName("");
      setGroup("Primary");
      onItemCreated(); // callback to refresh item list
    } catch (error: any) {
      if (error.response?.status === 400) {
        createToast("Error", "Invalid input. Please check your data.")
      }
      else if (error.response?.status === 500) {
        createToast("Error", "Server error. Please try again later.")
      }
      else if (error.response?.status === 403) {
        createToast("Error", "You do not have permission to create items.")
      }
      else if (error.response?.status === 404) {
        createToast("Error", "Endpoint not found.")
      }
      else if (error.response?.status === 429) {
        createToast("Error", "Too many requests. Please wait before trying again.")
      }
      else {
        console.error("Unexpected error:", error)
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4} borderWidth="1px" rounded="md">
      <Heading size="xl" mb={4}>
        Create New Item Using The Form Below
      </Heading>
      <Toaster />
      <Stack gap={4}>
        <Input
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <MySelect value={group} onChange={setGroup}/>
        <Button
          colorScheme="teal"
          onClick={handleSubmit}
          loading={loading}
        >
          Create Item
        </Button>
      </Stack>
    </Box>
  );
};

export default NewItemForm;


