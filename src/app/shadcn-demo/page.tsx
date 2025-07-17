import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { Dialog } from "@/components/ui/dialog"
import { Sheet } from "@/components/ui/sheet"

export default function ShadcnUiDemo() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Demo: Shadcn/ui Base Components</h1>
      <div className="space-x-2">
        <Button>Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <Card className="p-4 max-w-md">
        <h2 className="font-semibold mb-2">Card</h2>
        <p>Este es un Card básico.</p>
      </Card>
      <div className="space-y-2 max-w-xs">
        <Label htmlFor="input-demo">Input</Label>
        <Input id="input-demo" placeholder="Escribe algo..." />
      </div>
      <DropdownMenu className="p-4 border rounded">DropdownMenu (placeholder)</DropdownMenu>
      <Dialog open className="mt-4">Dialog (placeholder abierto)</Dialog>
      <Sheet className="mt-4">Sheet (placeholder abierto)</Sheet>
    </div>
  )
}
