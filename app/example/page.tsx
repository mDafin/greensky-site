import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";

export default function ExamplePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-8">
      <Card glass shadow padded className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Trust & Security</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Our platform enforces enterprise-grade encryption, access control,
            and compliance standards to protect sensitive data.
          </p>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted">Last updated: Oct 2025</p>
        </CardFooter>
      </Card>
    </main>
  );
}