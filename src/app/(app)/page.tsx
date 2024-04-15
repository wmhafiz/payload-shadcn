import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'diaries',
  })

  const totalCal = data.docs.reduce((prev, curr) => prev += curr.total_calories || 0, 0)

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Your Diaries</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Introducing Our Dynamic Orders Dashboard for Seamless Management and
            Insightful Analysis.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Create New Diary</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>This Week</CardDescription>
          <CardTitle className="text-4xl">{totalCal}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">+25% from last week</div>
        </CardContent>
        <CardFooter>
          {/* <Progress value={25} aria-label="25% increase" /> */}
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-4xl">$5,329</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +10% from last month
          </div>
        </CardContent>
        <CardFooter>
          {/* <Progress value={12} aria-label="12% increase" /> */}
        </CardFooter>
      </Card>
    </div>
  )
}
