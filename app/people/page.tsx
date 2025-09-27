// app/page.tsx
import ValueProps from "@/components/sections/ValueProps";
import PeopleGrid from "@/components/people/PeopleGrid";
import CallToAction from "@/components/CallToAction";

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <ValueProps />
      <PeopleGrid />
      <CallToAction />
    </>
  );
}
