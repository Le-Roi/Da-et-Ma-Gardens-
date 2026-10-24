
"use strict";

const WHATSAPP_NUMBER = "254737672356";

const orderForm = document.getElementById("order-form");
const enquirySelect = document.getElementById("enquiry-type");
const categorySelect = document.getElementById("product-category");
const statusMessage = document.getElementById("form-status");
const detailsField = document.getElementById("product-details");

// Display the current year in the footer.
const yearElement = document.getElementById("current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Let product links select the relevant category.
document.querySelectorAll("[data-category]").forEach((link) => {
  link.addEventListener("click", () => {
    const category = link.dataset.category;

    if (categorySelect) {
      categorySelect.value = category;
    }

    if (enquirySelect) {
      enquirySelect.value = "Product order";
    }
  });
});

// Let service links select the appropriate enquiry type.
document.querySelectorAll("[data-enquiry]").forEach((link) => {
  link.addEventListener("click", () => {
    const enquiry = link.dataset.enquiry;

    if (enquirySelect) {
      enquirySelect.value = enquiry;
    }
  });
});

// Prepare the customer's order or enquiry for WhatsApp.
if (orderForm) {
  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!orderForm.reportValidity()) {
      return;
    }

    const formData = new FormData(orderForm);

    const customerName = String(formData.get("name") || "").trim();
    const customerPhone = String(formData.get("phone") || "").trim();
    const enquiry = String(formData.get("enquiry") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const details = String(formData.get("details") || "").trim();
    const delivery = String(formData.get("delivery") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const notes = String(formData.get("notes") || "").trim();

    const messageLines = [
      "DA ET MA GARDENS — ORDER / ENQUIRY REQUEST",
      "",
      "Name: " + customerName,
      "Customer phone: " + customerPhone,
      "Request type: " + enquiry,
      "Product category: " + (category || "Not specified"),
      "Products and quantities: " + (details || "Not specified"),
      "Preferred fulfilment: " + (delivery || "Not specified"),
      "Delivery location: " + (location || "Not specified"),
      "Additional instructions: " + (notes || "None"),
      "",
      "Please confirm availability, prices and delivery arrangements before accepting my request."
    ];

    const message = messageLines.join("\n");
    const whatsappUrl =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    if (statusMessage) {
      statusMessage.textContent =
        "Opening WhatsApp. Review your message and press Send to submit your request.";
    }

    // Open WhatsApp. The customer must press Send themselves.
    window.location.href = whatsappUrl;
  });
}
