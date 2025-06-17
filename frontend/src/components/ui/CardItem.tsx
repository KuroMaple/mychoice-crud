import { Button, Card } from "@chakra-ui/react"

type CardItemProps = {
  name: string;
  group: "Primary" | "Secondary";
  created_at: string;
  updated_at: string;
};

const CardItem: React.FC<CardItemProps> = ({
  name,
  group,
  created_at,
  updated_at,
}) => {
  return (
    <Card.Root width="320px">
      <Card.Body gap="2">
        <Card.Title mt="2">{name}</Card.Title>
        <Card.Description>
          <div>
            <strong>{group}</strong>
          </div>
          <p>
            Created at: {created_at}
          </p>
          <p>Updated at: {updated_at}</p>
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline">View</Button>
        <Button>Join</Button>
      </Card.Footer>
    </Card.Root>
  )
}

export default CardItem