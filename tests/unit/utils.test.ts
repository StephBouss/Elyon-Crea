import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn — typographie premium", () => {
  it.each(["display", "heading-lg", "heading", "heading-sm", "subheading", "body-lg", "label"])("conserve text-%s avec une couleur", (size) => {
    expect(cn(`text-${size}`, "text-ink")).toBe(`text-${size} text-ink`);
  });
  it("remplace la taille standard du Sheet sans supprimer le libellé", () => {
    expect(cn("text-base font-medium text-foreground", "text-label text-ash"))
      .toBe("font-medium text-label text-ash");
  });
});
