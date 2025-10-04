"use client";

import React from "react";
import FloatingContactUs from "@/components/nav/FloatingContactUs";
import ContactUsDrawer from "@/components/media/HeroVideooverlays/ContactUsDrawer";

export default function ContactHost(): React.JSX.Element {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FloatingContactUs onClick={() => setOpen(true)} />
      <ContactUsDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}