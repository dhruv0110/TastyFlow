// routes/invoice.js

const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");
const User = require("../models/User");

// Create an invoice
router.post("/create", async (req, res) => {
  try {
    const { userId, foods, totalAmount, cgst, sgst, roundOff } = req.body;


    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the last invoice number and increment it
    const lastInvoice = await Invoice.findOne().sort({ invoiceNumber: -1 }); // Find the latest invoice
    const invoiceNumber = lastInvoice ? lastInvoice.invoiceNumber + 1 : 1; // Increment the last invoice number or start at 1

    // Prepare invoice data
    const invoice = new Invoice({
      userId,
      foods: foods.map((food) => ({
        foodId: food.foodId,
        name: food.name,
        price: food.price,
        quantity: food.quantity,
        total: food.quantity * food.price,
      })),
      totalAmount,
      invoiceNumber, // Set the generated invoice number
      cgst,
      sgst,
      roundOff
    });

    // Save the invoice to the database
    await invoice.save();

    res.status(201).json({
      message: "Invoice created successfully",
      invoice,
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get an invoice by ID
router.get("/:invoiceId", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoiceId)
      .populate("userId") // Populate the user details
      .populate("foods.foodId"); // Populate food details

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json(invoice);
  } catch (err) {
    console.error("Error fetching invoice:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
