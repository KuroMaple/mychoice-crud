import { useRef, useState } from 'react'
import { toaster } from './toaster'
import { getItem, updateItem } from '@/util/api/item'
import {
  Button,
  Card,
  Drawer,
  Input,
  Portal,
  CloseButton,
  Select,
} from "@chakra-ui/react";
import MySelect from './MySelect'

type CardItemProps = {
  id: number;
  name: string;
  group: "Primary" | "Secondary";
  created_at: string;
  updated_at: string;
  onItemUpdated: () => void; // callback to refresh parent
};

const CardItem: React.FC<CardItemProps> = ({
  id,
  name,
  group,
  created_at,
  updated_at,
  onItemUpdated,
}) => {
  const [editName, setEditName] = useState(name)
  const [editGroup, setEditGroup] = useState(group)
  const [loading, setLoading] = useState(false)
  const drawerBodyRef = useRef<HTMLDivElement>(null);


  const createToast = (title: string, description: string) => {
    toaster.create({
      title,
      description,
      duration: 5000,
    })
  }

  const handleOpenNewTab = async () => {
    try {
      const item = await getItem(id);
      const tab = window.open();
      if (tab) {
        tab.document.write(`<pre>${JSON.stringify(item, null, 2)}</pre>`);
        tab.document.close();
      }
    } catch (err) {
      toaster.create({ title: "Error", description: "Failed to fetch item.", duration: 4000 });
    }
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      console.log("Saving item:", { id, name: editName, group: editGroup });
      await updateItem(id, { name: editName, group: editGroup });
      createToast("Success", "Item updated successfully.");
      onItemUpdated();
    } catch (error) {
      if (error.response?.status === 400) {
        createToast("Error", "Invalid input. Please check your data.");
      } else if (error.response?.status === 500) {
        createToast("Error", "Server error. Please try again later.");
      } else if (error.response?.status === 403) {
        createToast("Error", "You do not have permission to update this item.");
      } else if (error.response?.status === 404) {
        createToast("Error", "Item not found.");
      } else if (error.response?.status === 429) {
        createToast("Error", "Too many requests. Please wait before trying again.");
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Drawer.Root
    >
    <Card.Root 
      width="320px"
    >
      <Card.Body 
      gap="2"
      cursor="pointer"
      _hover={{ bg: "gray.500", boxShadow: "md", transition: "all 0.2s" }}
      onClick={handleOpenNewTab}
      >
        <Card.Title mt="2">{name}</Card.Title>
        <Card.Description>
          <div>
            <strong>{group}</strong>
          </div>
          <p>
            Created: {created_at}
          </p>
          <p>
            Updated: {updated_at}
          </p>
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
      <Drawer.Trigger asChild>
        <Button
        >Edit</Button>
      </Drawer.Trigger>
      </Card.Footer>
    </Card.Root>


      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Edit Item</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body ref={drawerBodyRef}>
              <Input
                mb={4}
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Name"
              />
              <MySelect
                value={editGroup}
                onChange={(value) => setEditGroup(value)}
                portalTarget={drawerBodyRef}
              />
            </Drawer.Body>

            <Drawer.Footer>
              <Drawer.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Drawer.ActionTrigger>
                <Button colorScheme="teal" onClick={handleSave} loading={loading}>
                  Save
                </Button>
            </Drawer.Footer>

            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>

          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
    </>
  )
}

export default CardItem