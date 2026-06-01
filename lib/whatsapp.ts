export const getWhatsAppLink = (propertyTitle?: string): string => {
  const phone = "2348012345678"; // ← Change to your real number
  const baseMessage = propertyTitle 
    ? `Hello, I'm interested in ${propertyTitle}`
    : "Hello, I'm interested in your luxury properties";

  return `https://wa.me/${phone}?text=${encodeURIComponent(baseMessage)}`;
};