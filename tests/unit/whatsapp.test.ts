import { describe, expect, it } from "vitest";
import { buildWhatsAppLink } from "@/lib/whatsapp";

describe("buildWhatsAppLink", () => {
  it("construit un lien wa.me avec le message encodé", () => {
    expect(buildWhatsAppLink("24177000000", "Bonjour Elyon Créa !")).toBe(
      "https://wa.me/24177000000?text=Bonjour%20Elyon%20Cr%C3%A9a%20!",
    );
  });
  it("nettoie +, espaces et tirets", () => {
    expect(buildWhatsAppLink("+241 77-00-00-00")).toBe("https://wa.me/24177000000");
  });
  it("retourne null si le numéro est vide ou trop court", () => {
    expect(buildWhatsAppLink("")).toBeNull();
    expect(buildWhatsAppLink("1234")).toBeNull();
  });
});
