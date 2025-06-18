import { Portal, Select, createListCollection } from "@chakra-ui/react"


type MySelectProps = {
  value: "Primary" | "Secondary";
  onChange: (value: "Primary" | "Secondary") => void;
  portalTarget?: React.RefObject<HTMLElement>;
};

const MySelect = ({ value, onChange, portalTarget}: MySelectProps) => {
  return (
    <Select.Root
    multiple={false} 
    collection={groups} 
    size="sm" 
    width="320px"
    value={[value]}  // Wrap your single string in an array
    onValueChange={(details) => {
      const firstKey = details.value[0] as "Primary" | "Secondary" | undefined;
      if (firstKey) {
        onChange(firstKey);
      }
    }}
       
>
      <Select.HiddenSelect />
      <Select.Label>Select group</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select group" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal container={portalTarget}>
        <Select.Positioner>
          <Select.Content>
            {groups.items.map((group) => (
              <Select.Item item={group} key={group.value}>
                {group.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const groups = createListCollection({
  items: [
    { label: "Primary", value: "Primary" },
    { label: "Secondary", value: "Secondary" },
  ],
})

export default MySelect