import express from "express";
import PromoCode from "../model/promocodeSchema.js";

/**
 * Function to create a new promo code
 */
export const createPromoCode = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const {
      code,
      discountType,
      discountValue,
      minOrderValue,
      maxDiscount,
      usageLimit,
      expiryDate,
    } = req.body;

    const newPromo = new PromoCode({
      code,
      discountType,
      discountValue,
      minOrderValue,
      maxDiscount,
      usageLimit,
      expiryDate,
    });

    await newPromo.save();
    return res
      .status(201)
      .json({ message: "Promo code created successfully", promo: newPromo });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Function to apply a promo code
 */
export const applyPromoCode = async (req, res) => {
  try {
    const { code, orderValue } = req.body;

    // Check if promo code exists
    const promo = await PromoCode.findOne({ code: code.toUpperCase() });

    if (!promo) {
      return res
        .status(404)
        .json({ error: "Invalid promo code", finalAmount: orderValue });
    }

    // Check if the promo code is active
    if (!promo.isActive) {
      return res.status(400).json({ error: "Promo code is inactive" });
    }

    // Check if the promo code has expired
    const currentDate = new Date();
    if (new Date(promo.expiryDate) < currentDate) {
      return res.status(400).json({ error: "Promo code has expired" });
    }

    // Check if the order value meets the minimum requirement
    if (orderValue < promo.minOrderValue) {
      return res.status(400).json({
        error: `Order value must be at least ${promo.minOrderValue} to use this promo code`,
      });
    }

    // Check if the user has exceeded the usage limit (optional: track per user)
    // You can add logic to store user-specific usage in the database
    if (
      promo.usageLimit !== null &&
      promo.usageLimit <= promo.totalRedemptions
    ) {
      return res.status(400).json({ error: "Promo code usage limit reached" });
    }

    // Calculate the discount amount
    let discountAmount = 0;
    if (promo.discountType === "fixed") {
      discountAmount = promo.discountValue;
    } else if (promo.discountType === "percentage") {
      discountAmount = (promo.discountValue / 100) * orderValue;
      if (promo.maxDiscount !== null) {
        discountAmount = Math.min(discountAmount, promo.maxDiscount);
      }
    }

    // Calculate final order value after discount
    const finalAmount = Math.max(orderValue - discountAmount, 0);

    // Update promo code redemption count
    await PromoCode.updateOne(
      { _id: promo._id },
      { $inc: { totalRedemptions: 1 } }
    );

    return res.status(200).json({
      message: "Promo code applied successfully",
      originalOrderValue: orderValue,
      discountAmount,
      finalAmount,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
