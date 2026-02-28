import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";

export default function CommunitiesPage() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Lista de comunidades</CardTitle>
        <CardDescription>
          Revisa las comunidades disponibles y únete a la que más te interese
        </CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
